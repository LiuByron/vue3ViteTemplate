// 01.实现全屏
function fullScreen() {
  const el = document.documentElement;
  const rfs =
    el.requestFullScreen ||
    el.webkitRequestFullScreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;
  if (typeof rfs != "undefined" && rfs) {
    rfs.call(el);
  }
}

// 02.退出全屏
function exitScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  if (typeof cfs != "undefined" && cfs) {
    cfs.call(el);
  }
  // Exiting full screen 🚪🏃
}

// 03.页面打印
function print() {
  window.print();
}

// 04.打印内容样式更改
/* 
<style>
// Adjusting print layout 🔧
@media print {
  .noprint {
      display: none;
  }
}
</style>
<div class="print">print</div>
<div class="noprint">noprint</div>
*/

// 05.阻止关闭事件
window.onbeforeunload = function () {
  return "Are you sure you want to leave the haorooms blog？🚪🤔";
};

// 06.屏幕录制
const streamPromise = navigator.mediaDevices.getDisplayMedia();
streamPromise.then((stream) => {
  var recordedChunks = []; // recorded video data
  var options = { mimeType: "video/webm; codecs=vp9" }; // Set the encoding format
  var mediaRecorder = new MediaRecorder(stream, options); // Initialize the MediaRecorder instance
  mediaRecorder.ondataavailable = handleDataAvailable; // Set the callback when data is available (end of screen recording)
  mediaRecorder.start();
  // Video Fragmentation
  function handleDataAvailable(event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data); // Add data, event.data is a BLOB object
      download(); // Encapsulate into a BLOB object and download
    }
  }
  // file download
  function download() {
    var blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    // Videos can be uploaded to the backend here
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }
});

// 07.判断横竖屏 当你需要判断手机横竖屏的状态时。
function hengshuping() {
  if (window.orientation == 180 || window.orientation == 0) {
    alert("Portrait mode! 📱");
  }
  if (window.orientation == 90 || window.orientation == -90) {
    alert("Landscape mode! 🌅");
  }
  // Add listener for screen orientation changes 🔄
  window.addEventListener(
    "onorientationchange" in window ? "orientationchange" : "resize",
    hengshuping,
    false
  );
}

// 08.改变横竖屏样式 当你需要为横竖屏设置不同的样式时。
/* 
  <style>
  @media all and (orientation : landscape) {
      body {
          background-color: #ff0000;
      }
  }
  @media all and (orientation : portrait) {
      body {
          background-color: #00ff00;
      }
  }
  </style>
*/

// 09.标签页隐藏  当你需要监听标签页显示和隐藏事件时。
// Tab Page Hidden
const { hidden, visibilityChange } = (() => {
  let hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }
  return {
    hidden,
    visibilityChange,
  };
})();

const handleVisibilityChange = () => {
  console.log("currently hidden", document[hidden]);
};
document.addEventListener(visibilityChange, handleVisibilityChange, false);

// 10.本地图片预览 当你从客户端获取图片但无法立即上传到服务器，但需要预览时。
/* 
  <div class="test">
      <input type="file" name="" id="">
      <img src="" alt="">
  </div>
  <script>
  const getObjectURL = (file) => {
      let url = null;
      if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // webkit or chrome
          url = window.URL.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
      }
      return url;
  }
  document.querySelector('input').addEventListener('change', (event) => {
      document.querySelector('img').src = getObjectURL(event.target.files[0])
  })
  </script>
 */

// 11.图片预加载 当你有大量图片时，你需要预加载图片以避免白屏
const images = [];
function preloader(args) {
  for (let i = 0, len = args.length; i < len; i++) {
    images[i] = new Image();
    images[i].src = args[i];
  }
}
// preloader(['1.png', '2.jpg'])

// 12.字符串脚本 当需要将一串字符串转换成js脚本时，此方法存在xss漏洞，谨慎使用。
const obj = eval('({ name: "jack" })');
// obj will be converted to object{ name: "jack" }
const v = eval("obj");
// v will become the variable obj

// 13.递归函数名解耦 当需要编写递归函数时，会声明一个函数名，但每次修改函数名时，总会忘记修改内部的函数名。argument 是函数内部对象，包括传入函数的所有参数，arguments.callee 代表函数名。
// This is a basic Fibonacci sequence
function fibonacci(n) {
  const fn = arguments.callee;
  if (n <= 1) return 1;
  return fn(n - 1) + fn(n - 2);
}

// 14.隐式判断 当你需要判断某个dom元素当前是否出现在页面视图中时，可以尝试使用IntersectionObserver来判断。
/* 
  <style>
  .item {
      height: 350px;
  }
  </style>

  <div class="container">
    <div class="item" data-id="1">Invisible</div>
    <div class="item" data-id="2">Invisible</div>
    <div class="item" data-id="3">Invisible</div>
  </div>
  <script>
    if (window?.IntersectionObserver) {
      let items = [...document.getElementsByClassName("item")]; // parses as a true array, also available Array.prototype.slice.call()
  let io = new IntersectionObserver(
        (entries) => {
          entries.forEach((item) => {
            item.target.innerHTML =
              item.intersectionRatio === 1 // The display ratio of the element, when it is 1, it is completely visible, and when it is 0, it is completely invisible
                ? `Element is fully visible`
                : `Element is partially invisible`;
          });
        },
        {
          root: null,
          rootMargin: "0px 0px",
          threshold: 1, // The threshold is set to 1, and the callback function is triggered only when the ratio reaches 1
        }
      );
      items.forEach((item) => io.observe(item));
    }
  </script>
*/
// 15.元素可编辑  当你需要编辑 dom 元素时，让它像文本区域一样点击。
{
  /* <div contenteditable="true">here can be edited</div> */
}

//16.元素属性监控
{
  /* <div id="test">test</div>
<button onclick="handleClick()">OK</button>

<script>
  const el = document.getElementById("test");
  let n = 1;
  const observe = new MutationObserver((mutations) => {
    console.log("attribute is changede", mutations);
  })
  observe.observe(el, {
    attributes: true
  });
  function handleClick() {
    el.setAttribute("style", "color: red");
    el.setAttribute("data-name", n++);
  }
  setTimeout(() => {
    observe.disconnect(); // stop watch
  }, 5000);
</script> 
*/
}

// 17.打印dom元素 开发过程中需要打印dom元素时，使用console.log往往只能打印出整个dom元素，无法查看dom元素内部的属性，可以尝试使用console.dir。
// console.dir(document.body)

// 18.激活应用 当你在移动端开发时，需要打开其他应用，以下方法也可以通过location.href赋值来操作
/* 
  <a href="tel:12345678910">phone</a>
  <a href="sms:12345678910,12345678911?body=hello">android message</a> 
  <a href="sms:/open?addresses=12345678910,12345678911&body=hello">ios message</a>
  <a href="wx://">ios message</a>
*/
