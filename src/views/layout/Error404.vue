<template>
  <div>
    <main>
      <div class="bg-[#eeeeee] w-full flex flex-col items-center mainarea">

        <div class="w-[80%] h-full my-10 flex flex-col items-center justify-center bg-white">
          error page

        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { onMounted } from 'vue';
onMounted(() => {
  const lang = sessionStorage.getItem('locale')
  if (lang) {
    locale.value = lang
  }
})
</script>
<style lang="scss" scoped>
.mainarea {
  height: calc(100vh - 104px);
}
</style>