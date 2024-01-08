import { defineStore } from 'pinia'



export const mangaStore = defineStore('manga', {
  state: () => ({
    mangaList: [],
    mangaInfo: [],
    }),
    getters: {
      manga: state => {
        console.log(state.mangaList);
        return state.mangaList
      },
      mangaDetails: state => {
        console.log(state.mangaInfo);
        return state.mangaInfo
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

    },

    
})

