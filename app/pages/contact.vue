<template>
  <div class="flex-1 flex flex-col lg:flex-row gap-2 h-full w-full font-mono text-[#33ff33]">
    <!-- Left Panel: Mail Client & Suggestion Form -->
    <div class="flex-1 flex flex-col min-h-[50vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.5s_ease-out]">
      <WindowComponent title="mail-client" :isActive="true" class="h-full">
        <div class="h-full w-full bg-black text-[#33ff33] p-3 flex flex-col gap-4 overflow-y-auto">
          
          <!-- System Status Header -->
          <div class="flex flex-col gap-1 border-b border-[#33ff33]/20 pb-2">
            <div class="flex gap-2 text-xs">
              <span class="text-[#33ff33]">root@contact</span> <span class="text-white">~ #</span>
              <span class="text-[#33ff33]/70">systemctl status social-links.service</span>
            </div>
            <div class="flex gap-2 items-center text-xs mt-1">
              <span class="text-[#33ff33] animate-pulse">●</span>
              <span class="font-bold">Keep in touch / send suggestions</span>
            </div>
          </div>

          <!-- Social Links grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a href="https://github.com/JohnObama24/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 p-2 bg-black border border-[#33ff33]/30 hover:border-[#33ff33] text-xs font-bold transition-all hover:bg-[#33ff33] hover:text-black">
              <span>GitHub</span>
            </a>
            <a href="https://www.instagram.com/johnobama_/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 p-2 bg-black border border-[#33ff33]/30 hover:border-[#33ff33] text-xs font-bold transition-all hover:bg-[#33ff33] hover:text-black">
              <span>Instagram</span>
            </a>
            <a href="https://linkedin.com/in/JohnObama24" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1.5 p-2 bg-black border border-[#33ff33]/30 hover:border-[#33ff33] text-xs font-bold transition-all hover:bg-[#33ff33] hover:text-black">
              <span>LinkedIn</span>
            </a>
            <a href="mailto:johnobama24keren@gmail.com" class="flex items-center justify-center gap-1.5 p-2 bg-black border border-[#33ff33]/30 hover:border-[#33ff33] text-xs font-bold transition-all hover:bg-[#33ff33] hover:text-black">
              <span>Email</span>
            </a>
          </div>

          <!-- Suggestion Form -->
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 border-t border-[#33ff33]/20 pt-3">
            <div class="text-xs font-bold uppercase tracking-widest text-white border-b border-[#33ff33]/15 pb-1">
              [ MESSAGE TRANSMISSION CLIENT ]
            </div>

            <div class="flex flex-col sm:flex-row gap-2">
              <div class="flex-1 flex flex-col gap-1">
                <label class="text-[10px] uppercase text-[#33ff33]/70 font-bold">NAME / SENDER</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  placeholder="Guest User"
                  @input="handleInput"
                  @blur="handleBlur"
                  :disabled="isSubmitting"
                  class="bg-black border border-[#33ff33]/40 focus:border-[#33ff33] focus:outline-none p-2 text-[#33ff33] text-xs"
                />
              </div>
              <div class="flex-1 flex flex-col gap-1">
                <label class="text-[10px] uppercase text-[#33ff33]/70 font-bold">EMAIL ADDRESS *</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="your-email@example.com"
                  @input="handleInput"
                  @blur="handleBlur"
                  :disabled="isSubmitting"
                  required
                  class="bg-black border border-[#33ff33]/40 focus:border-[#33ff33] focus:outline-none p-2 text-[#33ff33] text-xs"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1">
              <label class="text-[10px] uppercase text-[#33ff33]/70 font-bold">MESSAGE BODY *</label>
              <textarea 
                v-model="form.message"
                placeholder="Type your message or suggestion here..."
                @input="handleInput"
                @blur="handleBlur"
                :disabled="isSubmitting"
                required
                class="bg-black border border-[#33ff33]/40 focus:border-[#33ff33] focus:outline-none p-2 text-[#33ff33] text-xs h-20 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-black border border-[#33ff33] text-[#33ff33] font-bold p-2 text-xs transition-colors cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#33ff33] hover:text-black"
            >
              {{ isSubmitting ? 'TRANSMITTING...' : 'SEND SUGGESTION' }}
            </button>
          </form>

          <!-- logs terminal kayak hengkeer-->
          <div v-if="logs.length > 0" class="mt-1 p-2 bg-[#051105] border border-[#33ff33]/30 font-mono text-[11px] flex flex-col gap-1 max-h-36 overflow-y-auto">
            <div v-for="(log, i) in logs" :key="i" :class="log.color">
              {{ log.text }}
            </div>
          </div>

        </div>
      </WindowComponent>
    </div>

    <!-- Right Panel: angri birt -->
    <div class="w-full lg:w-2/5 flex flex-col min-h-[40vh] lg:min-h-0 lg:h-full animate-[fade-in-up_0.6s_ease-out]">
      <WindowComponent title="live-monitor" :isActive="isTyping" class="h-full">
        <div class="flex flex-col items-center justify-center h-full p-4 gap-4 bg-black">
          <div class="w-full border border-[#33ff33] p-1 bg-black relative">
            <!-- Typing / Idle  -->
            <span class="absolute top-2 left-2 bg-black px-1.5 py-0.5 border border-[#33ff33] text-[9px] font-bold tracking-widest transition-all" :class="isTyping ? 'text-[#33ff33] border-[#33ff33]' : 'text-zinc-600 border-zinc-800'">
              {{ isTyping ? '● MONITORING ACTION' : '○ MONITOR STANDBY' }}
            </span>
            <img :src="currentImage" alt="action state" class="w-full h-auto max-h-[220px] md:max-h-[300px] object-contain transition-all duration-300 mx-auto" />
          </div>
          
          <div class="w-full font-mono text-[10px] flex flex-col border border-[#33ff33]/30 p-2 gap-1 bg-[#051105]">
            <div>MONITOR ID: LVM-1995</div>
            <div>STATUS: {{ isTyping ? 'USER DETECTED WRITING...' : 'IDLING / WAITING' }}</div>
            <div class="text-[9px] opacity-60">CLOCK: {{ formattedDate }}</div>
          </div>
        </div>
      </WindowComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import WindowComponent from "~/components/WindowComponent.vue";

const formattedDate = ref('')
const isTyping = ref(false)
const currentImage = ref('/images/default.png')

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
interface LogLine {
  text: string;
  color: string;
}
const logs = ref<LogLine[]>([])

let clockInterval: number
let idleTimeout: number

const handleInput = () => {
  isTyping.value = true
  currentImage.value = '/images/writing.png'
  
  if (idleTimeout) clearTimeout(idleTimeout)
  
  idleTimeout = window.setTimeout(() => {
    isTyping.value = false
    currentImage.value = '/images/default.png'
  }, 1000)
}

const handleBlur = () => {
  // Let activeElement transition slightly, then return if not focused elsewhere
  setTimeout(() => {
    const active = document.activeElement
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      return
    }
    isTyping.value = false
    currentImage.value = '/images/default.png'
    if (idleTimeout) clearTimeout(idleTimeout)
  }, 100)
}

const handleSubmit = () => {
  if (!form.value.email || !form.value.message) {
    logs.value = [
      { text: '[ERROR] CANNOT TRANSMIT. EMAIL & MESSAGE REQUIRED.', color: 'text-red-500 font-bold' }
    ]
    return
  }

  isSubmitting.value = true
  logs.value = []
  
  const addLog = (text: string, color = 'text-[#33ff33]', delay: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        logs.value.push({ text, color })
        resolve(true)
        // Scroll terminal logs to bottom
        setTimeout(() => {
          const logDiv = document.querySelector('.overflow-y-auto')
          if (logDiv) logDiv.scrollTop = logDiv.scrollHeight
        }, 10)
      }, delay)
    })
  }

  // Chain SMTP animation steps
  addLog('[INIT] CONNECTING TO OUTBOUND MAIL SERVER...', 'text-white', 0)
    .then(() => addLog('[SMTP] CONNECTED TO mail.johnobama.me:25', 'text-[#33ff33]', 500))
    .then(() => addLog('[SMTP] HELO mail.johnobama.me ... OK', 'text-[#33ff33]', 400))
    .then(() => addLog(`[SMTP] MAIL FROM: <${form.value.email}> ... OK`, 'text-[#33ff33]', 400))
    .then(() => addLog('[SMTP] RCPT TO: <johnobama24keren@gmail.com> ... OK', 'text-[#33ff33]', 400))
    .then(() => addLog('[SMTP] TRANSMITTING HEADER & DATA BLOCK...', 'text-white', 500))
    .then(() => addLog('[SMTP] QUEUED IN SMTP SPOOLER. HANDING TO LOCAL MAIL CLIENT...', 'text-[#33ff33] font-bold', 400))
    .then(() => addLog('[SUCCESS] REDIRECTED TO MAIL CLIENT GATEWAY!', 'text-green-400 font-bold', 300))
    .then(() => {
      // Build mailto URI to compile and send the email
      const nameVal = form.value.name || 'Guest User'
      const subject = `Portfolio Suggestion from ${nameVal}`
      const body = `Sender Name: ${nameVal}\nSender Email: ${form.value.email}\n\nMessage:\n${form.value.message}`
      
      const mailtoUri = `mailto:johnobama24keren@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      
      // Dispatch mailto action to compose mail
      window.location.href = mailtoUri

      // Clear form inputs
      form.value.name = ''
      form.value.email = ''
      form.value.message = ''
      isSubmitting.value = false
    })
}

onMounted(() => {
  const updateClock = () => {
    const d = new Date()
    formattedDate.value = d.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit', second:'2-digit' })
  }
  updateClock()
  clockInterval = window.setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(clockInterval)
  if (idleTimeout) clearTimeout(idleTimeout)
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
