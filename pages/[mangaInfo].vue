<template>
  <div class="flex flex-wrap justify-center m-5">
    <div
      class="w-[304px] h-[388px] m-2 relative bg-white rounded-[10px]"
    >
          <img class="flex w-full h-full z-10" :src="mangaInfo.img" alt="First slide" />
  
    </div>
      <div class="details ml-5 w-2/4 bottom-0  flex-col justify-start items-start">
        <div class="w-full h-24 mt-6 text-slate-400 text-[35px] font-bold font-['Plus Jakarta Sans'] leading-[30px]">
          {{ mangaInfo.title }}
        </div>
        <div v-for="author in mangaInfo.authors" :key="author" class="w-full h-5 text-slate-400 text-lg font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          Author(s): {{ author.authorName }}
        </div>
        <div class="mt-6 w-full h-5 text-slate-400 text-lg font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          Status: {{ mangaInfo.status}}
        </div>
        <div class="flex text-slate-400 text-lg mt-5 font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          <h3 class="mr-3">Genre: </h3>
        <div v-for="genres in mangaInfo.genres" :key="genres" class="mr-2 h-5 ">
         {{ genres.genre }}
        </div>
        </div>
        <div class="w-full h-5 text-slate-400 text-lg mt-6 font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          Updated: {{ mangaInfo.lastUpdated}}
        </div>
        <div class="mt-6 w-full h-5 text-slate-400 text-lg font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          Views: {{ mangaInfo.views}}
        </div>
      </div>

      <div>
        <div class="mt-6 w-full h-full text-slate-400 text-[25px] font-bold font-['Plus Jakarta Sans'] leading-[30px]">
          Description: {{ mangaInfo.synopsis }}
        </div>
      </div>
      <div class="mt-12 flex flex-wrap justify-center">
        <h1 class="w-full ml-9 text-[40px] font-bold text-slate-400">
          CHAPTERS</h1>
        <div v-for="(item, index) in paginatedItems" :key="index" 
        class="flex mt-6 mx-12 border-b-2 pb-10 w-full h-5 text-slate-400 text-base font-bold font-['Plus Jakarta Sans'] leading-[21px]">
             <nuxt-link :to="{name: 'chapterInfo', params:{chapterInfo: item.chapterLink} }">

         <h1 class="w-full">
          {{ item.chapterTitle }}
          </h1> 
          <h1 class="w-[10%]">
          {{ item.chapterViews }} Views
          </h1>
             </nuxt-link>
        </div>
      <div>
        <nav class="isolate inline-flex pb-48 mt-10 -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <span  @click="previousPage" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            Previous</span>
          
          <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
          <button type="button" v-for="pageNumber in pages.slice(Math.max(0, page - 3), page + 2)" :key="pageNumber" @click="page = pageNumber"
           aria-current="page" :class="{ 'bg-indigo-600 text-white' : pageNumber === page, 'text-gray-400': pageNumber !== page }"
           class="relative z-10 border-2 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ pageNumber }}</button>
          <span @click="nextPage" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
            Next</span>
        </nav>
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
    const route = useRoute()
    const page = ref(1)
    const pages = ref([])
    const perPage = ref(10)
    const id = route.params.mangaInfo

    const mangaInfo = computed(() => {
      console.log(store.mangaDetails);
    const filteredList = store.mangaDetails

    return filteredList;
  });

   const chapterPage = computed(() => {
        return mangaInfo.value.chapters
    })    
    
    const paginatedItems = computed(() => {
      const startIndex = (page.value - 1) * perPage.value;
      const endIndex = startIndex + perPage.value;
      console.log(startIndex);
      if(chapterPage.value && chapterPage.value.length > 0) {
      return chapterPage.value.slice(startIndex, endIndex)
   }
      
    })
    const previousPage = () => {
        if(page.value > 1){
            page.value--;
        }
        
    }
    
   const nextPage = () => {
  if (page.value < Math.ceil(chapterPage/ perPage.value)) {
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

    onMounted(() => {
    // Watch for changes in the 'page' value
    watchEffect(() => {
      // Reload data when 'page' changes
    });
  });

    return { store, mangaInfo, page, pages, paginatedItems, id, chapterPage, previousPage, nextPage, setPages }
  },
  async created(){
    await this.store.getMangaInfo(this.id)
    this.setPages()
  },
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
