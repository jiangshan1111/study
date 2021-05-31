import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
export default defineConfig({
  plugins: [vue(),
  styleImport({
    libs: [{
      libraryName: 'ant-design-vue',
      esModule: true,
      resolveStyle: (name) => {
        return `ant-design-vue/es/${name}/style/css`;
      },
    }]
  })],
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
    },
    proxy: {
      "/proxy": {
        "target": "http://xxx.com",
        "changeOrigin": "true",
        "pathRewrite": {
          // "^/proxy": ""
        },
        // rewrite: path => path.replace(/^\/proxy/, '')
      }
    }
  }
})
