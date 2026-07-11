<template>
  <div class="h-full w-full bg-black p-3 text-xs leading-relaxed flex flex-col justify-center font-mono overflow-y-auto text-[#33ff33]">
    <div class="text-[#33ff33] mb-3 border-b border-[#33ff33]/30 pb-1 font-bold">
      <span class="text-[#33ff33]">root@skills</span> <span class="text-white">~ #</span> ./show_skills.sh
    </div>
    
    <div v-for="skill in skills" :key="skill.name" class="flex items-center mb-2 whitespace-pre">
      <span class="w-24 text-[#33ff33] font-bold">{{ skill.name }}</span>
      <span class="text-[#33ff33]">[</span><span class="text-[#33ff33]">{{ generateBar(skill.level) }}</span><span class="text-[#115511]">{{ generateEmptyBar(skill.level) }}</span><span class="text-[#33ff33]">]</span>
      <span class="w-12 text-right text-[#33ff33] font-bold">{{ skill.level }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const skills = [
  { name: 'Vue / Nuxt', level: 90 },
  { name: 'TailwindCSS', level: 95 },
  { name: 'Laravel', level: 95 },
  { name: 'Flutter', level: 70 },
  { name: 'React', level: 95 },
  { name: 'Javascript', level: 95 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'Git & CLI', level: 80 },
]

const totalBars = 20

const generateBar = (level: number) => {
  const bars = Math.floor((level / 100) * totalBars)
  return '='.repeat(bars)
}

const generateEmptyBar = (level: number) => {
  const bars = totalBars - Math.floor((level / 100) * totalBars)
  return '.'.repeat(bars)
}
</script>
