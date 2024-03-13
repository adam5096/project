<template>
    <div class="box5">
        <div class="title">
            <p>未來一週遊客數量趨勢圖</p>
            <img src="../../images/dataScreen-title.png" alt="圖片">
        </div>
        <div class="charts" ref="line"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let line = ref()
// 取得圖形圖表節點
onMounted(() => {
    let mychart = echarts.init(line.value)
    // 設置配置項
    let option = {
        title: {
            // text: '遊客量趨勢圖'
        },
        // x|y軸
        xAxis: {
            type: 'category',
            // x軸兩側不留白
            boundaryGap: false,
            // 隱藏坐標軸分割線
            splitLine: {
                show: false
            },
            data: ['週一', '週二', '週三', '週四', '週五', '週六', '週日'],
            axisLine: {
                show: true
            },
            // 刻度
            axisTick: {
                show: true
            }
        },
        yAxis: {
            splitLine: {
                show: false
            },
            
            axisLine: {
                show: true
            },
            // 刻度
            axisTick: {
                show: true
            }
        },
        grid: {
            left: 40,
            top: 10,
            right: 30,
            bottom: 25
        },
        // 圖形系列
        series: [
            {
                type: 'line',
                data: // 维度X   维度Y   其他维度 ...
                    [123, 880, 349, 1499, 88, 910, 500],
                // 折線圖拐點(轉折點)平滑處理
                smooth: true,
                // 區域填充樣式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }
        ]
    }
    // 啟用配置項
    mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box5 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    margin: 0px 20px;

    .title {
        margin-left: 10px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 40px);
        
    }
}
</style>