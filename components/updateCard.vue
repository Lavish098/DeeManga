<template>
  <div class="flex flex-wrap justify-center smd:justify-normal">
    <div
      v-for="(item, index) in mangaRecommendList"
      :key="index"
      class="flex flex-wrap rounded-[10px] w-full bg-slate-200 mt-5 py-3 md:w-[45%] md:ml-[25px] lg:w-[30%] lg:ml-3 "
    >
    <nuxt-link class="w-full h-[100px] p-2 flex" :to="{name: 'mangaInfo', params:{mangaInfo: item.id} }">
      <img class="flex w-[35%] h-[100%]" :src="item.image" alt="First slide"/>
      <div class="w-full ml-2 flex flex-wrap">
        <div class="w-full text-[13px] font-semibold font-sans leading-[17px]">
          {{ item.title.substring(0, 40) + '...'  }}
        </div>
        <div 
        class="flex flex-wrap w-full mt-2 h-5 text-black text-[11px] lg:text-[11px] font-normal font-['Plus Jakarta Sans']">
          <h2 v-for="chapter in item.chapters.slice(0, 2)" :key="chapter" 
          class="mr-2 rounded-md bg-slate-300 px-2 py-3">
         <nuxt-link :to="{name: 'chapterInfo', params:{chapterInfo: chapter.link} }">
            {{ chapter.title }}
         </nuxt-link>
            </h2>
        </div>
      </div>
    </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mangaStore } from '~/store'
import { ref, computed } from 'vue'

export default {
  setup() {
    const store = mangaStore()
   
    const mangaRecommendList = computed(() => {
      return store.updateDetails.data
    })
    
    return { store, mangaRecommendList}
  },
  async created(){
  },
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
