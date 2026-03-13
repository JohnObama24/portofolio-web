<template>
  <div class="flex-1 flex gap-2 h-full w-full">
    <div class="flex-1 flex flex-col h-full animate-[fade-in-up_0.5s_ease-out]">
      <TwmWindow title="project" :isActive="true" class="h-full shadow-xl">
        <div class="h-full w-full bg-[#1e1e2e] text-[#cdd6f4] p-4 overflow-y-auto font-mono text-sm">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-[#a6e3a1] font-bold">john@porto</span>
            <span class="text-[#cdd6f4]">~</span>
            <span class="text-[#89b4fa] font-bold">$</span>
            <span class="text-[#cdd6f4]">ls -l ~/projects</span>
          </div>
          
          <div class="whitespace-pre-wrap text-[#bac2de]">
total 3
drwxr-xr-x 2 john john 4096 Mar 13 10:00 <span class="text-[#89b4fa] font-bold cursor-pointer hover:underline">e-commerce-web</span>
drwxr-xr-x 2 john john 4096 Mar 12 14:30 <span class="text-[#89b4fa] font-bold cursor-pointer hover:underline">web-sekolah</span>
drwxr-xr-x 2 john john 4096 Mar 01 09:15 <span class="text-[#89b4fa] font-bold cursor-pointer hover:underline">e-voting-website</span>
          </div>

          <div class="mt-8 opacity-50 italic">
            // This is a placeholder for the Project page.
            // nanti bkal dibuat tapi nanti...
          </div>

          <div class="flex items-center gap-2 mt-4">
            <span class="text-[#a6e3a1] font-bold">john@porto</span>
            <span class="text-[#cdd6f4]">~</span>
            <span class="text-[#89b4fa] font-bold">$</span>
            <span class="w-2 h-4 bg-[#cdd6f4] animate-pulse inline-block"></span>
          </div>
        </div>
      </TwmWindow>
    </div>
  </div>
</template>

<script setup lang="ts">
import TwmWindow from "~/components/TwmWindow.vue";
</script>
