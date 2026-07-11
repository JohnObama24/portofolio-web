<template>
  <div class="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full font-mono text-[#33ff33]">
    <div class="flex-1 flex flex-col min-h-[50vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.5s_ease-out]">
      <WindowComponent
        title="project-detail"
        :isActive="true"
        class="h-full"
      >
        <div v-if="selectedItem" class="relative flex flex-col gap-4 h-full p-4 overflow-y-auto bg-black overflow-hidden border border-[#33ff33]/20">
          <!-- Detail Image -->
          <div class="relative shrink-0 w-full h-48 md:h-64 border border-[#33ff33] overflow-hidden">
            <img :src="selectedItem.image" :alt="selectedItem.title" class="w-full h-full object-cover" />
            <div class="absolute bottom-4 left-4 right-4 z-20 bg-black/80 px-3 py-1.5 border border-[#33ff33]/50">
              <h1 class="text-xl md:text-2xl font-bold tracking-tight text-[#33ff33]">{{ selectedItem.title }}</h1>
            </div>
          </div>

          <div class="flex-1 flex flex-col pt-2 relative z-10">
            <p class="text-[#33ff33]/90 leading-relaxed text-sm md:text-base">{{ selectedItem.description }}</p>
            
            <a :href="selectedItem.link" target="_blank" class="relative mt-auto text-sm font-bold inline-flex items-center gap-2 border border-[#33ff33] px-6 py-3 w-fit text-[#33ff33] hover:bg-[#33ff33] hover:text-black transition-colors bg-black">
              <span class="z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View Repository
              </span>
            </a>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-full text-[#33ff33]/50 bg-black font-mono italic">
          Select a project from the list to view details
        </div>
      </WindowComponent>
    </div>

    <div class="w-full lg:w-1/3 flex flex-col gap-2 h-auto lg:h-full shrink-0">
      <WindowComponent
        title="projects"
        class="flex-1 min-h-[40vh] lg:min-h-0 animate-[fade-in-up_0.7s_ease-out]"
      >
        <ul class="flex flex-col gap-2 p-2 relative bg-black h-full overflow-y-auto">
          <li
            v-for="project in projects"
            :key="project.id"
            @click="selectedItem = project"
            :class="[
              'cursor-pointer p-4 transition-all duration-200 relative overflow-hidden group border',
              selectedItem?.id === project.id 
                ? 'bg-[#33ff33] border-[#33ff33] text-black' 
                : 'hover:bg-[#33ff33]/15 border-transparent text-[#33ff33]/70 hover:text-[#33ff33]'
            ]"
          >
            <span class="relative z-10 font-bold text-sm md:text-base flex items-center gap-3">
              <span 
                class="w-2 h-2 transition-colors duration-300"
                :class="selectedItem?.id === project.id ? 'bg-black' : 'bg-[#33ff33]'"
              ></span>
              {{ project.title }}
            </span>
          </li>
        </ul>
      </WindowComponent>

      <WindowComponent
        title="github-activity"
        class="min-h-[40vh] lg:min-h-0 lg:h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
        <div class="relative h-full w-full bg-black flex items-center justify-center p-3 sm:p-5 overflow-hidden group border border-[#33ff33]/20">
          <!-- loading -->
          <div v-if="pending" class="z-10 flex flex-col items-center justify-center gap-3">
            <div class="w-8 h-8 border-2 border-[#33ff33]/30 border-t-[#33ff33] animate-spin"></div>
            <span class="text-xs font-mono text-[#33ff33] animate-pulse">Fetching Matrix...</span>
          </div>

          <div v-else-if="contributionData" class="z-10 w-full h-full flex flex-col">
            <div class="flex justify-between items-center mb-2 lg:mb-4 px-1">
              <span class="text-xs md:text-sm font-bold text-[#33ff33]">Total Contributions</span>
              <span class="text-xs md:text-sm font-mono text-[#33ff33] font-bold bg-black px-2 py-1 border border-[#33ff33]/40">{{ totalContributions }} in the last year</span>
            </div>
            
            <a href="https://github.com/JohnObama24" target="_blank" class="flex-1 w-full overflow-x-auto overflow-y-hidden scrollbar-hide py-2 relative scroller">
              <div class="min-w-max h-full flex items-center">
                <div class="grid grid-rows-7 gap-[3px] sm:gap-1 lg:gap-1.5 grid-flow-col">
                  <div v-for="i in emptyCells" :key="`empty-${i}`" class="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5"></div>
                  
                  <div
                    v-for="day in contributionData"
                    :key="day.date"
                    class="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 transition-all duration-300 hover:scale-150 hover:z-10 relative group/cell"
                    :class="getThemeClass(day.level)"
                  >
                    <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/cell:opacity-100 pointer-events-none transition-opacity duration-200 z-50 bg-black text-[#33ff33] text-[10px] whitespace-nowrap px-2 py-1 border border-[#33ff33] shadow-2xl">
                      <span class="text-white font-bold">{{ day.count }}</span> contributions on {{ day.date }}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div v-else class="z-10 text-xs font-mono text-red-500">
            Failed to load contributions.
          </div>
        </div>
      </WindowComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { projects } from "~/data/projects";
import WindowComponent from "~/components/WindowComponent.vue";

const selectedItem = ref<typeof projects[0] | null>(projects[0] || null);

// Fetch GitHub Contributions Data
const { data, pending } = useFetch<any>('https://github-contributions-api.deno.dev/JohnObama24.json');

const contributionData = computed(() => {
  if (!data.value || !data.value.contributions) return null;
  // The API returns an array of weeks. Flatten it to an array of days.
  const flatDays = Array.isArray(data.value.contributions[0]) 
    ? data.value.contributions.flat()
    : data.value.contributions;
  
  return flatDays.map((day: any) => {
    let level = 0;
    if (day.contributionLevel === 'FIRST_QUARTILE') level = 1;
    else if (day.contributionLevel === 'SECOND_QUARTILE') level = 2;
    else if (day.contributionLevel === 'THIRD_QUARTILE') level = 3;
    else if (day.contributionLevel === 'FOURTH_QUARTILE') level = 4;
    else if (day.level !== undefined) level = day.level;
    
    return {
      date: day.date,
      count: day.contributionCount ?? day.count ?? 0,
      level: level
    };
  });
});

// Calculate total contributions
const totalContributions = computed(() => {
  if (data.value && data.value.totalContributions !== undefined) {
    return data.value.totalContributions;
  }
  if (!contributionData.value) return 0;
  return contributionData.value.reduce((sum: number, day: any) => sum + day.count, 0);
});

// Calculate how many empty cells to add at the beginning to align perfectly
// The grid fills by column, Top to Bottom (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
const emptyCells = computed(() => {
  if (!contributionData.value || contributionData.value.length === 0) return 0;
  const firstDate = new Date(contributionData.value[0].date);
  return firstDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
});

// Style mapping based on contribution level
const getThemeClass = (level: number) => {
  switch(level) {
    case 1: return 'bg-[#113311] border border-[#33ff33]/25';
    case 2: return 'bg-[#006600] border border-[#33ff33]/50';
    case 3: return 'bg-[#00aa00] border border-[#33ff33]/75';
    case 4: return 'bg-[#33ff33] border border-[#33ff33]';
    default: return 'bg-[#051105] border border-zinc-900';
  }
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
