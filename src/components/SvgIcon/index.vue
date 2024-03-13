<template>
    <!-- svg圖標外層容器節點 ，內部需要與use標籤結合使用-->
    <svg :style="{ width, height }">
        <!-- xlink : href執行使用哪個圖標,屬性值務必# icon-圖標名字 -->
        <!-- : fill屬性可以設定顏色 -->
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>
    
<script setup lang='ts'>
// 接收父組件傳遞過來的與圖標相關的參數
defineProps({
    // xlink:href屬性值的前綴
    prefix: {
        type: String,
        default: '#icon-'
    },
    // 提供使用的圖標名字
    name: String,
    // 接收父組件傳遞的圖標顏色
    color: {
        type: String,
        default: ''
    },
    // 接收父組件傳遞過來的圖標寬度
    width: {
        type: String,
        default: '16px'
    },
    // 接收父組件傳遞過來的圖標高度
    height: {
        type: String,
        default: '16px'
    },
})
</script>
    
<style scoped></style>
    