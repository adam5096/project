<template>
    <div class="logo" v-if="setting.logoHidden">

        <!-- RWD選單區 -->
        <section class="mmenu" v-on:click="showAni">
            <!-- 漢堡圖標 -->
            <button id="hamburger-button" class="ham" v-on:click="showMenu()">
                <div ref="ham_dash_1" class="ham-dash"></div>
                <div ref="ham_dash_2" class="ham-dash"></div>
                <div ref="ham_dash_3" class="ham-dash"></div>
            </button>
        </section>
        <img :src="setting.logo" alt="logo圖示 ">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang='ts'>
// 引入設定標題與logo配置文件
import setting from '@/setting'
import { ref } from 'vue'
// 接收來自父元件layout的ref參數elmenu
defineProps(['showMenu'])


// 取得漢堡icon節點
let ham_dash_1 = ref()
let ham_dash_2 = ref()
let ham_dash_3 = ref()

const showAni = () => {
    // console.log('elmenu', elmenu);
    ham_dash_1.value.classList.toggle('ham-dash-slash')
    ham_dash_2.value.classList.toggle('ham-dash-middle')
    ham_dash_3.value.classList.toggle('ham-dash-rev-slash')
    // console.log('我是switchMenu');
}

// window.onresize = () => {
//     if (window.innerWidth >= 997) {
//         elmenu.value.style.display = 'block'
//     } else {
//         // 視口寬低於平板寬度以下時，使選單導航節點elmenu第一時間隱藏
//         elmenu.value.style.display = 'none'
//     }
// }
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 40px;
        height: 40px;
        margin-left: 5px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}

// 漢堡圖標
.mmenu {
    // background-color: chocolate;
    width: 30px;
    height: $base-menu-logo-height;
    display: flex;
    flex-direction: row;
    // 彈性單元當前主軸對齊
    justify-content: center;
    // 彈性單元當前側軸對齊
    align-items: center;
    transition: all 1s;

    // 在視口寬度996px及以上時，漢堡icon隱藏
    @media only screen and (min-width: 996px) {
        display: none;
        // visibility: hidden;
    }

    .ham {
        background-color: transparent;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        transition: all 1s;

        .ham-dash {
            background-color: white;
            width: 30px;
            height: 2px;
            border-radius: 10px;
            margin: 4px;
            transition: all 0.7s;
        }



    }

    .ham-dash-slash {
        transform: translateY(6px) rotateZ(405deg);
        // height: 8px;
        padding: 2px;
    }

    .ham-dash-middle {
        display: none;
    }

    .ham-dash-rev-slash {
        transform: translateY(-6px) rotateZ(-405deg);
        // height: 8px;
        padding: 2px;
    }
}
</style>