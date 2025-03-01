<script lang="ts" setup>
import { ref } from "vue";
</script>
<template>
  <div class="bg-[#F9F7F4] w-screen flex justify-center gap-[5rem] py-[5rem] Roboto mobile:hidden">
    <div class="flex flex-col gap-[6rem]">
      <img class="w-[166px] h-[76px] object-contain" src="@/assets/img/logo.svg" alt="logo">
      <div>{{ $t('footer.copyright') }}</div>
    </div>
    <div class=" border-[1px] border-black border-solid" />
    <div class="flex gap-[6rem]">
      <div>
        <div class="mb-[22px]">{{ $t('footer.company.title') }}</div>
        <div class="flex flex-col gap-[11px]">
          <div>{{ $t('footer.company.about') }}</div>
          <div>{{ $t('footer.company.blog') }}</div>
          <div>{{ $t('footer.company.careers') }}</div>
          <div>{{ $t('footer.company.terms') }}</div>
          <div>{{ $t('footer.company.privacy') }}</div>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <div>
          <div class="mb-[22px]">{{ $t('footer.contact.title') }}</div>
          <div class="flex flex-col gap-[11px]">
            <div>{{ $t('footer.contact.phone') }}</div>
            <div>{{ $t('footer.contact.email') }}</div>
          </div>
        </div>
        <div class="flex justify-center gap-4">
          <img class="cursor-pointer" src="@/assets/img/ig.svg" alt="">
          <img class="cursor-pointer" src="@/assets/img/fb.svg" alt="">
          <img class="cursor-pointer" src="@/assets/img/yt.svg" alt="">
          <img class="cursor-pointer" src="@/assets/img/red.svg" alt="">
        </div>
      </div>
    </div>
  </div>
  <div class="hidden mobile:block">
    <div>
      <div class="border-y-[2px] border-solid border-[#F7F7F7] py-[1rem] pl-10">{{ $t('footer.company.title') }}</div>
      <div class="flex flex-col gap-[11px] my-3">
        <div class="pl-10">{{ $t('footer.company.about') }}</div>
        <div class="pl-10">{{ $t('footer.company.blog') }}</div>
        <div class="pl-10">{{ $t('footer.company.careers') }}</div>
        <div class="pl-10">{{ $t('footer.company.terms') }}</div>
        <div class="pl-10">{{ $t('footer.company.privacy') }}</div>
      </div>
    </div>
    <div>
      <div class="border-y-[2px] border-solid border-[#F7F7F7] py-[1rem] pl-10">{{ $t('footer.contact.title') }}</div>
      <div class="flex flex-col gap-[11px] my-3">
        <div class="pl-10">{{ $t('footer.contact.phone') }}</div>
        <div class="pl-10">{{ $t('footer.contact.email') }}</div>
      </div>
    </div>
    <div class="flex justify-center gap-4 py-[2rem] bg-[#F0F0F0]">
      <img class="cursor-pointer" src="@/assets/img/ig.svg" alt="">
      <img class="cursor-pointer" src="@/assets/img/fb.svg" alt="">
      <img class="cursor-pointer" src="@/assets/img/yt.svg" alt="">
      <img class="cursor-pointer" src="@/assets/img/red.svg" alt="">
    </div>
    <div class="py-[1.5rem] text-center text-[12px]">{{ $t('footer.copyright') }}</div>
  </div>
</template>