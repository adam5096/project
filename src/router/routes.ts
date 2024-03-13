// import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// 對外暴露配置路由(常量路由，公共路由)
export const constantRoute = [
  {
    // 登入
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    // 路由元訊息，用來展示路由標題
    meta: {
      title: '登入', //選單標題
      hidden: true, //設定路由標題在登入成功後展示選單中是否隱藏,true隱藏,false展示
      icon: 'Promotion', //選項左側圖標,支持element-plus全部圖標
    },
  },
  {
    // 登入成功以後展示數據的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '', //選單標題
      hidden: false,
      icon: '',
    },
    // 點擊
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首頁', //選單標題
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404', //選單標題
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  {
    // 數據大屏
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '數據大屏', //選單標題
      hidden: false,
      icon: 'Platform',
    },
  },
]
// 異步路由(根據登入的帳號，以及該帳號對應的角色名稱，來去動態追加異步路由)
// 背後對應著權限(頁面能見度、按鈕操作權限)
export const asyncRoute = [
  {
    // 權限管理
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '權限管理', //選單標題
      hidden: false,
      icon: 'Lock',
    },
    // 點擊麵包屑中權限管理重定向到/acl/user，展示user元件，不展示layout元件
    redirect: '/acl/user',
    children: [
      {
        // 使用者管理
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '使用者管理', //選單標題
          hidden: false,
          icon: 'User',
        },
      },
      {
        // 角色管理
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理', //選單標題
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        // 選單管理
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '選單管理', //選單標題
          hidden: false,
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理', //選單標題
      hidden: false,
      icon: 'Goods',
    },
    // 點擊麵包屑中商品管理重定向到商品管理排第一位路由元件/product/trademark，展示trademark元件，不展示layout元件
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理', //選單標題
          //若無看見hidden屬性(不存在)，則layout元件讀取不到hidden，後續處理為undefined(hidden:undefined相當於false)
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '屬性管理', //選單標題
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理', //選單標題
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理', //選單標題
          icon: 'Orange',
        },
      },
    ],
  },
]

// 任意路由(當想要跳轉的路徑沒有比對到路由規則中的任何一個路徑時，則會跳轉到此路由)
// 特別注意此對外暴露路由物件只有一條路由規則
// 正確語法為export const anyRoute = {...}
// 錯誤語法 export const anyRoute = [...]
export const anyRoute = {
  // 當沒有比對中其他的路由規則時，就重定向到404
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由', //選單標題
    hidden: true,
    icon: 'DataLine',
  },
}
