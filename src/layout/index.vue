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
                <div class="elmenu" ref="elmenu">
                    <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="$route.path"
                        background-color="#001529" text-color="white">
                        <!-- 根據路由動態生成選單 -->
                        <Menu :menuList="userStore.menuRoutes"></Menu>
                    </el-menu>
                </div>
                <!-- RWD選單區 -->
                <section class="mmenu">
                    <!-- 漢堡圖標 -->
                    <button id="hamburger-button" class="ham" v-on:click="switchMenu">
                        <!-- &#9776; -->
                        <div class="ham-dash"></div>
                        <div class="ham-dash"></div>
                        <div class="ham-dash"></div>
                    </button>
                    <!-- RWD選單導航區 -->
                </section>
            </el-scrollbar>
        </div>
        <!-- 頂部導航-右上 -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!-- layout元件的頂部導航Tabbar -->
            <Tabbar />
        </div>
        <!-- 內容展示區-右下 -->
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
import { ref } from 'vue'
let userStore = useUserStore()
// 取得layout配置相關的倉庫
let LayOutSettingStore = useLayOutSettingStore()
// 取得路由物件
let $route = useRoute()
// 取得選單DOM節點展示與隱藏
let elmenu = ref()
// flag參數控制選單DOM節點展示與隱藏
let isShow = ref(true)
const switchMenu = () => {
    // console.log('elmenu', elmenu);
    isShow.value = !isShow.value
    isShow.value ? elmenu.value.style.display = 'none' : elmenu.value.style.display = 'block'
}

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

    // 左側選單區
    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        // 滾動條
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }


    }

    // 上側導航區
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

// RWD viewport在平板或以下時
@media only screen and (max-width: 996px) {
    .layout_container {
        width: 100%;
        // height: 100vh;
        height: 100%;
        display: flex;
        flex-direction: column;

        // 左側選單區
        .layout_slider {
            color: white;
            // width: $base-menu-width;
            width: 100%;
            height: 100%;
            background: $base-menu-background;
            transition: all 1s;
            // flex: 1;

            .scrollbar {
                width: 100%;
                // height: calc(100vh - $base-menu-logo-rwd-height);
                height: 100%;

                .elmenu {
                    border-right: none;
                    margin-right: -1px;
                    display: none;
                }


            }
        }

        // 上側導航區
        .layout_tabbar {
            position: relative;
            // width: calc(100% - $base-menu-width);
            width: 100%;
            // height: $base-tabbar-height;
            height: 100%;
            // background-color: deepskyblue;
            // top: 0px;
            // left: $base-menu-width;
            left: 0px;
            transition: all 1s;
            margin-top: 20px;

            &.fold {
                // width: calc(100vw - $base-menu-min-width);
                width: 100%;
                // left: $base-menu-min-width;
                left: 0px;
            }
        }

        .layout_main {
            position: relative;
            // width: calc(100% - $base-menu-width);
            width: 100%;
            // height: calc(100vh - $base-tabbar-height);
            height: 100%;
            // left: $base-menu-width;
            left: 0px;
            // top: $base-tabbar-height;
            padding: 20px;
            // overflow: auto;
            transition: all 1s;

            &.fold {
                // width: calc(100vw - $base-menu-min-width);
                width: 100%;
                // left: $base-menu-min-width;
                left: 0px;
            }

        }
    }
}

.mmenu {
    // background-color: yellow;
    max-width: 56rem;
    height: 100px;
    // margin: 0px auto;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    // justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    transition: all 1s;

    .ham {
        background-color: transparent;
        width: 100%;
        height: 100%;
        // margin: 0px auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border: none;
        cursor: pointer;
        @media only screen and (min-width: 996px) {
            transition: all 1s;
            display: none;
        }
        .ham-dash {
            background-color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin: 0px 10px;
            align-items: center;
            transition: all 1s;
        }

    }

}
</style>