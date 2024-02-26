<script setup>
  import UploadBug from "./UploadBug.vue"
  const { addNewBug } = defineProps(["addNewBug"])
</script>

<template>
  <div class="submit_bug">
    <span class="legend">Submit a UI bug</span>
    <div class="bug_desc">
      <h4>Please follow the below before submitting a bug:</h4>
      <ul>
        <li>Website name <span class="obligatoire">*</span></li>
        <li>Screenshot for the bug <span class="obligatoire">*</span></li>
        <li>A description <span class="obligatoire">*</span></li>
        <li>Operating system (macOs, Linux, Win)<span class="obligatoire">*</span></li>
      </ul>
    </div>
    <hr class="hr">
    <UploadBug :addNewBug="addNewBug"/>
  </div>
</template>

<style scoped>
.submit_bug {
  grid-column: 2/3;
  grid-row: 1 / span 9;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  position: relative;
}
.legend {
  background-color: #f9f3f2;
  position: absolute;
  top: -15px;
  width: auto;
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  font-size: 1.4em;
  padding: 2px 5px;
  box-shadow: inset 0 -15px 0px 0px #f9f9f9;
}
.bug_desc h4 {
  font-weight: 400;
  margin: 1em 0em;
}
.bug_desc ul {
  padding: 0;
  margin: 0;
  list-style: decimal inside;
  font-weight: 700;
}
.bug_desc li {
  font-size: 15px;
  text-transform: lowercase;
  margin: 5px 0;
}
.obligatoire {
  color: red;
}
</style>