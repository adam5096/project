<template>
    <el-button size="large" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="large" icon="FullScreen" circle @click="fullScreen"></el-button>

    <el-popover placement="bottom" title="主題設定" :width="300" trigger="click">
        <!-- 表單元素 -->
        <el-form>
            <el-form-item label="主題顏色">
                <el-color-picker @change="setColor" size="small" v-model="color" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" inline-prompt size="small" active-icon="Moon"
                    inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="large" icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" style="width:40px;height:40px;margin: 0px 10px;border-radius: 50%;">
    <!-- 下拉選單 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出後台</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 取得骨架的小倉庫
import useLayOutSettingStore from '@/store/modules/setting.ts'
// 取得使用者相關小倉庫
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 取得路由器物件
let $router = useRouter()
// 取得路由物件
let $route = useRoute()
// 收集開關數據
let dark = ref<boolean>(false)
let layoutSettingStore = useLayOutSettingStore()
// 


// 刷新按鈕點擊callback
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh;
}
// 全螢幕按鈕點擊callback
const fullScreen = () => {
    // DOM物件的一個屬性，可以用來判斷當前元素是否為全銀幕模式(全螢幕:true,其他模式:false)
    let full = document.fullscreenElement;
    // 切換全螢幕邏輯
    if (!full) {
        // 文檔根節點方法實現全螢幕模式
        document.documentElement.requestFullscreen();
    } else {
        // 如果已經全螢幕後再點擊，退出全螢幕
        document.exitFullscreen();
    }
}
// 退出後台點擊callback
const logout = async () => {
    // 第一件事情:需要向伺服器發送請求[退出後台接口]
    // 第二件事情:倉庫當中關於使用者相關的數據清空[token|username|avatar]
    // 第三件事情:路由跳轉到登入頁面
    await userStore.userLogout()
    // 跳轉到登入頁面
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
// 顏色元件需要的數據
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
// switch開關的change事件進行暗黑模式切換
const changeDark = () => {
    // 取得HTML根節點
    let html = document.documentElement
    // console.log('html', html);
    // 判斷HTML標籤是否有類名dark
    dark.value ? html.className = 'dark' : html.className = ''

}
// 主題顏色設置
const setColor = () => {
    // console.log(123);
    // 通過JS修改根結點樣式物件的屬性與值
    const html = document.documentElement
    // console.log('html.style', c);
    html.style.setProperty('--el-color-primary', color.value)
}
</script>
    
<script lang="ts">
export default {
    name: 'Setting'
}
</script>
<style></style>