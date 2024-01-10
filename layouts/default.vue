<template>
<div>
<div class="w-full py-5 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
  <div x-data="{ open: false }" class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
    <div class="p-4 flex flex-row items-center justify-between">
      <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
        DeeManga</a>
    </div>

     <div class="hidden sm:block flex-shrink flex-grow-0 ml-80 justify-center px-2 search">
        <div class="inline-block">
            <div class="inline-flex items-center max-w-full">
                <button class="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1" type="button">
                    <input v-model="search" type="text"  class="block flex-grow flex-shrink overflow-hidden border-none"
                    placeholder="Start your search">
                    <div @click="searchQuery" class="flex items-center justify-center relative  h-8 w-8 rounded-full">
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style="
                                display: block;
                                fill: none;
                                height: 12px;
                                width: 12px;
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

    <div class="searchQuery absolute z-10 left-[200px] bg-red-600 w-1/2 top-10 mb-28 mt-2 p-4 rounded-md" v-if="search">
      <h2 v-for="result in searchQuery" :key="result.id" @click="searchToggle">
        <nuxt-link>
          <!-- :to="{name: 'productDescription', params:{productid: result.id} }" -->
          <div class="text-white cursor-pointer hover:text-gray-300">
            {{ result.title }}
          </div>
        </nuxt-link>
      </h2>
    </div>
    <div class="item-error" v-if="searchQuery.length === 0">
      <p class="text-red-600">No results found</p>
    </div>

    <nav class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
      <nuxt-link :to="{name:'index'}" :class="{ 'bg-indigo-600 text-white': isActive }"
    @click="handleClick"
       class="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        Updates</nuxt-link>
      <nuxt-link :to="{name:'popularList'}" exact class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <h1>Popular</h1></nuxt-link>
      <nuxt-link :to="{name:'mangaList'}" exact class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <h1>Manga List</h1></nuxt-link>
      <a class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
        About</a>
      
    </nav>
  </div>
</div>
<slot />
</div>
</template>

<script>
import { ref } from 'vue'
import { mangaStore } from '~/store'

export default {
    setup() {
      const store = mangaStore()
    const isActive = ref(false);
    const search = ref('')

    const handleClick = () => {
      isActive.value = true;
      // Add your logic here if needed
    };
    
    const searchQuery = computed (() => {
    return store.searchDetails
});
onMounted(() => {
    // Watch for changes in the 'page' value
    watchEffect(() => {
      // Reload data when 'page' changes
      store.getMangaSearch(search.value);
    });
  });

    return {
      store,
      isActive,
      handleClick,
      searchQuery,
      search,
    };
  },
  async created(){
    await this.store.getMangaSearch(this.search)
  }

}
</script>

<style scoped>

</style>