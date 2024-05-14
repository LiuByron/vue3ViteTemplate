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

// 测试数据
export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: new Array(9).fill({
          a: "2016-05-03",
          b: "Tom",
          c: "No. 189, Grove St, Los Angeles",
          d: "No. 189, Grove St, Los Angeles",
          e: "2016-05-03",
          f: "Tom",
          g: "No. 189, Grove St, Los Angeles",
          h: "2016-05-03",
          i: "Tom",
        }),
      });
    }, 500);
  });
}

