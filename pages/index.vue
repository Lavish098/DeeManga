<template>
  <div>
    <div class="">
      <h1 class="w-[90%] border-b-4 font-medium text-slate-500 text-3xl ml-12 my-4 p-8" >Popular</h1>
    <div class="flex justify-center md:justify-normal flex-wrap">
    <popularCard :popular="popular" v-for="popular in popularList" :key="popular.id" />
    </div>
    </div>

    <div class="">
      <h1 class="w-[90%] border-b-4 font-medium text-slate-500 text-3xl ml-12 my-4 p-8">Updates</h1>
    <updateCard />
    </div>
  </div>
</template>

<script>
import { mangaStore } from '~/store'
import {ref, onMounted, onBeforeUnmount } from 'vue'
import Ads from '~/components/Ads.vue'

export default {
  components: { Ads },
setup(){
  const store = mangaStore()
 const page = ref([1])
 const chapterUrl = ref('https://chapmanganato.to/manga-wt999902/chapter-5')
//  const id = ref('')

 const popularList = computed(() => {
      return (store.popularDetails.data ?? []).slice(0, 9)
    })

  return{ store, page, popularList, chapterUrl }
},
 async created(){
   await this.store.getMangaPopular()
    await this.store.getMangaUpdate()
    // this.store.getMangaInfo(this.id)
  },
 


}
</script>

<style scoped>

</style>
