<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "@/supabase";
import BugsCard from "./BugsCard.vue";
import Spinner from "./Spinner.vue";
import Observer from "./Observer.vue";
const props = defineProps(["user"]);

const bugsList = ref([]);
const lastCardIndex = ref(3);
const interceptReqReachEnd = ref(false);
const idOfUserIamFolowing = ref([]);

async function fetchBugs() {
  const { data } = await supabase
    .from("follower_following")
    .select("following_id")
    .eq("follower_id", props.user.id);

  idOfUserIamFolowing.value = data.map((elm) => elm.following_id);

  const { data: followingBugs } = await supabase
    .from("bugs")
    .select()
    .in("owner_id", idOfUserIamFolowing.value)
    .range(0, lastCardIndex.value)
    .order("created_at", { ascending: false });

  bugsList.value.push(...followingBugs);
}

const fetchNextSet = async () => {
  if (!interceptReqReachEnd.value) {
    const { data } = await supabase.from("bugs").select().in("owner_id", idOfUserIamFolowing.value).range(lastCardIndex.value + 1, lastCardIndex.value + 4).order("created_at", { ascending: false });

    bugsList.value = [...bugsList.value, ...data]

    lastCardIndex.value = lastCardIndex.value + 4;

    if (!data.length) interceptReqReachEnd.value = true;
  }
}

onMounted(() => {
  fetchBugs();
});
</script>

<template>
  <div class="timeline_bugs" v-if="bugsList.length">
    <BugsCard :bugs="bugsList" />
    <Observer @intersect="fetchNextSet" />
  </div>
  
</template>

<style scoped>
.timeline_bugs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1em;
  grid-column: 1 / 3;
  grid-row: 1 / auto;
}
</style>
