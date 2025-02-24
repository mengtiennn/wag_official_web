<script lang="ts" setup>
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext'
import Password from "primevue/password";
import { computed, ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: String,
  },
	placeHolder: {
    type: String,
	},
	iconClass: {
    type: String,
  },
	stylePt: {
    type: Object,
	},
  isDisabled: {
    type: Boolean,
  }, 
  inputType: {
    type: String, 
    default: 'input'
  },
  captchaImg: {
    type: String
  }, 
  invalid: {
    type: Boolean,
    default: false
  },
  invalidText: {
    type: String
  }, 

})
const emit = defineEmits(['update:value', 'getCaptchaImg', 'onInputChange'])

let input = computed({
    get: () => props.value,
    set: (val) =>{
        emit('update:value', val)
    }
})
const eventClear = () => {
  emit('update:value', '')
}
</script>
<template>
    <IconField :iconPosition="'left'">
        <!-- password -->
        <Password v-if="props.inputType == 'password'" toggleMask :disabled="props.isDisabled" v-model="input" :feedback="false" :placeholder="props.placeHolder" :pt="props.stylePt" :invalid="props.invalid" />
        <!-- code -->
        <template v-else-if="props.inputType == 'code'">
          <div class="relative">
            <InputText :disabled="props.isDisabled" v-model="input" :placeHolder="props.placeHolder" :pt="props.stylePt"  :invalid="props.invalid"/>
            <div class="absolute flex right-[6px] top-[4px] cursor-pointer" @click="$emit('getCaptchaImg')">
              <img v-if="props.captchaImg"  class="h-[32px] object-contain" :src="props.captchaImg" alt="">
              <img src="@/assets/icon/Refresh.svg" alt=""/>
            </div>
          </div>
        </template>
        <!-- input -->
        <InputText v-else :disabled="props.isDisabled" v-model="input" :placeHolder="props.placeHolder" :pt="props.stylePt" :invalid="props.invalid" />
        
        <div v-if="input" class="absolute right-2 top-[calc(50%-7px)] cursor-pointer" :class="{'right-[32px]': props.inputType == 'password', 'right-[120px]': props.inputType == 'code' }" @click="eventClear">
            <img src="@/assets/icon/Close.svg" alt="clear input">
        </div>

        <InputIcon :class="iconClass"><slot name="icon"></slot></InputIcon>

    </IconField> 
    <span class="mt-[-20px] text-[#F23C47] text-body3" v-if="props.invalid">{{ props.invalidText }}</span>

</template>