<script setup>
  import AuthIntro from "@/components/AuthIntro.vue";
  import AuthForm from "@/components/AuthForm.vue";
</script>

<template>
  <div class="auth_wrapper register">
    <AuthIntro type="register"/>
    <AuthForm type="register"/>
  </div>
</template>