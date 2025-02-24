<script setup lang="ts">
import { watch, onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button'
import { useRoute } from 'vue-router'
import { useDialog } from './dialog'
import { titleType } from '@/service/commonVmodel.ts'
import CustomFormItem from '@/components/formItem/customFormItem.vue'
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const props = defineProps({
  dialogShow: {
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
  }
})
const controller = new useDialog(t, locale, route, props.data)
const emit = defineEmits(['eventClickSendBtn'])
const eventClickSendBtn = (type: boolean) => {
  if(type){
    if(props.title !== titleType.delete){
    emit('eventClickSendBtn', type, props.title, controller.headerList.value)
    } else {
      emit('eventClickSendBtn', type, props.title, props.data[0].id)
    }
  } else {
    emit('eventClickSendBtn',type)
  }

}
</script>
<template>
  <Dialog :blockScroll="true" :closable="false" v-model:visible="props.dialogShow" modal :header="$t(`Common.${props.title}`)" :class="{'w-[60%]':props.title !== titleType.delete}" class="w-[30%]">
    <div v-if="props.title !== titleType.delete" class="flex flex-col gap-[1rem]">
      <div v-for="(item, index) in controller.headerList.value" :key="index" class="flex items-center" :class="{'!hidden': !item.value}">
        <div class="w-[25%]">{{ item.label }}</div>
        <CustomFormItem v-if="(typeof item.value !== 'object')" :data="item" class="w-[75%]" />
        <div class="w-[75%]" v-else>
          <div v-for="(item2, index2) in item.value" :key="index2">{{ item2 }}</div>
        </div>
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
          @click="eventClickSendBtn(true)" 
          class="bg-Primary text-white border-black border-[1px] border-solid px-[1rem] py-[0.5rem]"
        />
    </div>
  </Dialog>
</template>