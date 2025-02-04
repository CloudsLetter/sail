
import './style.css'
import App from './App.vue'
import MineftaftMotdPage from './components/MineftaftMotdPage.vue'
import { createApp } from 'vue'
import { createMemoryHistory,createRouter } from 'vue-router'

const routes = [
    {path: '/', component: App},
    {path:'/motd',component: MineftaftMotdPage}

]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
    })

createApp(App).use(router).mount('#app')
