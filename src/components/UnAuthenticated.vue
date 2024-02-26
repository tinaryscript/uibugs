<script setup></script>

<template v-if="!user">
  <div class="unauthenticated">
    <h2>please create an account to see content</h2>
    <p>you aleardy registred? <RouterLink to="/login">login</RouterLink></p>
  </div>
</template>

<style>
.unauthenticated {
  grid-column: span 3;
  margin-top: 2em;
  text-align: center;
}
</style>
