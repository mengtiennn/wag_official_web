import { ref, Ref } from 'vue';

import moment from 'moment';
import { use } from "echarts/core";
import { LineChart, BarChart, HeatmapChart, PieChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent, VisualMapComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
use([CanvasRenderer, LineChart, BarChart, HeatmapChart,  TooltipComponent, GridComponent, LegendComponent, VisualMapComponent, TitleComponent, PieChart]);

export class SingleSearchChartController{
  public option: Ref<any>
  constructor(){
    this.option = ref()
  }
  public setOption(option){
    this.option.value = option
    return this
  }
}

const commonStyle = 'border border-border h-[32px] p-1 rounded-[4px] shadow-none text-body3 placeholder:text-body3 placeholder:text-[#757575] py-[5px] pl-[12px] pr-[8px]'

export class SingleSearchChartStyle {
  public dropdownStyle = {
    root: `${commonStyle} h-auto !text-[#757575]`,
    input: ({ props }) => ({class: ['p-0 text-body3', {'!text-TextLevelOne':props.modelValue != null, '!text-[#757575]': props.modelValue == null }]}),
    panel: 'text-body3', filterInput:'border border-border p-1'
  }

  public calendarStyle = (sDate, eDate) => {
    return {
      root: '!w-[214px] relative',
      input: `${commonStyle} h-auto !text-[#757575] !w-[214px]`,
      panel: '!text-body3 !w-[272px] !min-w-fit',
      table: '!text-body3',
      daylabel: ({ context }) => {
        const { date: { day, month, year }, disabled, otherMonth, selected } = context;
        const week = moment().year(year).month(month).date(day).day();
        const isFirstDay = day === 1;
        const isLastDay = moment().year(year).month(month).endOf('month').date() === day;
        const selectedBoundStart = moment(sDate);
        const selectedBoundEnd = moment(eDate);
        const isSelectedBoundStart = (selectedBoundStart.year() === year && selectedBoundStart.month() === month && selectedBoundStart.date() === day) && !otherMonth;
        const isSelectedBoundEnd = (selectedBoundEnd.year() === year && selectedBoundEnd.month() === month && selectedBoundEnd.date() === day) && !otherMonth;
        const isSelectedBound = isSelectedBoundStart || isSelectedBoundEnd;
        const isSelectedRange = !isSelectedBound && selected && !otherMonth && !disabled;
        return ({
          class: [
            '!text-body3 rounded focus:outline-0 overflow-visible',
            { 'bg-Primary text-Surface': isSelectedBound },
            { 'hover:bg-Primary text-Surface': isSelectedBound },
            { 'text-[#334155] bg-[#F4F8FF]': isSelectedRange },
            { 'before:block before:absolute before:w-1 before:h-full before:top-0 before:-left-[4px] before:bg-[#F4F8FF]': (isSelectedRange || isSelectedBoundEnd) && week !== 0 && !isFirstDay },
            { 'after:block after:absolute after:w-1 after:h-full after:top-0 after:-right-[4px] after:bg-[#F4F8FF]': (isSelectedRange || isSelectedBoundStart) && week !== 6 && !isLastDay },
            { 'rounded-l-none': isSelectedRange && week !== 0 && !isFirstDay },
            { 'rounded-r-none': isSelectedRange && week !== 6 && !isLastDay },
          ]
        })
      }
    }
  }

  public tableStyle = {
    wrapper: 'tableWapper relative',
    table: 'filterTable text-body3 border rounded-[4px]',
    header: 'absolute right-0 z-10 p-0 bg-transparent',
    column: {
        headerCell: 'bg-[#F2F3F7] text-[#333333] py-[10px] whitespace-nowrap',
        bodyCell: 'border-b-[1px] border-border cursor-pointer',
        headercontent: 'items-center',
        headerCheckbox: {
          box: ({props, context})=>{
              return {class: ['w-[1rem] h-[1rem] rounded-[2px]', {'border border-[#727272] bg-transparent': !context.checked, 'bg-Primary': context.checked} ]}
          },
          icon: 'w-[12px] stroke-white'
        }, 
        rowCheckbox: {
          box: ({props, context})=>{
              return {class: ['w-[1rem] h-[1rem] rounded-[2px]', {'border border-[#727272] bg-transparent': !context.checked, 'bg-Primary': context.checked}]}
          },
          icon: 'w-[12px] stroke-white'
        }, 
        sort: 'flex items-center'
      },
    loadingOverlay: 'bg-slate-100/75'
  }
}