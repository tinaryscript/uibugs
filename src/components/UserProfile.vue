<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute } from "vue-router";

import BugsList from "./BugsList.vue";
import Message from "./Message.vue";
import SubmitBug from "./user/SubmitBug.vue";
import Spinner from "./Spinner.vue";
import UserInfo from "./user/UserInfo.vue";

import { supabase } from "@/supabase";
import { useUserStore } from "../stores/users.js";
import { storeToRefs } from "pinia";
import NotFound from "@/views/NotFound.vue";
import FollowArea from "./FollowArea.vue";

const route = useRoute();
const { username: profileUsername } = route.params;

const useUser = useUserStore();
const { register, login } = useUser;
const { user, fetchingUser, showSuccessMessage } = storeToRefs(useUser);
const bugsLoading = ref(false);

/**
 * following
 */

const isFollowing = ref(false);

const updatefollowState = (state) => {
  isFollowing.value = state;
};

const userInfo = reactive({
  bugs: null,
  followers: null,
  following: null,
});

/**
 * Bugs List
 */
const bugs = ref([]);
// push image to state
const addNewBug = (bug) => {
  bugs.value.unshift(bug);
};

/**
 * @func: fetch bugs for each user
 */
const query = useRoute();
const isUserExist = ref(null);
const profileUserDataToSee = ref(null);

const fetchUserBugs = async () => {
  const response = await supabase
    .from("users")
    .select()
    .eq("username", query?.params?.username)
    .maybeSingle();
  if (!response.data) {
    isUserExist.value = 0;
    return (bugsLoading.value = false);
    // return user.value = null;
  }
  isUserExist.value = 1;
  // user.value = response.data; /* can make an error inside the app */
  profileUserDataToSee.value =
    response.data; /* can make an error inside the app */
  const userBugs = await supabase
    .from("bugs")
    .select()
    .eq("owner_id", profileUserDataToSee.value?.id);
  bugs.value.push(...userBugs.data);

  await fetchIsFollowing();
  /* user information */
  userInfo.bugs = bugs.value.length;
  const followerCount = await getFollowersCount();
  const followingCount = await getFollowingCount();

  userInfo.followers = followerCount;
  userInfo.following = followingCount;

  bugsLoading.value = false;
};

const fetchIsFollowing = async () => {
  if (
    user.value &&
    profileUserDataToSee.value &&
    user.value.id !== profileUserDataToSee.value.id
  ) {
    const response = await supabase
      .from("follower_following")
      .select()
      .eq("follower_id", user.value.id)
      .eq("following_id", profileUserDataToSee.value.id)
      .maybeSingle();
    if (response.data !== null) isFollowing.value = true;
    else isFollowing.value = false;
  }
};

const getFollowersCount = async () => {
  const { count } = await supabase
    .from("follower_following")
    .select("*", { count: "exact" })
    .eq("following_id", profileUserDataToSee.value.id);

  return count;
};

const getFollowingCount = async () => {
  const { count } = await supabase
    .from("follower_following")
    .select("*", { count: "exact" })
    .eq("follower_id", profileUserDataToSee.value.id);
  return count;
};

onMounted(() => {
  fetchUserBugs();
});

/* need to calc the followers count information  */
</script>

<template>
  <div v-if="isUserExist">
    <transition name="message">
      <Message v-if="!fetchingUser && showSuccessMessage" />
    </transition>
    <section class="user_profile" v-if="!fetchingUser">
      <UserInfo
        :key="$route.params.username"
        :user="user"
        :userInfo="userInfo"
      />
      <div v-if="user" class="actions">
        <SubmitBug
          v-if="profileUsername == user?.username"
          :addNewBug="addNewBug"
        />
        <FollowArea
          v-else
          :isFollowing="isFollowing"
          :profileUserDataToSee="profileUserDataToSee"
          :updatefollowState="updatefollowState"
        />
      </div>
      <BugsList :bugs="bugs" v-if="!bugsLoading" />
      <Spinner v-else />
    </section>
    <Spinner v-else />
  </div>
  <NotFound v-else-if="isUserExist === 0" />
  <Spinner v-else />
</template>

<style scoped>
.user_profile {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(12, 1fr);
  height: 100vh;
  gap: 2em;
}

.not-found {
  height: calc(100vh - 350px);
}

.actions {
  grid-column: span 4;
}
</style>
