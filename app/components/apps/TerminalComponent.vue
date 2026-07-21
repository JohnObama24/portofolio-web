<template>
  <div
    class="h-full w-full bg-black text-[#33ff33] p-2 overflow-y-auto font-mono text-sm"
  >
    <div v-for="(line, index) in lines" :key="index" class="mb-1">
      <div v-if="line.type === 'cmd'" class="flex items-center gap-2">
        <span class="text-[#33ff33] font-bold">john@porto</span>
        <span class="text-white">~</span>
        <span class="text-[#33ff33] font-bold">$</span>
        <span v-if="index !== lines.length - 1" class="text-[#33ff33] break-all">{{ line.text }}</span>
        <div v-else class="ml-1 flex-1 relative leading-none">
          <span class="text-[#33ff33] font-mono break-all whitespace-pre-wrap">{{ currentInput }}</span><span class="inline-block w-2.5 h-4 bg-[#33ff33] animate-blink align-middle mb-[3px] ml-[1px]"></span>
          <input
            v-model="currentInput"
            @keydown.enter="handleEnter"
            class="absolute inset-0 bg-transparent outline-none text-transparent caret-transparent w-full h-full cursor-text"
            autofocus
            spellcheck="false"
            autocomplete="off"
          />
        </div>
      </div>
      <div
        v-else-if="line.type === 'output'"
        class="whitespace-pre-wrap text-[#33ff33]"
      >
        {{ line.text?.trim() }}
      </div>
      <div v-else-if="line.type === 'neofetch'" class="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-[#33ff33]">
        <div class="sm:w-1/3 w-3/4 max-w-[400px]">
          <img :src="line.imgSrc" alt="gambar" class="w-full h-auto border border-[#33ff33]" v-if="line.imgSrc"/>
          <div v-else class="text-center italic opacity-70 border border-dashed border-[#33ff33] p-4">Image placeholder: {{ line.imgSrc }}</div>
        </div>
        <div class="whitespace-pre-wrap flex-1 mt-2 sm:mt-0 leading-relaxed">
          {{ line.text?.trim() }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ConsoleLine {
  type: "cmd" | "output" | "neofetch";
  text?: string;
  imgSrc?: string;
}

const ObjectLine = (line: ConsoleLine) => line;

import asciiImage from '~/assets/images/ascii-art-text.png';

const lines = ref<ConsoleLine[]>([
  { type: "cmd", text: "neofetch" },
  {
    type: "neofetch",
    imgSrc: asciiImage,
    text: `ketik help coba`,
  },
  { type: "cmd", text: "" }, 
]);

const currentInput = ref("");

const handleEnter = () => {
  const cmd = currentInput.value.trim();

  if (lines.value.length > 0) {
    lines.value[lines.value.length - 1]!.text = cmd;
  }

  if (cmd) {
    runCommand(cmd);
  }

  lines.value.push({ type: "cmd", text: "" });
  currentInput.value = ""; 

  setTimeout(() => {
    const termDiv = document.querySelector('.overflow-y-auto');
    if (termDiv) termDiv.scrollTop = termDiv.scrollHeight;
  }, 10);
};

const runCommand = (cmd: string) => {
  const normalizedCmd = cmd.toLowerCase();
  
  switch (normalizedCmd) {
    case "nvim":
    case "vim":
    case "vi":
      lines.value.push({ type: "output", text: "ummmmmmm blum buat bang \uD83D\uDE05" });
      break;
    case "clear":
      lines.value = [];
      break;
    case "ls":
      lines.value.push({ type: "output", text: "about.txt\nexperience.txt\neducation.txt\ncertificate.txt\nprojects.txt\ncontact.txt" });
      break;
    case "cat about.txt":
      lines.value.push({ type: "output", text: "Halo! Saya adalah John." });
      break;
    case "cat experience.txt":
    case "experience":
      lines.value.push({ type: "output", text: "CAREER & EXPERIENCE HISTORY:\n- Full-Stack Web Developer (Intern) @ Tech Solutions Studio (2024-Present)\n- Lead Frontend Developer @ E-Voting OSIS Team Project (2023-2024)\n- Asisten Laboratorium Komputer (2022-2023)\n\nRun workspace link [3]experience to view complete career logs." });
      break;
    case "cat education.txt":
    case "education":
      lines.value.push({ type: "output", text: "FORMAL ACADEMIC HISTORY:\n- Teknik Informatika (Software Engineering) - Universitas Padjadjaran (2026-2030 Expected)\n- SMK Rekayasa Perangkat Lunak - SMK Informatika (2018-2021)\n\nRun workspace link [4]education to view academic details." });
      break;
    case "cat certificate.txt":
    case "certificate":
    case "certificates":
      lines.value.push({ type: "output", text: "CERTIFICATIONS & CREDENTIALS:\n- Full-Stack Web Development Certification (Dicoding / Google Bangkit)\n- Cloud Computing & DevOps Fundamentals (AWS Training)\n- Cyber Security & Network Basics (Cisco Networking Academy)\n\nRun workspace link [5]certificate to inspect verified credentials." });
      break;
    case "github":
      window.open("https://github.com/JohnObama24/", "_blank")
      lines.value.push({ type: "output", text: "redirecting to github..." });
      break;
    case "instagram":
      window.open("https://www.instagram.com/johnobama_/", "_blank")
      lines.value.push({ type: "output", text: "redirecting to instagram..." });
      break;
    case "help":
      lines.value.push({ type: "output", text: "Available commands:\n- ls\n- cat [file]\n- experience\n- education\n- certificate\n- neofetch\n- clear\n- help\n- github\n- instagram" });
      break;
    case "neofetch":
      lines.value.push({
        type: "neofetch",
        imgSrc: asciiImage,
        text: `hai`
      });
      break;
    default:
      lines.value.push({ type: "output", text: `bash: ${cmd}: command not found` });
      break;
  }
};
</script>

<style scoped>
.animate-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
