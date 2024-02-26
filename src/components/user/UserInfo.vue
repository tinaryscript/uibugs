<script setup>
import { useRoute } from "vue-router";
const props = defineProps(["user", "userInfo"]);
const route = useRoute();
</script>

<template>
  <div class="info">
    <span class="legend">Information</span>
    <div class="user_info">
      <h3 v-if="props?.user?.username === route.params?.username">
        {{ props?.user?.username }}
      </h3>
      <h3 v-else>{{ route.params?.username }}</h3>
      <div class="states">
        <p>
          <span>{{ props.userInfo.bugs }}</span> bugs
        </p>
        <p>
          <span>{{ props.userInfo.followers }}</span> followers
        </p>
        <p>
          <span>{{ props.userInfo.following }}</span> following
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  grid-column: 1/5;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  position: relative;
  margin: 2em 0 0;
}
.user_info {
  display: flex;
  flex-direction: column;
}

.user_info h3 {
  margin-bottom: 0;
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 35px;
  margin-top: 10px;
  color: #5a43f1;
}

.states {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.states p {
  font-weight: 600;
}
.states span {
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  font-size: 22px;
  margin-right: 2px;
}

.legend {
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
</style>
