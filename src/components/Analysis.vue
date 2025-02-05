<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import axios from 'axios';


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


const data = ref<DataStructure | null>(null);
const echarts: any = inject('$echarts');


onMounted(async () =>{
    await axios.get('https://satellite.cloudyi.xyz/api/v1/call_statistics?destination=/api/v1/motd',{
        headers: {
            Accept: 'application/json',
        },
    }).then((res) => {
        data.value = res.data;
    }).catch((err) => {
        console.log(err);
    });
    const minuteDom = echarts.init(document.getElementById('minute') as HTMLDivElement);
    const hourDom = echarts.init(document.getElementById('hour') as HTMLDivElement);
    const dayDom = echarts.init(document.getElementById('day') as HTMLDivElement);
    const monthDom = echarts.init(document.getElementById('month') as HTMLDivElement);
    console.log(data.value?.minute_struct);
     let minuteOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.minute_struct.map((item) => item.minute),
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
      },
    ],
  };
    let hourOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.hour_struct.map((item) => item.hour + 8),
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
      },
    ],
    };

    let dayOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.day_struct.map((item) => item.day),
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
      },
    ],
    };

    let monthOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.value?.month_struct.map((item) => item.month),
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
      },
    ],
    };


    minuteDom.setOption(minuteOption);
    hourDom.setOption(hourOption);
    dayDom.setOption(dayOption);
    monthDom.setOption(monthOption);
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