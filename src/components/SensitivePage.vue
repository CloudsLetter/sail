<script setup lang="ts">
import { ref } from 'vue';
import DarkModeToggle from './DarkModeToggle.vue';
import Loading from './Loading.vue';
import axios from 'axios';
interface MotdResponse {
  message?: string;
  sensitive_words?: object[];
}



let tableData = [
  { c: 'keywords', t: 'string', s: '需查询目标' },
]




const data = ref<MotdResponse | null>(null);
const content = ref<string | null>(null);
const sensitive_words = ref<string | null>(null);
const loading = ref(false);
const sentiveData = ref<{ c: string; t: any }[]>([])

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
    if (!content.value) {
    warringNof("请输入查询内容")
    return
  }

sentiveData.value = []
  loading.value = true;
  queryNof();
  axios.post(`http://satellite.cloudyi.xyz/api/v1/sensitive`,{
    keywords: content.value,
  },{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
  .then((res) => res.data)
  .then((jsonObj)=>{
    data.value = jsonObj;
    loading.value = false;
    let tmpsebnsitive = `<center><span style="color: var(--el-color-primary)">无敏感词</span></center>`;
    if(jsonObj.status_code !== 4){
    tmpsebnsitive = content.value === null ? "" : `${content.value}`;
    Object.keys(jsonObj.sensitive_words).forEach((key) => {
      sentiveData.value.push({ c: key, t: jsonObj.sensitive_words[key] });
      tmpsebnsitive = tmpsebnsitive.replace(new RegExp(key, "g"), `<span style="color: var(--el-color-red);">${key}</span>`);
    })
    }
    sensitive_words.value = tmpsebnsitive;
    successNof();

})
.catch((_) => {
      sensitive_words.value = null;

    data.value = null;
    loading.value = false;
    errorNof("查询失败");
  });
}


</script>


  <template>
  <div class="global">
                <el-input
                      class="cards"
                      v-model="content"
                      style="width: 100%"
                      type="textarea"
                      resize="none"
                      placeholder="请输入查询内容"
                      minlength="1"
                      maxlength="10000"
                      show-word-limit
                    >
                  </el-input>

                  <el-button
                    class="searchbar"
                    style="width: 100%; margin-top: 10px;"
                    type="primary"
                    @click="getData"
                    :disabled="loading"
                    >查询</el-button>

        <transition name="el-zoom-in-center">
                    <div v-html="sensitive_words" class="cards" style="border: solid 1px var(--el-br-w); padding: 10px;" v-if="sensitive_words !== null"></div>
      </transition>
    <transition name="el-zoom-in-center">
           <div class="cards" style="border: solid 1px var(--el-br-w);" v-if="sentiveData.length !== 0">
               <div class="cardtitle">敏感词信息</div>
                         <div class="cardcontentapi">
                             <el-table :data="sentiveData" style="width: 100%;">
                             <el-table-column prop="c" label="词语"/>
                             <el-table-column prop="t" label="位置"/>
                   </el-table>
                         </div>
               </div>
      </transition>


      <div class="cards" style="border: solid 1px var(--el-br-w);">
          <div class="cardtitle">接口信息</div>
          <div class="cardcontentapi">
              <div class="pl">
                <div>请求地址:</div>
                <div class="pll" type="primary">https://satellite.cloudyi.xyz/api/v1/sensitive</div>
           </div>
              <div class="pl">
                <div>请求方法:</div>
                <div class="pll" type="primary">POST</div>
              </div>
              <div class="pl">
                <div>请求头:</div>
                <div class="pll">Accept: application/json</div>
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
<Loading v-if="loading" />
<DarkModeToggle />
  

  </template>

  <style scoped>
  .global {
    padding: 10px;
    width: 800px;
    margin: 0 auto;
  }
.cards {
  width: 100%;
  border-radius: 4px;
  margin-top: 10px;
  transition: box-shadow 0.5s ease-in-out;

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
.ep{
  margin-top: 10px;
  width: 800px;
}

  ::v-deep(.el-textarea__inner) {
  height: 300px !important;
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
  .ep {
    width: 100%;
  }

  }
  </style>
