<template>
<div class="relative flex justify-center slide mt-7">
    <div class="carousel-indicators absolute bottom-0 flex h-24 w-4/5 justify-center items-center">
      <ol class="z-50 flex w-4/12 justify-center">
        <li v-for="(item, index) in popularList" :key="index" class="md:w-4 md:h-4 bg-gray-300 rounded-full cursor-pointer mx-2"
        :class="`${active === index ? 'active' : 'bg-white'}`"></li>
      </ol>
    </div>
    <div class="carousel-inner relative rounded-xl overflow-hidden w-11/12 max-h-[700px]">
      <div v-for="(item, index) in popularList" :key="index" :id="`slide-${index}`" :class="`${active === index ? 'active' : 'left-full'}`" 
      class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out">
        <img class="block w-[30%] h-1/2 z-10" :src="item.image" alt="First slide" />
        <h2 class="absolute top-1/3 right-5 w-[372px] text-white text-[32px] font-semibold font-['Plus Jakarta Sans'] leading-[48px]
        ">{{ item.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mangaStore } from '~/store'
import {ref, computed } from 'vue'

export default {
setup(){
  const store = mangaStore()
  const items = ref([])
const active = ref([0])


const popularList = computed(() => {
      return (store.popularDetails.data ?? []).slice(0, 9)
    })

  return{ store, items, active, popularList}
},
 async created(){
    let index = 0;
    setInterval(() => {
      if (index > this.popularList.length - 1) {
        index = 0;
      }
      this.active = index;
      index++;
    }, 2000);
    console.log(this.popularList);
  },
 


}
</script>

<style scoped>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>
