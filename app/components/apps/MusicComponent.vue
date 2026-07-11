

<template>
  <div class="h-full w-full bg-black flex flex-col font-mono text-[#33ff33]">
    <!-- Green visualizer bars -->
    <div class="flex h-full w-full items-end justify-center p-4 gap-1 overflow-hidden bg-black">
      <div 
        v-for="(height, index) in bars" 
        :key="index"
        class="w-full bg-[#33ff33] transition-all duration-100 ease-in-out"
        :style="{ height: `${height}%` }"
      ></div>
    </div>
    
    <div class="w-full bg-black border-t border-[#33ff33]/30 p-3 flex flex-col gap-2">
      <!-- Time and Progress Bar -->
      <div class="flex items-center gap-2 text-[10px] text-[#33ff33] font-mono">
        <span>{{ currentTimeFormatted }}</span>
        <div class="flex-1 h-2 bg-[#113311] overflow-hidden flex relative">
          <div class="h-full bg-[#33ff33] transition-all duration-1000 ease-linear" :style="{ width: `${progressPercentage}%` }">
          </div>
          <!-- Retro block progress slider knob -->
          <div class="absolute w-1.5 h-full bg-white border border-[#33ff33]" :style="{ left: `calc(${progressPercentage}% - 3px)` }"></div>
        </div>
        <span>{{ totalTimeFormatted }}</span>
      </div>
      
      <!-- Track info & control buttons -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative w-12 h-12 border border-[#33ff33] overflow-hidden">
            <img class="w-full h-full object-cover" src="/images/alexandra.jpeg" alt="cover-song"/>
          </div>
          <div class="flex flex-col justify-center">
            <h2 class="text-[#33ff33] font-bold text-sm leading-tight">Alexandra</h2>
            <p class="text-[#33ff33]/70 text-xs">Reality Club</p>
          </div>
        </div>
        
        <div class="flex items-center gap-3 text-[#33ff33]">
          <!-- Prev Button -->
          <button class="hover:bg-[#33ff33] hover:text-black border border-transparent hover:border-[#33ff33] px-1 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07a1 1 0 0 0 0 1.64z"/></svg>
          </button>
          <!-- Play/Pause Button -->
          <button class="w-8 h-8 border border-[#33ff33] bg-black text-[#33ff33] flex items-center justify-center hover:bg-[#33ff33] hover:text-black transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>
          </button>
          <!-- Next Button -->
          <button class="hover:bg-[#33ff33] hover:text-black border border-transparent hover:border-[#33ff33] px-1 transition-colors">
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
