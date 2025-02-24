<script lang="ts" setup>
import VChart from "vue-echarts";
import ExportBtn from '@/components/ExportBtn/ExportBtn.vue'
import { SingleSearchChartController, SingleSearchChartStyle } from '@/components/Charts/SingleSearchChart.composable'
import { SingleSearchChartProps, SingleSearchChartType, SingleSearchTableProps } from '@/components/Charts/SingleSearchChart.model'
import DataTable from '@/components/DataTable/DataTable.vue'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown';
import { FormItem, FormItemType } from "@/service/form.vmodel";
import { numberToCurrency } from '@/utils/numberToCurrency';
import moment from "moment";
const props = defineProps<{
  props: SingleSearchChartProps
}>()
const controller = new SingleSearchChartController().setOption(props.props?.optionsList)
const customColumnStyle = {
  headerCell: 'bg-[#F2F3F7] text-[#333333] py-[10px] whitespace-nowrap',
  bodyCell: 'border-b-[1px] border-border cursor-pointer',
  headerCheckbox: {
    box: ({props, context})=>{
      return {class: ['w-[1rem] h-[1rem] rounded-[2px]', {'border border-[#727272] bg-transparent': !context.checked, 'bg-Primary': context.checked} ]}
    },
    icon: 'w-[12px] stroke-white'
  }
}
const style = new SingleSearchChartStyle()
const maxDate = moment().toDate()
const minDate = moment().subtract(1, 'year').toDate()
</script>
<template>
  <div class="w-full h-full bg-[#FDFDFD] rounded-[8px] flex flex-col justify-center gap-[16px]" v-if="!!props.props">
    <div class="flex flex-col">
      <div class="w-full flex justify-between items-center">
        <div class="flex gap-[4px] items-center">
          <span class="text-h3 text-[#333333]">{{ props.props?.name }}</span>
          <img class="w-[24px] h-[24px]" src="@/assets/icon/info.svg" v-tooltip="{
            value: props.props?.tooltip,
            pt: { root: '!max-w-[20rem]', text: 'bg-[#333] text-body3' }
          }" />
        </div>
        <ExportBtn label="導出" styleType="export" @click="props.props.eventClickExport" :ref="props.props.setExportRef"/>
      </div>
      <div v-if="props?.props?.total" class="text-TextLevelOne font-bold flex gap-2 items-end">
        <span class="text-[32px] leading-[48px]">{{ numberToCurrency(props.props?.total) }}</span>
        <span class="text-[22px] leading-[48px]">{{ props.props?.unit }}</span>
      </div>
      <div v-if="props?.props?.title">
        <span v-for="(text, idx) in props?.props.title"  class="font-bold items-end mr-1" :class="{'text-TextLevelOne text-[32px] leading-[48px]': idx == 1, 'text-TextLevelTwo': idx == 0}">{{ text }}</span>
      </div>
      <div class="w-full mt-[16px] flex gap-[8px]" v-if="!!props?.props?.searchFormItem">
        <template v-for="(form, index) in props.props.searchFormItem" :key="form.type + index">
          <Calendar v-if="form.type == FormItemType.Calendar" v-model="form.value" selectionMode="range"  :numberOfMonths="2" :pt="style.calendarStyle(form.value?.[0], form.value?.[1])" showIcon iconDisplay="input" @update:modelValue="form.callback(form)" :max-date="maxDate">
            <template #inputicon>
              <svg class="absolute right-[4px] top-[4.5px]" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 5.974H16V5C16 4.73478 15.8946 4.48043 15.7071 4.29289C15.5196 4.10536 15.2652 4 15 4C14.7348 4 14.4804 4.10536 14.2929 4.29289C14.1054 4.48043 14 4.73478 14 5V5.97H10V5C10 4.73478 9.89464 4.48043 9.70711 4.29289C9.51957 4.10536 9.26522 4 9 4C8.73478 4 8.48043 4.10536 8.29289 4.29289C8.10536 4.48043 8 4.73478 8 5V5.97H6C5.46957 5.97 4.96086 6.18071 4.58578 6.55579C4.21071 6.93086 4 7.43956 4 7.97V18C4 18.5304 4.21071 19.0391 4.58578 19.4142C4.96086 19.7893 5.46957 20 6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V7.974C20 7.44357 19.7893 6.93486 19.4142 6.55978C19.0391 6.18471 18.5304 5.974 18 5.974ZM18 7.974V10.031H6V7.974H18ZM6 18.004V12.031H18V18L6 18.004Z"
                  fill="#727272" />
              </svg>
            </template>
          </Calendar>
          <Dropdown :id="form.id" class="h-[2.75rem]" v-if="form.type === FormItemType.DropdownSelect" 
            v-model="form.value" :inputId="form.id"
            v-bind="form.props" :optionLabel="form.optionLabel" :filter="form.hideFilter == false"
            :options="form.lists"  @change="form.callback(form)" 
            :placeholder=form.placeholder :pt="style.dropdownStyle"
            :invalid="!!form.errorText" :name="form.id">
          </Dropdown>
        </template>
      </div>
    </div>

    <!-- SINGLE_CHART -->
    <template v-if="props.props?.type == SingleSearchChartType.SINGLE_CHART">
      <VChart class="w-full h-[340px]" autoresize :option="controller.option.value.firstOrDefault()" />
    </template>

    <!-- SINGLE_CHART_WITH_TABLE -->
    <template v-if="props.props?.type == SingleSearchChartType.SINGLE_CHART_WITH_TABLE && !!props?.props?.tableProps">
      <div class="flex items-start gap-[16px]" :class="{ 'flex-col': props.props.layout == 'vertical' }">
        <VChart class="w-[50%] h-[340px]" autoresize :option="controller.option.value.firstOrDefault()" :class="{ 'w-full': props.props.layout == 'vertical' }" />
        <div class="w-[50%]" :class="{ 'w-full': props.props.layout == 'vertical' }">
          <DataTable :pageCount="100" :columnData="props.props.tableProps.columnList"
            :tableData="props.props.tableProps.tableData" :hasChackbox="false"
            scrollable :scrollHeight="'410px'"
            :hasFilter="false" :custom-style="style.tableStyle"
            :headerArrowIcon="false">
          </DataTable>
        </div>
      </div>
    </template>

    <!-- MULTIPLE_CHART -->
    <template v-if="props.props?.type == SingleSearchChartType.MULTIPLE_CHART">
      <div class="w-full flex flex-wrap">
        <template v-if="controller?.option.value?.length > 0">
          <div v-for="(chartData, idx) in controller.option.value" class="w-[50%] flex items-center">
            <VChart class="w-[260px] h-[260px]" :option="chartData" autoresize />
            <div class="w-[50%] flex flex-wrap gap-x-[12px] gap-y-[12px]" :class="{ 'flex-col': chartData?.series?.firstOrDefault().data.length == 2 }">
              <div class="flex flex-col w-[112px]" v-for="(data, index) in chartData?.series?.firstOrDefault().data">
                <div class="flex gap-[8px] items-center">
                  <div class="w-[8.28px] h-[8.28px] rounded-[50%]" :style="`background-color: ${chartData.color[index]};`"></div>
                  <span class="text-[14px] text-[#333333]">{{ data.name }}</span>
                </div>
                <div class="text-TextLevelOne font-bold flex gap-2 items-end">
                  <span class="text-[32px] leading-[48px]">{{ data.value }}</span>
                  <span class="text-[22px] leading-[48px]">%</span>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="w-full flex flex-col items-center gap-[16px]">
            <img src="@/assets/img/empty.svg" width="120" alt="" />
            <p class="text-h3 text-TextLevelOne m-2">尚無資料</p>
        </div>
      </div>
    </template>
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