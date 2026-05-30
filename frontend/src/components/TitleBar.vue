<template>
  <header style="--wails-draggable:drag" class="h-12 flex items-center pl-2 shrink-0 select-none">
    <button
      style="--wails-draggable:no-drag"
      @click="$emit('toggleSidebar')"
      class="dark:text-white w-8 h-8 flex items-center justify-center rounded-sm hover:bg-neutral-400/50 dark:hover:bg-neutral-900/50 active:bg-neutral-400 dark:active:bg-neutral-900 text-lg leading-none transition-colors"
    >
      <Icon :class="{ 'animate-squeeze': iconAnimating }">
        <TextAlignJustify24Regular />
      </Icon>
    </button>
    <img :src="appIcon" class="h-5 w-5 ml-4" alt="" />
    <span class="ml-3 text-sm font-medium text-neutral-700 dark:text-neutral-200">快捷短语</span>

    <div style="--wails-draggable:no-drag" class="ml-auto flex items-center gap-1">
      <button
        @click="$emit('minimize')"
        class="dark:text-white w-12 h-12 flex items-center justify-center hover:bg-neutral-400/50 dark:hover:bg-neutral-900/50 active:bg-neutral-400 dark:active:bg-neutral-900 text-sm transition-colors"
        title="最小化"
      >
        <Icon><Subtract48Regular /></Icon>
      </button>
      <button
        @click="$emit('maximize')"
        class="dark:text-white w-12 h-12 flex items-center justify-center hover:bg-neutral-400/50 dark:hover:bg-neutral-900/50 active:bg-neutral-400 dark:active:bg-neutral-900 text-sm transition-colors"
        title="最大化"
      >
        <Icon>
          <component :is="isMaximized ? SquareMultiple24Regular : Tab28Regular" />
        </Icon>
      </button>
      <button
        @click="$emit('close')"
        class="dark:text-white w-12 h-12 flex items-center justify-center hover:bg-red-500 active:hover:bg-red-500/50 hover:text-white text-sm transition-colors"
        title="关闭"
      >
        <Icon><Dismiss48Regular /></Icon>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  Dismiss48Regular,
  Tab28Regular,
  Subtract48Regular,
  TextAlignJustify24Regular,
  SquareMultiple24Regular,
} from '@vicons/fluent'
import { Icon } from '@vicons/utils'

defineProps<{
  iconAnimating: boolean
  isMaximized: boolean
  appIcon: string
}>()

defineEmits<{
  toggleSidebar: []
  minimize: []
  maximize: []
  close: []
}>()
</script>

<style scoped>
@keyframes squeeze {
  0%   { transform: scaleX(1);   }
  50%  { transform: scaleX(0.5); }
  100% { transform: scaleX(1);   }
}

.animate-squeeze {
  animation: squeeze 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
