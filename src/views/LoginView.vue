<script setup>
  import AuthIntro from "@/components/AuthIntro.vue";
  import AuthForm from "@/components/AuthForm.vue";
</script>

<template>
  <div class="auth_wrapper login">
    <AuthIntro type="login" />
    <AuthForm type="login" />
  </div>
</template>