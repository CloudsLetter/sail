<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)

</script>

<template>

    <div class="global">
        <div class="cards">
                  <DotLottieVue style="height: 20%; width: 90%" autoplay loop src="https://lottie.host/a0d612e6-9e8a-4522-9c07-bd410973e047/kycD5lYJal.lottie" />
        <div style="width: 90% text-align: center;">                
                该站点仍在建设中,过几世纪再回来看看吧...
        </div>
        <div style="width: 90%; text-align: center;">可用服务:</div>
        <router-link to="/motd" style="color:var(--el-color-primary)">Minecraft MOTD</router-link>
        <div>博客: https://blog.cloudyi.xyz</div>
        </div>
    </div>


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
    background-color: #fff;
    border-radius: 4px;
    border: solid 1px #dcdfe6;
    transition: box-shadow 0.5s ease-in-out;
}
.cards:hover{
        box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
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