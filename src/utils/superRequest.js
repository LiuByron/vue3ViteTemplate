import axios from "axios";
import { ElMessage, ElLoading } from 'element-plus'
import useStore from "@/store";

const { user } = useStore();
const pendingRequest = new Set(); // 用于存储每个请求的标识

const LoadingInstance = {
  _target: null, // 保存Loading实例
  _count: 0
};

// 处理重复请求的返回
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, cbRes, cbRej) {
    if (!this.events[eventName]) {
      this.events[eventName] = [[cbRes, cbRej]];
    } else {
      this.events[eventName].push([cbRes, cbRej]);
    }
  }

  emit(eventName, res, ansType) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(event => {
        if(ansType === 'resolve') {
          event[0](res);
        } else {
          event[1](res);
        }
      });
    }
  }
}

// 装载重复请求
const _EV = new EventEmitter()

export default function myAxios(axiosConfig, customOptions) {
  // 创建axios实例
  const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // api的base_url
    timeout: 5000, // 请求超时时间
    withCredentials: true, // 跨域请求时发送cookie
  })

  // 自定义配置
  const custom_options = Object.assign({
    loading: true, // 是否开启loading层效果, 默认为true
    reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
    error_message_show: true, // 是否开启接口错误信息展示,默认为true
    code_message_show: true, // 是否开启state不为0时的信息提示, 默认为false
  }, customOptions);

  // 请求拦截器
  service.interceptors.request.use(async(config) => {
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++;
        if(LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service({});
        }
      }

      // 自动携带token
      if (user.userInfo?.token && typeof window !== "undefined") {
        config.headers.Authorization = user.userInfo.token;
      }

      const _hash = location.hash
      const _reqKey = getPendingKey(config, _hash)
      if(pendingRequest.has(_reqKey)) {
        let res = null
        try {
          res = await new Promise((resolve, reject) => {
            _EV.on(_reqKey, resolve, reject)
          })
          return Promise.reject({
            type: 'limitedResSuccess',
            val: res
          })
        } catch (error) {
          return Promise.reject({
            type: 'limitedResError',
            val: error
          })
        }
      } else {
        // 将请求的key保存在config
        config.pendKey = _reqKey
        pendingRequest.add(_reqKey)
      }

      // 发送请求之前做些什么
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  )

  // 响应拦截器
  service.interceptors.response.use(response => {
      handleRequestSuccessLimit(response)
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      if(custom_options.code_message_show && response.data.code === 0) {
        ElMessage.success(response.data.message)
        return response.data;
      } // 其他接口适配

      if(custom_options.code_message_show && response.data?.state !== 200) {
        ElMessage.error(response.data.message)
        return Promise.reject(response.data);
      }

      return custom_options.reduct_data_format ? response.data : response;
    },
    error => {
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error); // 错误继续返回给到具体页面

    }
  )
  return service(axiosConfig);
}

/**
 * 关闭Loading层实例
 * @param {*} _options 
 */
function closeLoading(_options) {
  if(_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if(LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

// 请求code映射
const codeMessage = {
  302: '接口重定向了！',
  400: '参数不正确！',
  401: '您未登录，或者登录已经超时，请先登录！',
  403: '您没有权限操作！',
  408: '请求超时！',
  409: '系统已存在相同数据！',
  500: '服务器内部错误！',
  501: '服务未实现！',
  502: '网关错误！',
  503: '服务不可用！',
  504: '服务暂时无法访问，请稍后再试！',
  505: 'HTTP版本不受支持！'
}

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  if(error.type && error.type === 'limitedResSuccess') {
    return Promise.resolve(error.val)
  }
  
  if(error.type && error.type === 'limitedResError') {
    return Promise.reject(error.val);
  }

  handleRequestSuccessLimit(error);

  let message = '';
  if (error && error.response) {
    if(error.response.status == 404) {
      message = `请求地址出错: ${error.response.config.url}` // 在正确域名下
    } else {
      message = codeMessage[error.response.status] ?? '异常问题，请联系管理员！';
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

  ElMessage.error(message)
}

/**
 * 接口响应成功
 * @param {*} config 
 */
function handleRequestSuccessLimit(response) {
  const _reqKey = response.config?.pendKey;
  if (pendingRequest.has(_reqKey)) {
    let x = null
    try {
      x = JSON.parse(JSON.stringify(response))
    } catch (error) {
      x = response
    }
    pendingRequest.delete(_reqKey);
    _EV.emit(_reqKey, x, 'resolve');
    delete _EV[_reqKey];
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config, hash) {
  let {url, method, params, data} = config;
  if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data), hash].join('&');
}
