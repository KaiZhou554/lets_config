<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'

/**
 * Global Naive UI theme overrides.
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
