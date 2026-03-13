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
        {{ line.text.trim() }}
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const lines = ref([
  { type: "cmd", text: "neofetch" },
  {
    type: "output",
    text: `
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
  `,
  },
  { type: "cmd", text: "" }, // waiting for input
]);

const currentInput = ref("");


const handleEnter = () => {
  const cmd = currentInput.value.trim();

  // Update line terakhir (input yang barusan di ketik) dari kosong jadi command
  if (lines.value.length > 0) {
    lines.value[lines.value.length - 1]!.text = cmd;
  }

  if (cmd) {
    runCommand(cmd);
  }

  // Tambahkan baris baru untuk input command selanjutnya
  lines.value.push({ type: "cmd", text: "" });
  currentInput.value = ""; // Reset input text

  // Scroll to bottom (optional, but good UX)
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
      lines.value.push({ type: "output", text: "about.txt\nprojects/\ncontact.txt" });
      break;
    case "cat about.txt":
      lines.value.push({ type: "output", text: "Halo! Saya adalah developer yang sedang belajar bikin Web mirip Linux TWM." });
      break;
    case "help":
      lines.value.push({ type: "output", text: "Available commands:\n- ls\n- cat [file]\n- neofetch\n- clear\n- help" });
      break;
    case "neofetch":
      lines.value.push({
        type: "output",
        text: `
       _,met$$$$$gg.          john@porto
    ,g$$$$$$$$$$$$$$$P.       ----------
  ,g$$P"     """Y$$.".        OS: Arch Linux x86_64
 ,$$P'              \`$$$.     Host: TWM Portfolio
',$$P       ,ggs.     \`$$b:   Kernel: 6.8.9-arch1-1
\`d$$'     ,$P"'   .    $$$    Uptime: 24 mins
 $$P      d$'     ,    $$P    Packages: 999 (pacman)
 $$:      $$.   -    ,d$$'    Shell: zsh 5.9
    `
      });
      break;
    default:
      lines.value.push({ type: "output", text: `bash: ${cmd}: command not found` });
      break;
  }
};
</script>
