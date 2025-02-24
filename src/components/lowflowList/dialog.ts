import { ref, Ref } from 'vue'
import { ItemList } from './dialogVmodel'
export class useDialog {
  private locale?: any;
  private $t?: any;
  private $route?: any;
  public propsData?: Ref<object>
  public headerList?: Ref<Array<ItemList>>
  constructor(t, locale, route, data: any) {
    this.locale = locale;
    this.$t = t;
    this.$route = route;
    this.propsData = ref(data)
    this.headerList = ref([])
    this.init();
  }
  public init() {
    this.getHeaderList()
  }

  public getHeaderList() {
    const list = Object.keys(this.propsData.value)
    list.forEach(item => {
      this.headerList.value.push(new ItemList({
        label: item,
        type: this.checkType(item),
        value: this.propsData.value[item]
      }).setValue())
    })
  }

  public checkType(label: string) {
    if(label == 'answer'){
      return 'textarea'
    } else {
      return 'text'
    }
  }
}