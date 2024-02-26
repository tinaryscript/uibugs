<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
const { push } = useRouter();

const useUser = useUserStore();
const { user } = storeToRefs(useUser);

const users = ref([]);

const fetchUser = async () => {
  const response = await supabase
    .from("users")
    .select()
    .neq("id", user.value.id);
  users.value.push(...response.data);

};

const toProfile = (username) => {
  push(`profile/${username}`);
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="user_container">
    <div class="user-list">
      <span class="legend">Suggested profile to follow</span>
      <ul>
        <li v-for="user in users" @click="toProfile(user.username)">
          {{ user.username }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.user_container {
  grid-column: 3/4;
  grid-row: 1 / 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  position: relative;
  height: 242px;
}

.user-list .legend {
  background-color: #f9f3f2;
  position: absolute;
  top: -15px;
  width: auto;
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  font-size: 1.4em;
  padding: 2px 5px;
  box-shadow: inset 0 -15px 0px 0px #f9f9f9;
}

.user-list {
  overflow-y: scroll;
  height: 210px;
}

.user-list ul {
  margin: 1em 0;
  padding: 0;
  list-style: none;
}

.user-list ul li {
  text-transform: capitalize;
  margin: 5px 0;
  color: #1c1b1a;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.12s ease-in-out;
  cursor: pointer;
  background-color: #ededed8e;
  padding: 5px;
  border-radius: 6px;
  width: 95%;
  border: 1px solid #EDEDED;
}

.user-list ul li:hover {
  color: #fff;
  background-color: #5a43f1;
}

.user-list::-webkit-scrollbar {
  width: 0.5rem;
}

.user-list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bbb;
  border-radius: 6px;
}

.user-list::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 6px;
}
</style>
