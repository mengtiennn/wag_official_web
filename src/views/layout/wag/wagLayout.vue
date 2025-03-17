
<script lang="ts" setup>
import wagHeader from './wagHeader.vue'
import wagFooter from './wagFooter.vue'
</script>
<template>
  <div class="min-h-screen min-w-screen flex flex-col justify-between desktop:pt-[90px] mobile:pt-[81px]">
    <wagHeader/>
    <router-view></router-view>
    <wagFooter/>
  </div>
</template>