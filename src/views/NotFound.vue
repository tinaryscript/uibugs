<template>
  <div class="not-found">
    <h1>404 - Not Found</h1>
    <p>Sorry, the page you are looking for might be in another castle.</p>
    <router-link class="redirect" to="/">Go Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 110px);
  text-align: center;
}

h1 {
  font-size: 2.2em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.redirect {
  font-size: 1em;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
}

</style>