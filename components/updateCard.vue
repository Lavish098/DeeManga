<template>
  <div class="flex flex-wrap">
    <div
      v-for="(item, index) in mangaRecommendList"
      :key="index"
      class="w-[304px] h-[388px] m-2 relative bg-white rounded-[10px]"
    >
      <div class="details bg-black bottom-0 h-full w-full absolute flex-col justify-start items-start gap-1 opacity-0 hover:opacity-85 transition-opacity">
        <div class="pb-16 w-80 h-6 text-white text-xl font-bold font-['Plus Jakarta Sans'] leading-[30px]">
          {{ item.title }}
        </div>
        <div class="mt-6 w-32 h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ item.authors }}
        </div>
        <div class="mt-6 w-full h-5 text-slate-400 text-sm font-bold font-['Plus Jakarta Sans'] leading-[21px]">
          {{ item.synopsis }}
        </div>
        <div
          class="w-[116px] left-[24px] top-[320px] absolute flex-col justify-start items-start gap-1 inline-flex"
        >
          <div class="w-[116px] h-11">
            <span style="text-white text-xl font-bold font-['Plus Jakarta Sans']">{{ item.chapter }}</span>
          </div>
        </div>
      </div>
      <img class="flex w-full h-full z-10" :src="item.img" alt="First slide" />
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
      return store.manga
    })
    return { store, mangaRecommendList }
  },
  async created() {},
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
