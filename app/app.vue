<template>
  <div
    class="h-screen w-screen flex flex-col text-sm antialiased selection:bg-indigo-500/30 selection:text-indigo-200"
  >
    <LazyNuxtRouteAnnouncer />

    <!-- Top Status Bar -->
    <TwmBar />

    <!-- Desktop Area -->
    <main
      class="flex-1 flex gap-2 p-2 relative overflow-hidden transition-opacity duration-1000"
      :class="isDesktopReady ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Left side: Main Terminal Portfolio -->
      <div
        class="flex-1 flex flex-col h-full animate-[fade-in-up_0.5s_ease-out]"
      >
        <TwmWindow
          title="terminal - john@porto: ~"
          :isActive="false"
          class="h-full shadow-xl"
        >
          <TerminalApp />
        </TwmWindow>
      </div>

      <div class="w-1/3 flex flex-col gap-2 h-full">
        <TwmWindow
          title="skills"
          class="h-1/3 animate-[fade-in-up_0.6s_ease-out]"
        >
        </TwmWindow>

        <TwmWindow
          title="music"
          class="flex-1 animate-[fade-in-up_0.7s_ease-out]"
        >
          <CavaApp />
        </TwmWindow>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TwmBar from "~/components/TwmBar.vue";
import TwmWindow from "~/components/TwmWindow.vue";
import TerminalApp from "~/components/apps/TerminalApp.vue";
import CavaApp from "~/components/apps/CavaApp.vue";
import { onMounted, ref } from "vue";

const isDesktopReady = ref(false);

onMounted(() => {
  setTimeout(() => {
    isDesktopReady.value = true;

    const body = document.body;
    body.style.backgroundImage =
      "radial-gradient(circle at center, #27272a 0%, #09090b 100%)";
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
