<script setup>
import UnAuthenticated from "./UnAuthenticated.vue";
import TimelineBugs from "./TimelineBugs.vue";
import WelcomingUser from "./WelcomingUser.vue";
import LeadContent from "./LeadContent.vue";
import Spinner from "./Spinner.vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import UserList from "./UserList.vue";
const useUser = useUserStore();
const { user, fetchingUser } = storeToRefs(useUser);
</script>

<template>
  <LeadContent />
  <WelcomingUser v-if="!fetchingUser && user" />
  <section v-if="!fetchingUser" class="bugs_content">
    <UserList v-if="user" />
    <TimelineBugs v-if="user" :user="user" />
    <UnAuthenticated v-else />
  </section>
  <Spinner v-else />
</template>

<style scoped>
.bugs_content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em;
  margin: 0 0 4em;
}
</style>
