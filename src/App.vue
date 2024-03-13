<template >
  <div>
    <router-view></router-view>
  </div>
  <!-- <div>
    <h1>測試axios二次封裝</h1>
  </div> -->
</template>
<script setup lang="ts">
// import request from '@/utils/request'
// import { reqLogin } from '.api/user'
// import { onMounted } from 'vue'

// onMounted(() => {
//   request({
//     url: 'user/login',
//     method: 'post',
//     data: {
//       username:'admin',
//       password:'111111'
//     }
//   }).then(res => {
//     console.log('res', res);
//   })
// })

// onMounted(() => {
//   reqLogin({
//     username: 'admin,',
//     password:'111111'
//   })
// })
</script>
<style scoped></style>
