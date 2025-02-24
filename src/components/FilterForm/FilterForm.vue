<script lang="ts" setup>
import Button from '@/components/Button/Button.vue'
import Tag from 'primevue/tag';
import { FormItemType } from '@/service/form.vmodel';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

import { computed, ref } from 'vue';
import moment from 'moment';
const props = defineProps({
    form: {
        type: Array<any>
    }
})
const emit = defineEmits(['getList', 'send', 'eventChange'])
const eventClearForm = () => {
    props.form.forEach(x=>x.value = null)
    condition.value = null
    emit('send', props.form)
}
const isExpand = ref(false)
const eventToggleExpand = () => {
    isExpand.value = !isExpand.value
}
const commonStyle = 'border border-border h-[32px] p-1 rounded-[4px] shadow-none text-body3 placeholder:text-body3 placeholder:text-[#757575]'
const checkFormHasValue = computed(() => {
    const hasValue = props.form.some(x=>x.value)
    return !hasValue
})
const getList = (item) => {
    if (item.options == null)
        return item.lists;
    else
        return item.options();
}
const dropdownStyle = {root: `${commonStyle} h-auto  !text-[#757575]`, input: ({ props }) => ({class: ['p-0 text-body3', {'!text-TextLevelOne':props.modelValue != null, '!text-[#757575]': props.modelValue == null }]}), panel: 'text-body3', filterInput:'border border-border p-1'}
const condition = ref()
const eventSend = () => {
    const hasValue = JSON.parse(JSON.stringify(props.form)).filter(x=>{
        if(x.value){
            if(x.type == FormItemType.Calendar){
                x.value = moment(x.value).format('YYYY-MM-DD')
            } else if(x.type == FormItemType.DropdownSelect){
                x.value = x.value.name
            } 
            return x
        }
        return null

    })
    condition.value = hasValue
    emit('send', props.form)
}
const eventClearCondition = async () => {
    condition.value = null
    await eventClearForm()
}
const eventTagClick = (index, tagItem) => {
    condition.value.splice(index, 1)
    const formItem = props.form.find(x=>x.id == tagItem.id)
    if(formItem){
        formItem.value = null
    }
    emit('send', props.form)
}
</script>
<template>
    <div class="Filter border-1 rounded-[4px] p-[24px] bg-white">
        <div class="w-full">
            <div class="grid grid-cols-4 gap-4 m-0">
                <div v-for="(item, i) in form" v-show="isExpand ? form.length : i < 3"> 
                    <div class="flex flex-col gap-1">
                        <label class="text-body3 text-TextLevelOne" :for="item.id" >{{item.label}}</label>
                        <InputText :id="item.id" v-model="item.value" :placeholder="item.placeholder" :class="commonStyle"  v-if="item.type == FormItemType.InputText" v-bind="item.props"/>
                        <Calendar  :id="item.id" v-model="item.value" :placeholder="item.placeholder" :pt="{input:commonStyle, group: 'text-body3', table: 'text-body3'}"  v-if="item.type == FormItemType.Calendar" v-bind="item.props" @update:modelValue="$emit('eventChange', item)"/>
                        <Dropdown :id="`form-Dropdown-${item.id}`" class="w-full h-[2.75rem]" v-if="item.type === FormItemType.DropdownSelect" 
                            v-model="item.value" :inputId="item.id"
                            v-bind="item.props" :optionLabel="item.optionLabel" :filter="item.hideFilter == false"
                            :options="getList(item)"  @change="$emit('eventChange', item)" 
                            :placeholder=item.placeholder :pt="dropdownStyle"
                            :invalid="!!item.errorText" :name="item.id">
                        </Dropdown>
                    </div>
                </div>
                <div class="flex gap-[8px] items-end justify-end" style="grid-column-end: 5">
                    <Button label="重置" styleType="secondary" class="flex-1 max-w-[33%]" :isDisabled="checkFormHasValue" @eventClickSendBtn="eventClearForm"/>
                    <Button label="套用" styleType="primary" class="flex-1 max-w-[33%]" :isDisabled="checkFormHasValue" @eventClickSendBtn="eventSend"/>
                    <Button styleType="link" class="flex-1 flex justify-center gap-2 max-w-[33%]" @eventClickSendBtn="eventToggleExpand" v-if="form.length > 3">
                        <template #custom>
                            <span v-if="isExpand">收合</span>
                            <span v-else>展開</span>
                            <img src="@/assets/icon/arrow_down.svg" alt="" class="text-Primary" :class="{'rotate-180':isExpand,}"/>
                        </template>
                    </Button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="condition && condition.length > 0" class="flex flex-wrap gap-2 my-2 text-body3 text-TextLevelOne border-t-border border-t-[1px] border-t-solid mt-4 pt-4"> 
        <span class="py-1">篩選條件：</span>
        <Tag v-for="(item, index) in condition" :value="item.label + ' : ' + item.value" class="cursor-pointer flex-row-reverse gap-2 border bg-white text-body3 text-TextLevelOne" @click="eventTagClick(index, item)">
            <template #icon>
                <img src="@/assets/icon/close.png"/>
            </template>
        </Tag>
        <Button label="全部清除" styleType="link" @eventClickSendBtn="eventClearCondition"></Button>
    </div>

</template>