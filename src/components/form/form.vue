<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import IconField from 'primevue/iconfield'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { InputNumberInputEvent } from 'primevue/inputnumber'
// import InputOtp from 'primevue/inputotp'
import InputGroup from 'primevue/inputgroup'
import InputMask from 'primevue/inputmask'
import Chips from 'primevue/chips'
import CustomLabel from '@/components/form/components/label.vue'
import ErrorText from '@/components/form/components/errorText.vue'
import { FormItem, FormItemType } from '@/service/form.vmodel.ts'
import { useForm } from '@/composables/useForm.ts'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const {
    styleOptionButton,
    styleOptionInputText,
    styleOptionInputNumber,
    styleOptionInputMask,
    styleOptionDropdown,
    styleOptionCalendar,
    styleOptionChips,
    isAllRequiredInputFilled,
    getAllInputData,
    formattedCalendarDate,
    // swapSelectTransferVal,
} = useForm()


const props = defineProps({
    formItems: {
        type: Array as () => FormItem[],
        required: true
    },
    submitBtnTitle: {
        type: String,
    },
    isBtnLoading: {
        type: Boolean,
        default: false,
    },
    isBtnDisabled: {
        type: Boolean,
        default: false,
    },
    checkAgreeKnow: {
        type: Boolean,
        required: false,
    },
    useAgreeKnow: {
        type: Boolean,
        required: false,
    },
    phoneCheckError: {
        type: Boolean,
        required: false,
        default: false,
    },
    verificationCodeCheck: {
        type: Boolean,
        required: false,
    }
})


const allInputData = computed(() => getAllInputData(props.formItems))

const isAllFilled = computed(() => isAllRequiredInputFilled(props.formItems))


const emit = defineEmits(['submit', 'change', 'volume', 'sendCaptcha', 'refreshCaptcha', 'isAllFilled', 'clearOTPCode', 'swapSelectTransferVal'])

watch(() => isAllFilled.value,
    (newValue, oldValue) => {
        emit('isAllFilled', newValue)

    }
)

const submit = () => {
    console.log('form.submit', { isAllFilled: isAllFilled.value, modelData: allInputData.value })

    emit('submit', {
        isAllFilled: isAllFilled.value,
        modelData: allInputData.value
    })
}

const updateDropdown = (val: any) => {
    console.log('updateDropdown', val)
    // emit('change', val)
}

const updateCalendar = (val, id) => {
    console.log('updateCalendar', val)
    var e = {};
    e['targetName'] = id;
    e['value'] = val;
    emit('change', e);
}

const updateInput = (val, id) => {
    // console.log('updateInputText', val)
    // console.log('id', id)
    var e = {};
    e['targetName'] = id;
    e['value'] = val;
    emit('change', e);
    //emit('change', val)
}

// const updateInputNumber = (val: number) => {
//     console.log('updateInputNumber', val)

//     //emit('change', val)
// }

// const updateInputMask = (val: string) => {
//     console.log('updateInputMask', val)

//     //emit('change', val)
// }

const updateInputNumberOnTyping = (event: InputNumberInputEvent) => {
    const { value } = event
    console.log('updateInputNumberOnTyping', value)

    //emit('change', value)
}

const sendSMSVerificationCode = (code) => {
    //console.log('sendSMSVerificationCode', code)
    emit('sendCaptcha', code)
}

const clickSoundIcon = (e, item) => {

    emit('volume', e, item)
}
const refreshCaptcha = (e, item) => {

    emit('refreshCaptcha', e, item)
}

const change = (e, id) => {
    e['targetName'] = id;

    emit('change', e);
}

const getList = (item) => {
    if (item.options == null)
        return item.lists;
    else
        return item.options();
}



const clearOTPCode = (formItem) => {
    emit('clearOTPCode', formItem);
}

const getDisabledOption = (data: any) => {

    return false;
}

const swapSelectTransferVal = (formItem) => {
    emit('swapSelectTransferVal', swapSelectTransferVal);
}

const verification = (formItem, $event) => {
    //console.log("verificationaaaa", formItem);
    if (formItem.verification != null) {
        formItem.verification(formItem, $event);
    }

}

const disabledDates = (formItem) => {
    if (formItem.disabledDates != null) {
        formItem.disabledDates(formItem,);
        return formItem.disabledDates(formItem);
    }
}

</script>

