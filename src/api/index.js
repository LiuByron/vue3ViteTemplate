import myAxios  from "@/utils/superRequest";

// 下面是简写的形式
export function demo(paramsList) {
  return myAxios({
    url: '/api/test',
    method: 'post',
    data: paramsList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [
      (data) => {
        let result = ''
        for (let key in data) {
          result += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
        }
        return result.slice(0, result.length - 1)
      }
    ],
  });
}

// 下面是简写的形式
export function login(data) {
  return myAxios({
    url: '/passport/web/login',
    method: 'post',
    data
  });
}
