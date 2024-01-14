<template>
  <div class="flex flex-wrap justify-center m-5">
    <div v-for="image in chapterInfo" :key="image"
      class="w-full h-full m-2 relative bg-white rounded-[10px]"
    >
          <img class="flex w-full h-full z-10" :src="image.img" alt="First slide" />
  
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
    const chapterUrl = route.params.chapterInfo

    console.log(chapterUrl);

    const chapterInfo = computed(() => {
      console.log(store.chapterResult);
    const filteredList = store.chapterResult

    return filteredList;
  });

    return { store, chapterUrl, chapterInfo}
  },
  async created(){
    await this.store.getMangaChapter(this.chapterUrl)
    console.log(this.store.chapterDetails);
  },
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
