<template>
  <div class="h-full overflow-y-auto p-8">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
      {{ t('settings.title') }}
    </h1>

    <!-- Language Section -->
    <section class="mb-8">
      <h2 class="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
        {{ t('settings.language') }}
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-4">
        <div class="flex items-center justify-between">
          <span class="text-gray-700 dark:text-gray-200">{{ t('settings.displayLanguage') }}</span>
          <div class="flex gap-2">
            <button
              v-for="loc in locales"
              :key="loc.value"
              @click="switchLanguage(loc.value)"
              :class="[
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all border',
                appStore.currentLanguage === loc.value
                  ? 'bg-[var(--theme-color)] text-white border-[var(--theme-color)]'
                  : 'bg-transparent text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-gray-400',
              ]"
            >
              {{ loc.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Placeholder settings -->
    <section class="mb-8">
      <h2 class="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
        {{ t('settings.general') }}
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl ring-1 ring-black/5 dark:ring-white/10 divide-y divide-gray-100 dark:divide-gray-700/50">
        <div
          v-for="item in placeholderItems"
          :key="item.key"
          class="flex items-center justify-between px-4 py-3"
        >
          <span class="text-gray-700 dark:text-gray-200">{{ item.label }}</span>
          <n-switch :value="item.enabled" />
        </div>
      </div>
    </section>

    <!-- System Permissions -->
    <section class="mb-8">
      <h2 class="text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
        {{ t('settings.systemPermissions') }}
      </h2>
      <div class="bg-white dark:bg-gray-800 rounded-xl ring-1 ring-black/5 dark:ring-white/10 p-4">
        <button
          @click="goToPrivacy"
          class="w-full flex items-center justify-between text-left
                 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50
                 rounded-lg px-3 py-2 transition-colors"
        >
          <div class="flex items-center gap-3">
            <Icon class="text-gray-500 dark:text-gray-400">
              <ShieldKeyhole20Regular />
            </Icon>
            <span>{{ t('settings.managePermissions') }}</span>
          </div>
          <Icon class="text-gray-400">
            <ChevronRight20Regular />
          </Icon>
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NSwitch } from 'naive-ui'
import { Icon } from '@vicons/utils'
import ShieldKeyhole20Regular from '@vicons/fluent/es/ShieldKeyhole20Regular'
import ChevronRight20Regular from '@vicons/fluent/es/ChevronRight20Regular'
import { useAppStore } from '@/stores/appStore'

const { t, locale } = useI18n()
const router = useRouter()
const appStore = useAppStore()

const locales = [
  { value: 'zh-CN' as const, label: '中文' },
  { value: 'en' as const, label: 'English' },
]

function switchLanguage(value: 'zh-CN' | 'en') {
  appStore.setLanguage(value)
  locale.value = value
}

function goToPrivacy() {
  router.push({ name: 'settings-privacy' })
}

// Placeholder items — will be replaced with real config from TOML backend
const placeholderItems = [
  { key: 'autoLaunch', label: t('settings.autoLaunch'), enabled: false },
  { key: 'notifications', label: t('settings.notifications'), enabled: true },
  { key: 'minimizeToTray', label: t('settings.minimizeToTray'), enabled: true },
]
</script>

<style scoped>
:root {
  --theme-color: oklch(0.716 0.191 2.477);
}
</style>
