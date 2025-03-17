<script lang="ts" setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const nowStep = ref(1)
const categories = ref([
  { id: 1, label: 'Restaurant' },
  { id: 2, label: 'Beverage Shops' },
  { id: 3, label: 'Medical Aesthetics' },
  { id: 4, label: 'Spa & Massage' },
  { id: 5, label: 'Interior Design' },
  { id: 6, label: 'Nail Salon' },
  { id: 7, label: 'Hair Salon' },
  { id: 8, label: 'Renovation Companies' },
  { id: 9, label: 'Others' },
  { id: 10, label: 'Professional Services' },
  { id: 11, label: 'Tattoo Studio' },
  { id: 12, label: 'Furniture & Building Materials' },
  { id: 13, label: 'Entertainment & Lifestyle' }
])
const options = ref([
  { id: 1, label: 'Paid Advertising' },
  { id: 2, label: 'Website Development' },
  { id: 3, label: 'SMS + Email Marketing' },
  { id: 4, label: 'Local Business Marketing' },
  { id: 5, label: 'Social Media Management' },
  { id: 6, label: 'Graphic Design' }
])
const challenges = ref([
  { id: 1, label: 'Insufficient Brand Exposure' },
  { id: 2, label: 'Difficulty Reaching Target Audience' },
  { id: 3, label: 'Low Customer Loyalty' },
  { id: 4, label: 'Intense Competition' },
  { id: 5, label: 'Negative Online Reviews and Reputation' },
  { id: 6, label: 'Difficulty with Digital Transformation' },
  { id: 7, label: 'Lack of Marketing Strategy and Planning' },
  { id: 8, label: 'Seasonal Sales Fluctuations' },
  { id: 9, label: 'High Advertising Costs' },
  { id: 10, label: 'Insufficient Website Traffic' }
])
const selectedOptions = ref([]);

const isSelected2 = (option) => {
  return selectedOptions.value.some(item => item.id === option.id);
};

const toggleOption = (option) => {
  if (isSelected2(option)) {
    selectedOptions.value = selectedOptions.value.filter(item => item.id !== option.id);
  } else {
    if (selectedOptions.value.length < 3) {
      selectedOptions.value.push(option);
    }
  }
};


const selectedCategory = ref(null)
const selectCategory = (category) => {
  if (selectedCategory.value && selectedCategory.value.id === category.id) {
    return
  }
  selectedCategory.value = category;
};

const clearSelection = () => {
  const prevCategory = selectedCategory.value.label;
  selectedCategory.value = null;
}

const goNextStep = () => {
  nowStep.value +=1
}
const goPrevStep = () => {
  nowStep.value -= 1
}

const selectedChallenges = ref([]);

const isSelected3 = (challenge) => {
  return selectedChallenges.value.some(item => item.id === challenge.id);
};

const toggleChallenge = (challenge) => {
  if (isSelected3(challenge)) {
    removeChallenge(challenge);
  } else {
    if (selectedChallenges.value.length < 3) {
      selectedChallenges.value.push(challenge);
    }
  }
};

// Remove a challenge from selection
const removeChallenge = (challenge) => {
  selectedChallenges.value = selectedChallenges.value.filter(item => item.id !== challenge.id);
}
const otherText = ref(null)

