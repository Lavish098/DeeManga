<template>
  <div class="flex flex-wrap justify-center items-center m-5">
    <div class="flex justify-center items-center p-[10px]">
            <button @click="previousChapter" class=" bg-slate-600 py-[10px] px-[20px] rounded-md mr-5"> 
              <h1 class="inline text-[20px] text-white font-bold w-7 sm:hidden">
                &lt;
              </h1>
              <h1 class="hidden text-[20px] text-white font-bold w-7 sm:inline">
                Previous
                </h1> 
              </button>

      <h2 class="text-[20px]">{{ chapterNumber }}</h2>

      <button @click="nextChapter" class="bg-slate-600 py-[10px] px-[20px] rounded-md ml-5"> 
        <h1 class="inline text-[20px] text-white font-bold w-7 sm:hidden">
                &gt;
              </h1>
              <h1 class="hidden text-[20px] text-white font-bold w-7 sm:inline">
                Next
                </h1> </button>
    </div>
  <div v-for="image in chapterInfo" :key="image"
    class="w-full h-full m-2 relative bg-white rounded-[10px] flex justify-center items-center"
  >
    <img class="max-w-[300px] sm:max-w-[600px] smd:max-w-[800px] z-10" :src="image.img" alt="First slide" />
  </div>
</div>
</template>

<script>
import { mangaStore } from '~/store'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';


export default {
  setup() {
    const store = mangaStore()
    const route = useRoute()
        const router = useRouter();

    const chapterUrl = ref(null) 
    
       route.params.chapterInfo && (chapterUrl.value = route.params.chapterInfo);

    const chapterInfo = computed(() => {
      console.log(store.chapterResult);
    const filteredList = store.chapterResult

    return filteredList;
  });

  const chapterNumber = computed(() => {
     if (!chapterUrl.value) {
        return null;
      }
      const parts = chapterUrl.value.split('/');
      const chapterPart = parts[parts.length - 2];
      return chapterPart;
    });
    
const previousChapter = () => {
  const currentChapterMatch = chapterUrl.value.match(/chapter-(\d+)/); // Match the current chapter number
  if (currentChapterMatch) {
    const currentChapter = parseInt(currentChapterMatch[1]); // Extract and parse the current chapter number
    const nextChapterNumber = currentChapter - 1; // Increment the chapter number
    const newChapterUrl = chapterUrl.value.replace(/chapter-\d+/, `chapter-${nextChapterNumber}`); // Replace the current chapter number with the incremented one
    // Now you can navigate to the new URL using Vue Router or perform any other actions as needed
    router.push({ params: { chapterInfo: newChapterUrl } });
  } else {
    console.error('Could not parse chapter number from URL:', chapterUrl.value);
    // Handle the error or provide a default behavior if the chapter number cannot be parsed
  }
}

const nextChapter = () => {
  const currentChapterMatch = chapterUrl.value.match(/chapter-(\d+)/); // Match the current chapter number
  if (currentChapterMatch) {
    const currentChapter = parseInt(currentChapterMatch[1]); // Extract and parse the current chapter number
    const nextChapterNumber = currentChapter + 1; // Increment the chapter number
    const newChapterUrl = chapterUrl.value.replace(/chapter-\d+/, `chapter-${nextChapterNumber}`); // Replace the current chapter number with the incremented one
    // Now you can navigate to the new URL using Vue Router or perform any other actions as needed
    router.push({ params: { chapterInfo: newChapterUrl } });
  } else {
    console.error('Could not parse chapter number from URL:', chapterUrl.value);
    // Handle the error or provide a default behavior if the chapter number cannot be parsed
  }
}

    return { store, chapterUrl, chapterInfo, chapterNumber, nextChapter, previousChapter}
  },
  async created(){
    await this.store.getMangaChapter(this.chapterUrl)
    console.log(this.store.chapterDetails);
  },
}
</script>

<style scoped>
.group:hover .details {
  display: flex;
}
</style>
