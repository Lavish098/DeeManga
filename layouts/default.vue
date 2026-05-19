<template>
  <div class="min-h-screen">
    <header class="sticky top-0 z-40 border-b border-stone-900/10 bg-[#fff9ef]/90 backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/90">
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
        <nuxt-link :to="{ name: 'index' }" class="flex min-w-fit items-center">
          <img :src="appicon" alt="" class="w-[75px] h-[75px]" referrerpolicy="no-referrer">
          <span>
            <span class="block text-lg font-black uppercase leading-none tracking-wide text-stone-950 dark:text-[#fff9ef]">DeeManga</span>
            <span class="block text-xs font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400">Read mode</span>
          </span>
        </nuxt-link>

        <div class="hidden flex-1 justify-center lg:flex">
          <seacrhBar />
        </div>

        <nav class="ml-auto hidden items-center gap-2 md:flex">
          <nuxt-link
            v-for="item in links"
            :key="item.name"
            :to="{ name: item.route }"
            class="rounded-md px-4 py-2 text-sm font-bold text-stone-700 transition hover:bg-stone-950 hover:text-[#fff9ef] dark:text-stone-200 dark:hover:bg-[#fff9ef] dark:hover:text-stone-950"
          >
            {{ item.name }}
          </nuxt-link>
        </nav>

        <button
          type="button"
          class="ml-auto inline-flex h-11 items-center gap-2 rounded-md border border-stone-900/15 bg-white/70 px-3 text-sm font-black text-stone-900 transition hover:bg-stone-950 hover:text-[#fff9ef] dark:border-white/15 dark:bg-white/10 dark:text-[#fff9ef] dark:hover:bg-[#fff9ef] dark:hover:text-stone-950 md:ml-0"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="isDark ? 'Light mode' : 'Dark mode'"
        >
          <span class="text-lg" aria-hidden="true">{{ isDark ? "☀" : "☾" }}</span>
          <span class="hidden sm:inline">{{ isDark ? "Light" : "Dark" }}</span>
        </button>

        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-md border border-stone-900/15 bg-white/70 text-2xl font-black text-stone-900 dark:border-white/15 dark:bg-white/10 dark:text-[#fff9ef] md:hidden"
          @click="mobileNav = !mobileNav"
          aria-label="Toggle navigation"
        >
          {{ mobileNav ? "x" : "=" }}
        </button>
      </div>

      <div class="border-t border-stone-900/10 px-4 pb-4 dark:border-white/10 lg:hidden">
        <seacrhBar />
      </div>

      <div v-if="mobileNav" class="border-t border-stone-900/10 bg-[#fff9ef] px-4 py-4 dark:border-white/10 dark:bg-stone-950 md:hidden">
        <nav class="grid gap-2">
          <nuxt-link
            v-for="item in links"
            :key="item.name"
            :to="{ name: item.route }"
            class="rounded-md bg-stone-950 px-4 py-3 text-sm font-bold text-[#fff9ef] dark:bg-white/10"
            @click="mobileNav = false"
          >
            {{ item.name }}
          </nuxt-link>
        </nav>
      </div>
    </header>

    <main class="relative mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import appicon from '~/assets/images/appIcon.png'


export default {
  setup() {
    const mobileNav = ref(false);
    const isDark = ref(false);
    const links = [
      { name: "Updates", route: "index" },
      { name: "Popular", route: "popularList" },
      { name: "Library", route: "mangaList" },
    ];
    const applyTheme = (value) => {
      isDark.value = value;
      document.documentElement.classList.toggle("dark", value);
      localStorage.setItem("theme", value ? "dark" : "light");
    };

    const toggleTheme = () => {
      applyTheme(!isDark.value);
    };

    onMounted(() => {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);
    });

    return {
      isDark,
      links,
      mobileNav,
      appicon,
      toggleTheme
    };
  },
};
</script>
