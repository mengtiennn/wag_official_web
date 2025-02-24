<script setup>
import VChart from "vue-echarts";
import { RangeType } from '@/composables/dashboard.composables';
import { ChartComposables } from './Chart.composable.ts';
import { computed } from "vue";
import { numberToCurrency } from '@/utils/numberToCurrency';
const props = defineProps({
    name: {
        type: String,
    },
    tooltip: {
        type: String
    },
    total: {
        type: String
    },
    unit: {
        type: String
    },
    tooltip: {
        type: String
    },
    maxPeriodsText: {
        type: String
    },
    options: {
        type: Object
    }, 
    rangeType: {
        type: Number
    }, 
    compare: {
        type: Object
    }
})
const controller = new ChartComposables().setOption(props.options)
const compareText = computed(()=>props.rangeType  && props.rangeType == RangeType.Today ? '相比昨天' : props.rangeType == RangeType.Week ? '相比上週' : props.rangeType == RangeType.Month ? '相比上月' : props.rangeType == RangeType.Year ? '相比去年' : null )

</script>
<template>
    <div class="chartBox w-full h-full">
        <div class="text-h3 text-TextLevelOne flex gap-2 mb-2">
            {{ props.name }}
            <img src="@/assets/icon/info.svg" v-tooltip="{
                value: props.tooltip,
                pt: {root: '!max-w-[20rem]', text: 'bg-[#333] text-body3'}
            }"/>
        </div>
        <div class="flex gap-3">
            <div v-if="props.total" class="text-TextLevelOne font-bold flex gap-2 items-end">
                <span class="text-[2rem] leading-9">{{ numberToCurrency(props.total) }}</span>
                <span class="text-[1.375rem]">{{ props.unit }}</span>
            </div>
            <div v-if="props.compare"
                :class="{
                    'text-StatusGreen': props.compare.type == 'increase', 
                    'text-StatusRed': props.compare.type == 'minus',
                    'text-TextLevelTwo': props.compare.type == ''
                }"
            >   
                <div class="flex gap-1 items-center" >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{'rotate-180': props.compare.type == 'minus'}">
                        <circle cx="8" cy="8" r="8" fill="currentColor"/>
                        <rect x="4" y="7" width="8" height="2" rx="1" fill="#FDFDFD" v-if="props.compare.type == ''"/>
                        <path d="M8 4.5L11.4641 10.5H4.5359L8 4.5Z" fill="#FDFDFD" v-else/>
                    </svg>
                    <div class="font-bold text-body3">{{ props.compare.data }}%</div>
                </div>
                <div class="text-TextLevelTwo text-[12px]">{{ compareText }}</div>
            </div>
        </div>
        <!-- <div v-if="props.maxPeriodsText" class="text-TextLevelOne font-bold flex gap-2 items-end">
            <span class="text-[1rem] text-TextLevelTwo">最多預約時間</span>
            <span class="text-[2rem] leading-9">{{ props.maxPeriodsText }}</span>
        </div> -->
        <VChart class="w-full h-[80%]" :option="controller.option.value" autoresize />
    </div>
</template>
<style>
.p-tooltip.p-tooltip-right .p-tooltip-arrow {
    border-color: transparent;
    border-right-color: #333;
}
.p-tooltip-right .p-tooltip-arrow {
    border-width: 0.25em 0.25em 0.25em 0;
}
</style>