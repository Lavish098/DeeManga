<template>
  <nuxt-link
    :to="{ name: 'manga-mangaInfo', params: { mangaInfo: manga.id } }"
    class="group block"
  >
    <article
      class="overflow-hidden rounded-md border border-stone-900/10 bg-[#fffdf8] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div class="relative aspect-[3/4] overflow-hidden bg-stone-200">
        <img
          :src="`${API_BASE_URL}/image-proxy?url=${encodeURIComponent(manga.image)}`"
          :alt="manga.title"
          loading="lazy"
           class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/85 to-transparent p-3"
        >
          <p class="line-clamp-2 text-sm font-black leading-5 text-white">
            {{ manga.title }}
          </p>
        </div>
      </div>
      <div class="space-y-3 p-3">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="genre in (manga.genres || []).slice(0, 2)"
            :key="genre"
            class="rounded bg-[#e45d35]/10 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-[#a33d22]"
          >
            {{ genre }}
          </span>
        </div>
        <div v-if="manga.chapters?.length" class="grid gap-1">
          <span
            v-for="chapter in manga.chapters.slice(0, 2)"
            :key="chapter.link"
            class="truncate text-xs font-bold text-stone-500"
          >
            {{ chapter.title }}
          </span>
        </div>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  props: ["manga"],
  setup() {
      const config = useRuntimeConfig()
      const API_BASE_URL = config.public.apiBase      
    return { API_BASE_URL };
  },
};
</script>
