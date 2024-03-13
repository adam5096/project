<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片頂部新增品牌按鈕 -->
            <!-- v-has="btn.Trademark.add" -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">新增品牌</el-button>
            <!-- 表格元件:用於展示已有品牌數據 -->
            <!-- 
            -border:設置表格上下方向是否有邊框
            -label:某一橫列標題
            -width:設置本列寬度
            -align:設置本列對齊方式
         -->
            <el-table style="margin:10px 0px;" border :data="trademarkArr">
                <el-table-column label="序號" width="80px" align="center" type="index"></el-table-column>
                <!-- table-column:預設展示數據使用div -->
                <el-table-column label="品牌名稱" prop="tmName">
                    <template #="{ row }">
                        <pre style="color:chocolate">{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌Logo">

                    <template #="{ row }">
                        <img :src="row.logoUrl" style="width: 100px;height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">

                    <template #="{ row }">
                        <el-button type="warning" size="default" icon="Edit"
                            @click="updateTrademark(row)">編輯</el-button>
                        <el-popconfirm :title="`確定要刪除${row.tmName}?`" width="250px" icon="Delete"
                            @confirm="removeTradeMark(row.id)">
                            <template #reference>
                                <el-button type="danger">刪除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分頁器元件 -->
            <!-- 
            el-pagination
            v-model:current-page:分頁器當前頁碼
            v-model:page-size:展示每一個展示數據筆數
            page-sizes:設置下拉菜單一次顯示的數據筆數
            background:設置分頁器按鈕背景顏色
            layout:設置分頁器6個子元件結構調整
         -->
            <el-pagination @size-change="sizeChange" @current-change="getHasTrademark" :pager-count="5"
                v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[5, 10, 20, 40]" :background="true"
                layout=" prev, pager, next, jumper,->,total, sizes" :total="total" />
        </el-card>
        <!-- 對話框元件:新增品牌與修改品牌業務時，所使用的結構 -->
        <!-- 
            v-model用於控制對話空的顯示與隱藏 true顯示 false隱藏 
            title:設置對話框左上角標題
        -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '新增品牌'">
            <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名稱" label-width="100px" prop="tmName">
                    <el-input placeholder="請輸入品牌名稱" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!-- upload元件屬性:action圖片上傳路徑中書寫/api，代理伺服器才會發送本次post請求 -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <!-- 具名插槽 footer-->

            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">確定</el-button>

            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage, type UploadProps } from 'element-plus'
// 引入組合式API函數ref
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'

// // 按鈕權限
// import useUserStore from '@/store/modules/user'
// // 取得用戶倉庫
// let useStore = useUserStore()

