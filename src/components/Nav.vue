<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthModal from "./AuthModal.vue";
import { useUserStore } from "@/stores/users"
import { storeToRefs } from "pinia";
import Toast from "./Toast.vue";
const useUser = useUserStore()
const { logout } = useUser;
const { user, fetchingUser, databaseMessageRes } = storeToRefs(useUser)
const { push } = useRouter()

const userProfileRedirect = () => {
  push(`/profile/${user.value.username}`)
}

const showToast = ref(false);
const logoutUser = async () => {
  await logout()
  setTimeout(() => {
    push("/")
  }, 200)
  
  setTimeout(() => {
    databaseMessageRes.value.message = "";
    databaseMessageRes.value.status = null;
  }, 2100)
  user.value = null;

  showToast.value = true;
  setTimeout(() => showToast.value = false, 2090)
}


const searchUsername = ref("")
const onSearch = () => {
  if (searchUsername.value) {
    push(`/profile/${searchUsername.value}`);
    searchUsername.value = "";
  } else return;
}

</script>

<template>
  <div class="navbar-container">
    <div class="brand">
      <router-link to="/">uiBugs</router-link>
    </div>
    <input type="search" class="search" @search="onSearch" v-model="searchUsername" placeholder="search for user" v-if="user">
    <section v-if="!fetchingUser">
      <div class="auth-container" v-if="!user">
        <AuthModal :isLogin="false" />
        <AuthModal :isLogin="true" />
      </div>
      <div class="auth-container" v-else>
        <button class="logout" @click="logoutUser">logout</button>
        <button class="user_profile" @click="userProfileRedirect">profile</button>
      </div>
    </section>
  </div>
  <transition name="toast">
    <Toast :props="databaseMessageRes" v-if="showToast"/>
  </transition>
</template>

<style scoped>
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2em;
  padding: 2em 0;
}

.brand a {
  text-decoration: none;
  font-weight: 400;
  font-size: 2.5em;
  color: #1c1b1a;
  /* //#f8e2cf */
  font-family: "DM Serif Display", serif;
  letter-spacing: 1px;
}

.auth-container {
  display: flex;
  gap: 1em;
  flex-direction: row-reverse;
  align-items: center;
}
.auth-container .logout,
.auth-container .user_profile {
  background-color: #f38d38;
  border-radius: 3px;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 20px;
  font-size: 15px;
  transition: all .22s ease-in-out;
}

.auth-container .logout:hover {
  background-color: #ffa318;
}

.auth-container .user_profile {
  background-color: #5a43f1;
}

.auth-container .user_profile:hover {
  background-color: #7661ff;
}

.search {
  background-color: #f6f6f6;
  border: 1px solid #ddd;
  border-radius: 0px;
  font-family: "Inter", sans-serif;
  padding: 0.8rem 0.5rem;
  width: 350px;
  font-size: 13px;
  outline: none;
  border-radius: 6px;
}
.search:focus {
  border: 2px solid #7661ff;
}

</style>