export class ItemList {
  label?: string;
  value?: any
  type?: string
  isEdit?: boolean

  constructor(init?: Partial<ItemList>) {
      Object.assign(this, init);
  }

  public setValue(){
    if(typeof this.value == 'object' && !Array.isArray(this.value)){
      this.value = this.value?.value
    }
    return this
  }
}