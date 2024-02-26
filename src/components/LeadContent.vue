<template>
  <div class="lead_container">
    <div class="lead">
      <h1 class="lead_title">UI Bugs</h1>
      <p class="lead_caption">
        Documenting UI bugs to show that all UI developers make mistakes. This
        blog will showcase bugs in large and popular websites and apps.
      </p>
    </div>
  </div>
</template>

<style scoped >
.lead_container {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  position: relative;
  margin: 2em 0 0;
}
.lead {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 1em;
  width: 70%;
  margin: auto;
}
.lead_title {
  margin: 0;
  font-size: 5em;
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  box-shadow: inset 0 -13px 0 0 rgb(248, 226, 207);
}
.lead_caption {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 1em;
  text-align: center;
  line-height: 1.5;
}
</style>