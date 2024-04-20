import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入SVG需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({ command,mode }) => {
  // 取得各種環境下對應的變數
  // 語法解析：載入某環境(某環境目錄位址)
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    viteMockServe({
      // enable: true,
      localEnabled: command === 'serve',//保證開發階段可以使用mock接口
    }),
    ],
    base: "project"
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // scss全局變數配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 代理跨域
    server: {
      proxy: { 
        [env.VITE_APP_BASE_API]: {
        // '/api': {
          // 取得數據的伺服器地址設置
          target: env.VITE_SERVE,
          // target: 'http://sph-api.atguigu.cn',
          // 需要代理跨域
          changeOrigin: true,
          // 路徑重寫
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})