// 當前頁面
let pageNo = ref<number>(1)
// 每一頁展示多少筆數據
let limit = ref<number>(3)
// 存儲已有品牌的數據總數
let total = ref<number>(0)
// 存儲已有品牌陣列
let trademarkArr = ref<Records>([])
// 控制對話框顯示與隱藏
let dialogFormVisible = ref<boolean>(false)
// 定義收集新增品牌數據
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 取得el-form元件實例
let formRef = ref()
// 取得既有品牌的接口封裝成一個函數：在任何情況下想取得數據，呼叫此函數即可
const getHasTrademark = async (pager = 1) => {
    // 當前頁每一頁數據筆數發生變化時，當前頁碼歸1
    pageNo.value = pager
    let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        // 存儲已有品牌總個數
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
// 元件掛載完畢生命週期函數---發送1次請求，取得第1頁，一頁三個既有品牌數據
onMounted(() => {
    getHasTrademark()
})
// 分頁器當前頁碼發生變化時會觸發
// 對於當前頁碼發生變化自訂義事件，元件pagination父元件回傳了數據(當前的頁碼)
// const changePageNo = (a) => {
//     // 當前頁碼發生變化時再次發請求取得對應已有品牌數據展示
//     getHasTrademark()
// }

// 當下拉選單發生變化時會觸發此方法
// 這自定義事件，分頁器會將下拉選單選中頁碼返回
const sizeChange = () => {
    getHasTrademark()
}
// 新增品牌 按鈕
const addTrademark = () => {
    // 控制對話框顯示與隱藏
    dialogFormVisible.value = true
    // 清空收集的數據
    trademarkParams.id = 0
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''

    // 第1種寫法:ts的問號語法
    // 待formRef.value存在後，才呼叫clearValidate方法
    // formRef.value?.clearValidate('tmName')
    // formRef.value?.clearValidate('logoUrl')

    // 第2種寫法:nextTick
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
}
// 修改品牌 按鈕
// row為當前已有品牌數據
const updateTrademark = (row: TradeMark) => {
    // 清空校驗規則的錯誤提示訊息
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
    // 控制對話框顯示與隱藏
    dialogFormVisible.value = true
    // ES6語法合併物件
    Object.assign(trademarkParams, row)
    // trademarkParams.id = row.id
    // // 展示已有品牌數據
    // trademarkParams.tmName = row.tmName
    // trademarkParams.logoUrl = row.logoUrl
}
// 對話框底部 取消按鈕
const cancel = () => {
    //  控制對話框顯示與隱藏
    dialogFormVisible.value = false

}

const confirm = async () => {
    // 在發送請求之前，對於整個表單進行校驗
    // 呼叫這個方法進行全部表單項目校驗，如果校驗全部通過，再執行後面語句
    await formRef.value.validate()

    let result: any = await reqAddOrUpdateTrademark(trademarkParams)
    // 新增|修改品牌成功
    if (result.code == 200) {
        // 關閉對話框
        dialogFormVisible.value = false
        // 彈出對應提示訊息
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改 成功' : '新增 成功'
        })
        // 再次發請求取得新增品牌後的品牌總筆數
        // trademarkParams.id ?pageNo.value:1 如果有id(修改),留在當前頁;如果沒id(新增),回到第1頁
        getHasTrademark(trademarkParams.id ? pageNo.value : 1)

    } else {
        // 新增品牌失敗
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改 失敗' : '新增 失敗',
        })
        // 關閉對話框
        dialogFormVisible.value = false
    }
    //  控制對話框顯示與隱藏
    // dialogFormVisible.value = false
}
// 上團片元件；上傳圖片之前觸發的Element-plus生命週期函數
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 鉤子是在圖片上傳之前觸發，上船文件之前可以約束文件類型、大小
    // 要求:上傳文件格式png,jpg,gif, 4Mb
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上傳文件容量太大了，請小於4M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上傳文件格式務必PNG|JPG|GIF'
        })
        return false
    }
}
// 圖片上傳成功的鉤子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    // response即為當前這次上傳圖片post請求伺服器返回的數據
    // 收集上傳圖片的地址，將來新增品牌時帶給伺服器
    trademarkParams.logoUrl = response.data
    // 圖片上傳成功，清除對應圖片校驗結果
    formRef.value.clearValidate('logoUrl')
}
// 品牌LOGO圖片自定義校驗規則
const validatorLogoUrl = (_: any, value: any, callBack: any) => {
    if (value) {
        callBack()
    } else {
        callBack(new Error('務必上傳LOGO圖片'))
    }
}
// 品牌自定義校驗規則方法
const validatorTmName = (_: any, value: any, callBack: any) => {
    // 當表單元素觸發blur時候會觸發此方法
    // 自定義校驗規則
    if (value.trim().length >= 2) {
        callBack()
    } else {
        // 校驗未通過返回的錯誤的提示訊息
        callBack(new Error('品牌名稱位元數 應大於等於2位'))
    }
}
// 表單校驗規則物件 
const rules = {
    // required本字段務必校驗,表單項前面出現五角星
    // trigger觸發校驗規則時間[blur,change]
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }

    ]
}
// 氣泡確認框確定按鈕的callback
const removeTradeMark = async (id: number) => {
    // 點擊確定按鈕 刪除已有品牌請求
    let result = await reqDeleteTrademark(id)
    // console.log('result', result);
    if (result.code == 200) {
        // 刪除成功的提示訊息
        ElMessage({
            type: 'success',
            message: '刪除品牌 成功'
        })
        // 再次取得已有品牌總筆數數據
        // 刪除數據後，若當前頁陣列長度大於1，則留在當前頁；若等於或小於1，前往上一頁
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '刪除品牌 失敗'
        })
    }

}

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>