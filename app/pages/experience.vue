<template>
  <div class="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full font-mono text-[#33ff33]">
    <!-- Left Panel: Experience Detail Inspector -->
    <div class="flex-1 flex flex-col min-h-[50vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.5s_ease-out]">
      <WindowComponent
        title="experience-inspector"
        :isActive="true"
        class="h-full"
      >
        <div v-if="selectedItem" class="relative flex flex-col gap-4 h-full p-4 overflow-y-auto bg-black border border-[#33ff33]/20">
          
          <!-- Command Line Header -->
          <div class="flex flex-col gap-1 border-b border-[#33ff33]/20 pb-3">
            <div class="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-[#33ff33]">john@experience</span> <span class="text-white">~ $</span>
                <span class="text-[#33ff33]/70">systemctl status exp_{{ selectedItem.id }}.service</span>
              </div>
              <span 
                class="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border"
                :class="selectedItem.type === 'Work' ? 'border-[#33ff33] text-[#33ff33] bg-[#33ff33]/10' : 'border-yellow-400 text-yellow-400 bg-yellow-950/30'"
              >
                {{ selectedItem.type.toUpperCase() }} EXPERIENCE
              </span>
            </div>
          </div>

          <!-- Role & Company Banner -->
          <div class="flex flex-col gap-1 bg-zinc-950 border border-[#33ff33]/30 p-4 relative overflow-hidden">
            <span class="text-[10px] uppercase tracking-widest text-[#33ff33]/70 font-bold">
              ● {{ selectedItem.company }}
            </span>
            <h1 class="text-lg md:text-xl font-bold tracking-tight text-[#33ff33]">
              {{ selectedItem.role }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-zinc-300">
              <span class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">PERIODE:</span> {{ selectedItem.period }}
              </span>
              <span class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">LOKASI:</span> {{ selectedItem.location }}
              </span>
            </div>
          </div>

          <!-- Summary Description -->
          <div class="flex flex-col gap-2 pt-1">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ DESKRIPSI PERAN & TANGGUNG JAWAB ]
            </div>
            <p class="text-[#33ff33]/90 leading-relaxed text-xs sm:text-sm">
              {{ selectedItem.description }}
            </p>
          </div>

          <!-- Key Responsibilities List -->
          <div v-if="selectedItem.responsibilities && selectedItem.responsibilities.length > 0" class="flex flex-col gap-2 pt-1">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ PENCAPAIAN & KONTRIBUSI UTAMA ]
            </div>
            <ul class="flex flex-col gap-2 text-xs text-[#33ff33]">
              <li v-for="(resp, idx) in selectedItem.responsibilities" :key="idx" class="flex items-start gap-2 bg-[#051105] p-2.5 border border-[#33ff33]/20">
                <span class="text-[#33ff33] font-bold shrink-0">></span>
                <span class="leading-relaxed">{{ resp }}</span>
              </li>
            </ul>
          </div>

          <!-- Technologies Stack -->
          <div v-if="selectedItem.technologies && selectedItem.technologies.length > 0" class="flex flex-col gap-2 pt-1">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ TEKNOLOGI & TOOLSTACK ]
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="tech in selectedItem.technologies" 
                :key="tech"
                class="px-2.5 py-1 bg-black border border-[#33ff33]/50 text-[#33ff33] text-[11px] font-bold hover:bg-[#33ff33] hover:text-black transition-colors select-none"
              >
                #{{ tech }}
              </span>
            </div>
          </div>

        </div>
        
        <div v-else class="flex items-center justify-center h-full text-[#33ff33]/50 bg-black font-mono italic">
          Select an experience log from the list to view details
        </div>
      </WindowComponent>
    </div>

    <!-- Right Panel: Experience List & Summary Stats -->
    <div class="w-full lg:w-1/3 flex flex-col gap-2 h-auto lg:h-full shrink-0">
      
      <WindowComponent
        title="experience-list"
        class="flex-1 min-h-[40vh] lg:min-h-0 animate-[fade-in-up_0.7s_ease-out]"
      >
        <div class="flex flex-col h-full bg-black">
          <ul class="flex-1 flex flex-col gap-2 p-2 relative overflow-y-auto scrollbar-hide">
            <li
              v-for="item in experienceList"
              :key="item.id"
              @click="selectedItem = item"
              :class="[
                'cursor-pointer p-3 transition-all duration-200 relative overflow-hidden group border',
                selectedItem?.id === item.id 
                  ? 'bg-[#33ff33] border-[#33ff33] text-black' 
                  : 'hover:bg-[#33ff33]/15 border-zinc-900 hover:border-[#33ff33]/50 text-[#33ff33]/80 hover:text-[#33ff33]'
              ]"
            >
              <div class="flex flex-col gap-1 z-10 relative">
                <div class="flex items-center justify-between text-[10px] opacity-80">
                  <span class="font-bold uppercase">{{ item.company }}</span>
                  <span>{{ item.period }}</span>
                </div>
                
                <span class="font-bold text-xs sm:text-sm flex items-center gap-2">
                  <span 
                    class="w-1.5 h-1.5 shrink-0"
                    :class="selectedItem?.id === item.id ? 'bg-black' : 'bg-[#33ff33]'"
                  ></span>
                  <span class="truncate">{{ item.role }}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </WindowComponent>

      <WindowComponent
        title="career-overview"
        class="min-h-[20vh] lg:min-h-0 lg:h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
        <div class="relative h-full w-full bg-black flex flex-col p-3 border border-[#33ff33]/20 gap-2 overflow-y-auto">
          <div class="text-[11px] font-bold text-white border-b border-[#33ff33]/20 pb-1 flex justify-between items-center">
            <span>EXPERIENCE METRICS</span>
            <span class="text-[#33ff33] text-[9px] font-mono animate-pulse">● ACTIVE</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-[#051105] border border-[#33ff33]/30 p-2 flex flex-col">
              <span class="text-[9px] text-zinc-400 uppercase">WORK / FREELANCE</span>
              <span class="text-lg font-bold text-[#33ff33]">{{ workCount }} Log</span>
            </div>
            <div class="bg-[#051105] border border-[#33ff33]/30 p-2 flex flex-col">
              <span class="text-[9px] text-zinc-400 uppercase">ORGANIZATION</span>
              <span class="text-lg font-bold text-[#33ff33]">{{ orgCount }} Log</span>
            </div>
          </div>

          <div class="text-[10px] text-[#33ff33]/70 leading-relaxed italic">
            * Pengalaman kerja, proyek freelance, dan kontribusi organisasi teknologi.
          </div>
        </div>
      </WindowComponent>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { experienceList, type ExperienceItem } from '~/data/experience';
import WindowComponent from '~/components/WindowComponent.vue';

const selectedItem = ref<ExperienceItem | null>(experienceList[0] || null);

const workCount = computed(() => experienceList.filter(e => e.type === 'Work' || e.type === 'Freelance').length);
const orgCount = computed(() => experienceList.filter(e => e.type === 'Organization').length);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
