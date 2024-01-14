<template>
  <div>
    <div>
      <h1 class="font-medium text-2xl" >Popular</h1>
    <div class="flex justify-center flex-wrap">
    <popularCard :popular="popular" v-for="popular in popularList" :key="popular.id" />
    </div>
    </div>

    <div>
      <h1 class="font-medium text-2xl">Updates</h1>
    <updateCard />
    </div>
  </div>
</template>

<script>
import { mangaStore } from '~/store'
import {ref, onMounted, onBeforeUnmount } from 'vue'

export default {
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
