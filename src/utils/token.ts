// 封裝本定存儲數據與讀取數據的方法

// 存儲數據
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
// 本地存儲取得數據
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')

  // 為應對登入api故障導致無法順利跳轉到首頁與其他後台相關路由元件,影響開發進度,
  // 故直接將server發放token值複製在此處使用,改寫成靜態token
  // return 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSkzJzcxT0lFKrShQsjI0MzQzMTK1NDGvBQApMebnIAAAAA.UG2Qj7F7ASMLBugNG67-wKs0Un6ORrneMkSdio0rKhX0o-fd6BC24T1gCzfVVtsNERPzs4Sjwz8JOyPfLazUSA'
}
// 本地存儲刪除數據
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
