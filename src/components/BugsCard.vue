<script setup>
const { bugs } = defineProps(["bugs"]);
const URL = import.meta.env.VITE_BASE_PHOTO_URL;
</script>

<template>
  <div v-for="bug in bugs" :key="bug.id" class="bug_card">
    <img :src="`${URL}/${bug.url}`" alt="" class="screeshot" />
    <div class="info">
      <p>{{ bug.description }}</p>
      <ul>
        <li class="name">#{{ bug.website_name }}</li>
        <li class="os">{{ bug.os }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
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
