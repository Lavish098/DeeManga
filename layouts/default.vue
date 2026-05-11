<template>
  <div class="min-h-screen">
    <header class="sticky top-0 z-40 border-b border-stone-900/10 bg-[#fff9ef]/90 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
        <nuxt-link :to="{ name: 'index' }" class="flex min-w-fit items-center gap-3">
          <span class="grid h-11 w-11 place-items-center rounded-md bg-stone-950 text-xl font-black text-[#fff9ef] shadow-[5px_5px_0_rgba(228,93,53,0.8)]">
            D
          </span>
          <span>
            <span class="block text-lg font-black uppercase leading-none tracking-wide text-stone-950">DeeManga</span>
            <span class="block text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">Read mode</span>
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
            class="rounded-md px-4 py-2 text-sm font-bold text-stone-700 transition hover:bg-stone-950 hover:text-[#fff9ef]"
          >
            {{ item.name }}
          </nuxt-link>
        </nav>

        <button
          type="button"
          class="ml-auto grid h-11 w-11 place-items-center rounded-md border border-stone-900/15 bg-white/70 text-2xl font-black text-stone-900 md:hidden"
          @click="mobileNav = !mobileNav"
          aria-label="Toggle navigation"
        >
          {{ mobileNav ? "x" : "=" }}
        </button>
      </div>

      <div class="border-t border-stone-900/10 px-4 pb-4 lg:hidden">
        <seacrhBar />
      </div>

      <div v-if="mobileNav" class="border-t border-stone-900/10 bg-[#fff9ef] px-4 py-4 md:hidden">
        <nav class="grid gap-2">
          <nuxt-link
            v-for="item in links"
            :key="item.name"
            :to="{ name: item.route }"
            class="rounded-md bg-stone-950 px-4 py-3 text-sm font-bold text-[#fff9ef]"
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
import { ref } from "vue";

export default {
  setup() {
    const mobileNav = ref(false);
    const links = [
      { name: "Updates", route: "index" },
      { name: "Popular", route: "popularList" },
      { name: "Library", route: "mangaList" },
    ];

    return {
      links,
      mobileNav,
    };
  },
};
</script>
