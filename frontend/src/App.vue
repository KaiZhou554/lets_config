<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="h-screen flex flex-col bg-white/20 dark:bg-neutral-900/20">
      <!-- TitleBar — fixed above all page transitions -->
      <TitleBar
        :show-sidebar-toggle="showSidebarToggle"
        :back-button="showBackButton"
        :icon-animating="appStore.sidebarAnimating"
        :is-maximized="appStore.isMaximized"
        :app-icon="AppIcon"
        :app-name="t('app.defaultAppName')"
        @toggle-sidebar="appStore.toggleSidebar()"
        @back="handleBack"
        @minimize="handleMinimize"
        @maximize="handleMaximize"
        @close="handleClose"
      />

      <!-- Page content area with transitions -->
      <div class="flex-1 overflow-hidden">
        <router-view v-slot="{ Component, route }">
          <transition :name="transitionName" mode="out-in">
            <component :is="Component" :key="route.matched[0]?.path ?? route.path" />
          </transition>
        </router-view>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NConfigProvider } from 'naive-ui'
import {
  WindowMinimise,
  WindowMaximise,
  WindowUnmaximise,
  WindowIsMaximised,
  Quit,
} from '../wailsjs/runtime/runtime'
import AppIcon from '@/assets/appicon_128px.webp'
import TitleBar from '@/components/TitleBar.vue'
import { useAppStore } from '@/stores/appStore'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore()

/**
 * Global Naive UI theme overrides.
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

// ── TitleBar conditional props ──
const showSidebarToggle = computed(() =>
  route.path.startsWith('/main') && !appStore.isFirstLaunch,
)
const showBackButton = computed(() => route.path === '/setup')

// ── TitleBar event handlers ──
function handleBack() {
  router.back()
}
function handleMinimize() {
  WindowMinimise()
}
function handleMaximize() {
  if (appStore.isMaximized) {
    WindowUnmaximise()
    appStore.setMaximized(false)
  } else {
    WindowMaximise()
    appStore.setMaximized(true)
  }
}
function handleClose() {
  Quit()
}

// ── Top-level page transition ──
const transitionName = ref('fade')

/** First-segment path → first-segment path → CSS transition name */
const topTransitionMap: Record<string, Record<string, string>> = {
  '/welcome': { '/setup': 'slide-left' },
  '/setup':   { '/welcome': 'slide-right', '/main': 'fade' },
}

watch(
  () => router.currentRoute.value.matched[0]?.path,
  (to, from) => {
    const fromPath = (from as string | undefined) ?? null
    const toPath = (to as string | undefined) ?? null
    if (!fromPath || !toPath) {
      transitionName.value = 'fade'
      return
    }
    transitionName.value = topTransitionMap[fromPath]?.[toPath] ?? 'fade'
  },
)

onMounted(async () => {
  appStore.setMaximized(await WindowIsMaximised())
})
</script>