const tabledata = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  companyLocation: '',
  companyWebsite: ''
})
const isFormValid = computed(() => {
  return (
    tabledata.value.firstName.trim() !== '' &&
    tabledata.value.phone.trim() !== '' &&
    tabledata.value.email.trim() !== '' &&
    tabledata.value.companyLocation.trim() !== ''
  )
})
const goFinal = () => {
  nowStep.value = 5
}
const goHome = () => {
  router.push('/')
}
</script>
<template>
  <div class="w-screen h-screen bg-[#F5F5F5]">
    <div class="w-screen h-[calc(100vh-90.5px-105px)]">
      <!-- step1 -->
      <div class="flex flex-col items-center pt-[80px]" v-if="nowStep == 1">
        <span class="text-[36px]">Choose your industry</span>
        <div class="flex flex-wrap gap-[25px] justify-center max-w-[500px] mt-[50px]">
          <div v-for="(category, index) in categories" :key="index"
            class="rounded-[8px] px-4 py-2 border border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center"
            :class="{ '!border-[#DF6E00] bg-white text-[#DF6E00]': selectedCategory && selectedCategory.id === category.id }"
            @click="selectCategory(category)">
            <span class="text-sm md:text-base font-medium">{{ category.label }}</span>
          </div>
        </div>
      </div>



      <!-- step2 -->
      <div v-if="nowStep == 2" class="flex flex-col items-center pt-[100px]">
        <span class="text-[36px]">Marketing Services You’re Interested In</span>
        <span class="text-[#818181] text-[13px] font-[300] mt-[6px]">Select up to 3</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[633px] mt-[49px]">
          <div v-for="(option, index) in options" :key="index"
            class="rounded-[8px] px-4 py-2 border border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center"
            :class="{ '!border-[#DF6E00] bg-white text-[#DF6E00]': isSelected2(option) }" @click="toggleOption(option)">
            <span class="text-lg font-medium">{{ option.label }}</span>
          </div>
        </div>
      </div>

      <!-- step 3 -->
      <div v-if="nowStep == 3" class="flex flex-col items-center pt-[30px]">
        <span class="text-[36px]">Current Challenges</span>
        <span class="text-[#818181] text-[13px] font-[300] mt-[6px]">This will help us gain a better understanding of
          your business.<br />(Select up to 3)</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[700px] mt-[49px]">
          <div v-for="(option, index) in challenges" :key="index"
            class="rounded-[8px] px-4 py-2 border border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center"
            :class="{ '!border-[#DF6E00] bg-white text-[#DF6E00]': isSelected3(option) }"
            @click="toggleChallenge(option)">
            <span class="text-lg font-medium">{{ option.label }}</span>
          </div>
        </div>
        <Textarea id="description" v-model="otherText" placeholder="Others"
          class="w-[700px] h-[104px] mt-[29px] px-[10px] py-[15px]" />
      </div>

      <!-- step 4 -->
      <div v-if="nowStep == 4" class="flex flex-col items-center pt-[30px]">
        <div class="w-[60%] mt-[50px] flex flex-col gap-[2rem] mobile:w-[90%]">
          <div class="flex gap-[32px] mobile:flex-col">
            <div class="flex flex-col gap-2 w-[50%] mobile:w-full">
              <div><span class="text-red-400">*</span>{{ $t('Contact.firstName') }}</div>
              <InputText v-model="tabledata.firstName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
            </div>
            <div class="flex flex-col gap-2 w-[50%] mobile:w-full">
              <div><span class="text-red-400">*</span>{{ $t('Contact.lastName') }}</div>
              <InputText v-model="tabledata.lastName" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div><span class="text-red-400">*</span>{{ $t('Contact.phone') }}</div>
            <InputText v-model="tabledata.phone" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
          </div>
          <div class="flex flex-col gap-2">
            <div><span class="text-red-400">*</span>{{ $t('Contact.email') }}</div>
            <InputText v-model="tabledata.email" class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
          </div>
          <div class="flex flex-col gap-2">
            <div><span class="text-red-400">*</span>Company location</div>
            <InputText v-model="tabledata.companyLocation"
              class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
          </div>
          <div class="flex flex-col gap-2">
            <div>Company website</div>
            <InputText v-model="tabledata.companyWebsite"
              class="h-[40px] !border-[1px] !border-solid !border-[#252525]" />
          </div>
        </div>
        <Button :disabled="!isFormValid" @click="goFinal()"
          pt:root="!bg-[#DF6E00] text-white w-[60%] text-center py-[1rem] mt-[39px] cursor-pointer Roboto font-[700] mobile:w-[90%]">SEND</Button>
      </div>

      <!-- step 5 -->
      <div v-if="nowStep == 5" class="flex items-center flex-col pt-[120px]">
        <img src="@/assets/img/final.svg" alt="">
        <div class="mt-[13px] text-[14px] font-[300] text-[#000000] text-center">Thank you for your submission! We have received
          your information and will get in touch within 3 business
          days.<br />
          If you have any urgent inquiries, feel free to contact us. We look forward to working with you!</div>
        <div class="text-[#DF6E00] underline text-[14px] font-[300] mt-[34px] cursor-pointer" @click="goHome()">back to Home Page</div>
      </div>
    </div>


    <div class="flex flex-col" v-if="nowStep != 5">
      <div class="flex gap-[3px] justify-center">
        <div class="w-[calc((100%-12px)/4)] h-[7px] bg-[#D8D8D8]" v-for="step in 4"
          :class="{ '!bg-[#DF6E00]': step == nowStep}"></div>
      </div>
      <div class="flex w-full items-center justify-between py-[31px] px-[30px]" :class="{'!justify-end': nowStep == 1}">
        <img src="@/assets/img/arrow-right.svg" alt="" class="cursor-pointer" @click="goPrevStep()" v-if="nowStep > 1">
        <div @click="goNextStep()" v-if="nowStep < 4"
          class="w-[112px] h-[35px] bg-[#DF6E00] font-bold text-[#ffffff] flex justify-center items-center rounded-[8px] cursor-pointer">
          {{ $t('Step.btn') }}</div>
      </div>
    </div>
  </div>
</template>