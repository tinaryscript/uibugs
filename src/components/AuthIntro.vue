<script setup>
  const { type } = defineProps(["type"])
</script>

<template>
  <div class="auth_intro">
    <h1 class="title">{{ type }}</h1>
    <p class="description" v-if="type === 'register'">
      Welcome! We're excited to have you join our app. Please fill out the
      following information to create your account.
    </p>
    <p class="description" v-else>
      Log in to your account to access all the features.
    </p>
  </div>
</template>

<style scoped>
.auth_intro {
  align-self: center;
  text-align: center;
}
.title {
  margin: 0;
  font-size: 4em;
  font-family: "DM Serif Display", serif;
  font-weight: 400;
}
.description {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 1em;
  text-align: center;
  line-height: 1.5;
}
</style>