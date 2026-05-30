<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="h-full overflow-y-auto p-8">
      <!-- Back button -->
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-gray-500 dark:text-gray-400
               hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <Icon><ChevronLeft20Regular /></Icon>
        <span class="text-sm">{{ t('settings.backToSettings') }}</span>
      </button>

      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {{ t('settings.systemPermissions') }}
      </h1>

      <PrivacySettings :app-name="t('app.placeholderAppName')" />
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NConfigProvider } from 'naive-ui'
import { Icon } from '@vicons/utils'
import ChevronLeft20Regular from '@vicons/fluent/es/ChevronLeft20Regular'
import PrivacySettings from '@/components/PrivacySettings.vue'

const { t } = useI18n()

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  Switch: {
    loadingColor: '#ce597eFF',
    railColorActive: '#ce597eFF',
  },
  common: {
    primaryColor: '#ce597eFF',
    primaryColorHover: '#da6a8cFF',
    primaryColorPressed: '#9e4260FF',
    primaryColorSuppl: '#da6a8cFF',
  },
}
</script>
