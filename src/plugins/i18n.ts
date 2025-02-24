import { createI18n } from 'vue-i18n'
import zh from '../languages/zh-TW.json'
import en from '../languages/en-US.json'
// console.log('messages', )
const i18n = createI18n({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    'zh-TW': zh,
    'en-US': en
  }
})

export default i18n