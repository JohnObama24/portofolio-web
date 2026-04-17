<template>
  <div class="h-full w-full bg-[#1e1e2e] p-3 text-xs leading-relaxed flex flex-col justify-center font-mono overflow-y-auto">
    <div class="text-[#cdd6f4] mb-3 border-b border-[#585b70] pb-1 font-bold">
      <span class="text-[#f38ba8]">root@skills</span> ~ # ./show_skills.sh
    </div>
    
    <div v-for="skill in skills" :key="skill.name" class="flex items-center mb-2 whitespace-pre">
      <span class="w-24 text-[#89b4fa] font-bold">{{ skill.name }}</span>
      <span class="text-[#cdd6f4]">[</span><span class="text-[#a6e3a1]">{{ generateBar(skill.level) }}</span><span class="text-[#45475a]">{{ generateEmptyBar(skill.level) }}</span><span class="text-[#cdd6f4]">]</span>
      <span class="w-12 text-right text-[#f9e2af]">{{ skill.level }}%</span>
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
  return '|'.repeat(bars)
}

const generateEmptyBar = (level: number) => {
  const bars = totalBars - Math.floor((level / 100) * totalBars)
  return '|'.repeat(bars)
}
</script>
