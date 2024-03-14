<template>
 <div class="flex flex-wrap rounded-[10px] w-full bg-slate-200 mt-5 py-3 md:w-[45%] md:ml-[25px] lg:w-[30%] lg:ml-3">

    <nuxt-link class="w-full" :to="{name: 'mangaInfo', params:{mangaInfo: manga.id} }">
        <loading v-if="isLoading" class="absolute"/>
    <div
      class="w-full h-[100px] p-2 flex"
    >
      <img class="flex w-[35%] h-[100%] smd:w-[50%]" :src="manga.image" alt="First slide" ref="imageRef"/>
      <div class="w-full ml-2 smd:ml-4">
        <div class="w-full mb-3 text-blue text-[17px] font-semibold font-sans leading-[21px]">
          {{ manga.title.substring(0, 30) + '...' }}
        </div>
        <div 
        class="flex flex-wrap w-full  h-5 text-black text-[13px] lg:text-[13px] font-normal font-['Plus Jakarta Sans'] leading-[5px]">
          <h2 class="mr-2">
            Views: {{ manga.views }}
            </h2>
            
        </div>
        <div 
        class="flex flex-wrap w-full mb-3 h-5 text-black text-[13px] lg:text-[13px] font-normal font-['Plus Jakarta Sans'] leading-[15px]">
          <h2 v-for="genres in manga.genres.slice(0, 4)" :key="genres" class="mr-2">
            {{ genres }}
            </h2>
            
        </div>
        <!-- <div class="  w-full h-5 text-black text-xl lg:text-base font-normal font-['Plus Jakarta Sans'] leading-[21px]">

          <h1 class="w-[100px] lg:p-2 p-3 rounded-md text-white mt-[70px] mb-4 bg-slate-500">Chapters</h1>
         <div v-for="chapters in manga.chapters.slice(0, 2)" :key="chapters" class="w-full flex flex-wrap">
          <nuxt-link :to="{name: 'chapterInfo', params:{chapterInfo: chapters.link} }">
          <h2  class="mr-2 mb-2">
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
  props:['manga'],
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
  async created() {},
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
