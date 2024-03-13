<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="圖片">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" alt="圖片">
            </div>
            <div class="woman">
                <img src="../../images/woman.png" alt="圖片">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>
    
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 取得圖形圖標的DOM節點
let charts = ref()
onMounted(() => {
    // 取得echarts類的實例(命名為mycharts)
    let mycharts = echarts.init(charts.value)
    // 設定實例配置項
    mycharts.setOption({
        // 標題元件
        title: {
            text: '比例圖',
            textStyle: {
                color: 'skyblue'
            },
            left: '40%',
        },
        // x軸元件 y軸元件
        xAxis: {
            show: false,
            min: 0,
            max:100,
        },
        yAxis: {
            show: false,
            // 在y籌方向上均勻分布
            type:'category'
        },
        series: [
            // 男士資料設置
            {
                type: 'bar',
                data: [58],
                barWidth: 25,
                z: 100,//z軸方向(指出螢幕)圖層層級設為100
                itemStyle: {
                    color: 'skyblue',
                    borderRadius:20,
                },
                
            },
            // 女士資料設置
            {
                type: 'bar',
                data: [100],
                barWidth: 25,
                // 調整女士柱條位置
                barGap: '-100%',
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20,
                },
            },
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
.box1 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;
    .title {
        margin-left: 20px;
        p {
            color: white;
            font-size: 20px;
        }
    }
    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/man-bg.png');
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .woman {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/woman-bg.png');
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
    }
    .charts {
        height: 100px;
    }
}
</style>