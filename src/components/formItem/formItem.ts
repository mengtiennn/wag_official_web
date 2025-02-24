import { Ref, ref } from 'vue'
import { InputTextPassThroughOptions } from 'primevue/inputtext'
import { TextareaPassThroughOptions } from 'primevue/textarea'
import { InputNumberPassThroughOptions } from 'primevue/inputnumber'
export class useFormItemStyle {
  public inputTextStyleOption: Ref<InputTextPassThroughOptions>
  public textareaTextStyleOption: Ref<TextareaPassThroughOptions>
  public inputNumberTextStyleOption: Ref<InputNumberPassThroughOptions>

  constructor(){
    this.inputTextStyleOption = ref(this.getInputTextStyleOption())
    this.textareaTextStyleOption = ref(this.getTextareaTextStyleOption())
    this.inputNumberTextStyleOption = ref(this.getInputNumberStyleOption())
  }

  public getInputTextStyleOption() {
    return {
      root: ({ props, state }) => ({
        class: [
          'w-full border-1 border-border border-solid p-2 focus:outline-Primary',
        ]
      }),
    }
  }

  public getTextareaTextStyleOption() {
    return {
      root: ({ props, state }) => ({
        class: [
          'w-full border-1 border-border border-solid p-2 focus:outline-Primary',
        ]
      }),
    }
  }

  public getInputNumberStyleOption() {
    return {
      root: ({ props, state }) => ({
        class: [
          'w-full border-1 border-border border-solid rounded-lg',
          {'border-Primary !border-[1px]': state.focused}
        ]
      }),
      input: {
        root: ({ parent, context }) => {
            return {
                class: ['p-2 focus:outline-none']
            };
        }
      }
    }
  }
}