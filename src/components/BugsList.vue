<script setup>
import BugsCard from "./BugsCard.vue";

const { bugs } = defineProps(["bugs"]);
</script>

<template>
  <div class="bugs_list" v-if="bugs?.length">
    <BugsCard :bugs="bugs" />
  </div>
</template>

<style scoped>
.bugs_list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
  grid-column: span 4;
  padding-bottom: 2em;
}

.no_bugs {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: #5a43f1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  height: 100px;
  margin: 0;
  font-weight: 500;
}

.bugs_list::-webkit-scrollbar {
  width: 0.5rem;
}

.bugs_list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bbb;
  border-radius: 6px;
}
.bugs_list::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 6px;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 3.5s ease;
}
.bug_card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.screeshot {
  max-width: 100%;
  width: 100%;
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid #ddd;
}

.info {
  padding: 10px;
}
.info p {
  font-size: 14px;
  margin: 0 0 10px 0;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

li.name {
  color: #5a43f1;
  font-weight: 700;
  cursor: pointer;
}

li.os {
  color: #a7a7a7;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
}
</style>
