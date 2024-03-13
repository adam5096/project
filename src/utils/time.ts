// 封裝一個函數:取得一個結果:當前早上、下午、晚上
export const getTime = () => {
  let message = ''
  // 原生(指令)的意思:在程式編輯軟體安裝完畢後，零安裝任何外部js插件，就能現用的js指令
  // 通過原生js的構造函數Date(應該是Object原型內的方法)
  const hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  // console.log('message', message);

  return message
}
