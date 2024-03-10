<template>
<div>
<div class=" w-full py-10 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800
rounded shadow-lg font-thin focus:outline-none duration-100 ">
  <div class="block  md:flex max-w-screen-xl px-4 mx-auto md:items-center md:flex-row md:px-6 lg:px-8">
    <div class="p-4 flex flex-row items-center justify-between">
      <nuxt-link :to="{name:'index'}" class="text-[25px] ml-5 font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
        DeeManga</nuxt-link>
    </div>
    <div class="absolute top-7 right-[25px] mt-4">
        <div @click="toggleMobileNav" v-show="mobile" class="menu-icon" :class="{'btn-home':mobileNav}" >
        <div class="w-[30px] h-[5px] mb-[5px] mt-[4px] border-r-[5px] bg-slate-500" ></div>
        <div class="w-[30px] h-[5px] mb-[5px] mt-[4px] border-r-[5px] bg-slate-500"></div>
        <div class="w-[30px] h-[5px] mb-[5px] mt-[4px] border-r-[5px] bg-slate-500"></div>
      </div>
    </div> 

    <seacrhBar />


    <nav class="flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row" v-if="!mobile">
      <nuxt-link :to="{name:'index'}" :class="{ 'bg-indigo-600 text-white': isActive }"
    
       class="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        Updates</nuxt-link>
      <nuxt-link :to="{name:'popularList'}" exact class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <h1>Popular</h1></nuxt-link>
      <nuxt-link :to="{name:'mangaList'}" exact class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <h1>Manga List</h1></nuxt-link>
      <a class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
        About</a>
    </nav>


<div class="bg-white shadow-2xl w-[80%] max-w-[550px] flex flex-col fixed top-0 right-0 h-full z-30" v-show="mobileNav" >
    <h1 @click="toggleMobileNav" class="flex justify-end mr-7 mt-8 text-[60px]  font-bold text-slate-500">&gt;</h1>
    <nav class="flex flex-col justify-center items-center mt-20">
      <nuxt-link :to="{name:'index'}" :class="{ 'bg-indigo-600 text-white': isActive }"
    @click="handleClick" 
       class="px-4 py-4 mt-2 text-[25px] font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        Updates</nuxt-link>
      <nuxt-link @click="toggleMobileNav" :to="{name:'popularList'}" exact class="px-4 py-4 mt-2 text-[25px] font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <h1>Popular</h1></nuxt-link>
      <nuxt-link @click="toggleMobileNav" :to="{name:'mangaList'}" exact class="px-4 py-4 mt-2 text-[25px] font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        <h1>Manga List</h1></nuxt-link>
      <nuxt-link @click="toggleMobileNav" class="px-4 py-4 mt-2 text-[25px] font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#">
        About</nuxt-link>
      
    </nav>
</div>
  </div>
</div>
<slot />
</div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  
    setup(){
          const isActive = ref(false);
          const mobile = ref(null)
        const mobileNav = ref(false)
        const windowWidth = ref(null)

       const handleClick = () => {
      isActive.value = true;
              mobileNav.value = !mobileNav.value;

      // Add your logic here if needed
    };
    const checkScreen = () => {
      if(process.client){
        windowWidth.value = window.innerWidth;
        if(windowWidth.value <= 1130){
          mobile.value = true;
            return;
        }
        mobile.value = false;
        mobileNav.value = false;
        return;
          }
    }
    const toggleMobileNav = () => {
        mobileNav.value = !mobileNav.value;
    }
    onMounted(() => {
      if(process.client){
    window.addEventListener('resize', checkScreen);
    checkScreen();
  }
    })
    return{ handleClick, isActive, mobile, mobileNav, windowWidth, checkScreen, toggleMobileNav }
    }

}
</script>

<style scoped>

</style>