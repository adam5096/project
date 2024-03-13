<template >
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首頁</span>
        </div>
        <div class="center">
            <div class="title">智慧旅遊視覺化大數據平台</div>
        </div>
        <div class="right">
            <span class="rbtn">統計報告</span>
            <span class="time">當前時間:{{ time }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted,onBeforeUnmount} from 'vue'
// 引入時間功能函式庫
import moment from 'moment'
// 點擊首頁按鈕回首頁
import { useRouter } from 'vue-router'
// 取得路由器物件
let $router = useRouter()
// 存儲當前時間
let time = ref(moment().format('YYYY年MM月DD日:hh-mm-ss'))
let timer = ref(0)
// 點擊首頁按鈕
const goHome = () => {
    $router.push('/home')
}
// Top元件掛載完畢更新當前時間
onMounted(() => {
    timer.value =  setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日:hh-mm-ss')
    },1000)
})
// Top元件銷毀前清空定時器內任務
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>
<style scoped lang="scss">
.top {
    width: 100%;
    height: 40px;
    display: flex;

    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            width: 150px;
            height: 40px;
            float: right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;
        }
    }

    .right {
        flex: 1.5;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rbtn {
            width: 150px;
            height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            float: left;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
        .time{
            color: #29fcff;
            font-size: 20px;

        }
    }
}
</style>