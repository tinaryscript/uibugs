<script setup>
  const {isLogin} = defineProps(["isLogin"]);
  const status = isLogin ? "login" : "register"
</script>

<template>
  <div :class="`authButton ${status}`">
    <router-link :to="`/${status}`">{{ status }}</router-link>
  </div>
</template>

<style scoped>

  .authButton > a {
    text-decoration: none;
    font-weight: 700;
    color: #1c1b1a; /* //#f8e2cf */
    font-size: 17px;
  }
  .authButton > a:hover {
    color: #5a43f1;
    text-decoration: underline;
  }
</style>