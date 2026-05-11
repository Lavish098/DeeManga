<template>
  <div class="relative w-full max-w-2xl">
    <div class="flex h-12 items-center mt-2 md:mt-0 rounded-md border border-stone-900/15 bg-white/80 px-4 shadow-sm">
      <span class="mr-3 text-3xl text-stone-500">⌕</span>
      <input
        v-model="search"
        type="text"
        class="w-full bg-transparent text-sm font-semibold text-stone-900 border-0 placeholder:text-stone-400 focus:outline-none focus:ring-0"
        placeholder="Search manga, manhwa, authors"
      />
    </div>

    <div
      v-if="search"
      class="absolute left-0 right-0 top-14 z-50 max-h-[420px] overflow-y-auto rounded-md border border-stone-900/10 bg-[#fffdf8] p-2 shadow-2xl"
    >
      <nuxt-link
        v-for="result in searchQuery"
        :key="result.id"
        :to="{ name: 'manga-mangaInfo', params: { mangaInfo: result.id } }"
        class="flex gap-3 rounded-md p-2 transition hover:bg-stone-100"
        @click="searchToggle"
      >
        <img
          :src="`${API_BASE_URL}/image-proxy?url=${encodeURIComponent(result.image)}`"
          :alt="result.title"
            referrerpolicy="no-referrer"
          class="h-20 w-14 rounded object-cover shadow-sm"
        />
        <div class="min-w-0 py-1">
          <h2 class="line-clamp-2 text-sm font-black leading-5 text-stone-950">
            {{ result.title }}
          </h2>
          <p class="mt-2 line-clamp-1 text-xs font-semibold text-stone-500">
            {{ (result.genres || []).slice(0, 3).join(" / ") || "MangaDex" }}
          </p>
        </div>
      </nuxt-link>

      <div v-if="searchQuery.length === 0" class="p-5 text-center text-sm font-semibold text-stone-500">
        No results found
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mangaStore } from "~/store";

export default {
  setup() {
    const store = mangaStore();
    const search = ref("");
    const config = useRuntimeConfig()
      const API_BASE_URL = config.public.apiBase   

    const searchQuery = computed(() => {
      return store.searchDetails || [];
    });

    const searchToggle = () => {
      search.value = "";
    };

    watch(
      search,
      async (value) => {
        await store.getMangaSearch(value);
      },
      { immediate: false }
    );

    return {
      searchToggle,
      searchQuery,
      search,
      API_BASE_URL
    };
  },
};
</script>
