

<template>
  <div class="h-full w-full bg-[#11111b] flex flex-col">
    <div class="flex h-full w-full items-end justify-center p-4 gap-1 overflow-hidden">
      <div 
        v-for="(height, index) in bars" 
        :key="index"
        class="w-full bg-gray-400 rounded-t-sm transition-all duration-100 ease-in-out"
        :style="{ height: `${height}%` }"
      ></div>
  
    </div>
    <div class="w-full bg-[#181825] border-t border-[#313244] p-3 flex flex-col gap-2">
      <div class="flex items-center gap-2 text-[10px] text-[#a6adc8] font-mono">
        <span>{{ currentTimeFormatted }}</span>
        <div class="flex-1 h-1.5 bg-[#313244] rounded-full overflow-hidden flex">
          <div class="h-full bg-[#a6adc8] relative transition-all duration-1000 ease-linear" :style="{ width: `${progressPercentage}%` }">
            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#f38ba8] rounded-full shadow-[0_0_5px_#f38ba8]"></div>
          </div>
        </div>
        <span>{{ totalTimeFormatted }}</span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative w-12 h-12 rounded shadow-md overflow-hidden group">
            <img class="w-full h-full object-cover transition-transform group-hover:scale-110" src="/images/alexandra.jpeg" alt="cover-song"/>
            <div class="absolute inset-0 border border-white/10 rounded"></div>
          </div>
          <div class="flex flex-col justify-center">
            <h2 class="text-[#cdd6f4] font-bold text-sm leading-tight">Alexandra</h2>
            <p class="text-[#a6adc8] text-xs">Reality Club</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4 text-[#cdd6f4]">
          <button class="hover:text-[#f38ba8] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07a1 1 0 0 0 0 1.64z"/></svg>
          </button>
          <button class="w-8 h-8 rounded-full bg-[#cdd6f4] text-[#1e1e2e] flex items-center justify-center hover:scale-105 hover:bg-[#a6e3a1] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>
          </button>
          <button class="hover:text-[#f38ba8] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.58 16.89l5.77-4.07a1 1 0 0 0 0-1.64L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const bars = ref<number[]>([])
const numBars = 15 

const currentTimeSeconds = ref(84) 
const totalSeconds = 225 

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const currentTimeFormatted = computed(() => formatTime(currentTimeSeconds.value))
const totalTimeFormatted = computed(() => formatTime(totalSeconds))

const progressPercentage = computed(() => {
  return (currentTimeSeconds.value / totalSeconds) * 100
})

let animationFrameId: number
let progressIntervalId: number

const updateBars = () => {
  bars.value = Array.from({ length: numBars }).map(() => {
    return Math.floor(Math.random() * 95) + 5
  })
  animationFrameId = requestAnimationFrame(() => {
    setTimeout(updateBars, 100)
  })
}

const updateProgress = () => {
  if (currentTimeSeconds.value < totalSeconds) {
    currentTimeSeconds.value += 1
  } else {
    currentTimeSeconds.value = 0 // loop back
  }
}

onMounted(() => {
  updateBars()
  progressIntervalId = window.setInterval(updateProgress, 1000)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  clearInterval(progressIntervalId)
})
</script>
