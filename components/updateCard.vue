<template>
  <div class="flex flex-wrap justify-center">
    <div
      v-for="(item, index) in mangaRecommendList"
      :key="index"
      class="w-[304px] h-[388px] m-2 relative bg-white rounded-[10px]"
    >
    <nuxt-link :to="{name: 'mangaInfo', params:{mangaInfo: item.id} }">
      <div class="details bg-black bottom-0 h-full w-full absolute flex-col justify-start items-start gap-1 opacity-0 hover:opacity-85 transition-opacity">
        <div class="w-full h-24 text-white text-xl font-bold font-['Plus Jakarta Sans'] leading-[30px]">
          {{ item.title }}
        </div>
        <div class="w-full h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ item.authors }}
        </div>
        <div class="mt-6 w-full h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ item.synopsis }}
        </div>
      </div>
      <img class="flex w-full h-full z-10" :src="item.img" alt="First slide" />
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
      return store.manga.data
    })
    
    return { store, mangaRecommendList }
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
