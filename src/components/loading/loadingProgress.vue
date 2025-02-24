<template>
  <div class="w-full h-full ">
    <div class="loading" :class="{ 'change': isBlue }" aria-live="polite" aria-atomic="true">Loading</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
const isBlue = ref<boolean>(false)
const timer = ref<any>(null)


onMounted(async () => {
  timer.value = setInterval(() => {
    isBlue.value = !isBlue.value
  }, 1000);

})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
<style scoped>
@import url('@/components/loading/loading.min.css')
</style>