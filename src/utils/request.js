import axios from 'axios';
import { refreshToken } from './refreshToken'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000,
  withCredentials: false // 表示跨域请求时是否需要使用凭证
});

instance.interceptors.request.use(config => {
  /**
   * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
   * const token = getToken()
   * if (token) {
   *  config.headers.token = token
   * }
   */
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  const { response, message } = error;
  const { data, config } = response;
  if(response && response.data) {
    return Promise.reject(error);
  }

  // return Promise.reject(error);
  return new Promise((resolve, reject) => {
    /**
     * 判断当前请求失败
     * 是否由 token 失效导致的
     */
    if(data.statusCode === 401) {
      if(config.url === '/api/token/refreshToken') {
       /**
       * 后端 更新 refreshToken 失效后
       * 返回的状态码， 401
       */
        window.location.href = `${HOME_PAGE}/login`;
      } else {
        refreshToken(() => resolve(instance(config)))
      }
    }else {
      reject(error.response);
    }
  })
});


// 封裝post方法
export function post(url, data={}, params={}) {
  return instance({
    method: 'post',
    url,
    data,
    params
  })
}

// 封裝get方法
export function get(url, params={}) {
  return instance({
    method: 'get',
    url,
    params
  })
}

// 封裝put方法
export function put(url, data={},  params={}) {
  return instance({
    method: 'put',
    url,
    params,
    data
  })
}

// 封裝delete方法
export function _delete(url, params={}) {
  return instance({
    method: 'delete',
    url,
    params
  })
}

export default instance;
