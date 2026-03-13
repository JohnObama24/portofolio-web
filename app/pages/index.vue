<template>
  <div class="flex-1 flex gap-2 h-full w-full">
    <!-- Left side: Main Terminal Portfolio -->
    <div
      class="flex-1 flex flex-col h-full animate-[fade-in-up_0.5s_ease-out]"
    >
      <TwmWindow
        title="terminal - john@porto: ~"
        :isActive="true"
        class="h-full shadow-xl"
      >
        <TerminalApp />
      </TwmWindow>
    </div>

    <!-- Right side: Utilities / Cava -->
    <div class="w-1/3 flex flex-col gap-2 h-full">
      <TwmWindow
        title="skills"
        class="h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
        <SkillsApp />
      </TwmWindow>

      <TwmWindow
        title="music-favorite"
        class="flex-1 animate-[fade-in-up_0.7s_ease-out]"
      >
        <CavaApp />
      </TwmWindow>
    </div>
  </div>
</template>

<script setup lang="ts">
import TwmWindow from "~/components/TwmWindow.vue";
import TerminalApp from "~/components/apps/TerminalApp.vue";
import CavaApp from "~/components/apps/CavaApp.vue";
import SkillsApp from "~/components/apps/SkillsApp.vue";
</script>
