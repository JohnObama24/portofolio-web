<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const time = ref('')
const date = ref('')

let interval: number

onMounted(() => {
  const updateTime = () => {
    const now = new Date()
    time.value = now.toLocaleTimeString('en-US', { hour12: false })
    date.value = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
  updateTime()
  interval = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <header class="flex items-center justify-between px-2 h-6 bg-zinc-950 text-xs border-b border-zinc-700/50 shadow-md">
    <!-- Workspaces -->
    <div class="flex items-center gap-1 h-full">
      <NuxtLink to="/" class="px-2 h-full flex items-center transition-colors font-bold" active-class="bg-zinc-700 text-zinc-100" inactive-class="text-zinc-500 hover:text-zinc-300">[1] home</NuxtLink>
      <NuxtLink to="/project" class="px-2 h-full flex items-center transition-colors font-bold" active-class="bg-zinc-700 text-zinc-100" inactive-class="text-zinc-500 hover:text-zinc-300">[2] project</NuxtLink>
      <NuxtLink to="/contact" class="px-2 h-full flex items-center transition-colors font-bold" active-class="bg-zinc-700 text-zinc-100" inactive-class="text-zinc-500 hover:text-zinc-300">[3] contact</NuxtLink>
    </div>

    <!-- Window Title -->
    <div class="absolute left-1/2 -translate-x-1/2 text-zinc-400 font-semibold truncate max-w-[200px] md:max-w-md">
      ~ / porto
    </div>

    <!-- System Tray -->
    <div class="flex items-center gap-3 h-full text-zinc-400">
      <div class="flex items-center gap-1">
        <span class="text-zinc-500">vol</span>
        <span>75%</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-zinc-500">mem</span>
        <span>1.2G</span>
      </div>
      <div class="flex items-center gap-1 bg-zinc-800 h-full px-2 text-zinc-200">
        {{ date }} {{ time }}
      </div>
    </div>
  </header>
</template>
