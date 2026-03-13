<script setup lang="ts">
import { ref } from 'vue'

const lines = ref([
  { type: 'cmd', text: 'neofetch' },
  { type: 'output', text: `
       _,met$$$$$gg.          john@porto
    ,g$$$$$$$$$$$$$$$P.       ----------
  ,g$$P"     """Y$$.".        OS: Arch Linux x86_64
 ,$$P'              \`$$$.     Host: TWM Portfolio
',$$P       ,ggs.     \`$$b:   Kernel: 6.8.9-arch1-1
\`d$$'     ,$P"'   .    $$$    Uptime: 24 mins
 $$P      d$'     ,    $$P    Packages: 999 (pacman)
 $$:      $$.   -    ,d$$'    Shell: zsh 5.9
 $$;      Y$b._   _,d$P'      Resolution: 1920x1080
 Y$b       \`"Y$$$$P"'         WM: bspwm
 \`Y$b        '"'              Theme: Gruvbox Dark
  \`Y$b                        Icons: Papirus-Dark
    \`$$b.                     Terminal: Alacritty
      \`Y$$b.                  CPU: AMD Ryzen 7 5800X
        \`"Y$b._               GPU: NVIDIA GeForce RTX 3080
            \`""""             Memory: 4096MiB / 32000MiB
  ` },
  { type: 'cmd', text: '' } // waiting for input
])
</script>

<template>
  <div class="h-full w-full bg-[#1e1e2e] text-[#cdd6f4] p-2 overflow-y-auto font-mono text-sm">
    <div v-for="(line, index) in lines" :key="index" class="mb-1">
      <div v-if="line.type === 'cmd'" class="flex items-center gap-2">
        <span class="text-[#a6e3a1] font-bold">john@porto</span>
        <span class="text-[#cdd6f4]">~</span>
        <span class="text-[#89b4fa] font-bold">$</span>
        <span class="text-[#cdd6f4] break-all">{{ line.text }}</span>
        <span v-if="index === lines.length - 1" class="w-2 h-4 bg-[#cdd6f4] animate-pulse ml-1 inline-block"></span>
      </div>
      <div v-else-if="line.type === 'output'" class="whitespace-pre-wrap text-[#bac2de]">
        {{ line.text.trim() }}
      </div>
    </div>
  </div>
</template>
