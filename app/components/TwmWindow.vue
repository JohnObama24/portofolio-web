<script setup lang="ts">
defineProps<{
  title: string
  isActive?: boolean
}>()
</script>

<template>
  <div 
    class="flex flex-col border-2 bg-zinc-950/80 backdrop-blur-sm overflow-hidden"
    :class="isActive ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'border-zinc-700'"
  >
    <!-- Window Title Bar -->
    <div 
      class="h-6 flex items-center justify-between px-2 text-xs border-b shrink-0"
      :class="isActive ? 'bg-indigo-900/40 border-indigo-500/50 text-indigo-200' : 'bg-zinc-800/50 border-zinc-700 text-zinc-400'"
    >
      <div class="flex items-center gap-2 font-semibold">
        <span>{{ title }}</span>
      </div>
      <div class="flex items-center gap-1.5 opacity-60">
        <div class="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
        <div class="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
      </div>
    </div>
    
    <!-- Window Content -->
    <div class="flex-1 overflow-auto relative p-1">
      <slot />
    </div>
  </div>
</template>
