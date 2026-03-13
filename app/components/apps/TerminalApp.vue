<template>
  <div
    class="h-full w-full bg-[#1e1e2e] text-[#cdd6f4] p-2 overflow-y-auto font-mono text-sm"
  >
    <div v-for="(line, index) in lines" :key="index" class="mb-1">
      <div v-if="line.type === 'cmd'" class="flex items-center gap-2">
        <span class="text-[#a6e3a1] font-bold">john@porto</span>
        <span class="text-[#cdd6f4]">~</span>
        <span class="text-[#89b4fa] font-bold">$</span>
        <span class="text-[#cdd6f4] break-all">{{ line.text }}</span>
        <span v-if="index === lines.length - 1" class="ml-1 flex-1">
          <input
            v-model="currentInput"
            @keydown.enter="handleEnter"
            class="bg-transparent outline-none w-full"
            autofocus
          />
        </span>
      </div>
      <div
        v-else-if="line.type === 'output'"
        class="whitespace-pre-wrap text-[#bac2de]"
      >
        {{ line.text?.trim() }}
      </div>
      <div v-else-if="line.type === 'neofetch'" class="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-[#bac2de]">
        <div class="sm:w-1/3 w-3/4 max-w-[400px]">
          <img :src="line.imgSrc" alt="gambar" class="w-full h-auto rounded-md" v-if="line.imgSrc"/>
          <div v-else class="text-center italic opacity-50 border border-dashed border-zinc-500 rounded p-4">Image placeholder: {{ line.imgSrc }}</div>
        </div>
        <div class="whitespace-pre-wrap flex-1 mt-2 sm:mt-0">
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
    text: `hai`,
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
      lines.value.push({ type: "output", text: "about.txt\ncontact.txt" });
      break;
    case "cat about.txt":
      lines.value.push({ type: "output", text: "Halo! Saya adalah John ." });
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
      lines.value.push({ type: "output", text: "Available commands:\n- ls\n- cat [file]\n- neofetch\n- clear\n- help\n- github\n- instagram\n- linkedin\n-  " });
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
