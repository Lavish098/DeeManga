<template>
  <div class="space-y-8">
    <section class="flex flex-col gap-3 border-b border-stone-900/10 pb-6 dark:border-white/10 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.28em] text-[#e45d35]">Trending</p>
        <h1 class="mt-2 text-4xl font-black text-stone-950 dark:text-[#fff9ef]">Popular manga</h1>
      </div>
      <p class="text-sm font-semibold text-stone-500 dark:text-stone-400">Page {{ page }}</p>
    </section>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <template v-if="isPopularLoading">
        <mangaCardSkeleton
          v-for="item in skeletonCards"
          :key="`popular-skeleton-${item}`"
        />
      </template>
      <template v-else>
        <popularCard
          v-for="popular in popularList"
          :key="popular.id"
          :popular="popular"
        />
      </template>
    </div>

    <nav v-if="popularList?.length && !isPopularLoading" class="flex items-center justify-center gap-2 pb-16">
      <button type="button" class="rounded-md border border-stone-900/15 bg-white/70 px-4 py-2 text-sm font-bold text-stone-700 dark:border-white/15 dark:bg-white/10 dark:text-stone-200" @click="previousPage">
        Previous
      </button>
      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        type="button"
        class="h-10 w-10 rounded-md text-sm font-black"
        :class="pageNumber === page ? 'bg-stone-950 text-[#fff9ef] dark:bg-[#fff9ef] dark:text-stone-950' : 'bg-white/70 text-stone-600 dark:bg-white/10 dark:text-stone-300'"
        @click="pagesNumber(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button type="button" class="rounded-md border border-stone-900/15 bg-white/70 px-4 py-2 text-sm font-bold text-stone-700 dark:border-white/15 dark:bg-white/10 dark:text-stone-200" @click="nextPage">
        Next
      </button>
    </nav>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref } from "vue";

export default {
  setup() {
    const store = mangaStore();
    const page = ref(1);
    const skeletonCards = Array.from({ length: 12 }, (_, index) => index + 1);

    const popularList = computed(() => store.popularDetails.data || []);
    const mangaPage = computed(() => store.popularDetails.info || { totalPages: 1 });
    const isPopularLoading = computed(() => store.isPopularLoading);
    const visiblePages = computed(() => {
      const start = Math.max(1, page.value - 2);
      return Array.from({ length: 5 }, (_, index) => start + index).filter(
        (item) => item <= mangaPage.value.totalPages
      );
    });

    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const previousPage = () => {
      if (page.value > 1) {
        page.value--;
      }
      scrollTop();
    };

    const nextPage = () => {
      if (page.value < mangaPage.value.totalPages) {
        page.value++;
      }
      scrollTop();
    };

    const pagesNumber = (pageNumber) => {
      page.value = pageNumber;
      scrollTop();
    };

    watchEffect(() => {
      store.getMangaPopular(page.value);
    });

    return {
      isPopularLoading,
      nextPage,
      page,
      pagesNumber,
      popularList,
      previousPage,
      skeletonCards,
      visiblePages,
    };
  },
};
</script>
