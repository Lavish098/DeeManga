import { defineStore } from "pinia";

function buildApiUrl(path) {
  const config = useRuntimeConfig()
  return `${config.public.apiBase}${path}`
}
export const mangaStore = defineStore("manga", {
  state: () => ({
    mangaList: [],
    mangaInfo: [],
    currentMangaId: null,
    searchResult: [],
    updateResult: [],
    popularResult: [],
    chapterResult: [],
    isMangaLoading: false,
    isPopularLoading: false,
    isUpdateLoading: false,
  }),
  getters: {
    manga: (state) => {
      return state.mangaList;
    },
    mangaDetails: (state) => {
      return state.mangaInfo;
    },
    searchDetails: (state) => {
      return state.searchResult;
    },
    updateDetails: (state) => {
      return state.updateResult;
    },
    popularDetails: (state) => {
      return state.popularResult;
    },
    chapterDetails: (state) => {
      return state.chapterResult;
    },
  },
  actions: {
    async getManga(page) {
      this.isMangaLoading = true;
      try {
        const response = await fetch(buildApiUrl(`/manga_list?length=${page}`));

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.mangaList = {
          data: data[0].data,
          info: data[0].info,
        };
      } catch (error) {
        console.error(error);
      } finally {
        this.isMangaLoading = false;
      }
    },
    async getMangaPopular(page) {
      this.isPopularLoading = true;
      try {
        const response = await fetch(
          buildApiUrl(`/manga_popular?length=${page}`)
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.popularResult = {
          data: data[0].data,
          info: data[0].info,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isPopularLoading = false;
      }
    },
    async getMangaUpdate() {
      this.isUpdateLoading = true;
      try {
        const response = await fetch(buildApiUrl(`/manga_update`));

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.updateResult = {
          data: data[0].data.splice(0, 12),
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isUpdateLoading = false;
      }
    },
    async getMangaInfo(id) {
      try {
        this.mangaInfo = [];
        this.currentMangaId = id;
        const response = await fetch(buildApiUrl(`/manga_info/${id}`));

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.mangaInfo = data[0];
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getMangaSearch(search) {
      try {
        const response = await fetch(
          buildApiUrl(`/manga_search?find=${encodeURIComponent(search)}`)
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.searchResult = data[0].data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getMangaChapter(chapterUrl) {
      try {
        const response = await fetch(
          buildApiUrl(
            `/read_manga?chapterUrl=${encodeURIComponent(chapterUrl)}`
          ),
          {}
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.chapterResult = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
});
