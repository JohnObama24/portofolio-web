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
  <header class="flex items-center justify-between px-1 md:px-2 h-8 md:h-6 bg-zinc-950 text-[10px] md:text-xs border-b border-zinc-700/50 shadow-md overflow-hidden relative">
    <!-- Workspaces -->
    <div class="flex items-center gap-0 md:gap-1 h-full overflow-x-auto scrollbar-hide shrink-0 z-10">
      <NuxtLink to="/" class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap" active-class="bg-zinc-700 text-zinc-100" inactive-class="text-zinc-500 hover:text-zinc-300">
        <span class="mr-1 opacity-50">[1]</span>home
      </NuxtLink>
      <NuxtLink to="/project" class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap" active-class="bg-zinc-700 text-zinc-100" inactive-class="text-zinc-500 hover:text-zinc-300">
        <span class="mr-1 opacity-50">[2]</span>project
      </NuxtLink>
      <NuxtLink to="/contact" class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap" active-class="bg-zinc-700 text-zinc-100" inactive-class="text-zinc-500 hover:text-zinc-300">
        <span class="mr-1 opacity-50">[3]</span>contact
      </NuxtLink>
    </div>

    <!-- Window Title -->
    <div class="absolute left-1/2 -translate-x-1/2 hidden sm:block text-zinc-400 font-semibold truncate max-w-[150px] md:max-w-md z-0 pointer-events-none">
      ~ / porto
    </div>

    <!-- System Tray -->
    <div class="flex items-center gap-2 md:gap-3 h-full text-zinc-400 shrink-0 z-10 ml-auto">
      <div class="hidden md:flex items-center gap-1">
        <span class="text-zinc-500">vol</span>
        <span>75%</span>
      </div>
      <div class="hidden lg:flex items-center gap-1">
        <span class="text-zinc-500">mem</span>
        <span>1.2G</span>
      </div>
      <div class="flex items-center gap-1 bg-zinc-800 h-full px-2 text-zinc-200 whitespace-nowrap font-bold">
        <span class="hidden sm:inline">{{ date }}</span>
        <span>{{ time }}</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
