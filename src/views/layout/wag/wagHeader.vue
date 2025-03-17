<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select';
import { Session } from '@/utils/sessionManagement'

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const routerData = reactive([
  { label: 'about', link: '/' },
  { label: 'service', link: '/service' },
  { label: 'example', link: '/example' },
  { label: 'blog', link: '/blog' },
  { label: 'contact', link: '/contact' }
])

const lang = ref('')
const langList = ref([
  { label: 'English', value: 'en-US' },
  { label: '中文', value: 'zh-TW' }
])
const showHamburger = ref(false)

const handleLanguageChange = (event: any) => {
  const selectedLang = event.value
  locale.value = selectedLang
  Session.setSessionLang(selectedLang)
}

const goToStepForm = () => {
  router.push('/stepForm')
}

onMounted(() => {
  const savedLang = Session.getSessionLang()
  if (savedLang) {
    lang.value = savedLang
    locale.value = savedLang
  } else {
    lang.value = 'en-US'
    locale.value = 'en-US'
  }
})
</script>
<template>
  <div
    class="Roboto flex bg-[#F5F5F5] pt-[22px] pl-[90px] pr-[90px] pb-[22px] justify-center items-center laptop:justify-center tablet:justify-center laptop:pt-[10px] laptop:pb-[10px] tablet:pt-[10px] tablet:pb-[10px] fixed top-0 left-0 z-50 w-full mobile:px-6">
    <div class="flex justify-between items-center w-full desktop:max-w-[1200px] tablet:justify-center">
      <div class="flex items-center gap-[8rem]">
        <div class="flex items-end cursor-pointer" @click="router.push('/')">
          <img class="w-[85px] h-[40px] object-contain" src="@/assets/img/logo.svg" alt="logo">
        </div>
        <div class="flex gap-[32px] text-black laptop:hidden tablet:hidden text-[15px] mobile:hidden">
          <router-link class="cursor-pointer whitespace-nowrap" :class="{ 'font-bold': route.path == link.link }"
            v-for="(link, idx) in routerData" :key="idx" :to="link.link">{{ $t(`Header.${link.label}`) }}</router-link>
        </div>
      </div>
      <div class="underMac:hidden flex gap-[3rem]">
        <div class="bg-[#DF6E00] px-[10px] py-[12px] font-light text-[15px] rounded-[3px] text-white cursor-pointer"
          @click="goToStepForm()">
          {{ $t('banner.button') }}
        </div>
        <div class="border-[1px] border-[#000000] rounded-[4px] flex items-center">
          <Select v-model="lang" :options="langList" optionLabel="label" optionValue="value"
            @change="handleLanguageChange" class="h-[38px] w-max" />
        </div>
      </div>
    </div>
    <img src="@/assets/img/menuWhite.svg" class="absolute top-[22px] right-6 cursor-pointer desktop:hidden mac:hidden"
      @click="showHamburger = true">
  </div>
  <Transition name="slide-fade">
    <div class="w-full h-full fixed top-0 left-0 bg-white z-50 flex items-center pt-[75px] flex-col"
      v-if="showHamburger">
      <img src="@/assets/img/close.svg" class="fixed top-[16px] right-4 cursor-pointer desktop:hidden"
        @click="showHamburger = false">
      <div class="flex gap-[24px] text-text-black flex-col items-center">
        <router-link v-for="(link, idx) in routerData" :key="idx + 'router'" :to="link.link">{{
          $t(`Header.${link.label}`) }}</router-link>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
