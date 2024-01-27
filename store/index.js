import { defineStore } from 'pinia'



export const mangaStore = defineStore('manga', {
  state: () => ({
    mangaList: [],
    mangaInfo: [],
    searchResult: [],
    updateResult: [],
    popularResult: [],
    chapterResult: []
    }),
    getters: {
      manga: state => {
        return state.mangaList
      },
      mangaDetails: state => {
        console.log(state.mangaInfo);
        return state.mangaInfo
      },
      searchDetails: state => {
        console.log(state.searchResult);
        return state.searchResult
      },
      updateDetails: state => {
        console.log(state.updateResult);
        return state.updateResult
      },
      popularDetails: state => {
        console.log(state.popularResult);
        return state.popularResult
      },
      chapterDetails: state => {
        console.log(state.chapterResult);
        return state.chapterResult
      },
    
  },
 actions: {
async getManga(page){
   try {
    const response = await fetch(`https://manga-api-topaz.vercel.app/manga_list/?length=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);  // This should log the resolved data
    this.mangaList = {
      data: data[0].data,
      info: data[0].info
    };
    console.log(this.mangaList);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
 },
async getMangaPopular(page){
   try {
    const response = await fetch(`https://manga-api-topaz.vercel.app/manga_popular/?length=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);  // This should log the resolved data
    this.popularResult = {
      data: data[0].data,
      info: data[0].info,
    };
    console.log(this.popularResult);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
 },
async getMangaUpdate(){
   try {
    const response = await fetch(`https://manga-api-topaz.vercel.app/manga_update`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);  // This should log the resolved data
    this.updateResult = {
      data: data[0].data,
    };
    console.log(this.updateResult);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
 },
 async getMangaInfo(id){
  console.log(id);
  try {
   const response = await fetch(`https://manga-api-topaz.vercel.app/manga_info/${id}`);
   
   if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
   }
console.log(response);
   const data = await response.json();
   console.log(data);  // This should log the resolved data
   this.mangaInfo = data[0]
   console.log(this.mangaInfo);
 } catch (error) {
   console.error('Error fetching data:', error);
 }
 
},
async getMangaSearch(search){
  console.log(search);
  try {
   const response = await fetch(`https://manga-api-topaz.vercel.app/manga_search?find=${search}`);
   
   
   if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
   }
console.log(response);
   const data = await response.json();
   console.log(data);  // This should log the resolved data
   this.searchResult = data[0].data
 } catch (error) {
   console.error('Error fetching data:', error);
 }
 
},
async getMangaChapter(chapterUrl){
  try {
   const response = await fetch(`https://manga-api-topaz.vercel.app/read_manga?chapterUrl=${chapterUrl}`, {
    
  });
   
   if (!response.ok) {
     throw new Error(`HTTP error! Status: ${response.status}`);
   }
console.log(response);
   const data = await response.json();
   console.log(data);  // This should log the resolved data
   this.chapterResult = data
 } catch (error) {
   console.error('Error fetching data:', error);
 }
 
},


    },

    
})

