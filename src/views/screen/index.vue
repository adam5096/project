<template>
    <div class="container">
        <!-- 數據大屏展示內容區域 -->
        <div class="screen" ref="screen">
            <!-- 數據大坪頂部 -->
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="count"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
// 引入頂部子元件
import Top from './components/top/index.vue'
// 引入左側結構對應的三個子元件
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
// 引入中間結構兩個子元件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
// 引入結構右側三個子元件
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/counter/index.vue'

// 取得數據大平展示內容盒子的DOM元素節點
let screen = ref()
onMounted(() => {
    // translate(-50%,-50%) 定位點平移 
    // 被ref="screen"所關聯的div節點最左上角距離視口左側-50%的父元素寬度(向左移)
    // ...元素最左上角距離視口上側-50%的父元素高度(向上移)
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
// 定義大屏縮放比例
function getScale(w = 1920, h = 1080) {
    // window.innerWidth 當前設備 像素寬度
    const ww = window.innerWidth / w
    // window.innerHidth 當前設備 像素高度
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
}
// 監聽視口變化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        // 縮放基點
        transform-origin: left top;
    }

    .top {
        width: 100%;
        height: 40px;
    }

    .bottom {
        display: flex;

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-left: 40px;
            .rank{
                flex: 1.5;
            }
            .year{
                flex: 1;
            }
            .count{
                flex: 1.5;
            }
        }

        .left {
            flex: 1;
            height: 1040px;
            display: flex;
            flex-direction: column;

            .tourist {
                flex: 1.2;
            }

            .sex {
                flex: 1;

            }

            .age {
                flex: 1;
            }
        }

        .center {
            flex: 1.5;
            display: flex;
            flex-direction: column;

            .map {
                flex: 4;
            }

            .line {
                flex: 1;
            }
        }
    }
}
</style>