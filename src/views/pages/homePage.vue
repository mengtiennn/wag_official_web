<script lang="ts" setup>
import inputText from 'primevue/inputtext'
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const { t, locale } = useI18n()
const gimmickList = ref([
  'first', 'second', 'third', 'fourth', 'fifth'
])

const nameModel = ref('')
const emailModel = ref('')

const words = ['paid ads', 'website', 'design', 'traffic', 'growth']
const words_tw = ['精准投放', '网站设计', '邮件营销', '流量提升', '业务增长']
const currentIdx = ref(0)
const currentWord = ref(locale.value === 'zh-TW' ? words_tw[currentIdx.value] : words[currentIdx.value])
let interval = null
const cardData = [
  { title: 'cardOne' },
  { title: 'cardTwo' },
  { title: 'cardThree' }
]
const works = ['paid', 'web', 'sms', 'local', 'social', 'gp']
const worksM = ['paidM', 'webM', 'smsM', 'localM']

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

const splideOption = {
  width: '99vw',
  rewind: true,
  perPage: 3,
  arrows: false,
  omitEnd: true,
  autoplay: true,
  interval: 3000,
  padding: { left: '5%', right: '10%' },
  pagination: false,
  gap: '20px',
  breakpoints: {
    1300: {
      perPage: 2,
      padding: { left: 0, right: '30%' }
    },
    1100: {
      perPage: 2,
      padding: { left: 0, right: '20%' }
    },
    
  }
}
const goToStepForm = () => {
  router.push('/stepForm')
}
</script>
<template>
  <div class="bg-[#F5F5F5] Roboto px-[10%]">
    <!-- banner -->
    <div class="w-full flex justify-between underMac:hidden bigScreen:justify-center">
      <div class="flex gap-[191px] pt-[6rem] items-center pb-[7rem] w-[90%] max-w-[1200px] justify-evenly">
        <div class="flex flex-col w-1/2">
          <div class="Roboto font-[500] text-[48px] text-black max-w-[500px] leading-[1.2] tracking-[2%]">{{
            $t('banner.title') }}
          </div>
          <div class="Roboto font-[300] text-[20px] leading-[28.13px] mt-[3px]">{{ $t('banner.content') }}</div>
          <div
            class="Roboto leading-[21.09px] bg-[#DF6E00] flex py-[12px] px-[10px] w-[175px] justify-center rounded-[3px] text-white text-[15px] mt-[29px] cursor-pointer max-w-[463px]" @click="goToStepForm()">
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
    <!-- banner mobile -->
    <div class="hidden underMac:flex justify-center pt-[3rem]">
      <div class="w-[80vw] flex flex-col justify-center items-center">
        <div class="Roboto font-[400] text-[28px] text-black max-w-[500px] leading-[1.2] tracking-[4%] text-center">{{
          $t('banner.title') }}</div>
        <div class="Roboto font-[300] text-[15px] leading-[1.2] mt-[3px] text-center">{{ $t('banner.contentM') }}
        </div>
        <div
          class="Roboto leading-[21.09px] bg-[#DF6E00] flex py-[10px] px-[12px] rounded-[8px] font-light text-white text-[18px] mt-[29px] cursor-pointer w-[80%] text-center justify-center">
          {{ $t('banner.button') }}</div>
      </div>
    </div>

    <!-- 數值區 -->
    <div id="gimmick" class="flex justify-between py-[2.5rem] mobile:overflow-auto mobile:flex-wrap mobile:hidden bigScreen:justify-center">
      <div class="max-w-[1200px] flex w-full justify-between">
        <div v-for="(item, index) in gimmickList" :key="index" class="text-center mobile:w-[50%]"
          v-html="$t(`Gimmick.${item}`)" />
      </div>
    </div>

    <!-- 數值區mobile -->
    <div class="hidden overflow-hidden miniPad:flex mt-[20px]">
      <Splide :options="splideOption">
        <SplideSlide v-for="(item, index) in gimmickList" :key="index">
          <div v-html="$t(`GimmickM.${item}`)"
            class="flex justify-center flex-col items-center text-[#707070] text-[13px] h-[80px]"></div>
        </SplideSlide>
      </Splide>
    </div>


    <!-- 文字特效區塊 -->
    <div class="w-full flex justify-center my-[5rem] underMac:hidden">
      <div id="paidAD" class="flex flex-col justify-center max-w-[80vw] items-center leading-1">
        <div class="flex">
          <div class="text-[36px] Roboto font-[500]">{{ $t('paidAD.content1') }}</div>
          <div
            class="ml-[12px] font-[500] text-[36px] w-[150px] h-[80px] relative overflow-hidden inline-block text-[#DF6E00]">
            <transition-group name="slide">
              <div v-for="(word, index) in [currentWord]" :key="word" class="inline-block absolute w-full text-left">
                {{ word }}
              </div>
            </transition-group>
          </div>
        </div>
        <div class=" text-[36px] Roboto font-[500] mt-[-32px]">{{ $t('paidAD.content2') }}</div>
      </div>
    </div>

    <!-- mobile -->
    <div id="paidAD">
      <div class="hidden mobile:flex mobile:flex-col px-[10%] gap-[2.5rem] mt-[30px]">
        <div class="text-[15px] text-center" v-html="$t('paidAD.mbContent')" />
        <img class="rounded-[2rem]" src="@/assets/img/light.png" alt="">
      </div>
    </div>

    <!-- 中間卡片區 desktop -->
    <div id="paidADCardList" class="flex flex-col items-center gap-[5rem] Roboto mobile:hidden bigScreen:justify-center">
      <div class="flex justify-evenly w-[100%] gap-[60px] max-w-[1200px]">
        <div v-for="(item) in 3" :key="item"
          class="bg-white border-[1px] border-[#C0C0C0] pt-[30px] px-[25px] rounded-[8px]">
          <img :src="`c${item}.png`.getImg()" alt="" class="rounded-[8px] object-contain">
          <div class="my-[1rem] flex flex-col justify-between h-auto gap-[14px]">
            <div class="flex flex-col gap-[14px]">
              <div
                class="w-max text-white bg-[#DF6E00] text-[11px] font-[300] border-[#DF6E00] border-[1px] border-solid px-[10px] py-[5px] rounded-full">
                {{ $t(`paidADList.card${item}.tag`) }}</div>
              <div class="min-h-[72px]">{{ $t(`paidADList.card${item}.content`) }}</div>
            </div>
            <div class="font-[600]">{{ $t(`paidADList.card${item}.title`) }}</div>
          </div>
        </div>
      </div>
      <div
        class="w-max text-white bg-[#DF6E00] border-[#DF6E00] font-light text-[15px] border-[1px] border-solid px-[39px] py-[10px] rounded-[3px] cursor-pointer">
        {{ $t('paidADList.more') }}</div>
    </div>

    <div id="feature" class="bigScreen:flex bigScreen:justify-center">
      <div class="flex justify-between my-[10rem] mobile:hidden max-w-[1200px] w-full">
        <div class="flex flex-col justify-evenly items-center gap-[6.5rem] w-[55%]">
          <div>
            <div class="text-[32px] font-[700]">{{ $t('feature.Boost.title') }}</div>
            <div class="text-[#545F71]" v-html="$t('feature.Boost.content')" />
          </div>
          <img class="h-[301px] w-[75%] object-cover rounded-[30px]" src="@/assets/img/light.png" alt="">
          <div>
            <div class="text-[32px] font-[700]">{{ $t('feature.More.title') }}</div>
            <div class="text-[#545F71]" v-html="$t('feature.More.content')" />
          </div>
        </div>
        <div class="flex flex-col justify-center items-center w-[45%] gap-[4.5rem]">
          <div class="text-[48px] leading-[1.2]" v-html="$t('feature.subTag')" />
          <div class="w-[360px]">
            <div class="text-[32px] font-[700] whitespace-nowrap">{{ $t('feature.Pay.title') }}</div>
            <div class="text-[#545F71]" v-html="$t('feature.Pay.content')" />
          </div>
        </div>
      </div>
      <div class="hidden mobile:flex flex-col my-[6rem]">
        <div class="text-[24px] Roboto text-center" v-html="$t('feature.mobile.title')" />
        <div class="flex flex-wrap">
          <div
            class="w-[45%] text-center m-[2.5%] font-light bg-white py-[24px] rounded-lg border-[1px] border-solid border-[#D8D8D8]"
            v-html="$t('feature.mobile.paid')" />
          <div
            class="w-[45%] text-center m-[2.5%] font-light bg-white py-[24px] rounded-lg border-[1px] border-solid border-[#D8D8D8]"
            v-html="$t('feature.mobile.Website')" />
          <div
            class="w-[45%] text-center m-[2.5%] font-light bg-white py-[24px] rounded-lg border-[1px] border-solid border-[#D8D8D8]"
            v-html="$t('feature.mobile.SMS')" />
          <div
            class="w-[45%] text-center m-[2.5%] font-light bg-white py-[24px] rounded-lg border-[1px] border-solid border-[#D8D8D8]"
            v-html="$t('feature.mobile.Local')" />
          <div
            class="w-[45%] text-center m-[2.5%] font-light bg-white py-[24px] rounded-lg border-[1px] border-solid border-[#D8D8D8]"
            v-html="$t('feature.mobile.Social')" />
          <div
            class="w-[45%] text-center m-[2.5%] font-light bg-white py-[24px] rounded-lg border-[1px] border-solid border-[#D8D8D8]"
            v-html="$t('feature.mobile.Graphic')" />
        </div>
        <div class="flex justify-center mt-[1.5rem] bg-[#DF6E00] text-white text-[18px] py-[0.5rem] rounded-lg">{{
          $t('feature.mobile.button') }}</div>
      </div>
    </div>
    <div id="solutions"
      class=" w-full h-[312px] flex flex-col justify-center items-center Roboto my-[2.5rem] mobile:hidden">
      <div class="bg-[#F0F0F0] flex flex-col justify-center items-center bigScreen:max-w-[1200px] w-full h-full">
        <div class="text-[#DF6E00] text-[36px] font-bold">{{ $t('Solutions.title') }}</div>
        <div class="w-[50%] text-center text-[#545F71] mt-[1rem]">{{ $t('Solutions.content') }}</div>
        <div
          @click="router.push('/contact')"
          class="bg-[#DF6E00] text-white border-[#DF6E00] border-[1px] border-solid px-[79px] py-[12px] rounded-[8px] cursor-pointer mt-[1.5rem]">
          {{ $t('Solutions.button') }}</div>
      </div>
    </div>

    <!-- How WAG works -->
    <div class="w-full items-center flex justify-between flex-col mt-[10rem]">
      <div class="flex flex-col items-center underMac:gap-[8px]">
        <span class="Roboto text-[32px] font-[500] leading-[56.25px] underMac:text-[24px] underMac:leading-[30px]">{{
          $t('howWagWorks.title') }}</span>
        <span class="text-[#545F71] leading-[22px] w-[80vw] underMac:text-center underMac:text-[15px] text-center">{{
          $t('howWagWorks.subTitle') }}</span>
      </div>
      <div
        class="flex gap-[60px] mt-[50px] justify-between underMac:flex-col underMac:w-full underMac:items-center">
        <div v-for="(card, idx) in cardData" :key="idx+'card'"
          class="flex flex-col gap-[20px] items-center w-[18.5rem]">
          <span class="text-[24px] font-light border-[1px] border-solid border-black rounded-full px-3">{{ idx + 1 }}</span>
          <div class="border-[1px] border-[#D8D8D8] rounded-[26px]">
            <img :src="`card${idx+1}.png`.getImg()" alt="" class="w-full">
            <div
              class="bg-white py-[20px] h-[125px] text-center font-[500] w-full rounded-br-[26px] rounded-bl-[26px] justify-center flex items-center leading-[1.2] mobile:p-0 mobile:h-[70px]"
              :class="{'px-[35px]': idx == 0}">
              {{ $t(`howWagWorks.${card.title}`) }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-[5rem] w-full bg-white py-[60px] rounded-[7px] flex items-center justify-center border-[#D8D8D8] border-[1px] bigScreen:max-w-[1200px] mobile:py-[30px]">
        <div class="w-full flex justify-evenly items-center underMac:hidden">
          <div class="flex flex-col gap-[20px]">
            <div class="text-[32px] leading-[36px] Roboto max-w-[384px]" v-html="$t('howWagWorks.contentTitle')" />
            <div
              class="Roboto leading-[21.09px] bg-[#DF6E00] flex py-[12px] px-[24px] w-fit rounded-[3px] text-white text-[15px] cursor-pointer max-w-[463px] font-light">
              {{ $t('howWagWorks.contentBtn') }}</div>
          </div>
          <div class="flex flex-col gap-[24px]">
            <div v-for="x in works" :key="x" class="flex gap-[9px]">
              <img :src="'mdi_star-circle.svg'.getImg()" alt="">
              <span>{{ $t(`howWagWorks.${x}`) }}</span>
            </div>
          </div>
        </div>
        <div class="hidden underMac:flex flex-col gap-[15px] px-[10%]">
          <div class="text-[20px] Roboto font-[400]">{{ $t('howWagWorks.titleM') }}</div>
          <div class="flex flex-col gap-[24px] mt-[12px]">
            <div v-for="x in worksM" :key="x" class="flex gap-[9px]">
              <img :src="'mdi_star-circle.svg'.getImg()" alt="">
              <span>{{ $t(`howWagWorks.${x}`) }}</span>
            </div>
          </div>
          <div
            class="mt-[20px] Roboto leading-[21.09px] bg-[#DF6E00] flex py-[12px] px-[24px] rounded-[8px] text-white text-[18px] cursor-pointer w-full justify-center">
            {{ $t('howWagWorks.contentBtn') }}</div>
        </div>
      </div>
    </div>

    <!-- Mobile: How We Make It Happen -->
    <div class="hidden miniPad:flex flex-col w-full items-center mt-[50px] mobile:mt-[90px]">
      <div class="w-[85vw] flex flex-col items-center">
        <span class="text-[24px] font-[400] Roboto">{{ $t('HowCard.title') }}</span>
        <Splide :options="{ rewind: true, arrows: false, width: '90vw' }" aria-label="My Favorite Images">
          <SplideSlide v-for="item in 3" :key="item">
            <div class="flex justify-center mt-[25px]">
              <div class="flex justify-evenly w-[90%] gap-[1.5rem] mb-[50px] mobile:mb-[20px]">
                <div class="bg-[#fff] pt-[30px] px-[25px] rounded-[8px]">
                  <img src="@/assets/img/light.png" alt="" class="rounded-[8px] object-contain">
                  <div class="my-[1rem] flex flex-col gap-[14px]">
                    <div
                      class="w-max text-[#DF6E00] bg-[#fff] text-[11px] font-[300] border-[#DF6E00] border-[1px] border-solid px-[10px] py-[5px] rounded-full">
                      {{ $t(`paidADList.card${item}.tag`) }}</div>
                    <div>{{ $t(`paidADList.card${item}.content`) }}</div>
                    <div class="font-[600]">{{ $t(`paidADList.card${item}.title`) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        </Splide>
        <div
          class="w-max text-[#DF6E00] bg-transparent border-[#DF6E00] text-[18px] border-[1px] border-solid px-[79px] py-[8px] rounded-[8px] cursor-pointer mt-[30px] mobile:mt-[10px]">
          {{ $t('HowCard.button') }}</div>
      </div>
    </div>

    <div id="sendEmail" class="flex justify-center items-center my-[5rem] mobile:hidden">
      <div class="flex items-center justify-evenly gap-[5rem] bg-white p-[5%] rounded-[8px] w-full bigScreen:max-w-[1200px]">
        <div class="text-[24px]" v-html="$t('sendEmail.title')" />
        <div class="flex flex-col gap-[0.5rem]">
          <div class="font-[700] text-[18px]">{{ $t('sendEmail.email') }}</div>
          <div class="flex relative">
            <inputText
              class="w-[450px] !border-[1px] !border-solid !border-[#D8D8D8] !p-2 !rounded-tl-md !rounded-bl-md h-[48px] inputTextChange"
              :modelValue="emailModel" :placeHolder="$t('sendEmail.placeholder')" />
            <div
              class="bg-[#DF6E00] text-white rounded-lg w-max px-[24px] py-[12px] absolute right-0 top-0 cursor-pointer">
              {{ $t('sendEmail.Subscribe') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden mobile:flex flex-col gap-[2rem] justify-center items-center my-[3rem] mobile:mt-[8rem]">
      <div class="w-full text-[20px]" v-html="$t('sendEmail.title')" />
      <div class="w-full flex border-b-[1px] border-solid border-[#7C7C7C] pb-1">
        <inputText class="w-[95%] inputTextChange" :modelValue="nameModel" :placeHolder="$t('footer.Contact.name')" />
      </div>
      <div class="w-full flex border-b-[1px] border-solid border-[#7C7C7C] pb-5">
        <inputText class="w-[95%] inputTextChange" :modelValue="emailModel" :placeHolder="$t('footer.Contact.email')" />
        <img class="w-[5%]" src="@/assets/img/arrowRight.svg" alt="">
      </div>
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

.inputTextChange::placeholder{
  color: #B4B4B4;
}
</style>
