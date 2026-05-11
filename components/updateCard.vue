<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
    <mangaListCard
      v-for="item in mangaRecommendList"
      :key="item.id"
      :manga="item"
    />
  </div>
</template>

<script>
import { mangaStore } from "~/store";

export default {
  setup() {
    const store = mangaStore();

    const mangaRecommendList = computed(() => {
      return store.updateDetails.data || [];
    });

    return { mangaRecommendList };
  },
};
</script>
