import './assets/main.css'
import './assets/font.css';

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { createPinia } from 'pinia'
import zhCN from '@/locales/zh-CN.ts'
import en from '@/locales/en.ts'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    'en': en,
  },
})

createApp(App)
    .use(createPinia())
    .use(i18n)
    .mount('#app')
