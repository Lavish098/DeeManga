<template>
  <div class="flex flex-wrap w-full py-5 px-5 smd:w-[40%] lg:w-[30%] lg:ml-3 lg:mr-[22px] smd:mr-[70px] mb-16 smd:mb-10 ml-4">

    <nuxt-link class="w-full" :to="{name: 'mangaInfo', params:{mangaInfo: popular.id} }">
    <div
      class="w-full h-full bg-white rounded-[10px] flex"
    >
        <loading v-if="isLoading" class="absolute top-30"/>
      <img class="flex w-[35%] h-[90%] smd:w-[50%]" :src="popular.image" alt="First slide" ref="imageRef"/>
      <div class="w-full ml-6 smd:ml-4">
        <div class="w-full mb-3 text-blue text-[25px] font-semibold font-sans leading-[30px]">
          {{ popular.title.substring(0, 49) + '...'  }}
        </div>
        <div 
        class="flex flex-wrap w-full h-5 text-black text-xl lg:text-base font-normal font-['Plus Jakarta Sans'] leading-[21px]">
          <h2 v-for="genres in popular.genres" :key="genres" class="mr-2">
            {{ genres }}
            </h2>
            
        </div>
        <!-- <div class="  w-full h-5 text-black text-xl font-normal font-['Plus Jakarta Sans'] leading-[21px]">

          <h1 class="w-[100px] p-3 rounded-md text-white mt-[70px] mb-3 bg-slate-500">Chapters</h1>
         <div v-for="chapters in popular.chapters.slice(0, 2)" :key="chapters" class="w-full flex flex-wrap">
          <nuxt-link :to="{name: 'chapterInfo', params:{chapterInfo: chapters.link} }">
          <h2  class="mr-2 mb-4">
            {{ chapters.title }}
            </h2>
          </nuxt-link>
        </div>
            
        </div> -->
      </div>
    </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mangaStore } from '~/store'
import { ref, onMounted } from 'vue'

export default {
  props:['popular'],
    setup(props) {
      const store = mangaStore()
    const isLoading = ref(true);
    const imageRef = ref(null);

    const imageLoaded = () => {
      isLoading.value = false;
    };

    onMounted(() => {
      imageRef.value.addEventListener('load', imageLoaded);
    });

    return { store, isLoading, imageRef };
  },
  async created() {
  
  },
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
