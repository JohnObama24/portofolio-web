<template>
  <div class="flex-1 flex gap-2 h-full w-full">
    <div class="flex-1 flex flex-col h-full animate-[fade-in-up_0.5s_ease-out]">
      <TwmWindow
        title="project-detail"
        :isActive="true"
        class="h-full shadow-xl"
      >
        <div v-if="selectedItem" class="flex flex-col gap-4 h-full p-2 overflow-y-auto">
          <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-48 md:h-64 object-cover rounded-md border border-gray-700/50 shadow-md" />
          <h1 class="text-2xl font-bold">{{ selectedItem.title }}</h1>
          <p class="text-gray-300 leading-relaxed">{{ selectedItem.description }}</p>
          <a :href="selectedItem.link" target="_blank" class="mt-2 text-primary hover:underline font-medium inline-block rounded-md bg-gray-800 px-4 py-2 w-fit">
            View on GitHub
          </a>
        </div>
        <div v-else class="flex items-center justify-center h-full text-gray-500">
          Select a project from the list to view details
        </div>
      </TwmWindow>
    </div>

    <div class="w-1/3 flex flex-col gap-2 h-full">
      <TwmWindow
        title="projects"
        class="flex-1 animate-[fade-in-up_0.7s_ease-out]"
      >
        <ul class="flex flex-col gap-2">
          <li
            v-for="project in projects"
            :key="project.id"
            @click="selectedItem = project"
            :class="[
              'cursor-pointer p-2 rounded-md transition-colors',
              selectedItem?.id === project.id 
                ? 'bg-primary/20 text-primary border border-primary/30 font-medium' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-800 border border-transparent text-gray-300'
            ]"
          >
            {{ project.title }}
          </li>
        </ul>
      </TwmWindow>

      <TwmWindow
        title="github-activity"
        class="h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
      </TwmWindow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { projects } from "~/data/projects";
import TwmWindow from "~/components/TwmWindow.vue";

const selectedItem = ref<typeof projects[0] | null>(projects[0] || null);
</script>
