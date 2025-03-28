<script setup lang="ts">
import { computed, ref } from 'vue';
import DarkModeToggle from './DarkModeToggle.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Loading from './Loading.vue';

const content = ref(null);
const syntaxHighlighting = ref(null);
const expire = ref(null);
const snaphat = ref(null);
const password = ref("");
const loading = ref(false);
const route = useRoute();

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

const textColor = computed(() => {
  return !snaphat.value ? "var(--el-color-primary)" : "var(--el-color-red)";
});


const queryClipboard = async () => {
    queryNof();
    loading.value = true;
   axios.get(`http://127.0.0.1:8080/api/v1/clipboard/query?title=${route.params.title}&password=${password.value}`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    content.value = res.data.content;
    syntaxHighlighting.value = res.data.syntax_highlighting;
    expire.value = res.data.expire;
    snaphat.value = res.data.snaphat;
    successNof();
  }).catch((error) => {
    if(error.response.status == 404){
      errorNof('剪切板不存在或已过期');
    }else{
    errorNof('查询失败，请稍后再试');

    }
  }).finally(() => {
    loading.value = false;
  });
}
queryClipboard();
</script>

<template>
          <transition name="el-zoom-in-center">
    <div class="global" v-if="content !== null">
                <el-input
                      v-model="content"
                      style="width: 100%"
                      type="textarea"
                      resize="none"
                      placeholder="请输入剪切板内容"
                      minlength="1"
                      maxlength="10000"
                      show-word-limit
                      readonly
                    />
                <div class="cards" style="border: solid 1px var(--el-br-w); margin-top: 10px;">
                  <div class="cardtitle">信息</div>
                  <div style="padding: 10px; display: flex ; flex-direction: column;gap: 10px;">

                  <div class="pl">
                    <div>标题</div>
                    <div class="pll">{{route.params.title}}</div>
                  </div>
                 <div class="pl">
                    <div>密码</div>
                    <div class="pll">{{password !== ""? password : "未设置"}}</div>
                  </div>
                <div class="pl">
                    <div>访问地址</div>
                    <div class="pll">https://sail.cloudyi.xyz/clipboard/{{route.params.title}}</div>
                </div>
                                <div class="pl">
                <div>过期时间</div>
                <div class="pll">{{expire}}</div>
                </div>
              <div class="pl">
                <div>语法高亮</div>
                <div class="pll">{{syntaxHighlighting}}</div>
                    </div>
                    <div class="pl">
                        <div>阅后即焚</div>
                        <div :style="{color: textColor}">{{snaphat ? '是' : '否'}}</div>
                    </div>

                  </div>
                </div>
        </div>
</transition>
          <transition name="el-zoom-in-center">
            <div class="global" v-if="content === null">
                <center>欢迎来到荒原 || 加载中...</center>
            </div>
            </transition>
        <Loading v-if="loading" />
    <DarkModeToggle />

</template>

<style scoped>
  .global {
    padding: 10px;
    width: 800px;
    margin: 0 auto;
  }
  .searchbar {
    width: 100%;
    /* height: 60px; */
      transition: all 0.5s ease-in-out;
  }
  .searchbar:hover {
  box-shadow: var(--sh-b);
  }
.cards {
  width: 100%;
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

.ep{
  margin-top: 10px;
  width: 800px;
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

  ::v-deep(.el-textarea__inner) {
  height: 580px !important;
}
</style>