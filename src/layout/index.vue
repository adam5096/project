<template>
    <div class="layout_container">
        <!-- 左側導航 -->
        <div class="layout_slider">
            <!-- 左側導航頂端logo -->
            <Logo />
            <!-- 展示左側導航區 -->
            <!-- 滾動元件 -->
            <el-scrollbar class="scrollbar">
                <!-- 選單元件 -->
                <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="$route.path"
                    background-color="#001529" text-color="white">
                    <!-- 根據路由動態生成選單 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 頂部導航 -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!-- layout元件的頂部導航Tabbar -->
            <Tabbar />
        </div>
        <!-- 內容展示區 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!-- <router-view></router-view> -->
            <Main></Main>
        </div>
    </div>
</template>
<script setup lang="ts">
// 取得路由器物件
import { useRoute } from 'vue-router'
// 引入主頁左側導航logo子元件
import Logo from './logo/index.vue'
// 引入主頁左側導航Menu子元件
import Menu from './menu/index.vue'
// 引入主頁右側內容展示區元件
import Main from './main/index.vue'
// 引入主頁頂部元件
import Tabbar from './tabbar/index.vue'
// 取得使用者相關的小倉庫
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting.ts'

let userStore = useUserStore()
// 取得layout配置相關的倉庫
let LayOutSettingStore = useLayOutSettingStore()

// 取得路由物件
let $route = useRoute()


</script>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }


    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        // background-color: deepskyblue;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }

    }
}

// @media screen and (max-width: 768px) {
//     .layout_slider {
//         width: 100%;
//     }

//     .layout_tabbar {
//         display: none;
//     }

//     .layout_main {
//         width: 100%;
//         top: 0px;
//     }
// }

// @media screen and (min-width: 768px) and (max-width: 1024px) {
//     .layout_slider {
//         width: 50%;
//     }

//     .layout_tabbar {
//         width: 50%;
//     }

//     .layout_main {
//         width: 50%;
//     }
// }

// @media screen and (min-width: 1024px) {
//     .layout_slider {
//         width: 20%;
//     }

//     .layout_tabbar {
//         width: 80%;
//     }

//     .layout_main {
//         width: 80%;
//     }
// }

// // ===================

// @media screen and (max-width: 768px) {
//     .layout_main {
//         width: 100%;
//         padding: 10px;
//     }
// }

// @media screen and (min-width: 768px) and (max-width: 1024px) {
//     .layout_main {
//         width: 50%;
//         padding: 20px;
//     }
// }

// @media screen and (min-width: 1024px) {
//     .layout_main {
//         width: 80%;
//         padding: 40px;
//     }
// }

// // ==================
// @media screen and (max-width: 768px) {
//     html {
//         font-size: 16px;
//     }
// }

// @media screen and (min-width: 768px) and (max-width: 1024px) {
//     html {
//         font-size: 18px;
//     }
// }

// @media screen and (min-width: 1024px) {
//     html {
//         font-size: 20px;
//     }
// }
</style>