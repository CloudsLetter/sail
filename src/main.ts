
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
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type {
  ComposeOption,
} from 'echarts/core';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

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

const option: ECOption = {
};


const routes = [
    {path: '/', name: 'Sail', component:  () => import('./components/HomePage.vue'), meta:{title: 'Sail'}},
    {path:'/motd', name: 'MOTD' ,component:  () => import('./components/MinecraftMotdPage.vue'), meta:{title: 'Minecraft MOTD查询'}},
    {path: '/analysis', name: 'Echarts', component: () => import('./components/Analysis.vue'), meta:{title: '调用统计'}},

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

const app = createApp(App)

app.provide('$echarts', echarts);

app.use(router).mount('#app')
