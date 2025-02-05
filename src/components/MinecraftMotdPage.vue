<script setup lang="ts">
import { computed, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'


interface MotdResponse {
  edition?: string;
  mine_craft_edition?: string;
  mine_craft_server_type?: string;
  version?: string;
  online_players: number;
  real_players?: number;
  max_players?: number;
  players?: Sample[];
  description?: string;
  descriptionRaw?: DescriptionRaw[];
  favicon?: string;
  protocol?: string;
  loader?: string;
  mod_count?: number;
  enforces_secureChat?: boolean;
  prevents_chatReports?: boolean;
  server_name?: string;
  server_id?: number;
  map?: string;
  game_mode?: string;
  nintendo_limited?: boolean;
  ipv4_port?: number;
  ipv6_port?: number;
  latency?: number;
  extra?: string;
}

interface DescriptionRaw {
  text?: string;
  color?: string;
  bold?: boolean;
  depth?: number;
}

interface Sample {
  name?: string;
  id?: string;
}

let tableData = [
  { c: 'host', t: 'string', s: '服务器地址' },
  { c: 'port', t: 'int', s: '服务器端口' },
  { c: 'type', t: 'int', s: '服务器类型 0 = Java 1.7+版本 1 = Bedrock版本 2 = JAva 1.6+ 版本 3 = Java 1.4+ 版本 4 = Java Beta3+ 版本' },
  { c: 'raw', t: 'bool', s: '是否返回原始数据' },
  { c: 'desraw', t: 'bool', s: '是否返回描述原始数据' },
  { c: 'anonymous', t: 'bool', s: '是否显示匿名玩家' },
]




import axios from 'axios';
const address = ref<string | null>(null);
const type = ref<number | null>(null);
const data = ref<MotdResponse | null>(null);



const queryNof = () => {
  ElNotification({
    title: '查询中',
    message: '正在查询',
    type: 'info',
    duration: 2000
  });

}
const successNof = () => {
  ElNotification({
    title: '成功',
    message: '查询成功',
    type: 'success',
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

const warringNof = (errMsg: string) => {
  ElNotification({
    title: '警告',
    message: errMsg,
    type: 'warning',
    duration: 2000

  });
}
const getData = () => {
    if (!address.value) {
    warringNof("请输入地址")
    return
  }

  if (!type.value) {
    warringNof("请选择游戏版本")
    return
  }

  let addrA = address.value ? address.value.split(":") : []
  let port = 0
  if (addrA && addrA.length < 2) {
    if (type.value == 1){
      port = 19132
    } else {
      port = 25565
    }
  } else {
    port = parseInt(addrA[1])
  }
    queryNof();
  axios.get(`https://satellite.cloudyi.xyz/api/v1/motd?host=${addrA[0]}&port=${port}&type=${type.value}&raw=false&desraw=false&anonymous=true`,{
    headers: {
      "Accept": "application/json",
    }
  })
  .then((res) => res.data)
  .then((jsonObj)=>{
    data.value = jsonObj;
    successNof();
  })
  .catch((_) => {
    data.value = null;
    errorNof("服务器离线或查询失败");
  });
}

const textColor = computed(() => {
  return (data.value?.latency ?? 0) <= 300 ? "var(--el-color-primary)" : "var(--el-color-red)";
});

const textColorP = computed(() => {
  return data.value?.online_players !== 0 ? "var(--el-color-primary)" : "var(--el-color-red)";
});

const textColorBC = computed(() => {
  return data.value?.online_players !== 0 ? "var(--el-bg-blue)" : "var(--el-bg-red)";
});

</script>


  <template>
  <div class="global">
      <el-input
        v-model="address"
        placeholder="地址(必填):端口(选填)"
        class="searchbar"
        size="large"
        clearable
  >
        <template #prepend>
          <el-select v-model="type" placeholder="选择版本" style="width: 120px" size="large">
            <el-option label="Java 1.7+" value=0 />
            <el-option label="Bedrock" value=1 />
            <el-option label="Java 1.5+" value=2 />
            <el-option label="Java 1.4+" value=3 />
            <el-option label="Java B3+" value=4 />
          </el-select>
        </template>
        <template #append>
          <el-button @click="getData()">
              <el-icon color="var(--el-color-primary)" ><Search /></el-icon>
          </el-button>
        </template>
      </el-input>
            <transition name="el-zoom-in-center">

        <div class="cards" v-if="data">
          <div class="cardtitle">游戏信息</div>
          <div class="cardcontent" :style="{backgroundColor: textColorBC}">
              <el-image class="fav" :src="data?.favicon" alt="favicon" key="cover" loading="lazy" v-if="data?.favicon"/>
              <div class="favr">
              <div class="pl" v-if="data?.description">
                <div>描述:</div>
                <div>{{ data?.description }}</div>
              </div>

              <div class="pl" v-if="data?.server_name">
                <div>名称:</div>
                <div>{{ data?.server_name }}</div>
              </div>

              <div class="pl">
                <div>在线玩家:</div>
                <div :style="{color: textColorP}">{{ data?.online_players }}</div>
              </div>

              <div class="pl" v-if="data?.real_players">
                <div>真实玩家:</div>
                <div :style="{color: textColorP}">{{ data?.real_players }}</div>
              </div>

                <div class="pl" v-if="data?.max_players">
                <div>可承载玩家:</div>
                <div>{{ data?.max_players }}</div>

              </div>
                <div class="pl" v-if="data?.map">
                <div>地图:</div>
                <div>{{ data?.map }}</div>
              </div>


              <div class="pl" v-if="data?.latency">
                <div>延迟:</div>
                <div :style="{ color: textColor }">{{ data?.latency }}</div>
              </div>

              <div class="pl" v-if="data?.mine_craft_edition">
                <div>服务器版本:</div>
                <div>{{ data?.mine_craft_edition }}</div>
              </div>

              <div class="pl" v-if="data?.game_mode">
                <div>游戏模式:</div>
                <div>{{ data?.game_mode }}</div>
              </div>

              <div class="pl" v-if="data?.nintendo_limited">
                <div>Nintendo Switch可加入:</div>
                <div>{{ data?.nintendo_limited }}</div>
              </div>

              <div class="pl" v-if="data?.mine_craft_server_type">
                <div>服务器类型:</div>
                <div>{{ data?.mine_craft_server_type }}</div>
              </div>

              <div class="pl" v-if="data?.server_id">
                <div>服务器Id:</div>
                <div>{{ data?.server_id }}</div>
              </div>

              <div class="pl" v-if="data?.ipv4_port">
                <div>内部Ipv4端口:</div>
                <div>{{ data?.ipv4_port }}</div>
              </div>

              <div class="pl" v-if="data?.ipv6_port">
                <div>内部Ipv6端口:</div>
                <div>{{ data?.ipv6_port }}</div>
              </div>

              <div class="pl" v-if="data?.version">
                <div>游戏版本:</div>
                <div>{{ data?.version }}</div>
              </div>


              <div class="pl" v-if="data?.protocol">
                <div>协议版本:</div>
                <div>{{ data?.protocol }}</div>
              </div>

              <div class="pl" v-if="data?.loader">
                <div>加载器:</div>
                <div>{{ data?.loader }}</div>
              </div>

              <div class="pl" v-if="data?.mod_count">
                <div>模组数量:</div>
                <div>{{ data?.mod_count }}</div>
              </div>

              <div class="pl" v-if="data?.edition">
                <div>查询版本:</div>
                <div>{{ data?.edition }}</div>
              </div>

              </div>
          </div>
        </div>
        </transition>

      <transition name="el-zoom-in-center">
        <div class="cards" v-if="data?.players">
          <div class="cardtitle">玩家信息</div>
          <div class="cardcontentpl">
                <el-table :data="data?.players" style="width: 100%">
                <el-table-column prop="name" label="名称"/>
                <el-table-column prop="id" label="UUID"/>
              </el-table>
          </div>
        </div>
      </transition>

        <div class="cards">
          <div class="cardtitle">接口信息</div>
          <div class="cardcontentapi">
              <div class="pl">
                <div>请求地址:</div>
                <div class="pll" type="primary">https://satellite.cloudyi.xyz/api/v1/motd</div>
              </div>
              <div class="pl">
                <div>请求方法:</div>
                <div class="pll" type="primary">GET</div>
              </div>
              <div class="pl">
                <div>请求头:</div>
                <div class="pll" type="primary">Accept: application/json</div>
              </div>
              <div class="pl">
                <div>文档地址:</div>
                <div class="pll" type="primary">https://satellite.cloudyi.xyz/swagger/index.html  </div>
              </div>
              <div class="pl">
                <div>请求参数:</div>
          </div>
          </div>
                <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="c" label="参数"/>
                <el-table-column prop="t" label="类型"/>
                <el-table-column prop="s" label="说明" />
              </el-table>
        </div>
  </div>

  </template>

  <style scoped>
  .global {
    padding: 10px;
    width: 800px;
    margin: 0 auto;
  }
  .searchbar {
    width: 800px;
    /* height: 60px; */
      transition: all 0.5s ease-in-out;
  }
  .searchbar:hover {
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
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
    display: flex;
    flex-direction: row;
    /* height: 154px; */
  }


  .cardcontentapi {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .fav{
    width: 154px;
    height: 154px;
    margin: auto;
  }



  .favr{
    padding: 10px; 
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;  
  }

.pl {
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    text-align: end;
    white-space: pre;
    
  }
.pl>:nth-child(1){
  padding-right: 10px;
  white-space: nowrap;
}

.pl>:nth-child(2){
  overflow: hidden;
  text-overflow: ellipsis;
}

.pll{
  color: var(--el-color-primary);
}

  .cardcontentpl {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}
  @media screen and (max-width: 800px) {
    .global {
      width: 100%;
    }
    .searchbar {
      width: 100%;
    }
    .cards {
      width: 100%;
    }
    
    .cardcontent {
    display: flex;
    flex-direction: column;
  }

  }
  </style>
