<script lang="ts" setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import Step from 'primevue/step'
const router = useRouter()
const nowStep = ref(1)
const categories = ref([
  { id: 1, label: 'Restaurant' },
  { id: 2, label: 'BeverageShops' },
  { id: 3, label: 'MedicalAesthetics' },
  { id: 4, label: 'SpaMassage' },
  { id: 5, label: 'InteriorDesign' },
  { id: 6, label: 'NailSalon' },
  { id: 7, label: 'ProfessionalServices' },
  { id: 8, label: 'RenovationCompanies' },
  { id: 9, label: 'HairSalon' },
  { id: 10, label: 'Furniture&BuildingMaterials' },
  { id: 11, label: 'Entertainment&Lifestyle' },
  { id: 12, label: 'TattooStudio' },
  { id: 13, label: 'Others' }
])
const options = ref([
  { id: 1, label: 'PaidAdvertising' },
  { id: 2, label: 'WebsiteDevelopment' },
  { id: 3, label: 'SMSMarketing' },
  { id: 4, label: 'LocalBusinessMarketing' },
  { id: 5, label: 'SocialMediaManagement' },
  { id: 6, label: 'GraphicDesign' }
])
const challenges = ref([
  { id: 1, label: 'InsufficientBrandExposure' },
  { id: 2, label: 'DifficultyReachingTargetAudience' },
  { id: 3, label: 'LowCustomerLoyalty' },
  { id: 4, label: 'IntenseCompetition' },
  { id: 5, label: 'NegativeOnlineReviewsandReputation' },
  { id: 6, label: 'DifficultywithDigitalTransformation' },
  { id: 7, label: 'LackofMarketingStrategyandPlanning' },
  { id: 8, label: 'SeasonalSalesFluctuations' },
  { id: 9, label: 'HighAdvertisingCosts' },
  { id: 10, label: 'InsufficientWebsiteTraffic' }
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
  if (selectedCategory.value == null && nowStep.value == 1) return
  if (selectedOptions.value.length == 0 && nowStep.value == 2) return
  if (selectedChallenges.value.length == 0 && nowStep.value == 3) return
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

const nextDisable = computed(() => {
  if (selectedCategory.value == null && nowStep.value == 1) return true
  if (selectedOptions.value.length == 0 && nowStep.value == 2) return true
  if (selectedChallenges.value.length == 0 && nowStep.value == 3) return true
})
</script>
<template>
  <div class="w-screen bg-[#F5F5F5] h-[calc(100vh-90px)]">
    <div class="w-screen h-[calc(100vh-90.5px-105px)]"
      :class="[nowStep === 5 ? 'h-[calc(100vh-90px)] flex items-center justify-center' : 'h-[calc(100vh-90.5px-105px)]']">
      <!-- step1 -->
      <div class="flex flex-col items-center pt-[80px] miniPad:pt-[12px]" v-if="nowStep == 1">
        <span class="text-[36px] miniPad:text-[24px]">{{ $t('Step.Step1.title') }}</span>
        <div class="grid grid-cols-3 gap-6 max-w-7xl mt-[50px] miniPad:mt-[20px] px-4 miniPad:grid-cols-2">
          <div v-for="(category, index) in categories.slice(0, categories.length - 1)" :key="index"
            class="rounded-[8px] border w-[230px] h-[52px] miniPad:w-[167px] miniPad:h-[52px] border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center flex justify-center items-center text-[14px] miniPad:text-[13px]"
            :class="{ 'border-[#DF6E00] text-[#DF6E00]': selectedCategory && selectedCategory.id === category.id }"
            @click="selectCategory(category)">
            {{ $t(`Step.Step1.${category.label}`) }}
          </div>
          <div
            class="col-span-3 miniPad:col-span-2 rounded-[8px] h-[52px] border border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center flex justify-center items-center text-[14px] miniPad:text-[13px]"
            :class="{ 'border-[#DF6E00] text-[#DF6E00]': selectedCategory && selectedCategory.id === categories[categories.length - 1].id }"
            @click="selectCategory(categories[categories.length - 1])">
            {{ $t(`Step.Step1.${categories[categories.length - 1].label}`) }}
          </div>
        </div>
      </div>



      <!-- step2 -->
      <div v-if="nowStep == 2" class="flex flex-col items-center pt-[100px] miniPad:pt-[40px]">
        <span class="text-[36px] miniPad:text-[24px] miniPad:max-w-[336px] text-center">{{ $t('Step.Step2.title')
          }}</span>
        <span class="text-[#818181] text-[13px] font-[300] mt-[6px]">{{ $t('Step.Step2.subTitle') }}</span>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[49px] miniPad:mt-[20px]">
          <div v-for="(option, index) in options" :key="index"
            class="rounded-[8px] w-[365px] miniPad:w-[294px] h-[52px] border border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center flex justify-center items-center"
            :class="{ '!border-[#DF6E00] bg-white text-[#DF6E00]': isSelected2(option) }" @click="toggleOption(option)">
            <span class="font-[400] text-[14px] miniPad:text-[13px]">{{ $t(`Step.Step2.${option.label}`) }}</span>
          </div>
        </div>
      </div>

      <!-- step 3 -->
      <div v-if="nowStep == 3" class="flex flex-col items-center pt-[30px] miniPad:pt-[12px]">
        <span class="text-[36px] miniPad:text-[24px]">{{ $t('Step.Step3.title') }}</span>
        <span class="text-[#818181] text-[13px] font-[300] mt-[6px]">{{ $t('Step.Step3.subTitle') }}</span>
        <span class="text-[#818181] text-[13px] font-[300] mt-[6px]">{{ $t('Step.Step3.subTitleB') }}</span>
        <div class="grid grid-cols-2 miniPad:grid-cols-2 gap-4 mt-[30px]">
          <div v-for="(option, index) in challenges" :key="index"
            class="rounded-[8px] w-[365px] miniPad:w-[167px] h-[52px] flex justify-center items-center border border-[#D7D7D7] bg-white cursor-pointer transition-all duration-200 text-center"
            :class="{ '!border-[#DF6E00] bg-white text-[#DF6E00]': isSelected3(option) }"
            @click="toggleChallenge(option)">
            <span class="text-[14px] font-[400]">{{ $t(`Step.Step3.${option.label}`) }}</span>
          </div>
        </div>
        <Textarea id="description" v-model="otherText" :placeholder="$t('Step.Step3.others')"
          class="w-[746px] miniPad:w-[353px] h-[104px] mt-[29px] px-[10px] py-[15px] border-[1px] border-[#D7D7D7] rounded-[8px]" />
      </div>

      <!-- step 4 -->
      <div v-if="nowStep == 4" class="flex flex-col items-center">
        <div class="w-[60%] mt-[30px] flex flex-col gap-[2rem] miniPad:w-[90%] miniPad:mt-[12px] miniPad:gap-[8px]">
          <span class="text-[36px] text-center miniPad:text-[24px] miniPad:mb-[12px]">{{ $t('Step.Step4.title') }}</span>
          <div class="flex gap-[32px] w-full miniPad:gap-[12px] miniPad:justify-between">
            <div class="flex flex-col gap-2 w-[50%] miniPad:w-[calc((100%/2)-12px)]">
              <div><span class="text-red-400">*</span>{{ $t('Contact.firstName') }}</div>
              <InputText v-model="tabledata.firstName"
                class="h-[40px] !border-[1px] !border-solid !border-[#D7D7D7] !bg-white !rounded-[8px]" />
            </div>
            <div class="flex flex-col gap-2 w-[50%] miniPad:w-[calc((100%/2)-12px)]">
              <div><span class="text-red-400">*</span>{{ $t('Contact.lastName') }}</div>
              <InputText v-model="tabledata.lastName"
                class="h-[40px] !border-[1px] !border-solid !border-[#D7D7D7] !bg-white !rounded-[8px]" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div><span class="text-red-400">*</span>{{ $t('Contact.phone') }}</div>
            <InputText v-model="tabledata.phone"
              class="h-[40px] !border-[1px] !border-solid !border-[#D7D7D7] !bg-white !rounded-[8px]" />
          </div>
          <div class="flex flex-col gap-2">
            <div><span class="text-red-400">*</span>{{ $t('Contact.email') }}</div>
            <InputText v-model="tabledata.email"
              class="h-[40px] !border-[1px] !border-solid !border-[#D7D7D7] !bg-white !rounded-[8px]" />
          </div>
          <div class="flex flex-col gap-2">
            <div><span class="text-red-400">*</span>{{ $t('Step.Step4.companyLocation') }}</div>
            <InputText v-model="tabledata.companyLocation"
              class="h-[40px] !border-[1px] !border-solid !border-[#D7D7D7] !bg-white !rounded-[8px]" />
          </div>
          <div class="flex flex-col gap-2">
            <div>{{ $t('Step.Step4.companyWebsite') }}</div>
            <InputText v-model="tabledata.companyWebsite"
              class="h-[40px] !border-[1px] !border-solid !border-[#D7D7D7] !bg-white !rounded-[8px]" />
          </div>
        </div>
        <Button :disabled="!isFormValid" @click="goFinal()"
          pt:root="!bg-[#DF6E00] text-white w-[60%] text-center py-[1rem] mt-[39px] cursor-pointer Roboto font-[700] mobile:w-[90%]">{{
          $t('Step.Step4.send') }}</Button>
      </div>

      <!-- step 5 -->
      <div v-if="nowStep == 5" class="flex items-center flex-col">
        <img src="@/assets/img/final.svg" alt="">
        <div class="mt-[13px] text-[14px] font-[300] text-[#000000] text-center miniPad:w-[272px] italic" v-html="$t('Step.Step5.content')" />
        <div class="text-[#DF6E00] underline text-[14px] font-[300] mt-[14px] cursor-pointer" @click="goHome()">{{
          $t('Step.Step5.back') }}</div>
      </div>
    </div>


    <div class="flex flex-col" v-if="nowStep != 5">
      <div class="flex gap-[3px] justify-center">
        <div class="w-[calc((100%-12px)/4)] h-[7px] bg-[#D8D8D8]" v-for="step in 4"
          :class="{ '!bg-[#DF6E00]': step < nowStep+1}"></div>
      </div>
      <div class="flex w-full items-center justify-between py-[31px] px-[30px]"
        :class="{ '!justify-end': nowStep == 1 }">
        <img src="@/assets/img/arrow-right.svg" alt="" class="cursor-pointer" @click="goPrevStep()" v-if="nowStep > 1">
        <div @click="goNextStep()" v-if="nowStep < 4"
          class="w-[112px] h-[35px] bg-[#DF6E00] font-[300] text-[#ffffff] flex justify-center items-center rounded-[8px] cursor-pointer"
          :class="{ 'bg-gray-400': nextDisable }">
          {{ $t('Step.btn') }}</div>
      </div>
    </div>
  </div>
</template>