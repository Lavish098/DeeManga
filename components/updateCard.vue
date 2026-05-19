<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
    <template v-if="isUpdateLoading">
      <mangaCardSkeleton
        v-for="item in skeletonCards"
        :key="`update-skeleton-${item}`"
      />
    </template>
    <template v-else>
      <mangaListCard
        v-for="item in mangaRecommendList"
        :key="item.id"
        :manga="item"
      />
    </template>
  </div>
</template>

<script>
import { mangaStore } from "~/store";

export default {
  setup() {
    const store = mangaStore();
    const skeletonCards = Array.from({ length: 12 }, (_, index) => index + 1);

    const mangaRecommendList = computed(() => {
      return store.updateDetails.data || [];
    });
    const isUpdateLoading = computed(() => store.isUpdateLoading);

    return { isUpdateLoading, mangaRecommendList, skeletonCards };
  },
};
</script>
