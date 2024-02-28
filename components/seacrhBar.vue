<template>
  <div>
     <div class="block w-full md:w-[170%]  ml-0 mr-5 px-2 search">
        <div class="inline-block w-full">
            <div class="inline-flex items-center w-full">
                <button class="flex items-center flex-grow-0 flex-shrink py-3 px-4 w-full rounded shadow font-thin focus:outline-none 
                focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-300" type="button">
                    <input v-model="search" type="text"  class="block flex-grow flex-shrink overflow-hidden border-none outline-none"
                    placeholder="Start your search">
                    <div @click="searchQuery" class="flex items-center justify-center relative  h-9 w-9 rounded-full">
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style="
                                display: block;
                                fill: none;
                                height: 19px;
                                width: 19px;
                                stroke: currentcolor;
                                stroke-width: 5.33333;
                                overflow: visible;
                            "
                        >
                            <g fill="none">
                                <path
                                    d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                                ></path>
                            </g>
                        </svg>
                    </div>
                </button>
            </div>
    </div>
        </div>

    <div class="absolute overflow-hidden overflow-y-auto left-[10px] md:w-[500px] md:left-[250px] shadow-xl z-10 mt-2 bg-white w-full origin-top-right " v-if="search">
      <h2 v-for="result in searchQuery.slice(0, 6)" :key="result.id" @click="searchToggle">
    <nuxt-link :to="{name: 'mangaInfo', params:{mangaInfo: result.id} }">
          <div class="flex text-gray-700 w-full px-4 py-2 text-sm">
            <img :src="result.image" alt="" class="w-[80px] h[50px]">
            <h1 class="ml-4 text-[25px] mt-3 leading-8">
              {{ result.title.substring(0, 40) + '...' }}
              </h1>
          </div>
        </nuxt-link>
      </h2>
    <div class="item-error" v-if="searchQuery.length === 0">
      <p class="text-red-600">No results found</p>
    </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mangaStore } from '~/store'
export default {
setup() {
      const store = mangaStore()
    const search = ref('')

   
    const searchQuery = computed (() => {
    return store.searchDetails
});
 const searchToggle =() => {
      search.value = ""
    }
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
  async created(){
    await this.store.getMangaSearch(this.search)
  }
    
}
</script>

<style>

</style>