<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above
  </p>
</template>

<script setup lang="ts">
  import axios, { type AxiosPromise } from 'axios'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import type { LocationType } from './types'

  import CityCard from './CityCard.vue'

  const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

  const savedCities = ref<LocationType[]>([])
  const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
      savedCities.value = JSON.parse(localStorage.getItem('savedCities') || '')
      const requests: AxiosPromise[] = []
      savedCities.value.forEach((city) => {
        requests.push(
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
          )
        )
      })
      const weatherData = await Promise.all(requests)
      await new Promise((res) => setTimeout(res, 750)) // We wait to avoid flicker
      weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data
      })
    }
  }
  await getCities()

  const router = useRouter()
  const goToCityView = (city: LocationType) => {
    router.push({
      name: 'cityView',
      params: {
        city: city.city,
        state: city.state,
      },
      query: {
        id: city.id,
        lat: city.coords.lat,
        lng: city.coords.lng,
      },
    })
  }
</script>