<template>
    <form @submit.prevent="submit">
        <div class="grid grid-cols-2 gap-[1.25rem] py-[1.25rem] mobile:grid-cols-1">
            <template v-for="(formItem, index) in props.formItems" :key="formItem.type + index">
                <div v-if="formItem.type === FormItemType.DropdownSelectSwapVal"
                    class="col-span-2 grid grid-cols-11 mobile:col-span-1 mobile:grid mobile:gap-y-[1.25rem] mobile:grid-cols-8">
                    <div class="col-span-5 mobile:col-span-7 relative 321" :id="`form-${formItem.id}`">
                        <CustomLabel :for="formItem.id" :title="$t(formItem.label)" :iconURL="formItem.labelIconURL"
                            :iconHoverURL="formItem.labelIconHoverURL" :iconTooltip="formItem.labelIconTooltip"
                            :isRequired="formItem.isRequired" />
                        <Dropdown class="w-full h-[2.75rem]" optionLabel="name" v-model="formItem.value"
                            :id="`form-Dropdown-${formItem.id}`" v-bind="formItem.props" :inputId="formItem.id"
                            :placeholder=$t(formItem.placeholder) :options="getList(formItem)" :pt="styleOptionDropdown"
                            :appendTo="`#form-${formItem.id}`" :invalid="!!formItem.errorText"
                            @update:modelValue="updateDropdown" @change="(e) => { change(e, formItem.id) }"
                            :aria-label="$t(formItem.label)" />
                        <ErrorText :text="formItem.errorText" />
                    </div>

                    <Button id="arrowChange"
                        class="flex justify-center items-end py-[0.625rem] col-span-1 mobile:row-span-2 mobile:items-center mobile:p-0 mobile:pt-[1.875rem]"
                        @click="swapSelectTransferVal(formItem)" :tabindex="0">
                        <img class="w-[1.5rem] h-[1.5rem]  mobile:rotate-90" src="@/assets/icon/arrow_change.svg"
                            alt="arrow_change">
                    </Button>

                    <div class="col-span-5 mobile:col-span-7 relative 123" :id="`form-${formItem.selectTransfer.id}`">
                        <CustomLabel :for="formItem.selectTransfer.id" :title=$t(formItem.selectTransfer.label)
                            :iconURL="formItem.selectTransfer.labelIconURL"
                            :iconHoverURL="formItem.selectTransfer.labelIconHoverURL"
                            :iconTooltip="formItem.selectTransfer.labelIconTooltip"
                            :isRequired="formItem.selectTransfer.isRequired" />

                        <Dropdown class="w-full h-[2.75rem]" optionLabel="name" v-model="formItem.selectTransfer.value"
                            :id="`form-Dropdown-${formItem.selectTransfer.id}`" v-bind="formItem.selectTransfer.props"
                            :inputId="formItem.selectTransfer.id" :placeholder=$t(formItem.selectTransfer.placeholder)
                            :options="getList(formItem.selectTransfer)" :option-disabled="getDisabledOption"
                            :invalid="!!formItem.errorText" :pt="styleOptionDropdown"
                            :appendTo="`#form-${formItem.selectTransfer.id}`" @update:modelValue="updateDropdown"
                            @change="(e) => { change(e, formItem.selectTransfer.id) }"
                            :aria-label="$t(formItem.selectTransfer.label)" />

                        <ErrorText :text="formItem.selectTransfer.errorText" />
                    </div>
                </div>

                <div v-else :id="`form-${formItem.id}`" class="relative">
                    <CustomLabel :for="formItem.id" :title=$t(formItem.label) :iconURL="formItem.labelIconURL"
                        :iconHoverURL="formItem.labelIconHoverURL" :iconTooltip="formItem.labelIconTooltip"
                        :isRequired="formItem.isRequired" />
                    <Dropdown v-if="formItem.type === FormItemType.DropdownSelect" class="w-full h-[2.75rem]"
                        :id="`form-Dropdown-${formItem.id}`" v-model="formItem.value" :inputId="formItem.id"
                        v-bind="formItem.props" optionLabel="name" :filter="!formItem.hideFilter"
                        :placeholder=$t(formItem.placeholder) :options="getList(formItem)"
                        :invalid="!!formItem.errorText" :pt="styleOptionDropdown" :appendTo="`#form-${formItem.id}`"
                        :filterPlaceholder="$t('Bus.stopSerachFilter.search')" @update:modelValue="updateDropdown"
                        @change="(e) => { change(e, formItem.id) }" :name="formItem.id"
                        :aria-label="$t(formItem.label)">
                        <template #option="slotProps">
                            <div class="align-items-center">
                                <div class="text-body2 text-TextLevelOne break-words whitespace-pre-line">{{ slotProps.option.name }}</div>
                                <div v-if="slotProps.option?.subName"
                                    class="break-words whitespace-pre-line text-body2 text-TextLevelTwo">{{
                                        slotProps.option?.subName }}</div>
                            </div>
                        </template>
                    </Dropdown>

                    <Calendar v-if="formItem.type === FormItemType.Calendar" class="w-full h-[2.75rem] relative"
                        :id="`form-Calendar-${formItem.id}`" iconDisplay="input" showIcon v-model="formItem.value"
                        v-bind="formItem.props" dateFormat="yy-mm-dd" :name="formItem.id" :inputId="formItem.id"
                        :placeholder=$t(formItem.placeholder) :invalid="!!formItem.errorText" :pt="styleOptionCalendar"
                        @update:modelValue="(val) => { updateCalendar(val, formItem.id) }"
                        @blur="verification(formItem, $event)" :disabledDates="disabledDates(formItem)"
                        :aria-selected="$t(formItem.label)" showOtherMonths :selectOtherMonths="true">
                        <!-- <template #inputicon="{ clickCallback }">
                            <i class=" absolute top-[1.125rem]">
                                <img class="w-[1.5rem] h-[1.5rem]" src="@/assets/icon/basic_calendar.svg"
                                    alt="basic_calendar" @click="clickCallback">
                            </i>
                        </template> -->
                        <template #date="slotProps">
                            <span
                                :class="{ 'hover:bg-Primary hover:text-Surface': slotProps.date.day == new Date(formItem.value).getDate() }"
                                :aria-label="`${formattedCalendarDate(slotProps.date)} ${slotProps.date.today ? $t('Bus.routeInfoToTimetable.today') : ''} ${slotProps.date.selectable ? '' : $t('Bus.routeInfoToTimetable.unClickable')}`">
                                {{ slotProps.date.day }}
                            </span>
                        </template>
                    </Calendar>

                    <IconField v-if="formItem.type === FormItemType.InputText" class="relative"
                        :aria-label="formItem.label">
                        <InputText class="w-full" v-model="formItem.value" v-bind="formItem.props" :name="formItem.id"
                            :id="`form-InputText-${formItem.id}`" :placeholder=$t(formItem.placeholder)
                            :invalid="!!formItem.errorText" :pt="styleOptionInputText"
                            @update:modelValue="(val) => { updateInput(val, formItem.id) }"
                            @blur="verification(formItem, $event)" :aria-label="$t(formItem.label)"
                            :maxlength="formItem.maxlength" type="text" :disabled="formItem.disable" />
                        <div class="absolute top-[calc(50%-12px)] right-2 cursor-pointer"
                            v-if="formItem.suffixIcon != null && formItem.value"
                            @click="() => { formItem.suffixClick(formItem) }">
                            <img :src="`${formItem.suffixIcon.getIconSvg()}`" :alt="formItem.suffixIcon">
                        </div>
                    </IconField>


                    <IconField class="relative" v-if="formItem.type === FormItemType.InputMask"
                        :aria-label="formItem.label">
                        <InputMask class="w-full" v-model="formItem.value" v-bind="formItem.props" :name="formItem.id"
                            :id="`form-InputMask-${formItem.id}`" :placeholder=$t(formItem.placeholder)
                            :invalid="!!formItem.errorText" :pt="styleOptionInputMask"
                            @update:modelValue="(val) => { updateInput(val, formItem.id) }"
                            :aria-label="$t(formItem.label)"
                            :class="{ 'border-[1px] border-red-500': props.phoneCheckError }" />
                        <div v-if="props.phoneCheckError" class="text-Red text-body2 my-1">{{
                            $t('FriendlyService.friendlySearch.noPhone')
                            }}</div>
                    </IconField>

                    <InputGroup v-if="formItem.type === FormItemType.SendMobileOPT" class="w-full"
                        :class="{ 'mobile:flex mobile:flex-col mobile:gap-2': locale == 'en-US' }">
                        <InputMask class="rounded-r-none peer" mask="9999-999-999" v-model="formItem.value"
                            v-bind="formItem.props" :name="formItem.id" :id="`form-InputMask-${formItem.id}`"
                            :placeholder=$t(formItem.placeholder) :invalid="!!formItem.errorText"
                            :pt="styleOptionInputMask" @update:modelValue="(val) => { updateInput(val, formItem.id) }"
                            :aria-label="$t(formItem.label)" @blur="verification(formItem, $event)"
                            :class="{ 'mobile:w-full  mobile:rounded-r-[6px]': locale == 'en-US' }"
                            :disabled="formItem.disableInput" />
                        <Button class="peer groupBtn px-[1.5rem] py-[0.625rem]" :disabled="formItem.disable"
                            id="verification"
                            :class="{ 'bg-DisableBG text-DisableText': !formItem.value || formItem.disable, 'bg-Primary text-Surface ': formItem.value && !formItem.disable, 'mobile:rounded-l-[6px]': locale == 'en-US' }"
                            :label="`${$t(formItem.btnText)}${formItem.countdownText}`"
                            @click="sendSMSVerificationCode(formItem.value)" />
                    </InputGroup>

                    <div class="relative" v-if="formItem.type === FormItemType.InputNumber">
                        <InputNumber class="w-full" v-model="formItem.value" v-bind="formItem.props" :name="formItem.id"
                            :id="`form-InputNumber-${formItem.id}`" :inputId="formItem.id"
                            :placeholder=$t(formItem.placeholder) :useGrouping="false" :invalid="!!formItem.errorText"
                            :pt="styleOptionInputNumber" @update:modelValue="(val) => { updateInput(val, formItem.id) }"
                            @blur="verification(formItem, $event)" :aria-label="$t(formItem.label)" />
                        <img src="@/assets/icon/Delete.svg" class="absolute right-[1rem] top-[25%]"
                            v-if="formItem.errorText" @click="clearOTPCode(formItem)" alt="deleteNumber">

                    </div>
                    <div v-if="formItem.type === FormItemType.VerifyImageCaptcha"
                        class="w-full flex items-center flex-wrap gap-[1rem] mobile:flex-col laptop:flex-col">


                        <div class="flex items-center flex-wrap gap-[0.75rem] mobile:w-full laptop:w-full">
                            <figure class="shrink-1 max-w-[7.785rem] h-full" :aria-label="$t('Common.imageCaptcha')">
                                <img :src="formItem.captchaImage" width="126" height="44" alt="圖形驗證碼" loading="lazy">
                                <!-- <captchaImage v-model:text="formItem.captchaValue" v-bind="formItem.captchaProps">
                                </captchaImage> -->
                            </figure>

                            <Button class="cursor-pointer shrink-0 w-[1.5rem] h-[1.5rem]" id="soundBtn"
                                @click="clickSoundIcon($event, formItem)" :tabindex="0">
                                <img class="w-full h-full object-cover" src="@/assets/icon/basic_sound.svg" alt="播放驗證碼">
                            </Button>

                            <Button class="cursor-pointer shrink-0 w-[1.5rem] h-[1.5rem]" id="refreshBtn"
                                @click="refreshCaptcha($event, formItem)" :tabindex="0">
                                <img class="w-full h-full object-cover" src="@/assets/icon/basic_refresh.svg"
                                    alt="重新產生驗證碼">
                            </Button>
                        </div>
                        <InputText class="flex-1 w-full" v-model="formItem.value" v-bind="formItem.props"
                            :id="`form-InputText-${formItem.id}`" :name="formItem.id" :inputId="formItem.id"
                            :placeholder=$t(formItem.placeholder)
                            @update:modelValue="(val) => { updateInput(val, formItem.id) }" :useGrouping="false"
                            :invalid="!!formItem.errorText" :pt="styleOptionInputText" :aria-label="$t(formItem.label)"
                            :maxlength="4" type="text" @blur="verification(formItem, $event)"
                            :disabled="formItem.disable" />
                    </div>

                    <div v-if="formItem.type === FormItemType.Chips">
                        <Chips class="w-full" separator=","
                            v-model="formItem.value"
                            v-bind="formItem.props"
                            :name="formItem.id"
                            :placeholder="formItem.value?.length === 0 || !formItem.value ? $t(formItem.placeholder) : ''"
                            :pt="styleOptionChips"
                        />
                    </div>

                    <ErrorText :text="$t(formItem.errorText ?? '')" />
                </div>
            </template>
            <slot name="formFlow"></slot>
        </div>

        <slot></slot>

        <slot name="footerBtn">
            <slot name="submitBtnExtra"></slot>
            <div v-if="props.submitBtnTitle" class="w-full pt-0 mt-[0.5rem] flex flex-col justify-center items-center">
                <Button type="submit" class="p-[0.75rem] text-h4 min-w-[15rem] mobile:w-full mobile:min-w-0"
                    id="submitBtn"
                    :disabled="props.useAgreeKnow ? !props.checkAgreeKnow || !isAllFilled || !props.verificationCodeCheck : props.isBtnDisabled || !isAllFilled"
                    :label="props.submitBtnTitle" :loading="props.isBtnLoading" :pt="styleOptionButton" />
            </div>
        </slot>
    </form>
</template>