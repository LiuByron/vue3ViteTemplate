<template>
  <div class="demo">
    <div class="container">
      <div class="box">
        <div class="out-div out-front">
          <img src="./images/1.jpg" alt="" />
        </div>
        <div class="out-div out-back">
          <img src="./images/2.jpg" alt="" />
        </div>
        <div class="out-div out-left">
          <img src="./images/3.jpg" alt="" />
        </div>
        <div class="out-div out-right">
          <img src="./images/4.jpg" alt="" />
        </div>
        <div class="out-div out-top">
          <img src="./images/5.jpg" alt="" />
        </div>
        <div class="out-div out-bottom">
          <img src="./images/6.jpg" alt="" />
        </div>

        <div class="in-div in-front">
          <img src="./images/3.jpg" alt="" />
        </div>
        <div class="in-div in-back">
          <img src="./images/4.jpg" alt="" />
        </div>
        <div class="in-div in-left">
          <img src="./images/5.jpg" alt="" />
        </div>
        <div class="in-div in-right">
          <img src="./images/6.jpg" alt="" />
        </div>
        <div class="in-div in-top">
          <img src="./images/7.jpg" alt="" />
        </div>
        <div class="in-div in-bottom">
          <img src="./images/8.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.demo {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #333, #000);
}
.container {
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.out-div img {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.in-div img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.box {
  position: absolute;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  animation: rotateAnimate 10s linear infinite;
  cursor: pointer
}

.out-div {
  width: 200px;
  height: 200px;
  position: absolute;
  transition: transform 1s ease-in;
}

.out-front {
  transform: translateZ(100px);
}

.out-back {
  transform: translateZ(-100px) rotateY(180deg);
}

.out-left {
  transform: translateX(-100px) rotateY(-90deg);
}

.out-right {
  transform: translateX(100px) rotateY(90deg);
}

.out-top {
  transform: translateY(-100px) rotateX(90deg);
}

.out-bottom {
  transform: translateY(100px) rotateX(-90deg);
}

.container:hover .out-front {
  transform: translateZ(200px);
}

.container:hover .out-back {
  transform: translateZ(-200px) rotateY(180deg);
}

.container:hover .out-left {
  transform: translateX(-200px) rotateY(-90deg);
}

.container:hover .out-right {
  transform: translateX(200px) rotateY(90deg);
}

.container:hover .out-top {
  transform: translateY(-200px) rotateX(90deg);
}

.container:hover .out-bottom {
  transform: translateY(200px) rotateX(-90deg);
}

.in-div {
  margin-left: 50px;
  margin-top: 50px;
  width: 100px;
  height: 100px;
  position: absolute;
}

.in-front {
  transform: translateZ(50px);
}

.in-back {
  transform: translateZ(-50px) rotateY(180deg);
}

.in-left {
  transform: translateX(-50px) rotateY(-90deg);
}

.in-right {
  transform: translateX(50px) rotateY(90deg);
}

.in-top {
  transform: translateY(-50px) rotateX(90deg);
}

.in-bottom {
  transform: translateY(50px) rotateX(-90deg);
}

@keyframes rotateAnimate {
  0% {
      transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}
</style>
