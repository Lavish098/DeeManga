import { defineStore } from 'pinia'



export const mangaStore = defineStore('manga', {
  state: () => ({
    mangaList: [],
    mangaRecommendList: []
    }),
    getters: {
      manga: state => {
        console.log(state.mangaList);
        return state.mangaList
      },
      mangaRecommend: state => {
        console.log(state.mangaRecommendList);
        return state.mangaList.slice(5, 10)
      },
  },
 actions: {
async getManga(page){
   try {
    const response = await fetch(`http://localhost:8000/manga_list/?length=${page}`);
    
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
//  async getMangaRecommend(page){
//   const result = await fetch('http://localhost:12500/recommend', {
    
//   })
//    const data = await result.json();
//    this.mangaRecommendList = data.list
//    console.log(this.mangaRecommendList);
//  },
    },

    
})

