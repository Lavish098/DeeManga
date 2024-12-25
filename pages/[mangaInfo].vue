<template>
  <div>
    <div class="flex flex-wrap m-5 md:flex-nowrap md:w-full">
      <div
        class="w-[290px] md:w-[500px] h-[388px] relative bg-white rounded-[10px]"
      >
        <img
          class="flex w-full h-full z-10"
          :src="mangaInfo.img"
          alt="First slide"
        />
      </div>
      <div class="w-full md:ml-8 flex flex-col gap-12">
        <div
          class="w-full h-16 mt-6 text-slate-400 text-[35px] font-bold font-['Plus Jakarta Sans'] leading-[30px]"
        >
          {{ mangaInfo.title }}
        </div>
        <table class="w-full">
          <tr>
            <td class="w-[20%] pb-2">
              <h3 class="mr-3 rounded-md bg-slate-300 px-2 py-2">Author(s):</h3>
            </td>
            <td class="pb-2">
              <div class="w-full px-2 py-2">
                {{ mangaInfo.authors?.info[0] }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="pb-2">
              <h1 class="mr-3 rounded-md bg-slate-300 px-2 py-2">Status:</h1>
            </td>
            <td>
              <h2 class="px-2 py-2">
                {{ mangaInfo.status?.info[1] }}
              </h2>
            </td>
          </tr>
          <tr>
            <td class="pb-2">
              <h3 class="mr-2 rounded-md bg-slate-300 px-2 py-2">Genre:</h3>
            </td>
            <td class="flex flex-wrap">
              <div class="mr-2 h-5 py-2">
                {{ mangaInfo.genres?.info[1] }}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <h1 class="rounded-md bg-slate-300 px-2 py-2 mr-3">Views:</h1>
            </td>
            <td>
              <h2 class="px-2 py-2">
                {{ mangaInfo.views?.info[1] }}
              </h2>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div>
      <div
        class="mt-5 w-full h-full text-slate-400 text-[25px] font-bold font-['Plus Jakarta Sans'] leading-[30px]"
      >
        <h1 class="uppercase ml-3 mr-3 text-[25px] border-[1px] px-2 py-5 mb-6">
          Description
        </h1>

        <p class="text-[15px] mx-2">
          {{ mangaInfo.synopsis }}
        </p>
      </div>
    </div>

    <div class="mt-12 w-full flex flex-col justify-center">
      <h1
        class="uppercase text-slate-500 w-full mx-4 text-[25px] border-[1px] px-2 py-5 mb-6"
      >
        CHAPTERS
      </h1>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4"
      >
        <div
          v-for="(item, index) in paginatedItems"
          :key="index"
          class="mt-6 mx-2 px-4 py-5 bg-slate-500 rounded-md text-slate-200 text-base font-bold font-['Plus Jakarta Sans']"
        >
          <nuxt-link
            :to="{
              name: 'chapterInfo',
              params: {
                chapterInfo: id + '/' + item.chapterLink.toLowerCase(),
              },
            }"
          >
            <h1 class="w-full">
              {{ item.chapterTitle }}
            </h1>
          </nuxt-link>
        </div>
      </div>
      <nav
        class="flex justify-center pb-32 mt-10 w-full rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <span
          @click="previousPage"
          class="relative inline-flex items-center rounded-l-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          &lt;</span
        >

        <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
        <button
          type="button"
          v-for="pageNumber in pages.slice(Math.max(0, page - 3), page + 2)"
          :key="pageNumber"
          @click="page = pageNumber"
          aria-current="page"
          :class="{
            'bg-gray-600 text-white': pageNumber === page,
            'text-gray-400': pageNumber !== page,
          }"
          class="relative z-10 border-2 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        >
          {{ pageNumber }}
        </button>
        <span
          @click="nextPage"
          class="relative inline-flex items-center rounded-r-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          &gt;</span
        >
      </nav>
    </div>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref, computed } from "vue";

export default {
  setup() {
    const store = mangaStore();
    const route = useRoute();
    const page = ref(1);
    const pages = ref([]);
    const perPage = ref(12);
    const id = ref(null);

    route.params.mangaInfo && (id.value = route.params.mangaInfo);

    const mangaInfo = computed(() => {
      return store.mangaDetails;
    });

    const chapterPage = computed(() => {
      return mangaInfo.value.chapters;
    });

    const paginatedItems = computed(() => {
      const startIndex = (page.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      console.log(startIndex);

      if (chapterPage.value && chapterPage.value.length > 0) {
        return chapterPage.value.slice(startIndex, endIndex);
      }
    });

    const previousPage = () => {
      if (page.value > 1) {
        page.value--;
      }
    };

    const nextPage = () => {
      if (page.value < Math.ceil(chapterPage / perPage.value)) {
        page.value++;
      }
    };
    const setPages = () => {
      const totalChapters = chapterPage.value.length;
      const numberOfPages = Math.ceil(totalChapters / perPage.value);

      for (let index = 1; index <= numberOfPages; index++) {
        pages.value.push(index);
      }
    };

    // Watch for changes in perPage and update the number of pages accordingly
    watch(perPage, setPages);

    return {
      store,
      mangaInfo,
      page,
      pages,
      paginatedItems,
      id,
      chapterPage,
      previousPage,
      nextPage,
      setPages,
    };
  },
  async created() {
    await this.store.getMangaInfo(this.id);
    this.setPages();
  },
};
</script>

<style scoped></style>
