<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted, shallowRef, nextTick } from 'vue';
import axios from 'axios';
import type { ECharts } from 'echarts';

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

 const getData = async ()=> {
      await axios.get('https://satellite.cloudyi.xyz/api/v1/call_statistics?destination=/api/v1/motd',{
        headers: {
            Accept: 'application/json',
        },
    }).then((res) => {
        data.value = res.data;
    }).catch((err) => {
        console.log(err);
    });
 }

const resizeCharts = () => {

nextTick(() => {
  minuteChart.value?.resize();
  hourChart.value?.resize();
  dayChart.value?.resize();
  monthChart.value?.resize();
});
};

onMounted(async() =>{  
    await getData();
    minuteChart.value = echarts.init(document.getElementById('minute') as HTMLDivElement);
    hourChart.value = echarts.init(document.getElementById('hour') as HTMLDivElement);
    dayChart.value = echarts.init(document.getElementById('day') as HTMLDivElement);
    monthChart.value = echarts.init(document.getElementById('month') as HTMLDivElement);
     let minuteOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.minute_struct.map((item) => `${item.hour + 8} 时 ${item.minute} 分`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.minute_struct.map((item) => item.count),
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
    tooltip: {},
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.value?.hour_struct.map((item) => `${item.day} 日 ${item.hour + 8} 时`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.hour_struct.map((item) => item.count),
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
    tooltip: {},
    xAxis: {
      type: 'category',
      data:  data.value?.day_struct.map((item) => `${item.month} 月 ${item.day} 日`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.day_struct.map((item) => item.count),
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
    tooltip: {},
    xAxis: {
      type: 'category',
      data:  data.value?.month_struct.map((item) => `${item.year} 年 ${item.month} 月`),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '调用次数',
        type: 'line',
        data: data.value?.month_struct.map((item) => item.count),
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
        <div id="minute" style="width:100%;height: 400px;"></div>
        </div>
    </div>



    <div class="cards">
        <div class="cardtitle">每小时调用次数</div>
        <div class="cardcontent">
        <div id="hour" style="width:100%;height: 400px;"></div>
        </div>
    </div>

    <div class="cards">
        <div class="cardtitle">每日调用次数</div>
        <div class="cardcontent">
        <div id="day" style="width:100%;height: 400px;"></div>
        </div>
    </div>

    <div class="cards">
        <div class="cardtitle">每月调用次数</div>
        <div class="cardcontent">
        <div id="month" style="width:100%;height: 400px;"></div>
        </div>
    </div>

    
</div>
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
  border: solid 1px #dcdfe6;  
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
}

.cards:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
}

  .cardtitle {
    padding: 10px;
    height: 44px;
    border-bottom: solid 1px #dcdfe6;  
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