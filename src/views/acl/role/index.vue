<template>
    <!-- 角色關聯到權限相關設定 -->
    <!-- 管理每個角色對應的權限名稱、分類等統一打包設定 -->
    <!-- 待新帳號落地,指派一個角色給該新帳號,相當於一次分配了多個對應權限給該帳號 -->
    <!-- <div class="box">
        <h1>角色管理</h1>
    </div> -->
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="職位搜尋">
                <el-input placeholder="請輸入職位搜尋關鍵字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" plain :disabled="keyword ? false : true"
                    @click="search">搜尋</el-button>
                <el-button type="primary" size="default" plain @click="reset">重置當前畫面</el-button>

            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" icon="Plus" plain @click="addRole">新增職位</el-button>
        <el-table border style="margin: 10px 0px;" :data="allRole">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="職位名稱" show-overflow-tooltip prop="roleName"></el-table-column>
            <el-table-column align="center" label="建立時間" show-overflow-tooltip prop="createTime"></el-table-column>
            <el-table-column align="center" label="更新時間" show-overflow-tooltip prop="updateTime"></el-table-column>
            <el-table-column align="center" label="操作" width="280px">
                <!-- 每一個row相當一個已有職位(資料型為物件) -->
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User" plain @click="setPermission(row)">分配權限</el-button>
                    <el-button type="warning" size="small" icon="Edit" plain @click="updateRole(row)">編輯</el-button>
                    <el-popconfirm :title="`確定刪除 ${row.roleName}?`" width="260px" @confirm="removeRole(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete" plain>刪除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 40]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total," :total="total"
            @current-change="getHasRole" @size-change="sizeChange" />
    </el-card>
    <!-- 新增職位與修改已有職位 結構:對話框 -->
    <el-dialog v-model="dialogVisible" :title="RoleParams.id ? '修改職位' : '新增職位'">
        <el-form :model="RoleParams" :rules="rules" ref="form">
            <el-form-item label="職位名稱" prop="roleName">
                <el-input placeholder="請輸入職位名稱" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" plain @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" size="default" plain @click="save">確定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屜元件:分配職位的菜單權限與按鈕權限 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配選單與按鈕權限</h4>
        </template>
        <template #default>
            <!-- 樹形控件 -->
            <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="selectArr" :props="defaultProps" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer = false" plain>取消</el-button>
                <el-button type="primary" @click="handler" plain>確定</el-button>
            </div>
        </template>
    </el-drawer>
</template>
    
<script setup lang='ts'>
import { ref, onMounted, reactive, nextTick } from 'vue'
// 請求方法
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission, reqRemoveRole } from '@/api/acl/role/index'
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus';
// 取得模板setting倉庫
let settingStore = useLayOutSettingStore()
// 當前頁碼
let pageNo = ref<number>(1)
// 每一頁展示資料筆數
let pageSize = ref<number>(10)
// 搜尋職位關鍵字
let keyword = ref<string>('')
// 存儲全部已有職位
let allRole = ref<Records>([])
// 職位總個數
let total = ref<number>(0)
// 點擊 新增職位按鈕 控制對話框顯示與隱藏
let dialogVisible = ref<boolean>(false)

