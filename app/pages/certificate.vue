<template>
  <div class="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full font-mono text-[#33ff33]">
    <!-- Left Panel: Certificate Inspector -->
    <div class="flex-1 flex flex-col min-h-[50vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.5s_ease-out]">
      <WindowComponent
        title="certificate-inspector"
        :isActive="true"
        class="h-full"
      >
        <div v-if="selectedItem" class="relative flex flex-col gap-4 h-full p-4 overflow-y-auto bg-black border border-[#33ff33]/20">
          
          <!-- System Status Header -->
          <div class="flex flex-col gap-1 border-b border-[#33ff33]/20 pb-3">
            <div class="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-[#33ff33]">john@certificate</span> <span class="text-white">~ $</span>
                <span class="text-[#33ff33]/70">verify cert_{{ selectedItem.id }}.key</span>
              </div>
              <span class="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border border-indigo-400 text-indigo-400 bg-indigo-950/40">
                {{ selectedItem.status }}
              </span>
            </div>
          </div>

          <!-- Main Title & Issuer -->
          <div class="flex flex-col gap-1 bg-zinc-950 border border-[#33ff33]/30 p-4 relative overflow-hidden">
            <span class="text-[10px] uppercase tracking-widest text-[#33ff33]/70 font-bold">
              ISSUER: {{ selectedItem.issuer }}
            </span>
            <h1 class="text-lg md:text-xl font-bold tracking-tight text-[#33ff33]">
              {{ selectedItem.title }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-zinc-300">
              <span class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">TAHUN:</span> {{ selectedItem.year }}
              </span>
              <span v-if="selectedItem.credentialId" class="flex items-center gap-1 bg-black px-2 py-1 border border-[#33ff33]/40">
                <span class="text-[#33ff33] font-bold">CREDENTIAL ID:</span> {{ selectedItem.credentialId }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div class="flex flex-col gap-2 pt-1">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ DESKRIPSI SERTIFIKASI ]
            </div>
            <p class="text-[#33ff33]/90 leading-relaxed text-xs sm:text-sm">
              {{ selectedItem.description }}
            </p>
          </div>

          <!-- Skills Tag List -->
          <div v-if="selectedItem.skills && selectedItem.skills.length > 0" class="flex flex-col gap-2 pt-1">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ KEALIAN & METRIK DISERTIFIKASI ]
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="skill in selectedItem.skills" 
                :key="skill"
                class="px-2 py-1 bg-black border border-[#33ff33]/50 text-[#33ff33] text-[11px] font-bold hover:bg-[#33ff33] hover:text-black transition-colors select-none"
              >
                #{{ skill }}
              </span>
            </div>
          </div>

          <!-- Verification Link -->
          <div v-if="selectedItem.link" class="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-[#33ff33]/20">
            <div class="text-[11px] text-zinc-400 font-mono">
              VERIFIED STATUS: <span class="text-green-400 font-bold">AUTHENTIC</span>
            </div>
            <a 
              :href="selectedItem.link" 
              target="_blank" 
              class="relative text-xs font-bold inline-flex items-center gap-2 border border-[#33ff33] px-4 py-2 text-[#33ff33] hover:bg-[#33ff33] hover:text-black transition-colors bg-black"
            >
              <span>LIHAT SERTIFIKAT</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>

        </div>
        
        <div v-else class="flex items-center justify-center h-full text-[#33ff33]/50 bg-black font-mono italic">
          Select a certification to inspect credential
        </div>
      </WindowComponent>
    </div>

    <!-- Right Panel: Certificates Selection List & Summary Matrix -->
    <div class="w-full lg:w-1/3 flex flex-col gap-2 h-auto lg:h-full shrink-0">
      
      <WindowComponent
        title="certificates-list"
        class="flex-1 min-h-[40vh] lg:min-h-0 animate-[fade-in-up_0.7s_ease-out]"
      >
        <div class="flex flex-col h-full bg-black">
          <ul class="flex-1 flex flex-col gap-2 p-2 relative overflow-y-auto scrollbar-hide">
            <li
              v-for="item in certificateList"
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
                  <span class="font-bold uppercase">{{ item.issuer }}</span>
                  <span>{{ item.year }}</span>
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

      <WindowComponent
        title="credential-summary"
        class="min-h-[20vh] lg:min-h-0 lg:h-1/3 animate-[fade-in-up_0.6s_ease-out]"
      >
        <div class="relative h-full w-full bg-black flex flex-col p-3 border border-[#33ff33]/20 gap-2 overflow-y-auto">
          <div class="text-[11px] font-bold text-white border-b border-[#33ff33]/20 pb-1 flex justify-between items-center">
            <span>CREDENTIAL METRICS</span>
            <span class="text-indigo-400 text-[9px] font-mono">● VERIFIED</span>
          </div>

          <div class="flex flex-col gap-1 text-[11px] bg-[#051105] p-2.5 border border-[#33ff33]/30">
            <span class="text-[9px] text-zinc-400 font-bold uppercase">TOTAL SERTIFIKAT</span>
            <span class="text-lg font-bold text-[#33ff33]">{{ certificateList.length }} Credential Verified</span>
          </div>

          <div class="text-[10px] text-[#33ff33]/70 leading-relaxed italic">
            * Sertifikasi profesional dalam Web Development, Cloud Computing, dan Keamanan Siber.
          </div>
        </div>
      </WindowComponent>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { certificateList, type CertificateItem } from '~/data/certificates';
import WindowComponent from '~/components/WindowComponent.vue';

const selectedItem = ref<CertificateItem | null>(certificateList[0] || null);
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
