import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      // 需要去解析的文件
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      // imports 指定自动引入的包位置（名）
      imports: ['vue', 'pinia', 'vue-router'],// 生成相应的自动导入json文件。
      eslintrc: {
        // 启用
        enabled: true,
        // 生成自动导入json文件位置
        filepath: './.eslintrc-auto-import.json',
        // 全局属性值
        globalsPropValue: true
      },
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        }),
        ElementPlusResolver()
      ]
    }),
    Components({
      // imports 指定组件所在目录，默认为 src/components
      dirs: ['src/components/', 'src/view/'],
      // 需要去解析的文件
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        TDesignResolver({ library: 'vue-next' }),
        ElementPlusResolver({
          sideEffect: true
        }),
        IconsResolver({
          prefix: "icon",
          customCollections: ["user", "home"]
        })
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        user: FileSystemIconLoader("src/assets/svg/user", svg =>
          svg.replace(/^<svg /, '<svg fill="currentColor"')
        ),
        home: FileSystemIconLoader("src/assets/svg/home", svg => 
          svg.replace(/^<svg /, '<svg fill="currentColor"')
        )
      },
      autoInstall: true
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
