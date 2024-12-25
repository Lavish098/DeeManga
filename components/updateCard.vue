<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4 my-10"
  >
    <div v-for="(item, index) in mangaRecommendList" :key="index" class="">
      <nuxt-link
        class=""
        :to="{ name: 'mangaInfo', params: { mangaInfo: item.id } }"
      >
        <div class="overflow-hidden">
          <img
            class="hover:scale-110 max-h-[300px] max-w-[300px] transition ease-in-out"
            :src="item.image"
            alt="First slide"
          />
        </div>
        <div class="">
          <div
            class="w-full mb-3 text-blue text-[17px] font-semibold font-sans leading-[21px]"
          >
            {{ item.title.substring(0, 40) + "..." }}
          </div>
          <!-- <div
            class="flex flex-wrap w-full mt-2 h-5 text-black text-[11px] lg:text-[11px] font-normal font-['Plus Jakarta Sans']"
          >
            <h2
              v-for="chapter in item.chapters.slice(0, 2)"
              :key="chapter"
              class="mr-2 rounded-md bg-slate-300 px-2 py-3"
            >
              <nuxt-link
                :to="{
                  name: 'chapterInfo',
                  params: { chapterInfo: chapter.link },
                }"
              >
                {{ chapter.title }}
              </nuxt-link>
            </h2>
          </div> -->
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref, computed } from "vue";

export default {
  setup() {
    const store = mangaStore();

    const mangaRecommendList = computed(() => {
      return store.updateDetails.data;
    });

    return { store, mangaRecommendList };
  },
  async created() {},
};
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
