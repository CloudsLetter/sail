
import './style.css'
import App from './App.vue'
import MinecraftMotdPage from './components/MinecraftMotdPage.vue'
import { createApp } from 'vue'
import { createWebHistory,createRouter } from 'vue-router'
import HomePage from './components/HomePage.vue'

const routes = [
    {path: '/', name: 'Sail', component: HomePage, meta:{title: 'Sail'}},
    {path:'/motd', name: 'MOTD' ,component: MinecraftMotdPage, meta:{title: 'Minecraft MOTD'}},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
    })

router.beforeEach((to, _, next) => {
      if (to.meta.title) {
          document.title = (to.meta.title as string) || '默认标题'
      }
  next()
})



createApp(App).use(router).mount('#app')
