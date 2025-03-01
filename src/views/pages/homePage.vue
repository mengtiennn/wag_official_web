<script lang="ts" setup>
import inputText from 'primevue/inputtext'
import { ref } from "vue";
const gimmickList = ref([
  'first', 'second', 'third', 'fourth', 'fifth'
])

const emailModel = ref('')
</script>
<template>
  <div class="bg-[#F9F7F4] Roboto">
    <div id="gimmick" class="flex justify-evenly py-[2.5rem] mobile:overflow-auto">
      <div v-for="(item, index) in gimmickList" :key="index" class="text-center mobile:w-[50%]" v-html="$t(`Gimmick.${item}`)" />
    </div>
    <div id="paidAD" class="h-[150px] flex justify-center items-center Roboto my-[2.5rem] mobile:hidden">
      <div class="text-[40px]" v-html="$t('paidAD.content')"></div>
    </div>
    <div id="paidADCardList" class="flex flex-col justify-center items-center gap-[1.5rem] Roboto mobile:hidden">
      <div class="flex justify-evenly w-[80%] gap-[1.5rem]">
        <div v-for="(item) in 3" :key="item" class="bg-[#F0F0F0] pt-[30px] px-[25px] rounded-[8px]">
          <img src="@/assets/img/light.png" alt="" class="rounded-[8px] object-contain">
          <div class="my-[1rem] flex flex-col gap-[14px]">
            <div class="w-max text-[#DF6E00] text-[11px] font-[300] border-[#DF6E00] border-[1px] border-solid px-[10px] py-[5px] rounded-full">{{ $t(`paidADList.card${item}.tag`) }}</div>
            <div>{{ $t(`paidADList.card${item}.content`) }}</div>
            <div class="font-[600]">{{ $t(`paidADList.card${item}.title`) }}</div>
          </div>
        </div>
      </div>
      <div class="w-max text-[#DF6E00] border-[#DF6E00] border-[1px] border-solid px-[79px] py-[12px] rounded-[8px] cursor-pointer">{{ $t('paidADList.more') }}</div>
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
    <div id="solutions" class="bg-[#F0F0F0] w-full h-[312px] flex flex-col justify-center items-center gap-[1.5rem] Roboto my-[2.5rem] mobile:hidden">
      <div class="text-[#DF6E00] text-[40px] font-bold">{{ $t('Solutions.title') }}</div>
      <div class="w-[50%] text-center">{{ $t('Solutions.content') }}</div>
      <div class="text-[#DF6E00] border-[#DF6E00] border-[1px] border-solid px-[79px] py-[12px] rounded-[8px] cursor-pointer">{{ $t('Solutions.button') }}</div>
    </div>
    <div id="sendEmail" class="flex justify-center items-center my-[5rem] mobile:hidden">
      <div class="flex items-center justify-evenly gap-[10rem] bg-white p-[5rem] rounded-[8px]">
        <div class="text-[2rem]" v-html="$t('sendEmail.title')" />
        <div class="flex flex-col gap-[1.5rem]">
          <div class="font-[700] text-[18px]">{{ $t('sendEmail.email') }}</div>
          <inputText class="w-[500px] !border-[1px] !border-solid !border-[#D8D8D8] !p-2 !rounded-md" :modelValue="emailModel" :placeHolder="$t('sendEmail.placeholder')" />
          <div class="bg-[#DF6E00] text-white rounded-lg w-max px-[24px] py-[12px]">{{ $t('sendEmail.Subscribe') }}</div>
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
.Roboto{
  font-family: 'Roboto', sans-serif;
}
  
</style>