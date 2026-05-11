<template>
  <div class="space-y-12">
    <section class="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div
        class="flex min-h-[360px] flex-col justify-end rounded-md bg-stone-950 p-6 text-[#fff9ef] shadow-2xl md:p-10"
      >
        <p
          class="mb-4 text-sm font-black uppercase tracking-[0.34em] text-[#e45d35]"
        >
          Fresh scans
        </p>
        <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
          Find your next binge without fighting the page.
        </h1>
        <p
          class="mt-5 max-w-2xl text-base font-medium leading-7 text-stone-300"
        >
          A cleaner DeeManga for quick discovery, sharper chapter lists, and
          long reading sessions.
        </p>
      </div>

      <nuxt-link
        v-if="featured"
        :to="{ name: 'manga-mangaInfo', params: { mangaInfo: featured.id } }"
        class="group relative min-h-[360px] overflow-hidden rounded-md bg-stone-900 shadow-2xl"
      >
        <img
          :src="`${API_BASE_URL}/image-proxy?url=${encodeURIComponent(featured.image)}`"
          :alt="featured.title"
          referrerpolicy="no-referrer"
          class="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"
        ></div>
        <div class="absolute bottom-0 p-6 text-white">
          <p
            class="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#ffd199]"
          >
            Spotlight
          </p>
          <h2 class="line-clamp-2 text-3xl font-black leading-tight">
            {{ featured.title }}
          </h2>
          <p class="mt-3 line-clamp-1 text-sm font-semibold text-stone-200">
            {{ (featured.genres || []).slice(0, 4).join(" / ") }}
          </p>
        </div>
      </nuxt-link>
    </section>

    <section>
      <div class="mb-5 flex items-end justify-between gap-4">
        <div>
          <p
            class="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]"
          >
            Popular now
          </p>
          <h2 class="mt-2 text-3xl font-black text-stone-950">
            Reader favorites
          </h2>
        </div>
        <nuxt-link
          :to="{ name: 'popularList' }"
          class="rounded-md bg-stone-950 px-4 py-2 text-sm font-bold text-[#fff9ef]"
        >
          View all
        </nuxt-link>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <popularCard
          v-for="popular in popularList"
          :key="popular.id"
          :popular="popular"
        />
      </div>
    </section>

    <section>
      <div class="mb-5">
        <p
          class="text-xs font-black uppercase tracking-[0.28em] text-[#e45d35]"
        >
          New chapters
        </p>
        <h2 class="mt-2 text-3xl font-black text-stone-950">
          Recently updated
        </h2>
      </div>
      <updateCard />
    </section>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref } from "vue";

export default {
  setup() {
    const store = mangaStore();
    const page = ref(1);
    const config = useRuntimeConfig();
    const API_BASE_URL = config.public.apiBase;

    const popularList = computed(() => {
      return (store.popularDetails.data || []).slice(0, 6);
    });

    const featured = computed(() => {
      return popularList.value[0];
    });

    return { store, page, popularList, featured, API_BASE_URL };
  },
  async created() {
    await this.store.getMangaPopular(this.page);
    await this.store.getMangaUpdate();
  },
};
</script>
