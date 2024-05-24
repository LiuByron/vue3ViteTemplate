let timer = null
self.addEventListener('message', (e) => {
  console.log(e) // 接收主线程发送的消息
  
  let sum = 0;
  let msg = null;
  // 处理逻辑...
  if(e.data === 'start'){
    timer = setInterval(() => {
      sum += 1;
      msg = {
        text: '编辑中',
        sum: sum
      }
      self.postMessage(msg); // 向主线程发送消息
    }, 1 * 1000)
  } else {
    clearInterval(timer);
  }
})