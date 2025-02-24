<script setup lang="ts">
import Button from 'primevue/button'
import { computed } from 'vue';
const props = defineProps({
  styleType: {
    type: String
  },
  label: {
    type: String,
    default: '',
  },
  stylePt: {
    type: Object,
    default: {}
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['eventClickSendBtn'])
const sendBtn = (event) => {
  emit('eventClickSendBtn', event)
}
const ptStyle = computed(()=>{
  switch(props.styleType){
    case 'primary': 
      return {
        root: ({props, context})=>{
          return {class: [
            'text-h5 py-[5px]',
            {'bg-Primary text-white': !context.disabled},
            {'bg-DisableBG text-DisableText': context.disabled}
          ]}
        }
      }
    case 'secondary': 
      return {
        root: {
          class: 'bg-white border border-border text-h5 py-[5px]'
        }
      }
    case 'link': 
      return {
        root: {
          class: 'bg-transparent text-h5 py-[5px] text-Primary'
        }
      }
    default: 
      return props.stylePt
  }
})
</script>
<style>

</style>
<template>
    <Button :disabled="props.isDisabled" :pt="ptStyle" @click="sendBtn" :label="props.label" >
      <slot name="custom"></slot>
    </Button>
</template>