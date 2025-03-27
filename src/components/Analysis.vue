<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, shallowRef, nextTick } from 'vue';
import axios from 'axios';
import { type ECharts } from 'echarts';
import DarkModeToggle from './DarkModeToggle.vue';

interface DayStruct {
  count: number;
  day: number;
  month: number;
}
 
interface HourStruct {
  count: number;
  day: number;
  hour: number;
}
 
interface MinuteStruct {
  count: number;
  hour: number;
  minute: number;
}
 
interface MonthStruct {
  count: number;
  month: number;
  year: number;
}
 
interface DataStructure {
  day_struct: DayStruct[];
  hour_struct: HourStruct[];
  minute_struct: MinuteStruct[];
  month_struct: MonthStruct[];
}

const echarts: any = inject('$echarts');

const minuteChart = shallowRef<ECharts | null>(null);
const hourChart = shallowRef<ECharts | null>(null);
const dayChart = shallowRef<ECharts | null>(null);
const monthChart = shallowRef<ECharts | null>(null);
const data = ref<DataStructure | null>(null);



const resizeCharts = () => {

nextTick(() => {
  minuteChart.value?.resize();
  hourChart.value?.resize();
  dayChart.value?.resize();
  monthChart.value?.resize();
});
};

const sucNof = (errMsg: string) => {
  ElNotification({
    title: '成功',
    message: errMsg,
    type: 'success',
    duration: 2000

  });
}

const infoNof = (errMsg: string) => {
  ElNotification({
    title: '信息',
    message: errMsg,
    type: 'info',
    duration: 2000

  });
}

const errorNof = (errMsg: string) => {
  ElNotification({
    title: '失败',
    message: errMsg,
    type: 'error',
    duration: 2000

  });
}

const getData = async()=>{
    infoNof('正在获取数据');
    await axios.get('https://satellite.cloudyi.xyz/api/v1/call_statistics?destination=/api/v1/motd',{
        headers: {
            Accept: 'application/json',
        },
    }).then((res) => {
        data.value = res.data;
        sucNof('获取数据成功');
    }).catch((_) => {
        errorNof('获取数据失败');
    });
}


onMounted(async() =>{  
    await getData();
    minuteChart.value = echarts.init(document.getElementById('minute') as HTMLDivElement);
    hourChart.value = echarts.init(document.getElementById('hour') as HTMLDivElement);
    dayChart.value = echarts.init(document.getElementById('day') as HTMLDivElement);
    monthChart.value = echarts.init(document.getElementById('month') as HTMLDivElement);
    let minuteOption = {
    title: {
      text: data.value?.minute_struct ? '' : '暂无数据',
      x: data.value?.minute_struct ? '' : 'center',
      y: data.value?.minute_struct ? '' : 'center',
      textStyle: {
        color: '#606266',
        fontWeight: 'normal',
      },
     },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.minute_struct ? data.value?.minute_struct.map((item) => `${item.hour + 8} 时 ${item.minute} 分`) : [],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.minute_struct ? data.value?.minute_struct.map((item) => item.count) : [],
        smooth: true,
        areaStyle: {
          color: '#58aaff',
        },
        lineStyle: {
          color: '#58aaff',
       },
      },
    ],
  };
    let hourOption = {
    title: {
      text: data.value?.hour_struct ? '' : '暂无数据',
      x: data.value?.hour_struct ? '' : 'center',
      y: data.value?.hour_struct ? '' : 'center',
      textStyle: {
        color: '#606266',
        fontWeight: 'normal',
      },
     },
    tooltip: {},
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.value?.hour_struct ? data.value?.hour_struct.map((item) => `${item.day} 日 ${item.hour + 8} 时`) : [],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.hour_struct ? data.value?.hour_struct.map((item) => item.count) : [],
        smooth: true,
        areaStyle: {
          color: '#58aaff',
        },
        lineStyle: {
          color: '#58aaff',
       },
      },
    ],
    };

    let dayOption = {
    title: {
      text: data.value?.day_struct ? '' : '暂无数据',
      x: data.value?.day_struct ? '' : 'center',
      y: data.value?.day_struct ? '' : 'center',
      textStyle: {
        color: '#606266',
        fontWeight: 'normal',
      },
     },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.day_struct ?  data.value?.day_struct.map((item) => `${item.month} 月 ${item.day} 日`) : [],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.day_struct ? data.value?.day_struct.map((item) => item.count) : [],
        smooth: true,
        areaStyle: {
          color: '#58aaff',
        },
        lineStyle: {
          color: '#58aaff',
       },
      },
    ],
    };

    let monthOption = {
    title: {
      text: data.value?.month_struct ? '' : '暂无数据',
      x: data.value?.month_struct ? '' : 'center',
      y: data.value?.month_struct ? '' : 'center',
      textStyle: {
        color: '#606266',
        fontWeight: 'normal',
      },
     },
    tooltip: {},
    xAxis: {
      type: 'category',
      data:  data.value?.month_struct ? data.value?.month_struct.map((item) => `${item.year} 年 ${item.month} 月`) : [],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.month_struct ? data.value?.month_struct.map((item) => item.count) : [],
        smooth: true,
         areaStyle: {
          color: '#58aaff',
        },
        lineStyle: {
          color: '#58aaff',
       },
      },
    ],
    };

  minuteChart.value?.setOption(minuteOption);

  hourChart.value?.setOption(hourOption);

  dayChart.value?.setOption(dayOption);

  monthChart.value?.setOption(monthOption);
  
  window.addEventListener('resize', resizeCharts);

})

