<template>
    <!-- 管理現有帳號的查詢、新增、修改、刪除 -->
    <el-card style="height:60px">
        <el-form :inline="true" class="form">
            <el-form-item label="使用者">
                <el-input placeholder="請輸入搜尋名稱" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true"
                    @click="search">搜尋現有使用者</el-button>
                <el-button type="primary" size="default" @click="reset">重置當前畫面</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="addUser">新增使用者</el-button>
        <el-button type="danger" size="default" :disabled="selectIdArr.length ? false : true"
            @click="deleteSelectUser">批量刪除</el-button>
        <!-- table展示使用者訊息 -->
        <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="使用者名稱" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="使用者暱稱" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="使用者角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="建立時間" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新時間" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button plain type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                    <el-button plain type="warning" size="small" icon="Edit" @click="updateUser(row)">編輯</el-button>

                    <el-popconfirm :title="`確定刪除 ${row.username}?`" width="260px" @confirm="deleteUser(row.id)">
                        <template #reference>
                            <el-button plain type="danger" size="small" icon="Delete">刪除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分頁器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
            @current-change="getHasUser" @size-change="handler" />
    </el-card>
    <!-- 抽屜結構1 新增新用戶帳號 編輯現有帳號訊息 -->
    <el-drawer v-model="drawer">
        <!-- 頭部標題  將來應是動態文字內容-->
        <template #header>
            <h4>{{ userParams.id ? '更新 使用者' : '新增 使用者' }}</h4>
        </template>
        <!-- 抽屜主體 -->
        <template #default>
            <!-- :model="userParams" 告訴form元件 把數據收集到了誰(userParams)身上 -->
            <!-- :rules="rules" 告訴form元件 開啟表單校驗功能 等號左側是開啟校驗功能的屬性名稱 等號左側是校驗規則集擺放位置-->
            <!-- ref="formRef" 取得form元件實例formRef(自訂名稱)以利後續操作 -->
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <!-- prop="username" 表示本輸入框與規則集建立關聯 在規則集rules內可找到username設定項 本輸入框接受檢查 檢查內容根據username設定項 -->
                <el-form-item label="使用者名稱" prop="username">
                    <el-input placeholder="請輸入使用者 名稱" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="使用者暱稱" prop="name">
                    <el-input placeholder="請輸入使用者 暱稱" v-model="userParams.name"></el-input>
                </el-form-item>
                <!-- v-if="!userParams.id" 如有id(修改)隱藏密碼欄位；如無id(新增)顯示密碼欄位-->
                <el-form-item label="使用者密碼" prop="password" v-if="!userParams.id">
                    <el-input placeholder="請輸入密碼" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button plain type="primary" @click="cancel">放棄變更</el-button>
                <el-button plain type="warning" @click="save">確認並儲存變更</el-button>
            </div>
        </template>
    </el-drawer>
    <!-- 抽屜結構2 使用者某個已有帳號進行角色分配 -->
    <el-drawer v-model="drawer1">
        <!-- 抽屜頭部 -->
        <template #header>
            <h4>分配角色(職位)</h4>
        </template>
        <!-- 抽屜主體 -->
        <template #default>
            <el-form>
                <el-form-item label="使用者名稱">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="職位列表">
                    <!-- 全選框 -->
                    <el-checkbox @change="handleCheckAllChange" v-model="checkAll"
                        :indeterminate="isIndeterminate">全選</el-checkbox>

                    <!-- 顯示職位複選框 -->
                    <el-checkbox-group v-model="userRole" @change="handleCheckedRoleChange">
                        <el-checkbox v-for="(role) in allRole" :key="role.id" :label="role">{{ role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <!-- 抽屜底部 -->
        <template #footer>
            <div style="flex: auto">
                <el-button type="primary" plain @click="drawer1 = false">放棄變更</el-button>
                <el-button type="warning" plain @click="confirmClick">確認並儲存變更</el-button>
            </div>
        </template>
    </el-drawer>
</template>
    
<script setup lang='ts'>
import useLayOutSettingStore from '@/store/modules/setting'
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqSelectUser, reqRemoveUser, reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole } from "@/api/acl/user/index";
import type { SetRoledata, UserResponseData, Records, User, AllRoleResponseData, AllRole } from "@/api/acl/user/type"
import { ElMessage } from 'element-plus';
// 默認頁碼
let pageNo = ref<number>(1)
// 每頁展示資料筆數
let pageSize = ref<number>(5)
// 使用者總數量
let total = ref<number>(0)
// 存儲全部使用者數據
let userArr = ref<Records>([])
// 響應式數據 控制抽屜顯示與隱藏
let drawer = ref<boolean>(false)
// 控制分配角色 抽屜顯示與隱藏
let drawer1 = ref<boolean>(false)
// 取得全部職位數據
let allRole = ref<AllRole>([])
// 當前使用者已有職位
let userRole = ref<AllRole>([])
// 收集用戶訊息(帳號、密碼)的響應式訊息
let userParams = reactive<User>({
    username: '',
    name: '',
    password: '',
})
// 準備一個陣列存儲批量刪除用戶的ID
let selectIdArr = ref<User[]>([])
// 取得form元件實例
let formRef = ref<any>()
// 定義 尋找使用者 按鈕的響應式數據:收集用戶輸入的搜尋關鍵字
let keyword = ref<string>('')
// 取得模板setting倉庫
let settingStore = useLayOutSettingStore()
// 元件掛載完畢
onMounted(() => {
    getHasUser()
})
// 取得全部已有使用者訊息
const getHasUser = async (pager = 1) => {
    // 收集當前頁碼
    pageNo.value = pager
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
    // console.log('result', result);
    if (result.code == 200) {
        total.value = result.data.total
        userArr.value = result.data.records
    }
}
// 下拉選單自訂義事件(位置 每頁顯示資料筆數功能)
const handler = () => {
    getHasUser()
}
// 點擊 新增使用者 按鈕
const addUser = () => {
    // 點擊按鈕後 顯示抽屜
    drawer.value = true
    // 每次打開抽屜 先清空輸入框前次數據
    Object.assign(userParams, {
        // id: 0,
        username: '',
        name: '',
        password: '',
    })
    // (渲染表單元件第2次及第2次以後有效)清除前一次驗證錯誤產生的提示訊息
    // (為應渲染表單元件第1次時也使清除功能生效，搭配使用nextTick取得表單元件)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
// 點擊 編輯 按鈕
// row所存內容相當於 已有用戶帳號訊息userArr所存內容
const updateUser = (row: User) => {
    // 點擊按鈕後 顯示抽屜
    drawer.value = true
    // console.log(row);
    // 收集已有的帳號訊息
    // userParams的內容(屬性名、值)會替換成row的內容(屬性名、值)
    Object.assign(userParams, row)
    // (渲染表單元件第2次及第2次以後有效)清除前一次驗證錯誤產生的提示訊息
    // (為應渲染表單元件第1次時也使清除功能生效，搭配使用nextTick取得表單元件)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}
// 點擊 新增使用者 確認變更 按鈕
const save = async () => {
    // 點擊 保存按鈕後,務必保證表單全部內容符合校驗條件後,才發送請求
    await formRef.value.validate();

    // 點擊保存按鈕:新增新用戶|更新已有用戶帳號訊息
    let result: any = await reqAddOrUpdateUser(userParams)
    // console.log('result', result);
    if (result.code == 200) {
        // 關閉抽屜
        drawer.value = false
        // 提示訊息
        ElMessage({ type: 'success', message: userParams.id ? '更新 成功' : '新增 成功' })
        // 取得最新的全部使用者訊息
        // userParams.id ? pageNo.value:1 如有id(修改後,畫面留在當前頁pageNo.value)沒有id(新增後,畫面回到第1頁)
        // getHasUser(userParams.id ? pageNo.value:1)

        // 當登入人等於被修改人時(登入人修改自身當前帳號密碼等資訊)
        // 編輯用戶內容結束一刻,舊用戶名稱已不存在,應立刻退出到登入頁面重新輸入帳號密碼,以新的帳號密碼登入後台
        // 瀏覽器自動刷新一次(觸發請求攔截器)
        window.location.reload()
    } else {
        // 關閉抽屜
        drawer.value = false
        // 提示訊息
        ElMessage({ type: 'error', message: userParams.id ? '更新 失敗' : '新增 失敗' })
    }
}
// 點擊 新增使用者 放棄變更 按鈕
const cancel = () => {
    // 關閉抽屜
    drawer.value = false
}
// 校驗使用者 名稱
// rule 規則物件, value 表單元素的文字內容, callback 回調函數
const validatorUsername = (_: any, value: any, callback: any) => {
    // console.log('value',value);
    // 使用者 名稱 的長度5位或以上
    if (value.trim().length >= 5) {
        // 通過條件 校驗放行
        callback()
    } else {
        callback(new Error('名稱 的長度5位或以上'))
    }
}
// 校驗使用者 暱稱
// rule 規則物件, value 表單元素的文字內容, callback 回調函數
const validatorName = (_: any, value: any, callback: any) => {

    // 使用者 暱稱 的長度5位或以上
    if (value.trim().length >= 5) {
        // 通過條件 校驗放行
        callback()
    } else {
        callback(new Error('暱稱 的長度5位或以上'))
    }
}
// 校驗使用者 密碼
// rule 規則物件, value 表單元素的文字內容, callback 回調函數
const validatorPassword = (_: any, value: any, callback: any) => {

    // 使用者 密碼 的長度6位或以上
    if (value.trim().length >= 5) {
        // 通過條件 校驗放行
        callback()
    } else {
        callback(new Error('密碼 的長度6位或以上'))
    }
}
// 表單校驗規則物件
const rules = {
    // required 校驗?或不校驗?
    // trigger 如開啟校驗 校驗時機
    // validator 校驗步驟、校驗內容
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    name: [{ required: true, trigger: 'blur', validator: validatorName }],
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
// 點擊 分配角色 按鈕
const setRole = async (row: User) => {
    // console.log('row', row);
    // 存儲已有使用者訊息
    Object.assign(userParams, row)
    // console.log('userParams.id', userParams.id);

    // 取得全部職位 當前帳號所擁有職位
    let result: AllRoleResponseData = await reqAllRole((userParams.id as number))
    console.log('result', result);
    if (result.code == 200) {
        // 存儲全部職位
        allRole.value = result.data.allRolesList
        // 存儲當前用戶已有職位
        userRole.value = result.data.assignRoles
        // 展示抽屜
        drawer1.value = true
    }
}
// 點擊 分配角色後 收集頂部複選框全選數據
const checkAll = ref<boolean>(false)
// 點擊 分配角色後 控制頂部全選複選框 部分勾選 樣式
const isIndeterminate = ref<boolean>(true)
// 點擊 分配角色後 頂部的全部複選框的change事件
const handleCheckAllChange = (val: boolean) => {
    // val:true(全選)|false(沒有全選)
    // console.log('val', val);
    userRole.value = val ? allRole.value : []
    // 部分勾選樣式 (與確定樣式來回切換)
    isIndeterminate.value = false
}
// 點擊 分配角色後 頂部的全部複選框的change事件
const handleCheckedRoleChange = (value: string[]) => {
    // console.log('value', value);
    // 頂部複選框的勾選數據
    // 如主動勾選項目與全部職位數量相等,則頂部全選框勾上
    checkAll.value = value.length === allRole.value.length
    // 部分勾選
    isIndeterminate.value = value.length !== allRole.value.length
}
// 點擊 分配角色 確定按鈕
const confirmClick = async () => {
    // 蒐集參數
    let data: SetRoledata = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => {
            return (item.id as number)
        })
    }
    // console.log('data', data);
    // 分配使用者職位
    let result: any = await reqSetUserRole(data)
    if (result.code == 200) {
        // 提示訊息
        ElMessage({ type: 'success', message: '分配職務成功' })
        // 關閉抽屜
        drawer1.value = false
        // 更新完畢後 取得使用者訊息 畫面留在當前頁
        getHasUser(pageNo.value)
    }
}
// 點擊 刪除(單個使用者)
const deleteUser = async (userId: number) => {
    let result: any = await reqRemoveUser(userId)
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '刪除 成功' })
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
        // 112 用户删除业务
        // 8: 35處
    }

}
// table複選框勾選時觸發的事件
const selectChange = (value: any) => {
    // 此處value相當於每個被勾選的資料(以名、值對的物件形式儲存在value中),
    // console.log(value);
    selectIdArr.value = value
}
// 點擊 批量刪除 按鈕
const deleteSelectUser = async () => {
    // 整理 批量刪除 參數
    // 陣列方法map中的區域變數item相當於selectIdArr.value裡的每一個子元素
    let idsList: any = selectIdArr.value.map(item => {
        return item.id
    })
    // 批量刪除請求
    let result: any = await reqSelectUser(idsList)
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '批量刪除 成功' })
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
        // 112 用户删除业务
        // 8: 35處
    }

}
// 點擊 搜尋現有使用者 按鈕
const search = () => {
    // 根據關鍵字 取得對應用戶數據
    getHasUser()
    // 清空關鍵字
    keyword.value = ''
}
// 點擊 重置當前畫面 按鈕(原理 銷毀並重新掛載當前元件user)
const reset = () => {
    // 狀態置反
    settingStore.refsh = !settingStore.refsh
}

// 測試 人為勾選 畫面中對應職位 應展示已供選
// const cities = ['超级管理员', '项目经理1', 'ceo', '前端1','架构师1','后端','行政','测试','test前端', '123','123123','11']
</script>
    
<style scoped>
.form {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
}
</style>