<template>
  <div class="container">
    <div class="profile-info">
      <img :src="profilePhoto" alt="Profile Photo" class="profile-photo" />
      <div class="username">{{ userName }}</div>
      <div class="description">Front End</div>
    </div>
    <nav class="tabs-container">
      <button
        class="tab-button-left"
        :class="{ active: showRepos }"
        @click="reposList"
      >
        Repos <span class="quantity">{{ quantityRepos }}</span>
      </button>

      <button
        class="tab-button-right"
        :class="{ active: showStarred }"
        @click="starredList"
      >
        Starred <span class="quantity">{{ quantityStarred }}</span>
      </button>
    </nav>

    <form @keydown.enter.prevent="searchQuery" class="search-bar-container">
      <input
        type="text"
        class="search-bar"
        v-model="search"
        placeholder="Filter by name"
      />

      <ul
        class="tab-content"
        v-for="(userRepo, index) in searchedRepos"
        :key="index"
        v-if="showRepos"
      >
        <li class="tab-content__list">
          <div>
            <h3>{{ userRepo.NAME }}</h3>
            <p>{{ userRepo.DESCRIPTION }}</p>
            <span class="repos_detail"
              ><i class="fa fa-code"></i> {{ userRepo.LANGUAGE }}
            </span>
            <span class="repos_detail"
              ><i class="fa fa-code-fork"></i> {{ userRepo.FORKS }}</span
            >
          </div>
        </li>
        <div class="divider"></div>
      </ul>
      <ul
        class="tab-content"
        v-for="(star, item) in searchedStarredRepos"
        :key="item"
        v-else
      >
        <li class="tab-content__list">
          <div class="test">
            <h3>{{ star.NAME }}</h3>
            <p>{{ star.DESCRIPTION }}</p>
            <span class="repos_detail"
              ><i class="fa fa-star"></i>{{ star.STARRED }} </span
            ><span class="repos_detail"
              ><i class="fa fa-code-fork"></i>{{ star.FORKS }}</span
            >
          </div>
        </li>
        <div class="divider"></div>
      </ul>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const username = ref("torvalds");
const showRepos = ref(true);
const showStarred = ref(false);
const search = ref("");

const profilePhoto = computed(() => store.getters.getProfilePhoto);
const quantityRepos = computed(() => store.getters.getReposQuantity);
const quantityStarred = computed(() => store.getters.getStarredReposQuantity);
const userRepos = computed(() => store.getters.getUserRepos);
const starredRepos = computed(() => store.getters.getStarredRepos);
const userName = computed(() => store.getters.getUserName);

const searchedRepos = computed(() => {
  return userRepos.value.filter((repo) =>
    repo.NAME.toLowerCase().includes(search.value.toLowerCase())
  );
});

const searchedStarredRepos = computed(() => {
  return starredRepos.value.filter((star) =>
    star.NAME.toLowerCase().includes(search.value.toLowerCase())
  );
});

store.dispatch("getUserRepos", username.value);
store.dispatch("getStarredRepos", username.value);

const reposList = () => {
  showRepos.value = true;
  showStarred.value = false;
};
const starredList = () => {
  showStarred.value = true;
  showRepos.value = false;
};

const searchQuery = () => searchedRepos.value
</script>

<style></style>
