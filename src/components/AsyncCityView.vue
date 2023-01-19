<template>
  <div class="flex flex-1 flex-col items-center">
    <!-- Banner -->
    <div
      class="w-full bg-skin-card p-4 text-center text-skin-base"
      v-if="route.query.preview"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city
      </p>
    </div>
    <!-- Weather overview -->
    <div class="w-full max-w-screen-md">
      <div
        class="mx-8 flex flex-col items-center py-4 text-skin-base"
        v-if="weatherData"
      >
        <div class="mb-6 flex w-full justify-between text-lg">
          <h1>{{ route.params.city }}</h1>
          <p>
            {{
              new Date(weatherData.currentTime).toLocaleDateString('fr-Fr', {
                weekday: 'long',
                day: '2-digit',
                month: 'short',
              })
            }}
            {{
              new Date(weatherData.currentTime).toLocaleTimeString('fr-Fr', {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </p>
        </div>

        <p class="text-8xl">{{ Math.round(weatherData.current.temp) }}&deg;</p>
        <p>
          Feels like
          {{ Math.round(weatherData.current.feels_like) }}&deg;
        </p>
        <p class="capitalize">
          {{ weatherData.current.weather[0].description }}
        </p>
        <img
          class="h-auto w-[150px]"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
    </div>
    <hr class="border-1 w-full max-w-[90%] bg-opacity-10 text-skin-base" />
    <!-- Hourly forecast -->
    <div class="w-full max-w-screen-md py-8">
      <div class="mx-8 text-skin-base">
        <h2 class="mb-4">Hourly Weather</h2>
        <div
          class="scrollbar-thumb-accent/80 flex gap-10 overflow-x-scroll px-2 scrollbar-thin scrollbar-track-gray-400/30 scrollbar-thumb-weather-secondary"
        >
          <div
            class="mb-6 flex flex-col items-center"
            v-for="hourData in weatherData?.hourly"
            :key="hourData.dt"
          >
            <p class="text-md whitespace-nowrap">
              {{
                new Date(hourData.currentTime).toLocaleString('fr-FR', {
                  hour: 'numeric',
                })
              }}
            </p>
            <img
              class="h-[45px] w-[45px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              :alt="hourData.weather[0].description"
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="border-1 w-full max-w-[90%] bg-opacity-10 text-skin-base" />
    <!-- Daily weather -->
    <div class="w-full max-w-screen-md py-8">
      <div class="mx-8 text-skin-base">
        <h2 class="mb-4">7 Days Forecast</h2>
        <div
          class="flex items-center"
          v-for="day in weatherData?.daily"
          :key="day.dt"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleString('fr-FR', {
                weekday: 'long',
              })
            }}
          </p>
          <img
            class="h-[45px] w-[45px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            :alt="day.weather[0].description"
          />
          <div class="flex flex-1 justify-end gap-2">
            <p class="text-xl">{{ Math.round(day.temp.max) }}&deg;</p>
            <p class="text-xl">{{ Math.round(day.temp.min) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex cursor-pointer items-center gap-2 py-12 text-skin-base duration-150 hover:text-skin-alert"
      v-if="!route.query.preview"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove city</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'

  import type { WeatherData } from './types'

  const route = useRoute()
  const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

  const router = useRouter()
  const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities') || '')
    const id = route.query.id
    const updatedCities = cities.filter((city: any) => city.id !== id)
    localStorage.setItem('savedCities', JSON.stringify(updatedCities))
    router.push({
      name: 'home',
    })
  }

  const getWeatherData = async () => {
    try {
      const request = `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      const weatherData = await axios.get<WeatherData>(request)
      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000
      const utc = weatherData.data.current.dt * 1000 + localOffset
      weatherData.data.currentTime =
        utc + 1000 * weatherData.data.timezone_offset
      // cal hourly weather offset
      weatherData.data.hourly.forEach((hour) => {
        const utc = hour.dt * 1000 + localOffset
        hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
      })

      await new Promise((res) => setTimeout(res, 750)) // We wait to avoid flicker

      return weatherData.data
    } catch (error) {
      console.log(error)
    }
  }

  const weatherData = await getWeatherData()
</script>
