
<script lang="ts" setup>
import wagHeader from './wagHeader.vue'
import wagFooter from './wagFooter.vue'
</script>
<template>
  <div class="min-h-screen min-w-screen flex flex-col justify-between">
    <wagHeader/>
    <router-view></router-view>
    <wagFooter/>
  </div>
</template>