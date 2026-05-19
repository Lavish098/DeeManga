<template>
  <div class="mx-auto max-w-5xl">
    <div class="sticky top-[82px] z-30 mb-6 rounded-md border border-stone-900/10 bg-[#fff9ef]/95 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-stone-950/95">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button type="button" class="rounded-md border border-stone-900/15 bg-white/80 px-4 py-2 text-sm font-black text-stone-800 disabled:opacity-40 dark:border-white/15 dark:bg-white/10 dark:text-stone-200" :disabled="previousReadableIndex === null" @click="previousChapter">
          Previous
        </button>

        <div class="min-w-0 flex-1 text-center">
          <p class="truncate text-sm font-black text-stone-950 dark:text-[#fff9ef]">{{ chapterNumber }}</p>
          <p class="mt-1 text-xs font-semibold text-stone-500 dark:text-stone-400">{{ chapterInfo.length }} pages</p>
        </div>

        <button type="button" class="rounded-md bg-stone-950 px-4 py-2 text-sm font-black text-[#fff9ef] disabled:opacity-40 dark:bg-[#fff9ef] dark:text-stone-950" :disabled="nextReadableIndex === null" @click="nextChapter">
          Next
        </button>
      </div>
    </div>

    <div v-if="chapterInfo.length" class="space-y-4 pb-12">
      <div v-for="(image, index) in chapterInfo" :key="image.img" class="overflow-hidden rounded-md bg-stone-950 shadow-xl">
        <img class="mx-auto block w-full max-w-4xl" :src="image.img" :alt="`Page ${index + 1}`" />
      </div>
    </div>

    <div v-else class="rounded-md border border-stone-900/10 bg-white/80 p-8 text-center shadow-sm dark:border-white/10 dark:bg-stone-950/90">
      <h1 class="text-2xl font-black text-stone-950 dark:text-[#fff9ef]">This chapter opens outside DeeManga</h1>
      <p class="mx-auto mt-3 max-w-lg text-sm font-semibold leading-6 text-stone-500 dark:text-stone-400">
        Some MangaDex chapters are hosted by official sources, so they do not provide page images for the in-app reader.
      </p>
      <a v-if="currentChapter?.externalUrl" :href="currentChapter.externalUrl" target="_blank" rel="noreferrer" class="mt-5 inline-flex rounded-md bg-[#e45d35] px-5 py-3 text-sm font-black text-white">
        Open source chapter
      </a>
    </div>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = mangaStore();
    const route = useRoute();
    const router = useRouter();
    const chapterUrl = ref(route.params.chapterInfo);
    const mangaId = ref(route.query.mangaId);

    const chapterInfo = computed(() => store.chapterResult || []);
    const chapterList = computed(() => store.mangaDetails?.chapters || []);
    const chapterIndex = computed(() => Number(route.query.chapterIndex ?? -1));
    const currentChapter = computed(() => chapterList.value[chapterIndex.value]);
    const chapterNumber = computed(() => currentChapter.value?.chapterTitle || chapterUrl.value);

    const findReadableIndex = (startIndex, direction) => {
      let index = startIndex + direction;

      while (index >= 0 && index < chapterList.value.length) {
        if (chapterList.value[index]?.isReadable) {
          return index;
        }
        index += direction;
      }

      return null;
    };

    const previousReadableIndex = computed(() => findReadableIndex(chapterIndex.value, 1));
    const nextReadableIndex = computed(() => findReadableIndex(chapterIndex.value, -1));

    const goToChapter = (nextIndex) => {
      const targetChapter = chapterList.value[nextIndex];

      if (!targetChapter) {
        return;
      }

      router.push({
        name: "read-chapterInfo",
        params: { chapterInfo: targetChapter.chapterLink },
        query: {
          mangaId: mangaId.value,
          chapterIndex: nextIndex,
        },
      });
    };

    const previousChapter = () => {
      if (previousReadableIndex.value !== null) {
        goToChapter(previousReadableIndex.value);
      }
    };

    const nextChapter = () => {
      if (nextReadableIndex.value !== null) {
        goToChapter(nextReadableIndex.value);
      }
    };

    watch(
      () => route.params.chapterInfo,
      async (value) => {
        if (!value) {
          return;
        }

        chapterUrl.value = value;
        await store.getMangaChapter(value);
      },
      { immediate: true }
    );

    watch(
      () => route.query.mangaId,
      async (value) => {
        if (!value) {
          return;
        }

        mangaId.value = value;
        if (store.currentMangaId === value && store.mangaDetails?.title) {
          return;
        }

        await store.getMangaInfo(value);
      },
      { immediate: true }
    );

    return { chapterInfo, chapterNumber, currentChapter, nextChapter, nextReadableIndex, previousChapter, previousReadableIndex };
  },
};
</script>
