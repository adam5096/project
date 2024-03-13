<template>
    <div class="box" ref="zoom">
        <div class="top">
            <p class="title">時實遊客統計</p>
            <p class="bg"></p>
            <p class="right">可預約總量<span>99999人</span></p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <!-- 將來Echarts展示圖形的節點 -->
        <div class="charts" ref="charts"></div>
        <!-- <button class="btn" v-on:click="big()">全螢幕</button> -->
    </div>
</template>
    
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引入水球圖拓展插件
import 'echarts-liquidfill'
let people = ref('216908人')
// console.log('echarts', echarts);
// 取得水球圖展示位置的節點
let charts = ref()
let zoom = ref()
onMounted(() => {
    // 取得echarts類的實例(命名為mycharts)
    let mycharts = echarts.init(charts.value)
    // 設定實例配置項
    mycharts.setOption({
        // 標題元件
        title: {
            text: '水球圖',
            textStyle: {
                color: 'skyblue'
            },
        },
        // x軸元件 y軸元件
        xAxis: {},
        yAxis: {},
        // 設置資料視覺化種類
        series: [
            {
                type: 'liquidFill',
                data: [0.8, 0.4, 0.2],
                radius: '100%',
            }
        ],
        // 佈局元件
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }

    })
})


</script>
    
<style scoped lang="scss">
.box {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url('../../images/dataScreen-title.png') no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        margin-top: 30px;
        display: flex;
        padding: 10px;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
        }
    }

    .charts {
        width: 100%;
        height: 250px;
    }
    
}
</style>