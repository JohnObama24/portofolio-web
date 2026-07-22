<template>
  <div
    ref="terminalContainerRef"
    class="h-full w-full bg-black text-[#33ff33] p-3 overflow-y-auto font-mono text-sm cursor-text flex flex-col select-text"
    @click="handleContainerClick"
  >
    <div v-for="(line, index) in lines" :key="index" class="mb-1.5">
      <div v-if="line.type === 'cmd'" class="flex items-center gap-1.5 flex-wrap font-bold">
        <span class="text-[#33ff33] font-bold select-none">john@porto</span>
        <span class="text-white font-bold select-none">~</span>
        <span class="text-[#33ff33] font-bold select-none">$</span>
        <span v-if="index !== lines.length - 1" class="text-[#33ff33] font-bold break-all ml-1">{{ line.text }}</span>
        <div v-else class="flex-1 flex items-center ml-1 min-w-30">
          <input
            :ref="setInputRef"
            v-model="currentInput"
            type="text"
            @keydown.enter="handleEnter"
            @keydown.up.prevent="navigateHistory('up')"
            @keydown.down.prevent="navigateHistory('down')"
            @keydown.tab.prevent="handleTabCompletion"
            @keydown.ctrl.l.prevent="clearTerminal"
            class="w-full bg-transparent outline-none border-none text-[#33ff33] font-mono font-bold text-sm p-0 m-0 caret-[#33ff33] terminal-input"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="none"
          />
        </div>
      </div>
      <div
        v-else-if="line.type === 'output'"
        class="whitespace-pre-wrap text-[#33ff33] leading-relaxed"
      >
        {{ line.text?.trim() }}
      </div>
      <div v-else-if="line.type === 'neofetch'" class="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-[#33ff33]">
        <div class="sm:w-1/3 w-3/4 max-w-100">
          <img :src="line.imgSrc" alt="gambar" class="w-full h-auto" v-if="line.imgSrc"/>
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
import { ref, onMounted, nextTick } from "vue";
import asciiImage from '~/assets/images/ascii-art-text.png';

interface ConsoleLine {
  type: "cmd" | "output" | "neofetch";
  text?: string;
  imgSrc?: string;
}

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
const terminalContainerRef = ref<HTMLDivElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const setInputRef = (el: any) => {
  if (el) {
    const targetEl = Array.isArray(el) ? el[el.length - 1] : el;
    if (targetEl) {
      inputRef.value = targetEl;
      nextTick(() => {
        focusInput();
      });
    }
  }
};

// History management
const history = ref<string[]>([]);
const historyIndex = ref(-1);

const focusInput = () => {
  if (inputRef.value && typeof inputRef.value.focus === 'function') {
    inputRef.value.focus();
  }
};

const handleContainerClick = () => {
  if (typeof window === 'undefined') return;
  const selection = window.getSelection();
  if (!selection || selection.toString().length === 0) {
    focusInput();
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalContainerRef.value) {
      terminalContainerRef.value.scrollTop = terminalContainerRef.value.scrollHeight;
    }
  });
};

onMounted(() => {
  focusInput();
  nextTick(() => {
    focusInput();
    scrollToBottom();
  });
});

const navigateHistory = (direction: 'up' | 'down') => {
  if (history.value.length === 0) return;

  if (direction === 'up') {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++;
      currentInput.value = history.value[history.value.length - 1 - historyIndex.value] || "";
    }
  } else if (direction === 'down') {
    if (historyIndex.value > 0) {
      historyIndex.value--;
      currentInput.value = history.value[history.value.length - 1 - historyIndex.value] || "";
    } else if (historyIndex.value === 0) {
      historyIndex.value = -1;
      currentInput.value = "";
    }
  }
};

const availableCommands = [
  "help",
  "ls",
  "neofetch",
  "clear",
  "github",
  "instagram",
  "experience",
  "education",
  "certificate",
  "certificates",
  "projects",
  "contact",
  "cat about.txt",
  "cat experience.txt",
  "cat education.txt",
  "cat certificate.txt",
  "cat projects.txt",
  "cat contact.txt",
  "nvim",
  "vim"
];

const handleTabCompletion = () => {
  const inputVal = currentInput.value.trim();
  if (!inputVal) return;

  const matches = availableCommands.filter((cmd) => cmd.startsWith(inputVal));
  if (matches.length === 1 && matches[0]) {
    currentInput.value = matches[0];
  } else if (matches.length > 1) {
    // Show available completions
    lines.value.push({ type: "output", text: matches.join("   ") });
    lines.value.push({ type: "cmd", text: "" });
    nextTick(() => {
      focusInput();
      scrollToBottom();
    });
  }
};

const clearTerminal = () => {
  lines.value = [{ type: "cmd", text: "" }];
  currentInput.value = "";
  nextTick(() => {
    focusInput();
    scrollToBottom();
  });
};

const handleEnter = () => {
  const cmd = currentInput.value.trim();

  if (lines.value.length > 0) {
    lines.value[lines.value.length - 1]!.text = currentInput.value;
  }

  if (cmd) {
    history.value.push(cmd);
    historyIndex.value = -1;
    runCommand(cmd);
  }

  lines.value.push({ type: "cmd", text: "" });
  currentInput.value = "";
  
  nextTick(() => {
    focusInput();
    scrollToBottom();
  });
};

const runCommand = (cmd: string) => {
  const normalizedCmd = cmd.toLowerCase();

  switch (normalizedCmd) {
    case "nvim":
    case "vim":
    case "vi":
      lines.value.push({ type: "output", text: "ummmmmmm blum buat bang 😅" });
      break;
    case "clear":
      lines.value = [];
      break;
    case "ls":
      lines.value.push({ type: "output", text: "about.txt\nexperience.txt\neducation.txt\ncertificate.txt\nprojects.txt\ncontact.txt" });
      break;
    case "cat about.txt":
    case "about":
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
    case "cat projects.txt":
    case "projects":
      lines.value.push({ type: "output", text: "PROJECTS & PORTFOLIO:\n- Web Portfolio OS (Vue / Nuxt 3)\n- E-Voting Application\n- Interactive CLI Dashboard\n\nRun workspace link [2]projects to inspect all projects." });
      break;
    case "cat contact.txt":
    case "contact":
      lines.value.push({ type: "output", text: "CONTACT & SOCIALS:\n- GitHub: https://github.com/JohnObama24/\n- Instagram: https://www.instagram.com/johnobama_/\n\nType 'github' or 'instagram' to open directly in browser." });
      break;
    case "github":
      window.open("https://github.com/JohnObama24/", "_blank");
      lines.value.push({ type: "output", text: "redirecting to github..." });
      break;
    case "instagram":
      window.open("https://www.instagram.com/johnobama_/", "_blank");
      lines.value.push({ type: "output", text: "redirecting to instagram..." });
      break;
    case "help":
      lines.value.push({ type: "output", text: "Available commands:\n- ls\n- cat [file]\n- experience\n- education\n- certificate\n- projects\n- contact\n- neofetch\n- clear (or Ctrl+L)\n- help\n- github\n- instagram" });
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
.terminal-input {
  caret-color: #33ff33;
  caret-shape: block;
  font-weight: bold;
}
</style>
