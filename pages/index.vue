<template>
  <div>
    <div>
      <h1 class="font-medium text-2xl" >Popular</h1>
    <div class="flex justify-center flex-wrap">
    <popularCard :popular="popular" v-for="popular in popularList.slice(0, 6)" :key="popular.id" />
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
//  const id = ref('')

 const popularList = computed(() => {
  if (!store.manga || !store.manga.data || !Array.isArray(store.manga.data)) {
    // Handle the case when manga or manga.data is not defined or not an array
    return [];
  }
  const filteredList = store.manga.data
    .filter(item => {
     const views = item.views.toLowerCase();
      return views.includes('m') && parseFloat(views) > 1;
    })
    .sort((a, b) => {
      // Sort in descending order based on views
      const viewsA = parseFloat(a.views);
      const viewsB = parseFloat(b.views);

      if (!isNaN(viewsA) && !isNaN(viewsB)) {
        return viewsB - viewsA;
      }

      return 0;
    });

console.log(filteredList);
  return filteredList;
});

  return{ store, page, popularList }
},
 async created(){
    await this.store.getManga(this.page)
    this.store.getMangaInfo(this.id)
  },
 


}
</script>

<style scoped>

</style>
