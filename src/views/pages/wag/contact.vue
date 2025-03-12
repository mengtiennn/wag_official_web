<template>
  <div class="h-full mt-[8rem] mb-[15rem] flex flex-col justify-center items-center mobile:!mt-[2rem] mobile:!mb-0">
    <div class="w-[60%] mobile:w-[90%]">
      <div class="Roboto font-[500] text-[36px] mobile:text-[20px]">{{ $t('Contact.title') }}</div>
      <div class="Roboto font-[500] text-[36px] mobile:text-[20px] leading-[1]" v-html="$t('Contact.subTitle')" />
    </div>
    <div class="w-[60%] mt-[50px] flex flex-col gap-[2rem] mobile:w-[90%]">
      <div class="flex gap-[32px] mobile:flex-col">
        <div class="flex flex-col gap-2 w-[50%] mobile:w-full">
          <div>{{ $t('Contact.firstName') }}<span class="text-red-400">*</span></div>
          <InputText v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
        </div>
        <div class="flex flex-col gap-2 w-[50%] mobile:w-full">
          <div>{{ $t('Contact.lastName') }}</div>
          <InputText v-model="tabledata.lastName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div>{{ $t('Contact.phone') }}<span class="text-red-400">*</span></div>
        <InputText v-model="tabledata.phone" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
      </div>
      <div class="flex flex-col gap-2">
        <div>{{ $t('Contact.email') }}<span class="text-red-400">*</span></div>
        <InputText v-model="tabledata.email" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
      </div>
      <div class="flex flex-col gap-2">
        <div>{{ $t('Contact.marketToContact') }}<span class="text-red-400">*</span></div>
        <Select
         v-model="tabledata.contact" 
         :options="markets" 
         optionLabel="name" 
         class="h-[40px] !border-[1px] !border-solid !border-[#252525]"
         pt:dropdown="!w-[50px]"
         pt:listcontainer="bg-white"
         pt:option="my-[5px]"
          />
      </div>
      <div class="flex flex-col gap-2">
        <div>{{ $t('Contact.message') }}<span class="text-red-400">*</span></div>
        <Textarea 
        v-model="tabledata.message" 
        class="h-[40px] !border-[1px] !border-solid !border-[#252525]" 
        pt:root="!h-[236px]"
        />
      </div>
    </div>
    <Button
    :disabled="!isFormValid"
     pt:root="!bg-[#DF6E00] text-white w-[60%] text-center py-[1rem] mt-[39px] cursor-pointer Roboto font-[700] mobile:w-[90%]" >SEND</Button>
    <div class="w-full bg-[#F0F0F0] hidden mobile:flex flex-col gap-[2rem] justify-center items-center mt-[3rem] py-[5rem]">
      <div class="w-[90%] text-[20px]" v-html="$t('sendEmail.title')" />
      <div class="w-[90%] flex border-b-[1px] border-solid border-[#7C7C7C] pb-1">
        <inputText class="w-[95%]" :modelValue="nameModel" :placeHolder="$t('sendEmail.placeholder')" />
      </div>
      <div class="w-[90%] flex border-b-[1px] border-solid border-[#7C7C7C] pb-1">
        <inputText class="w-[95%]" :modelValue="emailModel" :placeHolder="$t('sendEmail.placeholder')" />
        <img class="w-[5%]" src="@/assets/img/arrowRight.svg" alt="">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea';
import { computed, ref } from "vue";
const tabledata = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  contact: null,
  message: ''
})
const emailModel = ref('')
const nameModel = ref('')
const markets = ref([
  { name: 'Alabama', value: 'Alabama' },
  { name: 'Alaska', value: 'Alaska' },
  { name: 'Arizona', value: 'Arizona' },
  { name: 'Arkansas', value: 'Arkansas' },
  { name: 'California', value: 'California' },
  { name: 'Colorado', value: 'Colorado' },
  { name: 'Connecticut', value: 'Connecticut' },
  { name: 'Delaware', value: 'Delaware' },
  { name: 'Florida', value: 'Florida' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Hawaii', value: 'Hawaii' },
  { name: 'Idaho', value: 'Idaho' },
  { name: 'Illinois', value: 'Illinois' },
  { name: 'Indiana', value: 'Indiana' },
  { name: 'Iowa', value: 'Iowa' },
  { name: 'Kansas', value: 'Kansas' },
  { name: 'Kentucky', value: 'Kentucky' },
  { name: 'Louisiana', value: 'Louisiana' },
  { name: 'Maine', value: 'Maine' },
  { name: 'Maryland', value: 'Maryland' },
  { name: 'Massachusetts', value: 'Massachusetts' },
  { name: 'Michigan', value: 'Michigan' },
  { name: 'Minnesota', value: 'Minnesota' },
  { name: 'Mississippi', value: 'Mississippi' },
  { name: 'Missouri', value: 'Missouri' },
  { name: 'Montana', value: 'Montana' },
  { name: 'Nebraska', value: 'Nebraska' },
  { name: 'Nevada', value: 'Nevada' },
  { name: 'New Hampshire', value: 'New Hampshire' },
  { name: 'New Jersey', value: 'New Jersey' },
  { name: 'New Mexico', value: 'New Mexico' },
  { name: 'New York', value: 'New York' },
  { name: 'North Carolina', value: 'North Carolina' },
  { name: 'North Dakota', value: 'North Dakota' },
  { name: 'Ohio', value: 'Ohio' },
  { name: 'Oklahoma', value: 'Oklahoma' },
  { name: 'Oregon', value: 'Oregon' },
  { name: 'Pennsylvania', value: 'Pennsylvania' },
  { name: 'Rhode Island', value: 'Rhode Island' },
  { name: 'South Carolina', value: 'South Carolina' },
  { name: 'South Dakota', value: 'South Dakota' },
  { name: 'Tennessee', value: 'Tennessee' },
  { name: 'Texas', value: 'Texas' },
  { name: 'Utah', value: 'Utah' },
  { name: 'Vermont', value: 'Vermont' },
  { name: 'Virginia', value: 'Virginia' },
  { name: 'Washington', value: 'Washington' },
  { name: 'West Virginia', value: 'West Virginia' },
  { name: 'Wisconsin', value: 'Wisconsin' },
  { name: 'Wyoming', value: 'Wyoming' },
  { name: 'Others', value: 'Others' }
]);
const isFormValid = computed(() => {
  return (
    tabledata.value.firstName.trim() !== '' &&
    tabledata.value.phone.trim() !== '' &&
    tabledata.value.email.trim() !== '' &&
    tabledata.value.contact !== null &&
    tabledata.value.message.trim() !== ''
  )
})
</script>
<style lang="scss" scoped>
.Roboto {
  font-family: 'Roboto', sans-serif;
}
</style>