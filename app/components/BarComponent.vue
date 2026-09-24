<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const time = ref("");
const date = ref("");
const isCrtActive = useState("crt-active", () => false);

let interval: number;

onMounted(() => {
    const updateTime = () => {
        const now = new Date();
        time.value = now.toLocaleTimeString("en-US", { hour12: false });
        date.value = now.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };
    updateTime();
    interval = window.setInterval(updateTime, 1000);
});

const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
        case "F1":
            e.preventDefault();
            navigateTo("/");
            break;
        case "F2":
            e.preventDefault();
            navigateTo("/project");
            break;
        case "F3":
            e.preventDefault();
            navigateTo("/experience");
            break;
        case "F4":
            e.preventDefault();
            navigateTo("/education");
            break;
        case "F5":
            e.preventDefault();
            navigateTo("/certificate");
            break;
        case "F6":
            e.preventDefault();
            navigateTo("/contact");
            break;
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    clearInterval(interval);
    window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
    <header
        class="flex items-center justify-between px-1 md:px-2 h-8 md:h-6 bg-zinc-950 text-[10px] md:text-xs border-b border-zinc-700/50 shadow-md overflow-hidden relative"
    >
        <!-- Workspaces -->
        <div
            class="flex items-center gap-0 md:gap-1 h-full overflow-x-auto scrollbar-hide shrink-0 z-10"
        >
            <NuxtLink
                to="/"
                class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap"
                active-class="bg-zinc-700 text-zinc-100"
                inactive-class="text-zinc-500 hover:text-zinc-300"
            >
                <span class="mr-1 opacity-50">F1</span>home
            </NuxtLink>
            <NuxtLink
                to="/project"
                class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap"
                active-class="bg-zinc-700 text-zinc-100"
                inactive-class="text-zinc-500 hover:text-zinc-300"
            >
                <span class="mr-1 opacity-50">F2</span>project
            </NuxtLink>
            <NuxtLink
                to="/experience"
                class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap"
                active-class="bg-zinc-700 text-zinc-100"
                inactive-class="text-zinc-500 hover:text-zinc-300"
            >
                <span class="mr-1 opacity-50">F3</span>experience
            </NuxtLink>
            <NuxtLink
                to="/education"
                class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap"
                active-class="bg-zinc-700 text-zinc-100"
                inactive-class="text-zinc-500 hover:text-zinc-300"
            >
                <span class="mr-1 opacity-50">F4</span>education
            </NuxtLink>
            <NuxtLink
                to="/certificate"
                class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap"
                active-class="bg-zinc-700 text-zinc-100"
                inactive-class="text-zinc-500 hover:text-zinc-300"
            >
                <span class="mr-1 opacity-50">F5</span>certificate
            </NuxtLink>
            <NuxtLink
                to="/contact"
                class="px-2 md:px-2 h-full flex items-center transition-colors font-bold whitespace-nowrap"
                active-class="bg-zinc-700 text-zinc-100"
                inactive-class="text-zinc-500 hover:text-zinc-300"
            >
                <span class="mr-1 opacity-50">F6</span>contact
            </NuxtLink>
        </div>

        <!-- Window Title -->
        <div
            class="absolute left-1/2 -translate-x-1/2 hidden sm:block text-zinc-400 font-semibold truncate max-w-37.5 md:max-w-md z-0 pointer-events-none"
        >
            ~ / porto
        </div>

        <!-- System Tray -->
        <div
            class="flex items-center gap-2 md:gap-3 h-full text-zinc-400 shrink-0 z-10 ml-auto"
        >
            <!-- VFX Toggle Button -->
            <button
                @click="isCrtActive = !isCrtActive"
                class="flex items-center gap-1 px-1.5 py-0.5 rounded border transition-all cursor-pointer font-bold select-none text-[9px] md:text-[10px]"
                :class="
                    isCrtActive
                        ? 'bg-indigo-950/40 border-indigo-700/60 text-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.15)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                "
            >
                <span>vfx:</span>
                <span class="uppercase">{{
                    isCrtActive ? "crt" : "flat"
                }}</span>
            </button>

            <div class="hidden md:flex items-center gap-1">
                <span class="text-zinc-500">vol</span>
                <span>75%</span>
            </div>
            <div class="hidden lg:flex items-center gap-1">
                <span class="text-zinc-500">mem</span>
                <span>1.2G</span>
            </div>
            <div
                class="flex items-center gap-1 bg-zinc-800 h-full px-2 text-zinc-200 whitespace-nowrap font-bold"
            >
                <span class="hidden sm:inline">{{ date }}</span>
                <span>{{ time }}</span>
            </div>
        </div>
    </header>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
