<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="用戶頭像" class="avatar">
            <div class="bottom">
                <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
                <p class="subtitle">甄選運營平台</p>
            </div>
        </div>
    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
</template>
<script setup lang="ts">
// 引入用戶相關倉庫,取得當前用戶頭像、暱稱
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
// 取得存儲用戶訊息的倉庫物件
let userStore = useUserStore()

</script>
<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom {
        margin-left: 20px;

        .title {
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 30px;
        }

        .subtitle {
            font-style: italic;
            color: deepskyblue;
        }
    }
}

.bottoms {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
