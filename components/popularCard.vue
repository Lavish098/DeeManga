<template>
  <div class="flex flex-wrap rounded-[10px] w-full bg-slate-200 mt-5 py-3 smd:w-[40%] lg:w-[30%] lg:ml-3 lg:mr-[22px] smd:mr-[70px] smd:mb-10">

    <nuxt-link :to="{name: 'mangaInfo', params:{mangaInfo: popular.id} }">
    <div
      class="w-full h-[100px] p-2 flex"
    >
        <loading v-if="isLoading" class="absolute top-30"/>
      <img class="flex w-[35%] h-[100%] smd:w-[50%]" :src="popular.image" alt="First slide" ref="imageRef"/>
      <div class="w-full ml-2 smd:ml-4">
        <h2 class="w-full mb-3 text-blue text-[17px] font-semibold font-sans leading-[21px]">
          {{ popular.title.substring(0, 49)  }}
        </h2>
        <div 
        class="flex flex-wrap w-full mb-3 h-5 text-black text-[13px] lg:text-base font-normal font-['Plus Jakarta Sans'] leading-[15px]">
          <h2 v-for="genres in popular.genres" :key="genres" class="mr-2">
            {{ genres }}
            </h2>
            
        </div>
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
