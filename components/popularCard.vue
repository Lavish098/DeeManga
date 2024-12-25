<template>
  <div class="">
    <nuxt-link :to="{ name: 'mangaInfo', params: { mangaInfo: popular.id } }">
      <loading v-if="isLoading" class="absolute" />
      <div class="mx-2 flex flex-col">
        <div class="overflow-hidden">
          <img
            class="hover:scale-110 transition ease-in-out"
            :src="popular.image"
            alt="First slide"
            ref="imageRef"
          />
        </div>
        <div class="w-full ml-2 smd:ml-4">
          <h2
            class="w-full mb-3 text-blue text-[17px] font-semibold font-sans leading-[21px]"
          >
            {{ popular.title.substring(0, 49) }}
          </h2>
          <!-- <div
          class="flex flex-wrap w-full mb-3 h-5 text-black text-[13px]
          lg:text-[13px] font-normal font-['Plus Jakarta Sans'] leading-[15px]">
          <h2
            v-for="genres in popular.genres"
            :key="genres"
            class="mr-2 lg:mr-[4px]"
          >
            {{ genres }}
          </h2>

          </div> -->
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mangaStore } from "~/store";
import { ref, onMounted } from "vue";

export default {
  props: ["popular"],
  setup(props) {
    const store = mangaStore();
    const isLoading = ref(true);
    const imageRef = ref(null);

    const imageLoaded = () => {
      isLoading.value = false;
    };

    onMounted(() => {
      imageRef.value.addEventListener("load", imageLoaded);
    });

    return { store, isLoading, imageRef };
  },
  async created() {},
};
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
