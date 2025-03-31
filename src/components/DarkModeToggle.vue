<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

// 绑定深色模式
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 控制旋转动画
const isFlipped = ref(false)

// 点击时翻转 & 切换主题
const handleToggle = () => {
  isFlipped.value = !isFlipped.value
  toggleDark()
}


</script>

<template>
  <div draggable="true"  class="toggle" @click="handleToggle" :class="{ flipped: isFlipped }">
    <el-icon size="30px" style="color:#fff">
      <component :is="isDark ? Sunny : Moon" />
    </el-icon>
  </div>
</template>

<style scoped>
.toggle {
  height: 50px;
  width: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 999;
  cursor: pointer;
  transition: all 5s ;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-color-primary);
}

.flipped {
  transform: rotateX(360deg);
}
</style>
