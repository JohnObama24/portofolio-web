<template>
  <div class="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full">
    <!-- Left side: Main Terminal Portfolio -->
    <div
      class="flex-1 flex flex-col min-h-[60vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.5s_ease-out]"
    >
      <WindowComponent
        title="terminal - john@porto: ~"
        :isActive="true"
        class="h-full shadow-xl"
      >
        <TerminalComponent />
      </WindowComponent>
    </div>

    <!-- Right side: Utilities / Cava -->
    <div class="w-full lg:w-1/3 flex flex-col gap-2 h-auto lg:h-full shrink-0">
      <WindowComponent
        title="skills"
        class="min-h-[30vh] lg:min-h-0 lg:h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
        <SkillsComponent />
      </WindowComponent>

      <WindowComponent
        title="music-favorite"
        class="flex-1 min-h-[30vh] lg:min-h-0 animate-[fade-in-up_0.7s_ease-out]"
      >
        <MusicComponent />
      </WindowComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import WindowComponent from "~/components/WindowComponent.vue";
import TerminalComponent from "~/components/apps/TerminalComponent.vue";
import MusicComponent from "~/components/apps/MusicComponent.vue";
import SkillsComponent from "~/components/apps/SkillsComponent.vue";
</script>
