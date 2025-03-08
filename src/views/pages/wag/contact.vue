<template>
  <div class="h-full my-[10rem] flex flex-col justify-center items-center">
    <div class="w-[60%]">
      <div class="Roboto font-[500] text-[36px]">Grow Your Brand Online</div>
      <div class="Roboto font-[500] text-[36px]">Start a Conversation with Us Today!</div>
    </div>
    <div class="w-[60%] mt-[50px] flex flex-col">
      <div class="flex gap-[32px]">
        <div class="flex flex-col w-[50%]">
          <div>First Name</div>
          <InputText v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
        </div>
        <div class="flex flex-col w-[50%]">
          <div>Last Name</div>
          <InputText v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
        </div>
      </div>
      <div class="flex flex-col">
        <div>Phone</div>
        <InputText v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
      </div>
      <div class="flex flex-col">
        <div>Email</div>
        <InputText v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
      </div>
      <div class="flex flex-col">
        <div>Market to contact</div>
        <Select
         v-model="tabledata.firstName" 
         :options="markets" 
         optionLabel="name" 
         class="h-[40px] !border-[1px] !border-solid !border-[#252525]"
         pt:dropdown="!w-[50px]"
         pt:listcontainer="bg-white"
         pt:option="my-[5px]"
          />
      </div>
      <div class="flex flex-col">
        <div>Message</div>
        <Textarea v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea';
import { ref } from "vue";
const tabledata = ref({
  firstName: ''
})
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
</script>
<style lang="scss" scoped>
.Roboto {
  font-family: 'Roboto', sans-serif;
}
</style>