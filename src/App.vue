<template>
  <div
    class="theme-light dark:theme-dark scrollbar-thumb-accent/80 flex h-32 min-h-screen flex-col overflow-y-scroll bg-skin-fill font-Roboto scrollbar-thin scrollbar-track-gray-400/30 scrollbar-thumb-weather-secondary"
  >
    <SiteNavigation />
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
  import { useDark } from '@vueuse/core'
  import { RouterView } from 'vue-router'

  import SiteNavigation from './components/SiteNavigation.vue'

  const isDark = useDark()
</script>

<style>
  .page-enter-active .page-leave-active {
    transition: 600ms ease all;
  }
  .page-enter-from .page-leave-to {
    opacity: 0;
  }
</style>
