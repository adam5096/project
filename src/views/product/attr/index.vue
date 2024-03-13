<template>
    <div>
        <!-- 三級分類全局元件 -->
        <Category :scene="scene"></Category>

        <el-card style="margin:10px 0px">
            <!-- 場景切換 -->
            <div v-show="scene == 0">
                <el-button @click="addAttr" type="primary" size="default" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">新增規格</el-button>
                <el-table border style="margin:10px 0px" :data="attrArr">
                    <el-table-column label="項次" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="屬性名稱" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="屬性數值">
                        <template #="{ row }">
                            <el-tag style="margin:5px;" v-for="(item) in row.attrValueList" :key="item.id">{{
                                item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="屬性值操作" width="120px">
                        <!-- row 既有的屬性物件 -->
                        <template #="{ row }">
                            <!-- 修改已有屬性按鈕 -->
                            <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`確定刪除 ${row.attrName} ?`" width="200px" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="Delete" ></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 場景切換 -->
            <div v-show="scene == 1">
                <!-- 展示新增與修改屬性的結構 -->
                <el-form :inline="true">
                    <el-form-item label="屬性名稱">
                        <!-- v-model 待用戶輸入內容後，第一時間會存放在value屬性內，接著vue(執行到v-model後)會將value所存內容複製後並放到attrParams.attrName這個位置) -->
                        <el-input placeholder="請輸入屬性名稱" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="addAttrValue" :disabled="attrParams.attrName ? false : true" type="primary"
                    size="default" icon="Plus">新增屬性</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                    <el-table-column label="項次" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="屬性值名稱">
                        <!-- row 為當前屬性值物件 -->
                        <template #="{ row, $index }">
                            <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toLook(row, $index)"
                                size="small" placeholder="請輸入屬性值名稱" v-model="row.valueName"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="屬性值操作">
                        <template #="{ index }">
                            <el-button type="danger" size="small" icon="Delete"
                                @click="attrParams.attrValueList.splice(index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>

    </div>
</template>
    
<script setup lang='ts'>
// 組合式API函數watch
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
// 引入取得已有屬性與屬性值的接口方法
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type';
// 取得分類的倉庫
import useCategoryStore from '@/store/modules/category';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore()
// 存儲已有屬性與值
let attrArr = ref<Attr[]>([])
// 定義card元件內容切換變數
let scene = ref<number>(0)//scene==0顯示table, scene==1,展示新增與修改屬性的結構
// 收集新增的屬性數據
let attrParams = reactive<Attr>({
    attrName: '',//新增的屬性名稱
    attrValueList: [//新增的屬性值陣列
    ],
    categoryId: '',//三級分類中的分類ID
    categoryLevel: 3,//代表三級分類
})

// 準備一個陣列:將來存放對應的元件實例el-input
let inputArr = ref<any>([])

// 監聽倉庫三級分類ID變化
watch(() => categoryStore.c3Id, () => {
    // 清空上一次查詢的屬性與值
    attrArr.value = []
    // 保證三級分類存在 才能發送請求
    if (!categoryStore.c3Id) return
    // 取得分類ID
    getAttr()
})
// 取得已有屬性與屬性值並 展示 方法
const getAttr = async () => {
    // 取得分類的ID,解構賦值
    const { c1Id, c2Id, c3Id } = categoryStore
    // 取得分類下已有的屬性與屬性值
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data
    }
}
// 新增屬性按鈕callback
const addAttr = () => {
    // 每一次點擊時 先清空數據 再蒐集數據
    Object.assign(attrParams, {
        attrName: '',//新增的屬性名稱
        attrValueList: [//新增的屬性值陣列
        ],
        categoryId: categoryStore.c3Id,//三級分類中的分類ID
        categoryLevel: 3,//代表三級分類
    })
    // 切換為新增與修改屬性的結構
    scene.value = 1
}
// table表格修改已有屬性按鈕的callback
const updateAttr = (row: Attr) => {
    scene.value = 1
    // 將已有的屬性物件賦值給attrParams物件
    // ES6 ->Object.assign進行物件合併
    // 淺拷貝:因為目標物件與來源物件共用了相同記憶體地址(修改操作物件內容的同時也不可避免地修改了來源物件內容，互相影響)
    // Object.assign(attrParams,row)
    // 深拷貝寫法:將來源物件賦值給目標物件後，可以使它們兩物件使用不同的記憶體地址(改動目標物件內容就不會影響到來源物件內容)
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 取消按鈕callback
const cancel = () => {
    scene.value = 0

}
// 新增屬性值按鈕callback
const addAttrValue = () => {
    // 點擊新增屬性值按鈕 向陣列新增(push)一個屬性值物件
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,// 控制每一屬性值 編輯模式 與 切換模式的切換
    })
    // 取得最後的el-input元件
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}
// 保存按鈕 callback
const save = async () => {
    // 發請求
    let result: any = await reqAddOrUpdateAttr(attrParams)
    // 新增或修改已有屬性已經成功
    if (result.code == 200) {
        // 切換場景
        scene.value = 0
        // 提示訊息
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改 成功' : '新增 成功'
        })
        // 取得全部已有的屬性與值
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改 失敗' : '新增 失敗'
        })
    }
}
// 屬性值表單元素失去焦點 callback
const toLook = (row: AttrValue, $index: number) => {
    // 非法情境判斷1:新增 空白屬性
    if (row.valueName.trim() == '') {
        // 刪除對應的屬性值為空的元素
        attrParams.attrValueList.splice($index, 1)
        // 提示訊息
        ElMessage({
            type: 'error',
            message: '屬性值必須填'
        })
        return//return後不接任何語句,進入本if判斷後，toLook流程執行到此視為函數執行完畢
        // 說明無法走到toLook末段的row.flag = false
    }
    // 非法情境2:新增 重複屬性
    let repeat = attrParams.attrValueList.find((item) => {
        // 務必把當前失去焦點的屬性值物件 扣除判斷
        if (item != row) {
            // 如果true,說明新增屬性值出現重複項
            return item.valueName === row.valueName
        }
    })
    if (repeat) {
        // 刪除重複的屬性值
        attrParams.attrValueList.splice($index, 1)
        // 提示訊息
        ElMessage({
            type: 'error',
            message: '屬性值不得重複'
        })
        return//後不接任何語句,特殊跳脫toLook
    }

    // 對應的屬性值物件的flag:改為false,展示div
    row.flag = false
}
// 屬性值div點擊事件
const toEdit = (row: AttrValue, $index: number) => {
    // 對應的屬性值物件的flag:改為true,展示input
    row.flag = true
    // nextTick 響應式數據發生變化 取得更新後的DOM或元件實例
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
// 刪除某一已有屬性 方法 callback
const deleteAttr = async (attrId: number) => {
    // 發送對應的刪除已有的屬性的請求
    let result: any = await reqRemoveAttr(attrId)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '刪除 成功'
        })
        // 取得一次已有的屬性與值
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '刪除 失敗'
        })
    }
}
// (切換到其他路由元件時)路由元件銷毀時，把倉庫分類相關數據清空
onBeforeUnmount(() => {
    // 使用倉庫內建方法$reset,清空倉庫數據
    categoryStore.$reset()
})
</script>
    
<style></style>