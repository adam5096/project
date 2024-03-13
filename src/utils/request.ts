//進行axios的2次封裝：使用請求與回應攔截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入使用者相關的倉庫
import useUserStore from '@/store/modules/user'
// 第1步，用axios物件的create方法，去創建axios實例
// (其他配置：基礎路徑、超時的時間)
const request = axios.create({
  // 基礎路徑
  baseURL: import.meta.env.VITE_APP_BASE_API, //基礎路徑會攜帶到每個請求前面位置
  timeout: 5000, //請求超時時間設置
})

// 第2步:request實例添加請求攔截器
request.interceptors.request.use((config) => {
  // 取得用戶相關的小倉庫:取得倉庫內部token,登入成功以後夾帶給伺服器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // config配置物件，headers屬性請求頭部，經常給伺服器端夾帶公共參數
  // console.log('config', config);

  return config
})

// 第3步:回應攔截器
request.interceptors.response.use(
  (response) => {
    // 請求資源成功callback
    // 簡化數據

    return response.data
  },
  (error) => {
    //請求資源失敗callback:處理HTTP網路錯誤
    // 定義一個變數，存儲網路錯誤訊息
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN 過期'
        break
      case 403:
        message = '無權存取'
        break
      case 404:
        message = '請求地址錯誤'
        break
      case 500:
        message = '伺服器出現問題'
        break

      default:
        message = '網路出現問題'
        break
    }
    // 提示錯誤訊息
    ElMessage({
      type: 'error',
      message,
    })
    // 返回一個promise物件中止promise鏈
    return Promise.reject(error)
  },
)

export default request
