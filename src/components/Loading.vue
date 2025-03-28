<script setup lang="ts">

</script>

<template>
  <div class="toggle">
  </div>
</template>

<style scoped>
.toggle {
  height: 50px;
  width: 50px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 999;
  cursor: pointer;
  transition: all 5s;
  border-left: solid 5px var(--el-color-primary);

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
