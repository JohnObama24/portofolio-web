<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const bars = ref<number[]>([])
const numBars = 40 // Adjust depending on width

let animationFrameId: number

const updateBars = () => {
  bars.value = Array.from({ length: numBars }).map(() => {
    // Generate a random height percentage between 5% and 100%
    return Math.floor(Math.random() * 95) + 5
  })
  animationFrameId = requestAnimationFrame(() => {
    setTimeout(updateBars, 100)
  })
}

onMounted(() => {
  updateBars()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <!-- Background is typical linux terminal color -->
  <div class="h-full w-full bg-[#11111b] flex items-end justify-center p-4 gap-1 overflow-hidden">
    <div 
      v-for="(height, index) in bars" 
      :key="index"
      class="w-full bg-gray-400 rounded-t-sm transition-all duration-100 ease-in-out"
      :style="{ height: `${height}%` }"
    ></div>
  </div>
</template>