onUnmounted(()=>{
  window.removeEventListener('resize', resizeCharts);
})

</script>

<template>
<div class="global">

    <div class="cards">
        <div class="cardtitle">近一小时调用次数</div>
        <div class="cardcontent">
        <el-skeleton style="height: 400px; width: 100%" :rows="10" :loading="!data">
                <template #default>
                 <div id="minute" style="width:100%;height: 400px;"></div>
                </template>
        </el-skeleton>
        </div>
    </div>



    <div class="cards">
        <div class="cardtitle">每小时调用次数</div>
        <div class="cardcontent">
        <el-skeleton style="height: 400px; width: 100%" :rows="10" :loading="!data">
                <template #default>
                 <div id="hour" style="width:100%;height: 400px;"></div>
                </template>
        </el-skeleton>
        </div>
    </div>

    <div class="cards">
        <div class="cardtitle">每日调用次数</div>
        <div class="cardcontent">
        <el-skeleton style="height: 400px; width: 100%" :rows="10" :loading="!data">
                <template #default>
                 <div id="day" style="width:100%;height: 400px;"></div>
                </template>
        </el-skeleton>
        </div>
    </div>

    <div class="cards">
        <div class="cardtitle">每月调用次数</div>
        <div class="cardcontent">
        <el-skeleton style="height: 400px; width: 100%" :rows="10" :loading="!data">
                <template #default>
                 <div id="month" style="width:100%;height: 400px;"></div>
                </template>
        </el-skeleton>
        </div>
    </div>

    
</div>
<DarkModeToggle />

</template>
<style scoped>
.global {
    padding: 10px;
    width: 800px;
    margin: 0 auto;
  }

.cards {
  width: 800px;
  /* height: 200px; */
  border: solid 1px var(--el-br-w);  
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
}

.cards:hover {
  box-shadow: var(--sh-b);
}

  .cardtitle {
    padding: 10px;
    height: 44px;
    border-bottom: solid 1px var(--el-br-w);  
  }
  .cardcontent {
    padding: 10px;
    display: flex;
    flex-direction: row;
    /* height: 154px; */
  }

@media screen and (max-width: 800px) {
  .global {
    width: 100%;
  }
  .cards {
    width: 100%;
  }
}

</style>