<template>
  <div class="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full font-mono text-[#33ff33]">
    <!-- Left Panel: Simplified Education Detail View -->
    <div class="flex-1 flex flex-col min-h-[50vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.5s_ease-out]">
      <WindowComponent
        title="education-record"
        :isActive="true"
        class="h-full"
      >
        <div v-if="selectedItem" class="relative flex flex-col gap-4 h-full p-4 overflow-y-auto bg-black border border-[#33ff33]/20">
          
          <!-- Command Prompt Header -->
          <div class="flex flex-col gap-1 border-b border-[#33ff33]/20 pb-3">
            <div class="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-[#33ff33]">john@education</span> <span class="text-white">~ $</span>
                <span class="text-[#33ff33]/70">cat academic_info_{{ selectedItem.id }}.txt</span>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border border-[#33ff33] text-[#33ff33] bg-[#33ff33]/10">
                FORMAL ACADEMIC
              </span>
            </div>
          </div>

          <!-- Institution Banner -->
          <div class="flex flex-col gap-1 bg-zinc-950 border border-[#33ff33]/30 p-4 relative overflow-hidden">
            <span class="text-[10px] uppercase tracking-widest text-[#33ff33]/70 font-bold">
              ● {{ selectedItem.institution }}
            </span>
            <h1 class="text-lg md:text-xl font-bold tracking-tight text-[#33ff33]">
              {{ selectedItem.title }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-zinc-300">
              <span class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">PERIODE:</span> {{ selectedItem.period }}
              </span>
              <span class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">STATUS:</span> {{ selectedItem.status }}
              </span>
              <span class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">LOKASI:</span> {{ selectedItem.location }}
              </span>
            </div>
          </div>

          <!-- Concise Description Section -->
          <div class="flex flex-col gap-2 pt-2">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ DESKRIPSI AKADEMIK ]
            </div>
            <p class="text-[#33ff33]/90 leading-relaxed text-xs sm:text-sm bg-[#051105] p-3 border border-[#33ff33]/20">
              {{ selectedItem.description }}
            </p>
          </div>

          <!-- Bottom Info Bar -->
          <div class="mt-auto pt-3 border-t border-[#33ff33]/20 text-[11px] text-[#33ff33]/60 flex justify-between">
            <span>INSTITUSI RESMI</span>
            <span>VERIFIED ACADEMIC LOG</span>
          </div>

        </div>
        
        <div v-else class="flex items-center justify-center h-full text-[#33ff33]/50 bg-black font-mono italic">
          Select an academic record to view details
        </div>
      </WindowComponent>
    </div>

    <!-- Right Panel: Education Selector & Simple Matrix -->
    <div class="w-full lg:w-1/3 flex flex-col gap-2 h-auto lg:h-full shrink-0">
      
      <!-- Education List Window -->
      <WindowComponent
        title="academic-list"
        class="flex-1 min-h-[35vh] lg:min-h-0 animate-[fade-in-up_0.7s_ease-out]"
      >
        <div class="flex flex-col h-full bg-black">
          <ul class="flex-1 flex flex-col gap-2 p-2 relative overflow-y-auto scrollbar-hide">
            <li
              v-for="item in educationList"
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
                  <span class="font-bold uppercase">{{ item.institution }}</span>
                  <span>{{ item.period }}</span>
                </div>
                
                <span class="font-bold text-xs sm:text-sm flex items-center gap-2">
                  <span 
                    class="w-1.5 h-1.5 shrink-0"
                    :class="selectedItem?.id === item.id ? 'bg-black' : 'bg-[#33ff33]'"
                  ></span>
                  <span class="truncate">{{ item.title }}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </WindowComponent>

      <!-- Academic Summary Window -->
      <WindowComponent
        title="education-summary"
        class="min-h-[20vh] lg:min-h-0 lg:h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
        <div class="relative h-full w-full bg-black flex flex-col p-3 border border-[#33ff33]/20 gap-2 overflow-y-auto">
          <div class="text-[11px] font-bold text-white border-b border-[#33ff33]/20 pb-1 flex justify-between items-center">
            <span>AKADEMIK STATUS</span>
            <span class="text-[#33ff33] text-[9px] font-mono">● SYNCED</span>
          </div>

          <div class="flex flex-col gap-1 text-[11px] bg-[#051105] p-2.5 border border-[#33ff33]/30">
            <span class="text-[9px] text-zinc-400 font-bold uppercase">TOTAL JENJANG</span>
            <span class="text-lg font-bold text-[#33ff33]">{{ educationList.length }} Lembaga Pendidikan</span>
          </div>

          <div class="text-[10px] text-[#33ff33]/70 leading-relaxed italic">
            * Halaman ini hanya menampilkan riwayat pendidikan formal secara ringkas.
          </div>
        </div>
      </WindowComponent>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { educationList, type EducationItem } from '~/data/education';
import WindowComponent from '~/components/WindowComponent.vue';

const selectedItem = ref<EducationItem | null>(educationList[0] || null);
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
