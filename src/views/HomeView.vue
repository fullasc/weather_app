<template>
  <main class="container text-skin-base">
    <div class="relative mb-8 pt-4">
      <input
        class="w-full border-b bg-transparent py-2 px-1 focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004E71] focus:outline-none"
        v-model="searchQuery"
        type="text"
        @input="getSearchResults"
        placeholder="Search for a city"
      />
      <ul
        class="absolute top-[66px] w-full rounded-b-md bg-skin-card py-2 px-1 text-skin-base shadow-md"
        v-if="mapboxSearchResults && searchQuery"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different city.
        </p>
        <template v-else>
          <li
            class="cursor-pointer py-2 hover:bg-skin-card-hover"
            v-for="searchResult in mapboxSearchResults"
            v-on:keyup.enter="previewCity(searchResult)"
            :key="searchResult.id"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { useDark } from '@vueuse/core'
  import axios from 'axios'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import CityCardSkeleton from '@/components/CityCardSkeleton.vue'
  import CityList from '@/components/CityList.vue'
  import type { MapboxFeature, MapboxGeocodeResponse } from '@/components/types'

  const isDark = useDark()

  const router = useRouter()

  const mapboxAPIKey = import.meta.env.VITE_MAPBOX_API_KEY
  const searchQuery = ref('')
  const queryTimeout = ref(0)
  const mapboxSearchResults = ref([] as MapboxFeature[])
  const searchError = ref(false)

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value !== '') {
        const query = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        try {
          const result = await axios.get<MapboxGeocodeResponse>(query)
          mapboxSearchResults.value = result.data.features
        } catch (error) {
          searchError.value = true
        }
        return
      }
      mapboxSearchResults.value = []
    }, 500)
  }

  const previewCity = (searchResult: MapboxFeature) => {
    const [city, state] = searchResult.place_name.split(', ')
    router.push({
      name: 'cityView',
      params: { state: state, city: city },
      query: {
        lat: searchResult.geometry.coordinates[1],
        lng: searchResult.geometry.coordinates[0],
        preview: String(true),
      },
    })
  }
</script>
