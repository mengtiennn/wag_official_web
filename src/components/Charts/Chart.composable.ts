import { ref, Ref } from 'vue';

import { use } from "echarts/core";
import { LineChart, BarChart, HeatmapChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent, VisualMapComponent, TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
use([CanvasRenderer, LineChart, BarChart, HeatmapChart,  TooltipComponent, GridComponent, LegendComponent, VisualMapComponent, TitleComponent]);

export class ChartComposables{
    public option: Ref<any>
    constructor(){
        this.option = ref()
    }
    public setOption(option){
        this.option.value = option
        return this
    }
}