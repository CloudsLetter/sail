import 'element-plus/theme-chalk/dark/css-vars.css';
import './darkmode.css'
import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createWebHistory,createRouter } from 'vue-router'
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);



const routes = [
  {
    path: "/",
    name: "Sail",
    component: () => import("./components/HomePage.vue"),
    meta: { title: "Sail" },
  },
  {
    path: "/motd",
    name: "MOTD",
    component: () => import("./components/MinecraftMotdPage.vue"),
    meta: { title: "Minecraft MOTD查询" },
  },
  {
    path: "/analysis",
    name: "Echarts",
    component: () => import("./components/AnalysisPage.vue"),
    meta: { title: "调用统计" },
  },
  {
    path: "/clipboard",
    name: "Clipboard",
    component: () => import("./components/ClipboardPage.vue"),
    meta: { title: "剪切板" },
  },
  {
    path: "/clipboard/:title",
    name: "ClipboardContent",
    component: () => import("./components/ClipboardContentPage.vue"),
    meta: { title: "剪切板内容区域" },
  },
  {
    path: "/sensitive",
    name: "Sensitive",
    component: () => import("./components/SensitivePage.vue"),
    meta: { title: "敏感词检测" },
  },
  // {
  //   path: "/img_compress",
  //   name: "ImgCompress",
  //   component: () => import("./components/ImgCompress.vue"),
  //   meta: { title: "图片压缩" },
  // },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: import("./components/HomePage.vue"),
    meta: { title: "404 你又回来了" },
  },
];

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

const app = createApp(App)

app.provide('$echarts', echarts);

app.use(router).mount('#app')
