import { FormItem } from "@/service/form.vmodel"

export class SingleSearchChartProps {
  type?: SingleSearchChartType
  name: string = ''
  tooltip: string = ''
  total: string = ''
  unit: string = ''
  maxPeriodsText: string = ''
  optionsList: Array<Object> = []
  tableProps?: SingleSearchTableProps
  searchFormItem: Array<FormItem> = []
  title?: Array<any>
  layout?: string = 'horizontal'
  eventClickExport?: (type:any) => void;
  setExportRef?: (ref:any) => void;
  constructor(init?: Partial<SingleSearchChartProps>) {
    Object.assign(this, init)
  }
}

export enum SingleSearchChartType {
  SINGLE_CHART,
  MULTIPLE_CHART,
  SINGLE_CHART_WITH_TABLE
}

export class SingleSearchTableProps {
  columnList: Array<ColumnData>
  tableData: Array<any>

  constructor(init?: Partial<SingleSearchTableProps>) {
    Object.assign(this, init)
  }
}

export class ColumnData {
  key: string
  label: string

  constructor(init?: Partial<ColumnData>) {
    Object.assign(this, init)
  }
}