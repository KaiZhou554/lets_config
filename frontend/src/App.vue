<template>
  <div class="h-screen">
    <div
      class="bg-white/20 dark:bg-neutral-900/20 w-full h-full ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex flex-col transition-colors"
    >
      <TitleBar
        :icon-animating="iconAnimating"
        :is-maximized="isMaximized"
        :app-icon="AppIcon"
        @toggle-sidebar="toggleSidebar"
        @minimize="handleMinimize"
        @maximize="handleMaximize"
        @close="handleClose"
      />

      <div class="h-full relative overflow-hidden">
        <Sidebar
          :categories="categories"
          v-model:active-category="activeCategory"
          :sidebar-open="sidebarOpen"
        />

        <PhraseList
          :category="currentCategory"
          :copied-states="copiedStates"
          @copy="copyText"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { WindowMinimise, WindowMaximise, WindowUnmaximise, WindowIsMaximised, Quit } from '../wailsjs/runtime/runtime'
import { categories } from './data/categories'
import type { Phrase, Category } from './types'
import AppIcon from './assets/appicon_128px.webp'
import TitleBar from './components/TitleBar.vue'
import Sidebar from './components/Sidebar.vue'
import PhraseList from './components/PhraseList.vue'

const sidebarOpen = ref<boolean>(false)
const iconAnimating = ref<boolean>(false)
const activeCategory = ref<string>('mc')
const isMaximized = ref<boolean>(false)
const copiedStates = ref<Record<number, boolean>>({})

const currentCategory = computed<Category | undefined>(() =>
  categories.find(c => c.id === activeCategory.value),
)

const toggleSidebar = () => {
  iconAnimating.value = true
  sidebarOpen.value = !sidebarOpen.value
  setTimeout(() => {
    iconAnimating.value = false
  }, 300)
}

const handleMinimize = () => {
  WindowMinimise()
}

const handleMaximize = () => {
  if (isMaximized.value) {
    WindowUnmaximise()
    isMaximized.value = false
  } else {
    WindowMaximise()
    isMaximized.value = true
  }
}

const handleClose = () => {
  Quit()
}

const copyText = (item: Phrase, idx: number) => {
  copiedStates.value[idx] = true
  navigator.clipboard.writeText(item.text)
  setTimeout(() => {
    copiedStates.value[idx] = false
  }, 1000)
}

onMounted(async () => {
  isMaximized.value = await WindowIsMaximised()
})
</script>