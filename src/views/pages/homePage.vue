<script lang="ts" setup>
import inputText from 'primevue/inputtext'
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
console.log(locale.value)
const gimmickList = ref([
  'first', 'second', 'third', 'fourth', 'fifth'
])

const emailModel = ref('')

const words = ['paid ads', 'website', 'design', 'traffic', 'growth']
const words_tw = ['精准投放', '网站设计', '邮件营销', '流量提升', '业务增长']
const currentIdx = ref(0)
const currentWord = ref(words[currentIdx.value])
let interval = null
const cardData = [
  { title: 'cardOne' },
  { title: 'cardTwo' },
  { title: 'cardThree' }
]
const works = ['paid', 'web', 'sms', 'local', 'social', 'gp']

onMounted(() => {
  interval = setInterval(() => {
    currentIdx.value = (currentIdx.value + 1) % words.length
    if (locale.value === 'zh-TW') {
      currentWord.value = words_tw[currentIdx.value]
    } else {
      currentWord.value = words[currentIdx.value]
    }
  }, 2000)
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
<template>
  <div class="bg-[#F9F7F4] Roboto">
    <!-- banner -->
    <div class="w-full flex justify-center">
      <div class="flex gap-[191px] pt-[6rem] items-center pb-[7rem] w-[75%]">
        <div class="flex flex-col w-1/2">
          <div class="Roboto font-[500] text-[48px] leading-[56.25px] text-black max-w-[500px]">{{ $t('banner.title') }}
          </div>
          <div class="Roboto font-[400] text-[20px] leading-[28.13px] mt-[3px]">{{ $t('banner.content') }}</div>
          <div
            class="Roboto leading-[21.09px] bg-[#DF6E00] flex py-[19px] px-[24px] w-fit rounded-[8px] text-white text-[18px] mt-[29px] cursor-pointer max-w-[463px]">
            {{ $t('banner.button') }}</div>
        </div>
        <div class="relative">
          <img src="@/assets/img/banner1.png" alt="banner1">
          <img src="@/assets/img/banner2.png" alt="banner1" class="w-[207px] absolute top-[80px] left-[-120px]">
          <img src="@/assets/img/banner4.png" alt="banner1" class="w-[203px] absolute top-[185px] left-[178px]">
          <img src="@/assets/img/banner3.png" alt="banner1" class="w-[122px] absolute top-[295px] left-[-61px]">
        </div>
      </div>
    </div>

    <div id="gimmick" class="flex justify-evenly py-[2.5rem] mobile:overflow-auto">
      <div v-for="(item, index) in gimmickList" :key="index" class="text-center mobile:w-[50%]"
        v-html="$t(`Gimmick.${item}`)" />
    </div>

    <!-- 文字特效區塊 -->
    <div class="w-full flex justify-center mt-[10rem] mb-[8rem]">
      <div id="paidAD" class="flex flex-col w-[80vw] items-center">
        <div class="flex">
          <div class="text-[48px] Roboto font-[500]">{{ $t('paidAD.content1') }}</div>
          <div
            class="ml-[12px] font-[500] text-[48px] w-[190px] h-[80px] relative overflow-hidden inline-block text-[#DF6E00]">
            <transition-group name="slide">
              <div v-for="(word, index) in [currentWord]" :key="word" class="inline-block absolute w-full text-left">
                {{ word }}
              </div>
            </transition-group>
          </div>
        </div>
        <div class=" text-[48px] Roboto font-[500]">{{ $t('paidAD.content2') }}</div>
      </div>
    </div>

    <div id="paidADCardList" class="flex flex-col justify-center items-center gap-[1.5rem] Roboto mobile:hidden">
      <div class="flex justify-evenly w-[80%] gap-[1.5rem]">
        <div v-for="(item) in 3" :key="item" class="bg-[#F0F0F0] pt-[30px] px-[25px] rounded-[8px]">
          <img src="@/assets/img/light.png" alt="" class="rounded-[8px] object-contain">
          <div class="my-[1rem] flex flex-col gap-[14px]">
            <div
              class="w-max text-[#DF6E00] text-[11px] font-[300] border-[#DF6E00] border-[1px] border-solid px-[10px] py-[5px] rounded-full">
              {{ $t(`paidADList.card${item}.tag`) }}</div>
            <div>{{ $t(`paidADList.card${item}.content`) }}</div>
            <div class="font-[600]">{{ $t(`paidADList.card${item}.title`) }}</div>
          </div>
        </div>
      </div>
      <div
        class="w-max text-[#DF6E00] border-[#DF6E00] border-[1px] border-solid px-[79px] py-[12px] rounded-[8px] cursor-pointer">
        {{ $t('paidADList.more') }}</div>
    </div>
    <div id="feature" class="flex justify-evenly px-[15%] my-[10rem] mobile:hidden">
      <div class="flex flex-col justify-evenly items-center gap-[8rem]">
        <div>
          <div class="text-[40px] font-[700]">{{ $t('feature.Boost.title') }}</div>
          <div class="text-[20px]" v-html="$t('feature.Boost.content')" />
        </div>
        <img class="h-[301px] object-contain rounded-[30px]" src="@/assets/img/light.png" alt="">
        <div>
          <div class="text-[40px] font-[700]">{{ $t('feature.More.title') }}</div>
          <div class="text-[20px]" v-html="$t('feature.More.content')" />
        </div>
      </div>
      <div class="flex flex-col justify-evenly items-center gap-[8rem]">
        <div class="text-[64px]" v-html="$t('feature.subTag')" />
        <div>
          <div class="text-[40px] font-[700]">{{ $t('feature.Pay.title') }}</div>
          <div class="text-[20px]" v-html="$t('feature.Pay.content')" />
        </div>
      </div>
    </div>
    <div id="solutions"
      class="bg-[#F0F0F0] w-full h-[312px] flex flex-col justify-center items-center gap-[1.5rem] Roboto my-[2.5rem] mobile:hidden">
      <div class="text-[#DF6E00] text-[40px] font-bold">{{ $t('Solutions.title') }}</div>
      <div class="w-[50%] text-center">{{ $t('Solutions.content') }}</div>
      <div
        class="text-[#DF6E00] border-[#DF6E00] border-[1px] border-solid px-[79px] py-[12px] rounded-[8px] cursor-pointer">
        {{ $t('Solutions.button') }}</div>
    </div>

    <!-- How WAG works -->
    <div class="w-full items-center flex flex-col mt-[10rem]">
      <div class="flex flex-col items-center gap-[12px]">
        <span class="Roboto text-[48px] font-[500] leading-[56.25px]">{{ $t('howWagWorks.title') }}</span>
        <span class="text-[#545F71] leading-[22px]">{{ $t('howWagWorks.subTitle') }}</span>
      </div>
      <div class="flex gap-[60px] mt-[50px] w-[85vw]">
        <div v-for="(card, idx) in cardData" :key="idx+'card'"
          class="flex flex-col gap-[20px] items-center w-[calc((100%/3)-40px)]">
          <span class="text-[96px] font-bold">{{ idx + 1 }}</span>
          <div class="border-[1px] border-[#D8D8D8] rounded-[26px]">
            <img :src="`card${idx+1}.png`.getImg()" alt="" class="w-full">
            <div
              class="bg-white py-[30px] h-[125px] text-center text-[24px] font-[500] w-[325px] rounded-br-[26px] rounded-bl-[26px] justify-center flex items-center"
              :class="{'px-[40px]': idx == 0}">
              {{ $t(`howWagWorks.${card.title}`) }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-[5rem] w-[85vw] bg-white py-[60px] rounded-[7px] flex items-center justify-center border-[#D8D8D8] border-[1px]">
        <div class="flex gap-[12rem]">
          <div class="flex flex-col gap-[35px]">
            <div class="text-[32px] leading-[43px] Roboto max-w-[384px]">Trust us to take care of your marketing
              initiatives.</div>
            <div
              class="Roboto leading-[21.09px] bg-[#DF6E00] flex py-[12px] px-[24px] w-fit rounded-[8px] text-white text-[18px] mt-[29px] cursor-pointer max-w-[463px]">
              {{ $t('howWagWorks.contentBtn') }}</div>
          </div>
          <div class="flex flex-col gap-[24px]">
            <div v-for="x in works" :key="x" class="flex gap-[9px]">
              <img :src="'mdi_star-circle.svg'.getImg()" alt="">
              <span>{{ $t(`howWagWorks.${x}`) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="sendEmail" class="flex justify-center items-center my-[5rem] mobile:hidden">
      <div class="flex items-center justify-evenly gap-[10rem] bg-white p-[5rem] rounded-[8px]">
        <div class="text-[2rem]" v-html="$t('sendEmail.title')" />
        <div class="flex flex-col gap-[1.5rem]">
          <div class="font-[700] text-[18px]">{{ $t('sendEmail.email') }}</div>
          <inputText class="w-[500px] !border-[1px] !border-solid !border-[#D8D8D8] !p-2 !rounded-md"
            :modelValue="emailModel" :placeHolder="$t('sendEmail.placeholder')" />
          <div class="bg-[#DF6E00] text-white rounded-lg w-max px-[24px] py-[12px]">{{ $t('sendEmail.Subscribe') }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-[2rem] justify-center items-center">
      <div class="w-[80%] text-[20px]" v-html="$t('sendEmail.title')" />
      <inputText class="w-[80%] !rounded-md" :modelValue="emailModel" :placeHolder="$t('sendEmail.placeholder')" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Roboto {
  font-family: 'Roboto', sans-serif;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
