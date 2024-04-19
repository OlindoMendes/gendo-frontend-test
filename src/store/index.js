import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    userRepos: [],
    starredRepos: [],
    searchResults: [],
    avatarIMG: null,
    reposQuantity: null,
    starredReposQuantinty: null,
    username: null,
  },
  getters: {
    getProfilePhoto: (state) => state.avatarIMG,
    getReposQuantity: (state) => state.reposQuantity,
    getStarredReposQuantity: (state) => state.starredReposQuantinty,
    getUserRepos: (state) => state.userRepos,
    getStarredRepos: (state) => state.starredRepos,
    getUserName: (state) => state.username,
  },
  mutations: {
    SET_PROFILE_PHOTO(state, payload) {
      state.avatarIMG = payload;
    },
    SET_REPOS_QUANTITY(state, payload) {
      state.reposQuantity = payload;
    },
    SET_STARREDREPOS_QUANTITY(state, payload) {
      state.starredReposQuantinty = payload;
    },
    SET_REPOS(state, payload) {
      state.userRepos = payload;
    },
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SET_STARRED_REPOS(state, payload) {
      state.starredRepos = payload;
    },
  },
  actions: {
    async getUserRepos({ commit }, username) {
      let avatar = null;
      let reposQuantity = null;
      let reposList = null;
      let name = null;
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const data = response.data.map((data) => data.owner);
      try {
        avatar = data[0].avatar_url;
        name = data[0].login;
        reposQuantity = data.length;
        reposList = response.data.map((data) => {
          return {
            DESCRIPTION: data.description,
            NAME: data.name,
            FORKS: data.forks,
            STARRED: data.stargazers_count,
            LANGUAGE: data.language,
          };
        });
      } catch (error) {
        console.log("Cannot fetch data, try again later", error);
      }

      commit("SET_PROFILE_PHOTO", avatar);
      commit("SET_REPOS_QUANTITY", reposQuantity);
      commit("SET_REPOS", reposList);
      commit("SET_USERNAME", name);
    },
    async getStarredRepos({ commit }, username) {
      let data = "";
      const response = await axios.get(
        `https://api.github.com/users/${username}/starred`
      );
      try {
        data = response.data.map((data) => {
          return {
            DESCRIPTION: data.description,
            NAME: data.name,
            FORKS: data.forks,
            STARRED: data.stargazers_count,
            LANGUAGE: data.language,
            DATE: data.pushed_at,
          };
        });
        commit("SET_STARRED_REPOS", data);
        commit("SET_STARREDREPOS_QUANTITY", data.length);
      } catch (error) {
        console.log("Cannot fetch data, try again later", error);
      }
    },
  },
});

export default store;
