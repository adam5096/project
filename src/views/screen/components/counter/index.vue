<template>
    <div class="box8">
        <div class="title">
            <p>遊客預約途徑來源統計</p>
            <img src="../../images/dataScreen-title.png" alt="圖片">
        </div>
        <!-- 圖形圖表容器 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 取得圖形圖標的DOM節點
let charts = ref()
onMounted(() => {
    let mychart = echarts.init(charts.value)
    let option = {
        title: {
            text: '雷達圖',
            left: '33%',
            textStyle:{
                color:'white',
            }
        },
        
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '消費', max: 6500 },
                { name: '好感', max: 16000 },
                { name: '通勤', max: 30000 },
                { name: '小吃', max: 38000 },
                { name: '偏好', max: 52000 },
                { name: '景點', max: 25000 }
            ]
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                    {
                        value: [4200, 3000, 20000, 35000, 50000, 18000],
                        name: 'Allocated Budget'
                    },
                    {
                        value: [5000, 14000, 28000, 26000, 42000, 21000],
                        name: 'Actual Spending'
                    }
                ]
            }
        ]
    };
    mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box8 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;

    .title {
        margin-left: 5px;

        p {
            color: white;
            font-size: 18px;
        }
    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>