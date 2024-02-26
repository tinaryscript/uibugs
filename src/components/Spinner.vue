<template>
  <div class="spinner">
    <svg width="54" height="54" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
        class="spinner_P7sC" />
    </svg>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 364px);
}
.spinner h3 {
  margin-top: 8px;
  text-transform: capitalize;
  font-size: 15px;
}
.spinner_P7sC {
  transform-origin: center;
  animation: spinner_svv2 .75s infinite linear
}
@keyframes spinner_svv2 {
  100% {
    transform: rotate(360deg)
  }
}
</style>