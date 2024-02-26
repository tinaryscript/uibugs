<script setup>
  import UserProfile from "@/components/UserProfile.vue"
</script>

<template>
  <div>
    <UserProfile :key="$route.params.username"/>
  </div>
</template>
