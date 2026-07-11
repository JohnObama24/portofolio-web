<script setup lang="ts">
defineProps<{
  title: string
  isActive?: boolean
}>()
</script>

<template>
  <div 
    class="flex flex-col border bg-black overflow-hidden font-mono"
    :class="isActive ? 'border-[#33ff33]' : 'border-zinc-800'"
  >
    <!-- Window Title Bar -->
    <div 
      class="h-6 flex items-center justify-between px-2 text-[11px] border-b shrink-0 select-none font-bold tracking-wide"
      :class="isActive ? 'bg-[#33ff33] text-black border-[#33ff33]' : 'bg-zinc-900 text-zinc-600 border-zinc-800'"
    >
      <div class="flex items-center gap-1.5">
        <span>[{{ isActive ? '*' : ' ' }}]</span>
        <span>{{ title }}</span>
      </div>
      <div class="flex items-center gap-3 font-mono text-[9px] cursor-pointer">
        <span>[ - ]</span>
        <span>[ ▢ ]</span>
        <span>[ X ]</span>
      </div>
    </div>
    
    <!-- Window Content -->
    <div class="flex-1 overflow-auto relative p-2 bg-black">
      <slot />
    </div>
  </div>
</template>
