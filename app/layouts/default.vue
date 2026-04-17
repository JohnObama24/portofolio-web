<template>
  <div
    class="h-screen w-screen flex flex-col text-sm antialiased selection:bg-indigo-500/30 selection:text-indigo-200 bg-[#1e1e2e]"
  >
    <LazyNuxtRouteAnnouncer />

    <!-- Top Status Bar acts as global layout Navbar -->
    <BarComponent />

    <!-- Page Content Area -->
    <main
      class="flex-1 flex flex-col lg:flex-row gap-2 p-2 relative overflow-y-auto overflow-x-hidden lg:overflow-hidden transition-opacity duration-1000"
      :class="isDesktopReady ? 'opacity-100' : 'opacity-0'"
    >
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import BarComponent from "~/components/BarComponent.vue";
import { onMounted, ref } from "vue";

const isDesktopReady = ref(false);

onMounted(() => {
  setTimeout(() => {
    isDesktopReady.value = true;

    // Apply global wallpaper to body
    const body = document.body;
    body.style.backgroundImage = "radial-gradient(circle at center, #27272a 0%, #09090b 100%)";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
  }, 300);
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
