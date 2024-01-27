<template>
  <div class="flex flex-wrap justify-center smd:justify-normal">
    <div
      v-for="(item, index) in mangaRecommendList"
      :key="index"
      class="flex flex-wrap w-full py-5 px-5 smd:w-[40%] lg:w-[30%] lg:ml-3 lg:mr-[22px] smd:mr-[70px] mb-5 ml-4"
    >
    <nuxt-link class="w-full flex" :to="{name: 'mangaInfo', params:{mangaInfo: item.id} }">
      <img class="flex w-[35%] h-[90%]" :src="item.image" alt="First slide" />
      <div class="w-full ml-6 flex flex-wrap">
        <div class="w-full mt-6 text-blue text-[25px] font-semibold font-sans leading-[30px]">
          {{ item.title.substring(0, 40) + '...'  }}
        </div>
        <div 
        class="flex flex-wrap w-full text-black text-xl font-normal font-['Plus Jakarta Sans'] leading-[21px]">
          <h2 v-for="genres in item.genres" :key="genres" class="mr-2">
            {{ genres }}
            </h2>
            
        </div>
        <!-- <div class="mt-6 w-full h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ item.synopsis }}
        </div> -->
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
