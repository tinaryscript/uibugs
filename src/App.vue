<script setup>
  import { onMounted } from "vue";
  import Container from './components/Container.vue';
  import Nav from './components/Nav.vue';
  import { useUserStore } from "@/stores/users"
  const useUser = useUserStore()
  const { getLoginUser } = useUser;
  
  onMounted(() => {
    getLoginUser()
  }) 
</script>

<template>
  <main>
    <Container>
      <Nav />
      <RouterView />
    </Container>
  </main>
</template>

<style scoped>
</style>
