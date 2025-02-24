export class ItemList {
  label?: string;
  value?: any
  type?: string
  isEdit?: boolean
  option?: Array<any>
  valueTypeIsArray?: boolean

  constructor(init?: Partial<ItemList>) {
      Object.assign(this, init);
  }

  public setValue?(){
    if(typeof this.value == 'object' && !Array.isArray(this.value)){
      this.value = this.value?.value
    }
    return this
  }
}

export class valueList {
  label?: string;
  type?: any
  value?: any
  option?: Array<any>

  constructor(init?: Partial<valueList>) {
    Object.assign(this, init);
  }
}