<script setup>
import { useUserStore } from "@/stores/users";
import { storeToRefs } from 'pinia';

const useUser = useUserStore();
const { user, fetchingUser } = storeToRefs(useUser);

</script>

<template>
  <section class="welcoming_user">
    <h2>Hey there, <span>{{ user.username }} 👋</span></h2>
    <p>
      Ready to contribute and discover? Happy bug hunting!
    </p>
  </section>
</template>

<style scoped>
.welcoming_user {
  margin: 3em 0;
}

.welcoming_user h2 {
  margin: 0;
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  font-size: 30px;
}

.welcoming_user h2 span {
  margin: 0;
  text-transform: capitalize;
}

.welcoming_user p {
  text-transform: lowercase;
  font-weight: 500;
}
</style>