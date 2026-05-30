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

    <div class="flex-1">
      <n-config-provider :theme-overrides="themeOverrides">
        <SetupCard
          :app-name="t('app.defaultAppName')"
          theme-color="oklch(0.716 0.191 2.477)"
          @finish="handleFinish"
        >
          <PrivacySettings :app-name="t('app.placeholderAppName')" />

          <p class="text-gray-500/40 dark:text-gray-400/40 mt-6 text-right text-sm">
            {{ t('app.versionPrefix') }}{{ store.meta.displayVersion }}
          </p>
        </SetupCard>
      </n-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NConfigProvider } from 'naive-ui'
import {
  WindowMinimise,
  WindowMaximise,
  WindowUnmaximise,
  WindowIsMaximised,
  Quit,
} from '../../wailsjs/runtime/runtime'
import SetupCard from '@/components/SetupCard.vue'
import PrivacySettings from '@/components/PrivacySettings.vue'
import TitleBar from '@/components/TitleBar.vue'
import { usePrivacyConfigStore } from '@/stores/privacyConfigStore'
import { useAppStore } from '@/stores/appStore'
import AppIcon from '@/assets/appicon_128px.webp'

const { t } = useI18n()
const router = useRouter()
const store = usePrivacyConfigStore()
const appStore = useAppStore()

function handleFinish() {
  appStore.completeOnboarding()
  router.push('/main/home')
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

/**
 * js 文件下使用这个做类型提示
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
