<template>
  <div class="download">
    <h3 class="title">M3U8视频下载</h3>
    <input
      v-model="m3"
      type="text"
      placeholder="请输入M3U8视频地址"
      @blur="handleblur"
      @focus="handleblur"
      @change="handleblur"
    />
    <button @click="palyDown">下载</button>
    <p> {{ textas }} </p>
  </div>
</template>
<script setup>
const m3 = ref("");
const textas = ref("例如：https://vip.lz-cdn5.com/20220914/42199_41e5bfff/index.m3u8");
let targetUrl = ref("");
let targetEndWithUrl = ref("");
let matches = ref("");;

function handleblur() {
  targetUrl = m3.value || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  const pattern = /\/([^\/]+)$/; // 正则表达式模式
  matches = pattern.exec(targetUrl); // 提取匹配结果
  if (matches && matches.length > 1) {
    const filename = matches[1]; // 获取匹配结果中的文件名
    targetEndWithUrl = filename; // 输出: index.m3u8
  }
}

// 开始下载按钮
function palyDown() {
  console.log(m3.value);
  if (!m3.value) return alert("请输入M3U8视频地址");
  new Download(targetUrl);
}

class Download {
  // 最大下载队列数
  maxTask = 1;

  // 当前下载数
  nowDownTaskIndex = 0;

  // 下载目标地址
  downLoadUrl = null;

  // 下载分片地址
  downLoadSplices = [];

  // 下载暂存数组
  downLoadTemps = [];

  constructor(url) {
    this.downLoadUrl = url;
    this.analysisUrlToSplice(url);
  }

  // 调用解析
  analysisUrlToSplice(targetUrl) {
    this.getFetchUrlStream(targetUrl).then(async (res) => {
      this.downLoadSplices = await this.analysisMultiUrl(res);
      this.maxTask = this.downLoadSplices.length;
      if (this.maxTask)
        //  开始下载分片数据
        this.analysisList();
    });
  }

  // 传入url 判断是多个地址  还是  单个地址
  getFetchUrlStream(url) {
    return new Promise((suc, rej) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`请求失败，状态码：${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          let analysisList = text.split("\n");
          analysisList.forEach((x) => {
            if (x.endsWith(".m3u8")) {
              suc(x);
            }
          });
        })
        .catch((error) => {
          console.error("发生错误:", error);
          rej("未找到解析列表");
        });
    });
  }

  // 多个地址解析函数
  analysisMultiUrl(endWithUrl) {
    let TempUrl = this.downLoadUrl.replace(targetEndWithUrl, endWithUrl);
    return new Promise((suc, rej) => {
      fetch(TempUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`请求失败，状态码：${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          let result = [];
          text.split("\n").forEach((x) => {
            if (x.endsWith(".ts")) {
              result.push(TempUrl.replace(targetEndWithUrl, x));
            }
          });
          suc(result);
        })
        .catch((error) => {
          rej("多个地址解析函数发生错误:" + error);
        });
    });
  }

  // 解析多个分片数据
  analysisList() {
    // 下载 .ts 文件并存储到数组中
    let Task = () => {
      return new Promise((suc, rej) => {
        // console.log(this.nowDownTaskIndex);
        fetch(this.downLoadSplices[this.nowDownTaskIndex])
          .then((response) => {
            if (!response.ok) {
              this.nowDownTaskIndex = 0;
              rej(`下载失败，状态码：${response.status}`);
            }
            return response.arrayBuffer();
          })
          .then((arrayBuffer) => {
            this.nowDownTaskIndex += 1;
            suc(arrayBuffer);
          })
          .catch((error) => {
            console.log(error);
            this.nowDownTaskIndex = 0;
            rej("解析错误", error);
          });
      });
    };

    Task().then((res) => {
      this.downLoadTemps.push(res);
      textas.value = `下载中第${this.nowDownTaskIndex}段,总共${this.downLoadSplices.length}`;
      // console.log(`下载中第${this.nowDownTaskIndex}段,总共${this.downLoadSplices.length}`);
      if (this.nowDownTaskIndex >= this.downLoadSplices.length) {
        // 计算合并后的总长度
        const totalLength = this.downLoadTemps.reduce(
          (acc, buffer) => acc + buffer.byteLength,
          0
        );
        textas.value = "下载完成！";
        setTimeout(() => {
          textas.value = "例如：https://vip.lz-cdn5.com/20220914/42199_41e5bfff/index.m3u8";
          m3.value = "";
        }, 5000);
        // console.log(totalLength);
        // 创建新的 ArrayBuffer
        const mergedBuffer = new ArrayBuffer(totalLength);

        // 使用视图将各个 TypedArray 的数据复制到 mergedBuffer
        const mergedView = new Uint8Array(mergedBuffer);
        let offset = 0;
        this.downLoadTemps.forEach((buffer) => {
          const view = new Uint8Array(buffer);
          mergedView.set(view, offset);
          offset += buffer.byteLength;
        });
        // // 将数组中的 .ts 文件数据合并成一个完整的视频文件
        const mergedData = new Uint8Array(mergedView);
        // // 将合并后的数据保存为一个完整的视频文件（使用 File API）
        const mergedBlob = new Blob([mergedData], { type: "video/mp2t" });
        const file = new File([mergedBlob], "video.ts", {
          type: "video/mp2t",
        });

        // 保存文件到本地（下载）
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;
        downloadLink.click();

        this.maxTask = 0;
        this.nowDownTaskIndex = 0;
        this.downLoadUrl = null;
        this.downLoadSplices = [];
        this.downLoadTemps = [];
        return;
      }
      this.analysisList();
    });
  }
}
</script>
<style lang="scss" scoped>
.download {
  padding: 30px;
  text-align: center;
  background-color: aliceblue;
}
input, button {
  line-height: 30px;
  padding: 10px;
  cursor: pointer;
}
input {
  width: 30vw;
}
.title {
  margin: 100px 0;
}
</style>
