import { ref, Ref } from 'vue'
import { ItemList } from './dialogVmodel'
import { btntype } from '@/views/pages/mgmt/dataTable/tableVmodel';
import { keyValue } from '@/components/commonProblemList/dialogVmodel';
import { titleType } from '@/service/commonVmodel';
export class useDialog {
  private locale?: any;
  private $t?: any;
  private $route?: any;
  public type?: string
  public propsData?: Ref<ItemList>
  public headerList?: Ref<ItemList[]>
  public helptypeList?: Ref<keyValue[]>
  public showHeaderList?: Ref<string[]>
  public verification?: Ref<string[]>
  constructor(t, locale, route, data: any, type: string, helptypeList: keyValue[]) {
    this.locale = locale;
    this.$t = t;
    this.$route = route;
    this.helptypeList = ref(helptypeList);
    this.type = type
    this.propsData = ref(data)
    this.headerList = ref([])
    this.showHeaderList = ref(['isMobile', 'isHot', 'helpTypeEntity','name', 'answer'])
    this.verification = ref(['helpTypeEntity','name', 'answer'])
    this.init();
  }
  public init() {
    this.getHeaderList()
  }

  public getHeaderList() {
    // const list = Object.keys(this.propsData.value)
    this.showHeaderList.value.forEach(item => {
      this.headerList.value.push(new ItemList({
        id: this.propsData.value.id,
        label: item,
        type: this.checkType(item),
        value: this.type == btntype.editBtn ? this.propsData.value[item] : this.checkTypeValue(item),
        option: item == 'helpTypeEntity' ? this.helptypeList.value : null
      }))
    })
  }

  public checkType(label: string) {
    if(label == 'isMobile' || label == 'isHot'){
      return 'switch'
    } else if(label == 'helpTypeEntity'){
      return 'dropdown'
    } else if(label == 'answer'){
      return 'textarea'
    } else {
      return 'text'
    }
  }

  public checkTypeValue(label: string) {
    if(label == 'isMobile' || label == 'isHot'){
      return false
    } else {
      return null
    }
  }

  public verificationCheck() {
    if(this.type !== titleType.delete){
      let check = false
      this.verification.value.forEach(item => {
        const findItem = this.headerList.value.find(itm => itm.label == item)
        if(!findItem.value){
          check = true
        }
      })
      return check
    } else {
      return false
    }
  }
}