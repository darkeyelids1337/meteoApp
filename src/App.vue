<script setup>
import { API_KEY, BASE_URL } from './constants/index'
import WeatherSummary from './components/WeatherSummary.vue'
import Highlights from './components/Hightlights.vue'
import { onMounted, ref, computed } from 'vue'
import Coords from './components/Coords.vue'
import Humidity from './components/Humidity.vue'
import { capitalize } from './utils'
const weatherInfo = ref(null)
const city = ref('Samara')

const getWeather = () => {
  fetch(`${BASE_URL}?q=${city.value}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => (weatherInfo.value = data))
    .catch((err) => console.error(err))
}
const isError = computed(() => weatherInfo.value?.cod !== 200)
onMounted(getWeather)
</script>

<template>
  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section class="section section-left" :class="isError ? 'section-error' : ''">
              <div class="info">
                <div class="city-inner">
                  <input @keyup.enter="getWeather" type="text" class="search" v-model="city" />
                </div>
                <WeatherSummary
                  :weatherInfo="weatherInfo"
                  v-if="!isError"
                ></WeatherSummary>
                <div v-else class="error">
                  <div class="error-title">
                    Oops! Что-то пошло не так!
                  </div>
                  <div v-if="weatherInfo?.message" class="error-message">
                    {{ capitalize(weatherInfo?.message) }}
                  </div>
                </div>
              </div>
            </section>
            <section class="section section-right">
              <Highlights v-if="!isError" :weatherInfo="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <Coords :coord="weatherInfo.coord"></Coords>
            <Humidity :humidity="weatherInfo.main.humidity"></Humidity>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="sass" scoped>
.section-error
  min-width: 235px
  width: auto
  padding-right:0

.error
  padding-top: 20px
  &-title
    font-size: 18px
    font-weight: 700

  &-message
    padding-top: 18px
    font-size: 12px
</style>
