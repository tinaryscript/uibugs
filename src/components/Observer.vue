<script setup>
  import { ref, onMounted } from "vue";
  const emit = defineEmits(["intersect"])
  const observer = ref(null);
  const root = ref(null)

  onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        emit("intersect")
      }
    })
    observer.value.observe(root.value)
  })

</script>

<template>
  <div class="observer" ref="root"></div>
</template>

<style scoped>
.observer {
  visibility: hidden;
  height: 10px;
  width: 10px;
}
</style>