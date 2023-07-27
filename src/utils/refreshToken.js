// 存储由于 token 过期导致 失败的请求
const expiredRequestArr = [];

/**
* 存储当前因为 token 失效导致发送失败的请求
*/
const saveErrorRequest = (expireRequest) => {
  expiredRequestArr.push(expireRequest)
}

// 避免频繁更新
let firstRequest = true;

/**
* 利用 refreshToken 更新当前使用的 token
*/
const updateTokenByRefreshToken = () => {
  firstRequest = false;

  axiosInstance.post('更新 token 的请求').then(res => {
    const { refreshToken, accessToken } = res.data;

    // 更新本地的token
    localStorage.setItem('accessToken', accessToken);

    // 更新请求头中的Token
    setAxiosHeader(accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    /**
     * 当获取了最新的 refreshToken, accessToken 后
     * 重新发起之前失败的请求
     */
    expiredRequestArr.forEach(request => {
      request();
    })

    expiredRequestArr = [];
  }).catch(err => {
    console.log('刷新 token 失败err', err);

    /**
     * 此时 refreshToken 也已经失效了
     * 返回登录页，让用户重新进行登录操作
     */
    window.location.href = `${HOME_PAGE}/login`;
  })
}

/**
 * 更新当前已过期的 token
 * @param expiredRequest 回调函数，返回由token过期导致失败的请求
 */
export const refreshToken = (expireRequest) => {
  saveErrorRequest(expireRequest);
  if(firstRequest) {
    updateTokenByRefreshToken();
  }
}

