<template>
  <div class="summary">
    <div
      :style="`background-image: url('/meteoApp/weather-main/${weatherInfo?.weather[0].description}.png')`"
      class="pic-main"
    ></div>
    <div class="weather">
      <div class="temp">{{ (weatherInfo?.main?.temp - 273.15).toFixed(0) }} °C</div>
      <div class="weather-desc text-block">{{ capitalize(weatherInfo?.weather[0].description) }}</div>
    </div>
    <div class="city text-block">{{weatherInfo?.name}}, {{ weatherInfo?.sys?.country }}</div>
    <div class="date text-block">{{ todayDate }}</div>
  </div>
</template>

<script setup>
import { capitalize } from '/src/utils/index';
   const props = defineProps({
        weatherInfo:{
            type: [Object, null],
            required: true
        }
    })
    const todayDate = new Date().toLocaleString('en-EN', {weekday: 'short', year: 'numeric', month:'long', day:'numeric'} )
</script>

<style lang="sass" scoped></style>
