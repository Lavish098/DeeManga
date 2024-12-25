<template>
  <div>
    <div class="block w-full md:w-[170%] ml-0 mr-5 px-2 search">
      <div class="inline-flex items-center w-full">
        <input
          v-model="search"
          type="text"
          class="py-3 px-4 w-full rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
          placeholder="Start your search"
        />
        <div
          @click="searchQuery"
          class="flex items-center justify-center relative h-9 w-2 rounded-full"
        ></div>
      </div>
    </div>

    <div
      class="absolute border-[1px] border-gray-500 rounded-[10px] overflow-y-auto left-[5px] md:w-[450px] md:left-[220px] shadow-xl z-10 mt-2 bg-white w-full origin-top-right"
      v-if="search"
      style="max-height: 400px"
    >
      <h2 v-for="result in searchQuery" :key="result.id" @click="searchToggle">
        <nuxt-link
          :to="{ name: 'mangaInfo', params: { mangaInfo: result.id } }"
        >
          <div
            class="flex w-[100%] max-w-[285px] my-4 mx-4 375px:max-w-[340px] 425px:max-w-[390px] px-2 py-2 rounded-[5px] text-sm"
          >
            <img :src="result.image" alt="" class="w-[60px] h-[70px]" />
            <h1 class="ml-2 text-[15px] font-normal mt-1 leading-5">
              {{ result.title.substring(0, 40) + "..." }}
            </h1>
          </div>
        </nuxt-link>
      </h2>
      <div class="p-3" v-if="searchQuery.length === 0">
        <p class="text-gray-600 font-medium">No results found</p>
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

    const searchQuery = computed(() => {
      return store.searchDetails;
    });
    const searchToggle = () => {
      search.value = "";
    };
    onMounted(() => {
      // Watch for changes in the 'page' value
      watchEffect(() => {
        // Reload data when 'page' changes
        store.getMangaSearch(search.value);
      });
    });

    return {
      store,
      searchToggle,
      searchQuery,
      search,
    };
  },
  async created() {
    await this.store.getMangaSearch(this.search);
  },
};
</script>

<style></style>
