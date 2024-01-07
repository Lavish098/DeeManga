<template>
  <div>

    <updateCard/>
  </div>
</template>

<script>
import { mangaStore } from '~/store'
import {ref, onMounted, onBeforeUnmount } from 'vue'

export default {
setup(){
  const store = mangaStore()
 const page = ref([1])

  return{ store, page}
},
 created(){
    this.store.getManga(this.page)
  },
 


}
</script>

<style scoped>

</style>
