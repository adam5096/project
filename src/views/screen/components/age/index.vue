<template>
    <div class="box2">
        <div class="title">
            <p>年齡比例</p>
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
        // 標題元件
        title: {
            text: '圓餅圖',
            textStyle: {
                color: 'skyblue'
            },
        },
        tooltip: {
            trigger: 'item'
        },
        // 圖例相關設置
        legend: {
            top: 40,
            right: 30,
            orient: "vertical",//圖例元件方向設置
            textStyle: {
                color: 'white',
                fontSize:14,
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '90%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inside',
                    color:'white',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: true
                },
                data: [
                    { value: 1048, name: '財經' },
                    { value: 735, name: '感情' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娛樂' },
                    { value: 300, name: '體育' }
                ]
            }
        ],
        // 調整圖形圖表位置
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    };
    mychart.setOption(option)
})
</script>
    
<style scoped lang="scss">
.box2 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: 20px;
        p {
            color: white;
            font-size: 20px;
        }
    }
    .charts{
        height: 260px;
    }
}
</style>