<template>
  <div class="h-screen flex flex-col">
    <TitleBar
      :show-sidebar-toggle="false"
      :icon-animating="false"
      :is-maximized="appStore.isMaximized"
      :app-icon="AppIcon"
      :app-name="t('app.defaultAppName')"
      @minimize="handleMinimize"
      @maximize="handleMaximize"
      @close="handleClose"
    />

    <div class="flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div
        class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center
               ring-1 ring-black/5 dark:ring-white/10"
      >
        <!-- App icon / logo -->
        <img
          :src="AppIcon"
          alt=""
          class="w-20 h-20 mx-auto mb-6 rounded-2xl"
        />

        <!-- Slogan -->
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {{ t('welcome.title') }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-8">
          {{ t('welcome.slogan') }}
        </p>

        <!-- Language selector (dropdown) -->
        <div class="mb-8">
          <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
            {{ t('welcome.selectLanguage') }}
          </label>
          <n-select
            :value="appStore.currentLanguage"
            :options="languageOptions"
            @update:value="selectLanguage"
            class="w-48 mx-auto"
            size="large"
          />
        </div>

        <!-- Get started button -->
        <button
          @click="goToSetup"
          class="cursor-pointer px-12 py-3.5 text-white rounded-xl font-semibold text-base
                 transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                 shadow-lg hover:shadow-xl active:scale-95
                 bg-taffy-400 hover:bg-taffy-500 active:bg-taffy-600"
        >
          {{ t('welcome.getStarted') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NSelect } from 'naive-ui'
import {
  WindowMinimise,
  WindowMaximise,
  WindowUnmaximise,
  WindowIsMaximised,
  Quit,
} from '../../wailsjs/runtime/runtime'
import { useAppStore } from '@/stores/appStore'
import AppIcon from '@/assets/appicon_128px.webp'
import TitleBar from '@/components/TitleBar.vue'

const { t, locale } = useI18n()
const router = useRouter()
const appStore = useAppStore()

const languageOptions = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en', label: 'English' },
]

function selectLanguage(value: string) {
  const lang = value as 'zh-CN' | 'en'
  appStore.setLanguage(lang)
  locale.value = lang
}

function goToSetup() {
  router.push('/setup')
}

// Window controls
const handleMinimize = () => WindowMinimise()
const handleMaximize = () => {
  if (appStore.isMaximized) {
    WindowUnmaximise()
    appStore.setMaximized(false)
  } else {
    WindowMaximise()
    appStore.setMaximized(true)
  }
}
const handleClose = () => Quit()

onMounted(async () => {
  appStore.setMaximized(await WindowIsMaximised())
})
</script>


