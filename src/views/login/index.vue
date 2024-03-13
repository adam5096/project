<template >
    <div class="login_container">
        <!-- 我是1級路由login -->
        <el-row>

            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 登入表單開始 -->
                <!-- :model="loginForm" 新增model屬性，將表單上來自鍵、鼠的輸入資訊全部蒐集存放到loginForm物件內 -->
                <!-- :rules="rules" 新增rules屬性(等於號左側)，rules(等於號右側)存放規則校驗表單上的用戶輸入資訊 -->
                <el-form  class="login_form" :model="loginForm" :rules="rules" ref="loginFormss">
                    <h1>Hello</h1>
                    <h2>歡迎來到甄選項目</h2>
                    <!-- props="username" 新增props屬性，連動el-form父標籤內的:rules屬性，會找尋rules物件內對應的username表單校驗規則，進行發校驗 -->
                    <el-form-item  prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <!-- 解讀同props="username" -->
                    <el-form-item  prop="password">
                        <el-input :prefix-icon="Lock" v-model="loginForm.password" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登入</el-button>
                    </el-form-item>
                </el-form>
                <!-- 登入表單結束 -->

            </el-col>
        </el-row>

    </div>
</template>
<script setup lang="ts">
// 引入圖標元件
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入取得當前時間的函數
import { getTime } from '@/utils/time'
// 引入用戶相關的小倉庫
import useUserStore from '@/store/modules/user'
// import { errorMessages } from 'vue/compiler-sfc';
let useStore = useUserStore()
// 取得el-form元件
let loginFormss = ref()

// 取得路由器物件
let $router = useRouter()
// 取得路由物件
let $route = useRoute()
// 定義變數控制按鈕載入小圖效果
let loading = ref(false)//起始狀態false
// 蒐集帳號與密碼數據
let loginForm = reactive({
    username: 'admin',
    password: '111111',
    // password: 'atguigu123'
})


// 登入按鈕callback
const login = async () => {
    // 保證表單項目校驗全部通過後再發請求
    await loginFormss.value.validate()

    // 點擊登入按鈕一刻開始載入loading動畫
    loading.value = true;
    // 點擊登入按鈕後要做些甚麼?
    // 通知倉庫發送登入請求
    // 請求成功->首頁展示數據的地方(路由跳轉)
    // 請求失敗->彈出登入失敗訊息
    try {
        // 可以書寫.then語法
        // 確保登入成功
        await useStore.userLogin(loginForm)
        // 編程式導航跳轉首頁
        // 判斷登入時，路由路徑當中是否包含query參數，如果有就往query參數跳轉；沒有，就跳轉首頁
        let redirect: any = $route.query.redirect
        $router.push({ path: redirect || '/' })
        // 登入成功的提示訊息
        ElNotification({
            type: 'success',
            message: '登入成功',
            title: `HI,${getTime()}好`
        })
        // 登入成功後loading動畫消失
        loading.value = false
    } catch (error) {
        // 登入失敗loading動畫消失
        loading.value = false
        // 登入失敗提示訊息
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
    // console.log('result', result);

}
// 自訂義校驗規則函數validatorUserName
const validatorUserName = (_: any, value: any, callback: any) => {
    // rule是陣列校驗規則物件
    // value是表單元素的文字內容
    // callback函數:如果符合條件，放行通過
    // 如果不合條件，注入錯誤提示訊息

    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('帳號長度5位以上'))
    }

}
// 自訂義校驗規則函數validatorPassword
const validatorPassword = (_: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密碼長度6位以上'))
    }
}

// (校驗規則在此)定義表單校驗需要的配置物件
const rules = {
    // username校驗規則
    // required: true子規則必須校驗
    // message提示訊息
    // trigger: 'blur'當輸入框元素失去焦點時觸發本條子規則
    // min:文字長度最短位數
    // max:文字長度最長位數
    // trigger: 'change'當輸入框內容發生改變時觸發本條子規則
    username: [
        // { required: true, message: '必需填帳號,不得留白', trigger: 'blur' },
        // { required: true, min: 6, max: 10, message: '帳號長度6~10位', trigger: 'change' }

        // 自訂義校驗規則
        { trigger: 'change', validator: validatorUserName }
    ],
    // 解讀同username校驗規則
    password: [
        // { required: true, min: 6, max: 15, message: '密碼長度6~15位', trigger: 'change' }
        { trigger: 'change', validator: validatorPassword }
    ],
}

</script>
<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;

        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }

    }
}
</style>
