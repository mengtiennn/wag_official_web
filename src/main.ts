import { createApp } from 'vue'
import router from "./router/index";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import i18n from './plugins/i18n.ts'
import PrimeVue from 'primevue/config';
import '@/assets/style/tailwind.css';
import Lara from '@primevue/themes/lara';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes'
import App from './App.vue'
import { localeTW } from '@/languages/primeVue-zhTW.ts'
import '@/utils/arrayExtension'
import '@/utils/stringExtension'

import { ColorTheme } from '@/Theme/ColorTheme.ts'
const crmPreset = definePreset(Lara, new ColorTheme().uiLibraryColor)

//app.use
const app = createApp(App);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
    locale: localeTW,
    theme: {
        preset: crmPreset,
        cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
        },
        options: {
            darkModeSelector: 'light',
        }
    }
    // csp: { nonce: '03712cfe5a06432359ccb9e8c7482cc6449ca23769619838cab2de04c96054b3fdc7324cc0c4199828acefa1717fa6c6'}
})
app.mount("#app");
