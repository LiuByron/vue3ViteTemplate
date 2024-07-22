<template>
  <div :style="`height: ${calcHeight('main')};`" class="wh-full pos-relative">
    <v-chart :option="mapOption" :autoresize="true" @click="handleClick" />
    <n-button v-show="isShowBack" class="pos-absolute top-10 left-10" @click="goBack">返回</n-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { use, registerMap } from "echarts/core";
import VChart from "vue-echarts";
import { CanvasRenderer } from "echarts/renderers";
import { MapChart, ScatterChart, EffectScatterChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import { calcHeight } from "@/utils/index";

use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
  MapChart,
  ScatterChart,
  EffectScatterChart,
]);

const mapOption = ref();
const mapList = ref([]); // 记录地图
const isShowBack = computed(() => {
  return mapList.value.length !== 0;
});

const getMapJson = async (mapName) => {
  const url = `https://geo.datav.aliyun.com/areas_v3/bound/${mapName}.json`;
  const mapJson = await fetch(url).then((res) => res.json());
  return mapJson;
};

const setOptions = (mapName, mapData) => {
  return {
    tooltip: {
      show: true,
      formatter: function (params) {
        // 根据需要进行数据处理或格式化操作
        if (params && params.data) {
          const { adcode, name, data } = params.data;
          // 返回自定义的tooltip内容
          return `adcode: ${adcode}<br>name: ${name}<br>data: ${data}`;
        }
      },
    },
    visualMap: {
      show: true,
      min: 0,
      max: 100,
      left: "left",
      top: "bottom",
      text: ["高", "低"], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [0],
      inRange: {
        color: ["#00467F", "#A5CC82"], // 蓝绿
      },
    },
    geo: {
      map: mapName,
      roam: true,
      select: false,
      // zoom: 1.6,
      // layoutCenter: ['45%', '70%'],
      // layoutSize: 750,
      // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
      selectedMode: "single",
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          areaColor: "#389BB7",
          borderColor: "#389BB7",
          borderWidth: 0,
        },
        label: {
          fontSize: 14,
        },
      },
    },
    series: [
      // 数据
      {
        type: "map",
        map: mapName,
        roam: true,
        geoIndex: 0,
        select: false,
        data: mapData,
      },
      {
        name: "散点",
        type: "scatter",
        coordinateSystem: "geo",
        data: mapData,
        itemStyle: {
          color: "#05C3F9",
        },
      },
      {
        name: "点",
        type: "scatter",
        coordinateSystem: "geo",
        symbol: "pin", //气泡
        symbolSize: function (val) {
          if (val) {
            return val[2] / 4 + 20;
          }
        },
        label: {
          show: true,
          formatter: function (params) {
            return params.data.data || 0;
          },
          color: "#fff",
          fontSize: 9,
        },
        itemStyle: {
          color: "#F62157", //标志颜色
        },
        zlevel: 6,
        data: mapData,
      },
      {
        name: "Top 5",
        type: "effectScatter",
        coordinateSystem: "geo",
        data: mapData.map((item) => {
          if (item.data > 60) return item;
        }),
        symbolSize: 15,
        showEffectOn: "render",
        rippleEffect: {
          brushType: "stroke",
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: true,
        },
        itemStyle: {
          color: "yellow",
          shadowBlur: 10,
          shadowColor: "yellow",
        },
        zlevel: 1,
      },
    ],
  };
};

const renderMapEcharts = async (mapName) => {
  const mapJson = await getMapJson(mapName);
  registerMap(mapName, mapJson);
  const mapdata = mapJson.features.map((item) => {
    const data = (Math.random() * 80 + 20).toFixed(0); // 20-80随机数
    const tempValue = item.properties.center ? [...item.properties.center, data] : item.properties.center;
    return {
      name: item.properties.name,
      value: tempValue, // 中心点经纬度
      adcode: item.properties.adcode, // 区域编码
      level: item.properties.level, // 层级
      data, // 模拟数据
    };
  });
  mapOption.value = setOptions(mapName, mapdata);
};

renderMapEcharts("100000_full"); // 初始化绘制中国地图

// 点击下砖
const handleClick = (param) => {
  // 只有点击地图才触发
  if (param.seriesType !== "map") return;
  const { adcode, level } = param.data;
  const mapName = level === "district" ? adcode : adcode + "_full";
  // 防止最后一个层级被重复点击，返回上一级出错
  if (mapList.value[mapList.value.length - 1] === mapName) {
    return ElMessage.warning({ content: "已经是最下层了", duration: 1000 });
  }
  mapList.value.push(mapName);
  renderMapEcharts(mapName);
};

// 点击返回上一级地图
const goBack = () => {
  const mapName = mapList.value[mapList.value.length - 2] || "100000_full";
  mapList.value.pop();
  renderMapEcharts(mapName);
};
</script>
