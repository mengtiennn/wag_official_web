<script setup lang="ts">
import { watch, onMounted, ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import { useRoute } from 'vue-router'
import { formType } from '@/service/commonVmodel'
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { useFormItemStyle } from './formItem'
const controller = new useFormItemStyle()
const props = defineProps({
  data: {
    type: Object,
  }
})
const item  = computed(() => props.data)
const emit = defineEmits([''])
</script>
<template>
  <div>
    <div v-if="item.type == formType.common">{{ item.value }}</div>
    <InputText 
      :disabled="item.isdisabled" v-if="item.type == formType.text" type="text" v-model="item.value"
      :pt="controller.inputTextStyleOption.value" 
    />
    <Textarea  
      v-if="item.type == formType.textarea"
      v-model="item.value" rows="5" cols="30"
      :pt="controller.textareaTextStyleOption.value" 
    />
    <InputSwitch 
      v-if="item.type == formType.switch"
      v-model="item.value" />
    <InputNumber 
      v-if="item.type == formType.number"
      v-model="item.value"
      :pt="controller.inputNumberTextStyleOption.value" />
    <Dropdown 
      v-if="item.type == formType.dropdown"
      v-model="item.value" 
      :options="item.option" 
      optionLabel="value" 
      :placeholder="`${$t('Common.choose')}${item.label}`" 
      class="w-full" />
  </div>
</template>