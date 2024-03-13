<template>
    <div class="box6">
        <div class="title">
            <p>熱門景區排行榜</p>
            <img src="../../images/dataScreen-title.png" alt="圖片">
        </div>
        <!-- 圖形圖表容器 -->
        <div class="charts" ref="charts">

        </div>
    </div>

</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 取得圖形圖標的DOM節點
let charts = ref()
onMounted(() => {
    // 一個容器可同時展示多種類型圖形圖標
    // 取得echarts實例(操作起手)
    let mychart = echarts.init(charts.value)
    let option = {
        title: {
            show: true,
            text: '景區排行',
            link: 'https://chat.openai.com/',
            left: '50%',
            textStyle: {
                color: 'yellowgreen',
                fontSize: 20,
            },
            // 子標題
            subtext: '各大景區',
            subtextStyle: {
                color: 'yellowgreen',
                fontSize: 12,
            }
        },
        xAxis: {
            type: 'category',//圖形在x軸上均勻分布
        },//x軸設置
        yAxis: {},//y軸設置
        // 圖表位置、布局
        grid: {
            left: 20,
            bottom: 20,
            right: 20,
        },
        //系列:設定要顯示的圖表種類
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60, 70],
                // 柱狀圖的圖標文字設定
                label: {
                    show: true,
                    position: 'top',//文字出現位置
                    color: 'yellowgreen',
                },
                showBackground: true,//柱狀圖背景顏色
                backgroundStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'black' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 預設為 false
                    },
                },
                itemStyle: {
                    borderRadius: [10, 10, 0, 0],
                    color: function (data:any) {
                        // 給每一個住條設置專屬背景色
                        let arr=['red','orange','yellow','green','blue','deepskyblue','purple']
                        return arr[data.dataIndex];
                    }
                }
            },
            {
                type: 'line',
                data: [10,20,30,40,50,60,90],
                smooth: true,//線圖轉折點平滑
                
            },
            
        ],
        // 懸浮提示設置
        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.7)'
        }
    }
    // 啟用配置項(此語法配置靈活度較高)
    mychart.setOption(option)
})
</script>

<style scoped lang="scss">
.box6 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;

    .title {
        margin-left: 5px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>