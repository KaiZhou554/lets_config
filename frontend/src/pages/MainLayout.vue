<template>
  <div class="h-screen">
    <div
      class="bg-white/20 dark:bg-neutral-900/20 w-full h-full ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex flex-col transition-colors"
    >
      <!-- TitleBar: sidebar toggle shown here (not during onboarding) -->
      <TitleBar
        :show-sidebar-toggle="true"
        :icon-animating="appStore.sidebarAnimating"
        :is-maximized="appStore.isMaximized"
        :app-icon="AppIcon"
        :app-name="t('app.defaultAppName')"
        @toggle-sidebar="appStore.toggleSidebar()"
        @minimize="handleMinimize"
        @maximize="handleMaximize"
        @close="handleClose"
      />

      <div class="h-full relative overflow-hidden">
        <Sidebar :sidebar-open="appStore.sidebarOpen" />

        <!-- Page content area with Naive UI scrollbar -->
        <div
          class="h-full ml-12 bg-gray-50 dark:bg-gray-900 rounded-tl-xl"
        >
          <n-scrollbar>
            <router-view />
          </n-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { NScrollbar } from 'naive-ui'
import {
  WindowMinimise,
  WindowMaximise,
  WindowUnmaximise,
  WindowIsMaximised,
  Quit,
} from '../../wailsjs/runtime/runtime'
import AppIcon from '@/assets/appicon_128px.webp'
import TitleBar from '@/components/TitleBar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useAppStore } from '@/stores/appStore'

const { t } = useI18n()
const appStore = useAppStore()

const handleMinimize = () => {
  WindowMinimise()
}

const handleMaximize = () => {
  if (appStore.isMaximized) {
    WindowUnmaximise()
    appStore.setMaximized(false)
  } else {
    WindowMaximise()
    appStore.setMaximized(true)
  }
}

const handleClose = () => {
  Quit()
}

onMounted(async () => {
  appStore.setMaximized(await WindowIsMaximised())
})
</script>
