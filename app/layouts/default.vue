<template>
  <div class="h-screen w-screen bg-[#070709] flex items-center justify-center p-0 md:p-2 overflow-hidden">
    <!-- Monitor Chassis (Bezel) -->
    <div
      class="crt-bezel w-full h-full flex flex-col"
      :class="{ 'crt-active': isCrtActive }"
    >
      <!-- Monitor Screen glass container -->
      <div 
        class="crt-screen-wrap flex flex-col w-full h-full text-sm antialiased selection:bg-[#33ff33]/30 selection:text-white bg-black"
        :class="{ 
          'crt-active': isCrtActive, 
          'crt-power-on-active': isCrtActive && isPowerOnAnimating 
        }"
      >
        <LazyNuxtRouteAnnouncer />

        <!-- Top Status Bar acts as global layout Navbar -->
        <BarComponent />

        <!-- VHS HUD overlay in the top-left area -->
        <div v-if="isCrtActive" class="vhs-hud">
          <div class="font-bold flex items-center gap-1 text-[11px] md:text-[12px]">
            <span class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500 vhs-blink"></span>
            <span>PLAY</span>
          </div>
          <div class="text-[10px] md:text-[11px] font-semibold text-green-500/80">SP</div>
          <div class="text-[9px] md:text-[10px] tracking-wider opacity-90 mt-1 whitespace-pre">{{ vhsTime }}</div>
        </div>

        <!-- Page Content Area -->
        <main
          class="flex-1 flex flex-col lg:flex-row gap-2 p-2 relative overflow-y-auto overflow-x-hidden lg:overflow-hidden transition-opacity duration-1000"
          :class="isDesktopReady ? 'opacity-100' : 'opacity-0'"
        >
          <NuxtPage />
        </main>

        <!-- CRT overlays inside screen wrap -->
        <div v-if="isCrtActive" class="crt-effects-overlay"></div>
        <div v-if="isCrtActive" class="crt-glare-overlay"></div>
        <div v-if="isCrtActive" class="crt-roll-overlay"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BarComponent from "~/components/BarComponent.vue";
import { onMounted, onUnmounted, ref, watch } from "vue";

const isDesktopReady = ref(false);
const isCrtActive = useState('crt-active', () => false);
const isPowerOnAnimating = ref(false);
const vhsTime = ref('');

// Setup dynamic VHS overlay HUD
let vhsInterval: number;
const updateVhs = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const monthStr = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();
  vhsTime.value = `${monthStr} ${day} ${year}\nAM ${timeStr}`;
};

// Power on screen snap logic
const triggerPowerOn = () => {
  isPowerOnAnimating.value = true;
  setTimeout(() => {
    isPowerOnAnimating.value = false;
  }, 750);
};

onMounted(() => {
  if (isCrtActive.value) {
    triggerPowerOn();
  }

  setTimeout(() => {
    isDesktopReady.value = true;

    // Apply global wallpaper to body
    const body = document.body;
    body.style.backgroundImage = "radial-gradient(circle at center, #18181b 0%, #030303 100%)";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
  }, 300);

  updateVhs();
  vhsInterval = window.setInterval(updateVhs, 1000);
});

onUnmounted(() => {
  clearInterval(vhsInterval);
});

// Watch state changes to trigger power-on snap when toggling CRT back on
watch(isCrtActive, (newVal) => {
  if (newVal) {
    triggerPowerOn();
  }
});
</script>

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

