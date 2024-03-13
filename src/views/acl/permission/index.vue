<template>
    <!-- <div class="box">
        <h1>選單管理</h1>
    </div> -->
    <!-- 角色關聯到權限相關設定 -->
    <!-- 管理每個權限對應的各模組(路由元件)能見度、各按鈕權限(增、刪、改、查開放操作與否)等統一打包設定 -->
    <el-table :data="PermissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column label="名稱" prop="name"></el-table-column>
        <el-table-column label="權限值" prop="code"></el-table-column>
        <el-table-column label="修改時間" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
            <!-- row相當於已有選單物件|按鈕數據PermissionArr -->
            <template #="{ row }">
                <!-- <span>{{ row }}</span> -->
                <el-button type="primary" @click="addPermission(row)" size="small" plain
                    :disabled="row.level == 4 ? true : false">{{ row.level == 3 ?
                        '新增功能' : '新增選單' }}</el-button>
                <el-button type="warning" @click="updatePermission(row)" size="small" plain
                    :disabled="row.level == 1 ? true : false">修改</el-button>
                        
                <el-popconfirm :title="`確定刪除 ${row.name} ?`" width="260px" @confirm="removeMenu(row.id)">
                    <template #reference>
                        <el-button @click="" type="danger" size="small" plain
                            :disabled="row.level == 1 ? true : false">刪除</el-button>
                    </template>
                </el-popconfirm>

            </template>
        </el-table-column>
    </el-table>

    <!-- 對話框元件 用於新增|修改已有選單數據結構 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '修改選單' : '新增選單'">
        <!-- 表單元件 用於收集新增與已有選單數據 -->
        <el-form>
            <el-form-item label="名稱">
                <el-input placeholder="請輸入要新增的 選單名稱" v-model="menuData.name"></el-input>
            </el-form-item>
            <el-form-item label="權限">
                <el-input placeholder="請輸入要新增的 權限值" v-model="menuData.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    確定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
    
<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
// 引入取得選單請求API
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
// 引入TS類型
import type { MenuParams, PermissionResponseData, PermissionList, Permission } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus';
// 存儲選單數據
let PermissionArr = ref<PermissionList>([])
// 控制對話框展示與隱藏
let dialogVisible = ref<boolean>(false)
// 點擊確定按鈕後 發送請求當中所攜帶的參數
let menuData = reactive<MenuParams>({
    code: '',
    level: 0,
    name: '',
    pid: 0,
})
// 路由元件permission一掛載完畢
onMounted(() => {
    getHasPermission()
})
// 取得選單數據
const getHasPermission = async () => {
    let result: PermissionResponseData = await reqAllPermission()
    // console.log('result', result);//數據卸貨區
    if (result.code == 200) {
        PermissionArr.value = result.data
    }
}
// 點擊 新增選單 按鈕
const addPermission = (row: Permission) => {
    // 清空數據
    Object.assign(menuData, {
        id: 0,
        code: '',
        level: 0,
        name: '',
        pid: 0,
    })
    // 展示對話框
    dialogVisible.value = true
    // console.log('row', row);
    // 收集想要新增的選單的level數值,因為新增的是"子"選單,所以數值是當前level值+1
    menuData.level = row.level + 1
    // 給誰新增子選單
    menuData.pid = (row.id as number)
}
// 點擊 修改 按鈕
const updatePermission = (row: Permission) => {
    // 展示對話框
    dialogVisible.value = true
    // 收集現有選單數據
    // menuData的屬性名、值跟隨row的屬性名、值(數量、名稱、數值這三要素在兩者間要一致)
    Object.assign(menuData, row)
}
// 點擊新增|修改按鈕後 點擊確定 按鈕
const save = async () => {
    // 發請求:新增子選單|更新某一個已有的選單數據
    let result: any = await reqAddOrUpdateMenu(menuData)
    // console.log('result', result);
    if (result.code == 200) {
        // 對話框隱藏
        dialogVisible.value = false
        // 
        ElMessage({ type: 'success', message: menuData.id ? '修改 成功' : '新增 成功' })
        // 新增後 再次取得最新選單數據
        getHasPermission()
    }

}
// 點擊刪除按鈕
const removeMenu = async(id:number) => {
    let result:any =  await reqRemoveMenu(id)
    if (result.code == 200) {
        // 提示訊息
        ElMessage({ type: 'success', message: '刪除 成功' })
        // 刪除後 取得最新全部選單數據
        getHasPermission()
    }
}
</script>
    
<style scoped>
/* .box{
        width: 100%;
        height: 400px;
        background-color: chocolate;
    } */
</style>