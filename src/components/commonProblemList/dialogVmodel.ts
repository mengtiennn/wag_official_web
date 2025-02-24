export class ItemList {
  id?: string
  label?: string;
  value?: any
  type?: string
  isEdit?: boolean
  option?: Array<keyValue>

  constructor(init?: Partial<ItemList>) {
      Object.assign(this, init);
  }

  public setValue(){
    if(typeof this.value == 'object'){
      this.value = this.value?.value
    }
    return this
  }
}

export class keyValue{
  key?: string
  value?: string

  constructor(init?: Partial<keyValue>) {
    Object.assign(this, init);
  }
}