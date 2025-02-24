<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import { useRoute } from 'vue-router'
import { useDialog } from '@/components/commonProblemList/dialog'
import { titleType } from '@/service/commonVmodel.ts'
import CustomFormItem from '@/components/formItem/customFormItem.vue'
import { keyValue } from '@/components/commonProblemList/dialogVmodel';
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default: {}
  },
  helpTypeList: {
    type: Array<keyValue>
  }
})
const controller = new useDialog(t, locale, route, props.data, props.title, props.helpTypeList)
const emit = defineEmits(['eventClickSendBtn', 'update:visible'])
const eventClickSendBtn = (type: boolean) => {
  if(type){
    if(props.title !== titleType.delete){
      emit('eventClickSendBtn', type, props.title, controller.headerList.value)
    } else {
      emit('eventClickSendBtn', type, props.title, props.data.id)
    }
  } else {
    emit('eventClickSendBtn',type)
  }
}
</script>
<template>
  <Dialog :blockScroll="true" :closable="false" v-model:visible="props.visible" modal :header="$t(`Common.${props.title}`)" :class="{'w-[60%]':props.title !== titleType.delete}" class="w-[30%]">
    <div v-if="props.title !== titleType.delete" class="flex flex-col gap-[1rem]">
      <div v-for="(item, index) in controller.headerList.value" :key="index" class="flex items-center" :class="{'!hidden': (!item.value && item.value !== false && item.value !== '') && props.title !== titleType.add}">
        <div class="w-[20%]">{{ item.label }}</div>
        <CustomFormItem :data="item" class="w-[80%]" />
      </div>
    </div>
    <div v-else>
      <div>確認要刪除嗎</div>
    </div>
    <div class="flex justify-end gap-2 mt-[1rem]">
        <Button 
          class="bg-white text-Primary border-Primary border-[1.5px] border-solid px-[1rem] py-[0.5rem]" 
          label="取消" 
          @click="eventClickSendBtn(false)" 
        />
        <Button 
          label="確認" 
          :disabled="controller.verificationCheck()"
          @click="eventClickSendBtn(true)" 
          class="bg-Primary text-white border-black border-[1px] border-solid px-[1rem] py-[0.5rem]"
        />
    </div>
  </Dialog>
</template>