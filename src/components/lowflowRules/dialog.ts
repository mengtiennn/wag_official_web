import { ref, Ref } from 'vue'
import { ItemList } from './dialogVmodel'
import { titleType } from '@/service/commonVmodel.ts'
import { keyValue } from '@/components/commonProblemList/dialogVmodel';
export class useDialog {
  private locale?: any;
  private $t?: any;
  private $route?: any;
  public propsData?: Ref<any>
  public propsTitle?: Ref<string>
  public recordTypeList?: Ref<keyValue[]>
  public headerList?: Ref<Array<ItemList>>
  public showHeaderList?: Ref<string[]>
  public timeRuleConfigs?: Ref<any>
  public routeRuleConfigs?: Ref<ItemList[]>
  constructor(t, locale, route, data: any, title:string, recordTypeList: keyValue[]) {
    this.locale = locale;
    this.$t = t;
    this.$route = route;
    this.propsData = ref(data)
    this.propsTitle = ref(title)
    this.recordTypeList = ref(recordTypeList)
    this.headerList = ref([])
    this.showHeaderList = ref(['reservationRecordTypeEntity', 'timeRuleConfigs', 'routeRuleConfigs'])
    this.timeRuleConfigs = ref({
      Reservation: [
        {label: 'category', type: 'common', value: ''},
        {label: 'limitTime', type: 'text', value: ''},
        {label: 'limitTimeType', type: 'number', value: ''},
        {label: 'allowabledays', type: 'number', value: ''},
        {label: 'beforeTheDate', type: 'number', value: ''},
      ],
      Cancel: [
        {label: 'category', type: 'common', value: ''},
        {label: 'limitTime', type: 'text', value: ''},
        {label: 'limitTimeType', type: 'number', value: ''},
        {label: 'allowabledays', type: 'number', value: ''},
        {label: 'beforeTheDate', type: 'number', value: ''},
      ]
    })
    this.routeRuleConfigs = ref([
      {label: 'isWhitelist', type: 'switch', value: ''},
      {label: 'data', type: 'text', value: ''},
    ])
    this.init();
  }
  public init() {
    this.getHeaderList()
  }

  public getHeaderList() {
    this.showHeaderList.value.forEach(item => {
      this.headerList.value.push(new ItemList({
        label: item,
        type: this.checkType(item),
        value: this.propsData.value[item],
        option: this.propsTitle.value !== titleType.delete ? this.recordTypeList.value : null,
        valueTypeIsArray: Array.isArray(this.propsData.value[item]) ? true : false
      }))
    })
  }

  public checkType(label: string) {
    if(label == 'answer'){
      return 'textarea'
    } else if(label == 'reservationRecordTypeEntity'){
      return 'dropdown'
    } else {
      return 'text'
    }
  }

  public checkValueList(item: ItemList, index:number) {
    if(item.label == 'timeRuleConfigs'){
      this.timeRuleConfigs.value[item.value[index].category].forEach((itm, idx) => {
        if(itm.label !== 'category'){
          itm.value = this.propsTitle.value == titleType.edit ? item.value[index][itm.label] : null
        } else {
          itm.value = item.value[index][itm.label]
        }
      })
      return this.timeRuleConfigs.value[item.value[index].category]
    } else if(item.label == 'routeRuleConfigs'){
      this.routeRuleConfigs.value.forEach((itm, idx) => {
        itm.value = this.propsTitle.value == titleType.edit ? item.value[index][itm.label] : null
      })
      return this.routeRuleConfigs.value
    }
  }

  public checkAllData() {
    const timeAll = [
      {
        category:this.timeRuleConfigs.value['Reservation'][0].value,
        limitTime:this.timeRuleConfigs.value['Reservation'][1].value,
        limitTimeType:this.timeRuleConfigs.value['Reservation'][2].value,
        allowabledays:this.timeRuleConfigs.value['Reservation'][3].value,
        beforeTheDate:this.timeRuleConfigs.value['Reservation'][4].value,
      },
      {
        category:this.timeRuleConfigs.value['Cancel'][0].value,
        limitTime:this.timeRuleConfigs.value['Cancel'][1].value,
        limitTimeType:this.timeRuleConfigs.value['Cancel'][2].value,
        allowabledays:this.timeRuleConfigs.value['Cancel'][3].value,
        beforeTheDate:this.timeRuleConfigs.value['Cancel'][4].value,
      }
    ]
    const routeAll = [
      {
        isWhitelist: this.routeRuleConfigs.value[0].value,
        data: this.routeRuleConfigs.value[1].value
      }
    ]
    const data = {
      id: this.propsTitle.value == titleType.edit ? this.propsData.value.id : null,
      reservationRecordTypeEntity: this.headerList.value[0].value,
      routeRuleConfigs: routeAll,
      timeRuleConfigs: timeAll
    }
    console.log('data', data)
    return data
  }
}