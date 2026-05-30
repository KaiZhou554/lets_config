import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * App-level state store.
 * Designed for future Wails TOML backend integration:
 * - `isFirstLaunch` will be read from TOML config on startup
 * - Settings changes will write back to TOML via Wails bindings
 */
export const useAppStore = defineStore('app', () => {
  // ============== First-launch / Onboarding ==============
  /** Whether this is the first time the app is launched.
   *  Future: read from `wails` TOML backend via `App.GetConfig()`. */
  const isFirstLaunch = ref<boolean>(true)

  /** Mark onboarding as complete.
   *  Future: call `App.SetConfig({ firstLaunch: false })`. */
  function completeOnboarding() {
    isFirstLaunch.value = false
  }

  // ============== Language ==============
  const supportedLocales = ['zh-CN', 'en'] as const
  type Locale = (typeof supportedLocales)[number]

  const currentLanguage = ref<Locale>('zh-CN')

  /** Switch language. Syncs vue-i18n locale.
   *  Future: write `language` key to TOML config. */
  function setLanguage(locale: Locale) {
    currentLanguage.value = locale
    // vue-i18n locale is set via the i18n instance — we expose this
    // so consumers can call i18n.locale.value = locale after calling this.
  }

  // ============== Window state (for TitleBar) ==============
  const isMaximized = ref<boolean>(false)

  function setMaximized(val: boolean) {
    isMaximized.value = val
  }

  // ============== Sidebar state ==============
  const sidebarOpen = ref<boolean>(false)
  const sidebarAnimating = ref<boolean>(false)

  function toggleSidebar() {
    sidebarAnimating.value = true
    sidebarOpen.value = !sidebarOpen.value
    setTimeout(() => {
      sidebarAnimating.value = false
    }, 300)
  }

  function setSidebarOpen(val: boolean) {
    sidebarOpen.value = val
  }

  return {
    // state
    isFirstLaunch,
    currentLanguage,
    isMaximized,
    sidebarOpen,
    sidebarAnimating,
    // actions
    completeOnboarding,
    setLanguage,
    setMaximized,
    toggleSidebar,
    setSidebarOpen,
  }
})
