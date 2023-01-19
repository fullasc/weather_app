<template>
  <div
    class="flex cursor-pointer rounded-md bg-skin-card py-6 px-3 shadow-md hover:bg-skin-card-hover"
  >
    <div class="flex flex-1 flex-col">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3 class="text-skin-muted">{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="self-end text-3xl">
        {{ Math.round(city.weather?.main.temp || 0) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs"
          >Max: {{ Math.round(city.weather?.main.temp_max || 0) }}&deg;</span
        >
        <span class="text-xs"
          >Min: {{ Math.round(city.weather?.main.temp_min || 0) }}&deg;</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'

  import type { LocationType } from './types'

  defineProps({
    city: {
      type: Object as PropType<LocationType>,
      required: true,
      default: () => ({}),
    },
  })
</script>
