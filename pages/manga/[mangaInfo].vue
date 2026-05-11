<template>
  <div class="space-y-10">
    <section
      class="relative overflow-hidden rounded-md bg-stone-950 text-[#fff9ef] shadow-2xl"
    >
      <img
        v-if="mangaInfo.img"
        :src="`${API_BASE_URL}/image-proxy?url=${encodeURIComponent(mangaInfo.img)}`"
        :alt="mangaInfo.title"
         class="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
      />
      <div
        class="relative grid gap-8 p-5 md:grid-cols-[260px_1fr] md:p-8 lg:p-10"
      >
        <div class="mx-auto w-full max-w-[260px]">
          <img
            :src="`${API_BASE_URL}/image-proxy?url=${encodeURIComponent(mangaInfo.img)}`"
            :alt="mangaInfo.title"
                 class="aspect-[3/4] w-full rounded-md object-cover shadow-[10px_10px_0_rgba(228,93,53,0.85)]"
          />
        </div>

        <div class="flex flex-col justify-end">
          <p
            class="mb-3 text-xs font-black uppercase tracking-[0.3em] text-[#ffd199]"
          >
            {{ mangaInfo.status?.info?.[1] || "Manga" }}
          </p>
          <h1 class="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {{ mangaInfo.title }}
          </h1>
          <p
            class="mt-5 max-w-3xl text-sm font-medium leading-7 text-stone-200 md:text-base"
          >
            {{ mangaInfo.synopsis || "No synopsis available yet." }}
          </p>

          <div
            class="mt-6 grid gap-3 text-sm font-bold text-stone-200 sm:grid-cols-3"
          >
            <div class="rounded-md bg-white/10 p-4">
              <span
                class="block text-xs uppercase tracking-widest text-stone-400"
                >Author</span
              >
              <span class="mt-1 block text-[#fff9ef]">{{
                mangaInfo.authors?.info?.[0] || "Unknown"
              }}</span>
            </div>
            <div class="rounded-md bg-white/10 p-4">
              <span
                class="block text-xs uppercase tracking-widest text-stone-400"
                >Follows</span
              >
              <span class="mt-1 block text-[#fff9ef]">{{
                mangaInfo.views?.info?.[1] || "0"
              }}</span>
            </div>
            <div class="rounded-md bg-white/10 p-4">
              <span
                class="block text-xs uppercase tracking-widest text-stone-400"
                >Chapters</span
              >
              <span class="mt-1 block text-[#fff9ef]">{{
                chapterPage.length
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p
          class="text-xs font-black uppercase tracking-[0.28em] text-[#0f766e]"
        >
          Genres
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="genre in genres"
            :key="genre"
            class="rounded bg-white/70 px-3 py-2 text-xs font-black uppercase tracking-wide text-stone-700 shadow-sm"
            >{{ genre }}</span
          >
        </div>
      </div>

      <div
        class="rounded-md border border-stone-900/10 bg-[#fffdf8]/90 p-4 shadow-sm md:p-5"
      >
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p
              class="text-xs font-black uppercase tracking-[0.28em] text-[#e45d35]"
            >
              Chapter list
            </p>
            <h2 class="mt-2 text-2xl font-black text-stone-950">
              Start reading
            </h2>
          </div>
          <span class="text-sm font-bold text-stone-500"
            >{{ chapterPage.length }} total</span
          >
        </div>

        <div v-if="paginatedItems.length" class="grid gap-2">
          <template
            v-for="(item, index) in paginatedItems"
            :key="item.chapterLink"
          >
            <NuxtLink
              v-if="item.isReadable"
              :to="chapterRoute(item, index)"
              class="flex items-center justify-between gap-4 rounded-md border border-stone-900/10 bg-white/80 px-4 py-3 transition hover:border-stone-950/40 hover:bg-white cursor-pointer"
            >
              <div class="min-w-0">
                <h3 class="truncate text-sm font-black text-stone-950">
                  {{ item.chapterTitle }}
                </h3>
                <p class="mt-1 text-xs font-semibold text-stone-500">
                  {{ formatDate(item.uploadedDate) }}
                </p>
              </div>
              <span
                class="min-w-fit rounded px-3 py-1 text-xs font-black uppercase tracking-wide bg-[#0f766e]/10 text-[#0f766e]"
              >
                Read
              </span>
            </NuxtLink>

            <a
              v-else
              :href="item.externalUrl"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-between gap-4 rounded-md border border-stone-900/10 bg-white/80 px-4 py-3 transition hover:border-stone-950/40 hover:bg-white cursor-pointer"
            >
              <div class="min-w-0">
                <h3 class="truncate text-sm font-black text-stone-950">
                  {{ item.chapterTitle }}
                </h3>
                <p class="mt-1 text-xs font-semibold text-stone-500">
                  {{ formatDate(item.uploadedDate) }}
                </p>
              </div>
              <span
                class="min-w-fit rounded px-3 py-1 text-xs font-black uppercase tracking-wide bg-[#e45d35]/10 text-[#a33d22]"
              >
                Source
              </span>
            </a>
          </template>
        </div>

        <div
          v-else
          class="rounded-md bg-stone-100 p-6 text-sm font-semibold text-stone-500"
        >
          No chapters are available for this title yet.
        </div>

        <nav
          v-if="totalPages > 1"
          class="mt-6 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            class="rounded-md border border-stone-900/15 px-4 py-2 text-sm font-bold text-stone-700"
            @click="previousPage"
          >
            Previous
          </button>
          <button
            v-for="pageNumber in visiblePages"
            :key="pageNumber"
            type="button"
            class="h-10 w-10 rounded-md text-sm font-black"
            :class="
              pageNumber === page
                ? 'bg-stone-950 text-[#fff9ef]'
                : 'bg-stone-100 text-stone-600'
            "
            @click="page = pageNumber"
          >
            {{ pageNumber }}
          </button>
          <button
            type="button"
            class="rounded-md border border-stone-900/15 px-4 py-2 text-sm font-bold text-stone-700"
            @click="nextPage"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref } from "vue";

export default {
  setup() {
    const store = mangaStore();
    const route = useRoute();
    const page = ref(1);
    const perPage = ref(16);
    const id = ref(route.params.mangaInfo);
    const config = useRuntimeConfig()
      const API_BASE_URL = config.public.apiBase   

    const mangaInfo = computed(() => store.mangaDetails || {});
    const chapterPage = computed(() => mangaInfo.value.chapters || []);
    const genres = computed(() =>
      (mangaInfo.value.genres?.info?.[1] || "")
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean),
    );
    const totalPages = computed(() =>
      Math.max(1, Math.ceil(chapterPage.value.length / perPage.value)),
    );
    const visiblePages = computed(() => {
      const start = Math.max(1, page.value - 2);
      return Array.from({ length: 5 }, (_, index) => start + index).filter(
        (item) => item <= totalPages.value,
      );
    });
    const paginatedItems = computed(() => {
      const startIndex = (page.value - 1) * perPage.value;
      return chapterPage.value.slice(startIndex, startIndex + perPage.value);
    });

    const chapterRoute = (item, index) => ({
      name: "read-chapterInfo",
      params: { chapterInfo: item.chapterLink },
      query: {
        mangaId: id.value,
        chapterIndex: (page.value - 1) * perPage.value + index,
      },
    });

    const formatDate = (date) => {
      if (!date) {
        return "Unknown date";
      }

      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(date));
    };

    const previousPage = () => {
      if (page.value > 1) {
        page.value--;
      }
    };

    const nextPage = () => {
      if (page.value < totalPages.value) {
        page.value++;
      }
    };

    return {
      chapterPage,
      chapterRoute,
      formatDate,
      genres,
      id,
      mangaInfo,
      nextPage,
      page,
      paginatedItems,
      previousPage,
      store,
      totalPages,
      visiblePages,
      API_BASE_URL
    };
  },
  async created() {
    await this.store.getMangaInfo(this.id);
  },
};
</script>