// 取得form元件實例(因在表單發請求前須先校驗表單全部內容通過)
let form = ref<any>()
// 控制抽屜顯示與隱藏
let drawer = ref<boolean>(false)
// 收集 新增職位數據|修改職位數據
let RoleParams = reactive<RoleData>({
    roleName: ''
})
// 準備一陣列 用於存儲已勾選的節點ID(Level 4)
let selectArr = ref<number[]>([])
// 定義陣列存儲用戶權限數據
let menuArr = ref<MenuList>([])
// 取得樹型控件 tree的實例
let tree = ref<any>()
// 元件一掛載完畢
onMounted(() => {
    // 取得職位請求
    getHasRole()
})
// 取得全部職位訊息|分頁器當前頁碼發生變化
const getHasRole = async (pager = 1) => {
    // 修改當前頁碼
    pageNo.value = pager
    // 請求時如只夾帶前兩個參數pageNo.value, pageSize.value, 則後端會回傳現有全部職位數據
    // 請求時如夾帶全部三個參數pageNo.value, pageSize.value, keyword.value, 則後端會解讀為查詢，回傳符合第三位參數keyword.value的職位數據
    let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    // console.log('result', result);
    if (result.code == 200) {
        total.value = result.data.total
        allRole.value = result.data.records
    }

}
// 每頁展示資料筆數下拉選單發生變化
const sizeChange = () => {
    getHasRole()
}
// 點擊 搜尋 按鈕
const search = () => {
    // 根據關鍵字 發請求
    getHasRole()
    keyword.value = ''
}
// 點擊 重置當前畫面 按鈕(原理 銷毀並重新掛載當前元件role)
const reset = () => {
    // 狀態置反
    settingStore.refsh = !settingStore.refsh
}
// 點擊 新增 職位按鈕
const addRole = () => {
    // 對話框顯示
    dialogVisible.value = true
    // 清空 輸入框數據(Object.assign把逗號左側物件內的的名、值內容修改為右側)
    Object.assign(RoleParams, {
        roleName: '',
        id: 0,
    })
    // 清空 前次表單 校驗錯誤訊息(輸入空下方紅字)
    nextTick(() => {
        form.value.clearValidate()
    })
}
// 點擊 修改 職位按鈕
const updateRole = (row: RoleData) => {
    // 對話框顯示
    dialogVisible.value = true
    // 存儲已有職位 帶有ID
    Object.assign(RoleParams, row)
    // 清空 前次表單 校驗錯誤訊息(輸入空下方紅字)
    nextTick(() => {
        form.value.clearValidate()
    })
}
// 自定義校驗規則roleName流程
const validatorRoleName = (_: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('職位名稱至少兩字元或以上'))
    }
}
// 職位相關校驗規則集 開始
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName },
    ]
}
// 點擊 新增職位>點擊 確定按鈕
const save = async () => {
    // 取得表單實例 表單校驗結果,結果通過後再發請求;結果不通過,不發請求
    await form.value.validate()
    // 新增或修改職位
    let result = await reqAddOrUpdateRole(RoleParams)
    // console.log('result', result);
    if (result.code == 200) {
        // 提示訊息
        ElMessage({ type: 'success', message: RoleParams.id ? '修改 成功' : '新增 成功' })
        // 對話框消失
        dialogVisible.value = false
        // 重新取得 新增職位後 全部職位數據
        getHasRole(RoleParams.id ? pageNo.value : 1)
    }
}
// 點擊 分配權限 按鈕
const setPermission = async (row: RoleData) => {
    // 顯示抽屜
    drawer.value = true
    // 收集當前要分配權限的職位的數據
    Object.assign(RoleParams, row)
    // 根據職位 取得權限數據
    let result: MenuResponseData = await reqAllMenuList((RoleParams.id as number))
    // console.log('result', result);
    if (result.code == 200) {
        menuArr.value = result.data
    }
    selectArr.value = filterSelectArr(menuArr.value, [])
}

// 樹型控件測試數據
const defaultProps = {
    children: 'children',
    label: 'name',
}
// 遞迴函數 用於從樹型控件中挑選出當前角色已經分配的權限並在頁面上展示為勾選
// 遍歷:對著一多層結構(兩層或以上)的多個子層結構(內層含有多個兄弟結構)逐個存取或其他操作，稱為遍歷
const filterSelectArr = (allData: any, initArr: any) => {
    // console.log(allData);
    allData.forEach((item: any) => {
        // 判斷本節點在抽屜展開時要顯示勾選(item.select屬性為true)且同時為第4級節點(item.level屬性等於4)
        if (item.select && item.level == 4) {
            // 遍歷allData中的每個item,並把id從item中挑選出來,放進暫時陣列initArr中用於展示到樹型控件位置
            initArr.push(item.id)
        }
        // 判斷當前level有子節點(有children且children有內容)時,繼續往子節點內層遍歷進去
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr)
        }
    });
    return initArr
}
// 展開抽屜 分配權限完 點擊 確定按鈕
const handler = async () => {
    // 蒐集數據
    // 職位 ID
    const roleId = (RoleParams.id as number)
    // 選中節點的ID
    let arr = tree.value.getCheckedKeys()
    // console.log('arr', arr);
    let arr1 = tree.value.getHalfCheckedKeys()
    // console.log('arr1', arr1);
    let permissionId = arr.concat(arr1)
    // 下發權限
    let result: any = await reqSetPermission(roleId, permissionId)
    // console.log('result',result);
    if (result.code == 200) {
        // 抽屜關閉
        drawer.value = false
        // 提示訊息
        ElMessage({ type: 'success', message: '分配權限 成功' })
        // 頁面刷新
        window.location.reload()
    }
}
// 刪除已有職位
const removeRole = async (id: number) => {
    let result: any = await reqRemoveRole(id)
    // console.log('result', result);
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '刪除職位 成功' })
    }
    // 取得 刪除後 全部職位數據
    getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    // 
}
</script>
    
<style scoped>
/* .box{
        width: 100%;
        height: 400px;
        background-color: hotpink;
    } */

.form {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    height: 50px;
}
</style>