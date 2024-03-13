<template>
    <div class="box4" ref="map">我是地圖元件</div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引入地圖數據
// import taiwanJson from './taiwan.json'
import chinaJson from './china.json'
// 取得圖形圖標的DOM節點
let map = ref()
// 註冊地圖
echarts.registerMap('china', (chinaJson as any))
onMounted(() => {
    let mychart = echarts.init(map.value)
    // 設定配置項
    mychart.setOption({
        // 地圖元件
        geo: {
            map: 'china',
            // 游標滾輪縮放地圖
            roam: true,
            left: 50,
            top: 100,
            right: 50,
            bottom: 50,
            // 地圖上文字設定
            label: {
                show: true,//文字顯示
                color: 'white',
                fontSize: 16,
            },
            itemStyle: {
                // 每一多邊形樣式
                color: // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'purple' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'blue' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }

            },
            // 地圖高亮效果
            emphasis: {
                itemStyle: {
                    color: 'pink',
                },
            }
        },
        // 布局位置
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
        // 圖形系列 地理資訊
        series: [
            {
                type: 'lines',//航線的系列
                data: [
                    // 座標組1
                    {
                        // 起終點座標1
                        coords: [
                            [116.405285, 39.904989],//起點
                            [119.306239, 26.075302]//終點
                        ],
                        lineStyle: {
                            // 線色彩
                            color: 'orange',
                            // 線寬
                            width: 5
                        }
                    },
                    // 座標組2
                    {
                        // 起終點座標2
                        coords: [
                            [121.509062, 25.044332],
                            [114.173355, 22.320048]

                        ],

                        lineStyle: {
                            color: 'orange',
                            width: 5
                        }
                    },
                    // 座標組3
                    {
                        // 起終點座標3
                        coords: [
                            [116.405285, 39.904989],
                            [104.065735, 30.659462]

                        ],

                        lineStyle: {
                            color: 'orange',
                            width: 5
                        }
                    },
                    // 座標組4
                    {
                        // 起終點座標4
                        coords: [
                            [91.132212, 29.660361],
                            [112.982279, 28.19409]
                        ],
                        lineStyle: {
                            color: 'orange',
                            width: 5
                        }
                    },
                    // 座標組5
                    {
                        // 起終點座標5
                        coords: [
                            [87.617733, 43.792818],
                            [126.642464, 45.756967]
                        ],
                        lineStyle: {
                            color: 'orange',
                            width: 5
                        }
                    },
                ],
                // 開啟動畫特效
                effect: {
                    show: true,
                    symbol: 'arrow',//動畫圖標
                    symbolSize: 30,//圖標大小'
                    color: 'skyblue',//圖標顏色
                    roundTrip:true,
                },
                lineStyle: {
                    curveness: 0.1,
                    type:'dashed'
                }
            },

        ]

    })
})
</script>

<style scoped lang="scss"></style>