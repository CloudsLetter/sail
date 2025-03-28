<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import DarkModeToggle from './DarkModeToggle.vue'
document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)

</script>

<template>

    <div class="global dark">
        <div class="cards">
                  <DotLottieVue style="height: 20%; width: 90%" autoplay loop src="https://lottie.host/a0d612e6-9e8a-4522-9c07-bd410973e047/kycD5lYJal.lottie" />
        <div style="width: 90%; text-align: center;">                
                该站点仍在建设中,过几世纪再回来看看吧...
        </div>
        <div style="width: 90%; text-align: center;">可用服务:</div>
        <router-link to="/motd" style="color:var(--el-color-primary)">Minecraft MOTD</router-link>
        <router-link to="/sensitive" style="color:var(--el-color-primary)">敏感词检测</router-link>
        <router-link to="/img_compress" style="color:var(--el-color-primary)">图片压缩</router-link>
        <router-link to="/clipboard" style="color:var(--el-color-primary)">剪切板</router-link>
        <router-link to="/analysis" style="color:var(--el-color-primary)">调用统计</router-link>

        <div>博客: https://blog.cloudyi.xyz</div>
        </div>
    </div>
<DarkModeToggle />


</template>

<style scoped>
.global{
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cards {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 400px;
    height: 400px;
    border-radius: 4px;
    border: solid 1px var(--el-br-w);
 transition: box-shadow 0.5s ease-in-out;
}
.cards:hover{
        box-shadow: var(--sh-b);
}

@media (max-width: 768px) {
    .global {
        height: var(--vh, 100vh);
        width: 100%;
    }
    .cards {
        width: 100%;
    }
}
</style>