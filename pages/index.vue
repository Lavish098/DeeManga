<template>
  <div>
    <div class="m-5">
      <h1 class="w-[90%] border-b-2 font-medium pb-4 text-slate-500 text-3xl" >Popular</h1>
    <div class="flex flex-wrap">
    <popularCard :popular="popular" v-for="popular in popularList" :key="popular.id" />
    </div>
    </div>

    <div class="m-5">
      <h1 class="w-[90%] border-b-2 font-medium pb-4 text-slate-500 text-3xl">Updates</h1>
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
//  const id = ref('')

 const popularList = computed(() => {
      return (store.popularDetails.data ?? []).slice(0, 9)
    })

  return{ store, page, popularList }
},
 async created(){
   await this.store.getMangaPopular(this.page)
    await this.store.getMangaUpdate()
    // this.store.getMangaInfo(this.id)
  },
 


}
</script>

<style scoped>

</style>
