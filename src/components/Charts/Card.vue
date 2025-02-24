<script lang="ts" setup>
import { RangeType } from '@/composables/dashboard.composables';
import { computed } from 'vue';
import { numberToCurrency } from '@/utils/numberToCurrency';
const props = defineProps({
    name: {
        type: String
    },
    data: {
        type: [String, Number]
    },
    unit: {
        type: String
    },
    type: {
        type: String
    },
    compare: {
        type: String
    },
    rangeType: {
        type: Number
    }, 
})
const compareText = computed(()=>props.rangeType == RangeType.Today ? '相比昨天' : props.rangeType == RangeType.Week ? '相比上週' : props.rangeType == RangeType.Month ? '相比上月' : props.rangeType == RangeType.Year ? '相比去年' : null )
</script>
<template>
    <div class="Card flex flex-col items-center justify-center gap-3">
        <div class="text-h5 text-TextLevelTwo">{{ props.name }}</div>
        <div class="text-TextLevelOne font-bold flex gap-2 items-end">
            <span class="text-[2rem] leading-9">{{ numberToCurrency(props.data) }}</span>
            <span class="text-[1.375rem]">{{ props.unit }}</span>
        </div>
        <div class="flex gap-1 items-center" 
            :class="{
                'text-StatusGreen': props.type == 'increase', 
                'text-StatusRed': props.type == 'minus',
                'text-TextLevelTwo': props.type == ''
            }"
            v-if="compareText">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{'rotate-180': props.type == 'minus'}">
                <circle cx="8" cy="8" r="8" fill="currentColor"/>
                <rect x="4" y="7" width="8" height="2" rx="1" fill="#FDFDFD" v-if="props.type == ''"/>
                <path d="M8 4.5L11.4641 10.5H4.5359L8 4.5Z" fill="#FDFDFD" v-else/>
            </svg>
            <span class="font-bold text-h3">{{ props.compare }}</span>
            <span class="text-TextLevelTwo text-body3">{{ compareText }}</span>
        </div>
    </div>
</template>