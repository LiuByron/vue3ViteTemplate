import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      resolver: [TDesignResolver({
        library: 'vue-next'
      })]
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    https: false, // 是否开启https
    port: 3000, // 端口号
    host: '0.0.0.0', // 监听所有地址
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 是否允许跨域
    proxy: {}
  },
  build: {
    target: 'es2015', // 设置最终构建的浏览器兼容目标
    sourcemap: false, // 构建后是否生成source map问件
    chunkSizeWarningLimit: 2000, // chunk大小警告的限制
    reportCompressedSize: false // 启用/禁用gzip压缩大小报告
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import(reference) "${resolve('src/style/variables.less')}";`,
        },
        math: 'strict',
        javascriptEnabled: true,
      },
    },
  },
});
