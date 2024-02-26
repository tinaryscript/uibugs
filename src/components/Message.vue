<script setup>
  import { useUserStore } from "../stores/users"
  import { storeToRefs } from "pinia";
  const useUser = useUserStore()
  const { successMessage } = storeToRefs(useUser)
</script>


<template>
  <div class="success_upload">{{successMessage}}</div>
</template>

<style scoped>
.success_upload {
  background-color: #71cb35;
  color: #FFF;
  padding: .5em;
  border-radius: 2px;
  font-family: "DM Serif Display", serif;
  font-size: 1.35em;
  font-weight: 400;
  width: 60%;
  margin: auto;
  text-align: center;
}
.message-enter-from {
  opacity: 0;
}
.message-enter-to {
  opacity: 1;
}
.message-enter-active {
  transition: all .6s ease-in-out;
}
</style>