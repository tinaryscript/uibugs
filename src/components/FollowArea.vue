<script setup>
import { supabase } from "@/supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
const useStore = useUserStore();
const { user } = storeToRefs(useStore);

const props = defineProps([
  "isFollowing",
  "profileUserDataToSee",
  "updatefollowState",
]);

const follow = async () => {
  props.updatefollowState(true);
  await supabase.from("follower_following").insert({
    follower_id: user.value.id,
    following_id: props.profileUserDataToSee.id,
  });
};
const unfollow = async () => {
  props.updatefollowState(false);
  await supabase
    .from("follower_following")
    .delete()
    .eq("follower_id", user.value.id)
    .eq("following_id", props.profileUserDataToSee.id);
};
</script>

<template>
  <div class="follow_area">
    <button @click="follow" v-if="!props.isFollowing">follow</button>
    <button @click="unfollow" v-else>following</button>
  </div>
</template>

<style scoped>
.follow_area {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
}
button {
  border-radius: 6px;
  border: none;
  color: #fff;
  font-weight: 400;
  cursor: pointer;
  padding: 12px 45px;
  font-size: 19px;
  transition: all 0.22s ease-in-out;
  background-color: #52baeb;
}
button:hover {
  background-color: #3495c2;
}
</style>
