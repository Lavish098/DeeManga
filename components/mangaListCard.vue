<template>
  <div class="flex flex-wrap">
    <nuxt-link :to="{name: 'mangaInfo', params:{mangaInfo: manga.id} }">
    <div
      class="w-[304px] h-[388px] m-2 relative bg-white rounded-[10px]"
    >
      <div class="details bg-black bottom-0 h-full w-full absolute flex-col justify-start items-start gap-1 opacity-0 hover:opacity-85 transition-opacity">
        <div class="w-full h-24 text-white text-xl font-bold font-['Plus Jakarta Sans'] leading-[30px]">
          {{ manga.title }}
        </div>
        <!-- <div class="w-full h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ manga.authors }}
        </div>
        <div class="mt-6 w-full h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ manga.synopsis }}
        </div> -->
      </div>
      <div>
        <loading v-if="isLoading" class="p-10 absolute top-30 h-full"/>
      <img class="flex w-full h-full z-10" :src="manga.image" alt="First slide" ref="imageRef"/>
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
