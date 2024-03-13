<template>
    <div class="box7">
        <div class="title">
            <p>年度遊客量對比</p>
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
            text: '散點圖',
            left: '40%',
            textStyle: {

                color: 'white',
            }
        },
        xAxis: {
            type: 'category',
            show: true,
        },
        yAxis: {
            show: false,
        },
        grid: {
            left: 20,
            top: 20,
            right: 0,
            bottom: 20,
        },
        series: [
            {
                type: 'scatter',
                data:[100,200,300,400,500,600,700] ,
                symbol: 'diamond',
                symbolSize: 14,
                // 圖例說明文、數字設置
                label: {
                    show: true,
                    position: 'top',
                    color: 'skyblue',
                },
                // 圖標圖形細節設置
                itemStyle: {
                    color:'yellow'
                }
            },
        ]
    }
    mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box7 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

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