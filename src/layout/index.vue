<template>
    <div class="layout_container">
        <!-- 左側導航 -->
        <div class="layout_slider">
            <!-- 左側導航頂端logo -->
                <Logo :showMenu="showMenu"></Logo>
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
// isShow參數控制選單elmenu節點的展示與隱藏
let isShow = ref(false)

const showMenu = () => {
    // console.log('elmenu', elmenu);
    isShow.value = !isShow.value
    // 如isShow.value為true,隱藏elemenu;如isShow.value為false,顯示elemenu
    isShow.value ? elmenu.value.style.display = 'block' : elmenu.value.style.display = 'none'
    // console.log('我是父元件Layout的showMenu函數');
}
// 當前網頁顯示區(視口)寬度
window.onresize = () => {
    // console.log('event', event);
    // 視口寬大於等於平板寬度以上時，使選單導航節點elmenu第一時間出現
    if (window.innerWidth >= 997) {
        elmenu.value.style.display = 'block'
    } else {
        // 視口寬低於平板寬度以下時，使選單導航節點elmenu第一時間隱藏
        elmenu.value.style.display = 'none'
    }
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
        height: 100%;
        display: flex;
        flex-direction: column;

        // 左側選單區
        .layout_slider {
            color: white;
            width: 100%;
            height: 100%;
            background: $base-menu-background;
            transition: all 1s;

            .scrollbar {
                width: 100%;
                height: 100%;

                .elmenu {
                    border-right: none;
                    margin-right: -1px;
                    display: none;
                    transition: all 1s;
                }
            }
        }

        // 上側導航區
        .layout_tabbar {
            position: relative;
            width: 100%;
            height: 100%;
            left: 0px;
            transition: all 1s;
            margin-top: 20px;

            &.fold {
                width: 100%;
                left: 0px;
            }
        }

        .layout_main {
            position: relative;
            width: 100%;
            height: 100%;
            left: 0px;
            padding: 20px;
            transition: all 1s;

            &.fold {
                width: 100%;
                left: 0px;
            }

        }
    }
}
</style>