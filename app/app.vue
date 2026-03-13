<script setup lang="ts">
import TwmBar from '~/components/TwmBar.vue'
import TwmWindow from '~/components/TwmWindow.vue'
import TerminalApp from '~/components/apps/TerminalApp.vue'
import CavaApp from '~/components/apps/CavaApp.vue'
import { onMounted, ref } from 'vue'

const isDesktopReady = ref(false)

onMounted(() => {
  // Simulate desktop loading 
  setTimeout(() => {
    isDesktopReady.value = true
    
    // Fallback if background image not available
    const body = document.body
    body.style.backgroundImage = 'radial-gradient(circle at center, #27272a 0%, #09090b 100%)'
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = 'cover'
  }, 300)
})
</script>

<template>
  <div class="h-screen w-screen flex flex-col text-sm antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
    <LazyNuxtRouteAnnouncer />
    
    <!-- Top Status Bar -->
    <TwmBar />

    <!-- Desktop Area -->
    <main class="flex-1 flex gap-2 p-2 relative overflow-hidden transition-opacity duration-1000" :class="isDesktopReady ? 'opacity-100' : 'opacity-0'">
      
      <!-- Left side: Main Terminal Portfolio -->
      <div class="flex-1 flex flex-col h-full animate-[fade-in-up_0.5s_ease-out]">
        <TwmWindow title="alacritty - john@porto: ~" :isActive="true" class="h-full shadow-xl">
          <TerminalApp />
        </TwmWindow>
      </div>

      <!-- Right side: Utilities / Cava -->
      <div class="w-1/3 flex flex-col gap-2 h-full">
        <!-- System Info / Fetch -->
        <TwmWindow title="htop" class="h-1/3 animate-[fade-in-up_0.6s_ease-out]">
          <div class="h-full w-full bg-[#1e1e2e] text-[#a6e3a1] p-3 text-xs leading-relaxed flex flex-col justify-center">
            <div class="flex justify-between items-end mb-2">
              <span>CPU [|||||||||||||      20.4%]</span>
              <span>Mem [|||||||||||||||    1.2G/32G]</span>
            </div>
            <div class="flex justify-between items-end mb-2">
              <span>  1 [||||||           12.0%]</span>
              <span>Swp [                       0K/16G]</span>
            </div>
            <div class="flex justify-between items-end mb-4">
              <span>  2 [|||||||||||      28.8%]</span>
              <span>Uptime: 00:24:12</span>
            </div>
            <div class="text-[#cdd6f4]">
              Tasks: 124, 150 thr; 1 running<br>
              Load average: 0.12 0.05 0.01<br>
            </div>
          </div>
        </TwmWindow>

        <!-- Cava Visualizer -->
        <TwmWindow title="cava" class="flex-1 animate-[fade-in-up_0.7s_ease-out]">
          <CavaApp />
        </TwmWindow>
      </div>
      
    </main>
  </div>
</template>

<style>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
