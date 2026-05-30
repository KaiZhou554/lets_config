<template>
  <div
    class="border-t border-l border-neutral-200 rounded-tl-md dark:border-neutral-700
      h-full overflow-y-auto ml-12 p-6 bg-white dark:bg-neutral-800 transition-all duration-300 pl-12"
  >
    <Transition mode="out-in">
      <h1
        :key="category?.name"
        class="whitespace-nowrap overflow-hidden text-xl text-neutral-900 dark:text-white mb-5"
      >
        {{ category?.name }}
      </h1>
    </Transition>

    <ul v-if="category" class="space-y-4">
      <li v-for="(item, idx) in category.phrases" :key="idx" class="group">
        <Transition mode="out-in">
          <div
            :key="item.label"
            class="whitespace-nowrap overflow-hidden text-sm font-medium text-neutral-600 dark:text-neutral-300 mb-1.5"
          >
            {{ item.label }}
          </div>
        </Transition>

        <div class="flex items-center gap-2">
          <Transition appear mode="out-in">
            <div
              :key="item.text"
              class="whitespace-nowrap overflow-hidden flex-1 border-[0.5px] border-neutral-200 border-b-2 dark:border-neutral-700 hover:border-b-taffy-400 dark:hover:border-b-taffy-200 rounded-md px-3 py-1.5 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-200 truncate font-mono transition-colors"
            >
              {{ item.text }}
            </div>
          </Transition>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-500 dark:text-neutral-300 active:text-neutral-500/50 dark:active:text-neutral-300/50 transition-colors shrink-0 border border-neutral-200 dark:border-neutral-700"
            title="复制"
            @click="$emit('copy', item, idx)"
          >
            <Icon size="20" class="transition-all duration-300">
              <component :is="copiedStates[idx] ? Checkmark20Regular : Copy20Regular" />
            </Icon>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Checkmark20Regular, Copy20Regular } from '@vicons/fluent'
import { Icon } from '@vicons/utils'
import type { Phrase, Category } from '../types'

defineProps<{
  category?: Category
  copiedStates: Record<number, boolean>
}>()

defineEmits<{
  copy: [item: Phrase, idx: number]
}>()
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.35s ease;
}

.v-enter-from {
  transform: translateY(32px);
  opacity: 0.4;
}

.v-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.v-leave-from {
  transform: scale(1);
  opacity: 1;
}

.v-leave-to {
  transform: scale(0.6);
  opacity: 0;
}
</style>
