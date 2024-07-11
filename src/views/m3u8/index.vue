<template>
  <video
    id="my-video"
    class="video-js"
    controls
    muted
    preload="auto"
    width="640"
    height="360"
    data-setup='{"techOrder": ["html5"]}'
  >
    <source
      src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      type="application/x-mpegURL"
    />
    <p class="vjs-no-js">
      要查看此视频，请启用 JavaScript 并考虑升级到支持 HTML5 视频的 Web 浏览器
    </p>
  </video>
</template>
<script setup>
import videojs from 'video.js';
import { onMounted } from 'vue'
onMounted(() => {
  const player = videojs("my-video");
  player.play();
})
</script>
<style lang='scss' scoped>

</style>