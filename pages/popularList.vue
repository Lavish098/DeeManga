<template>
<div>
<div class="flex flex-wrap justify-center m-5">
    <popularCard :popular="popular" v-for="popular in popularList" :key="popular.id" />
</div>
 
  <div class="flex justify-center">
  <div v-if="popularList" class="flex items-center justify-between  bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 items-center justify-between">
      <div>
        <nav class="isolate inline-flex pb-48 -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <span  @click="previousPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            Previous</span>
          
          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
          <button type="button" v-for="pageNumber in pages.slice(Math.max(0, page - 3), page + 2)" :key="pageNumber" @click="pagesNumber(pageNumber)"
           aria-current="page" :class="{ 'bg-gray-600 text-white' : pageNumber === page, 'text-gray-400': pageNumber !== page }"
           class="relative z-10 border-2 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ pageNumber }}</button>
          <span @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            Next</span>
        </nav>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import { mangaStore } from '~/store'
import { ref, computed } from 'vue'

export default {
  setup() {
    const store = mangaStore()
    const page = ref(1)
    const pages = ref([])
    const perPage = ref(10)

  const popularList = computed(() => {
      return store.popularDetails.data
    })

    const mangaPage = computed(() => {
        return store.popularDetails.info
    })    


    const previousPage = () => {
       window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        if(page.value > 1){
            page.value--;
        }
       
    }
    
   const nextPage = () => {
    window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
  if (page.value < Math.ceil(mangaPage.value.totalPages/ perPage.value)) {
    page.value++;
  }
};

const pagesNumber = (pageNumber) => {
  page.value = pageNumber
  window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
}
const setPages = () => {
  // Calculate the total number of pages based on the total number of items and items per page
  const numberOfPages = Math.ceil(mangaPage.value.totalPages / perPage.value);
  for (let index = 1; index <= numberOfPages; index++) {
        pages.value.push(index);
  }

};

// Watch for changes in perPage and update the number of pages accordingly
watch(perPage, setPages);

    onMounted(() => {
    // Watch for changes in the 'page' value
    watchEffect(() => {
      // Reload data when 'page' changes
      store.getMangaPopular(page.value);
    });
  });

    return { store, popularList, page, pagesNumber, pages, mangaPage, nextPage, previousPage, setPages }
  },
  async created(){
    await this.store.getMangaPopular(this.page)
    this.setPages()
  },
}
</script>

<style>

</style>
