<script setup lang="ts">
import { computed, ref } from 'vue';
import DarkModeToggle from './DarkModeToggle.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Loading from './Loading.vue';
const router = useRouter(); 
const content = ref(null);
const syntaxHighlighting = ref(null);
const expire = ref(null);
const snaphat = ref(null);
const password = ref("");
const loading = ref(false);
const route = useRoute();
const needPasswowrd = ref(false)
const nothas = ref(false)
const warringNof = (msg: string) => {
  ElNotification({
    title: '警告',
    message: msg,
    type: 'warning',
    duration: 2000
  });
}

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

const successNofd = () => {
  ElNotification({
    title: '成功',
    message: '删除成功',
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



const removeClipboard = async () => {
    queryNof();
    loading.value = true;
   axios.delete(`https://satellite.cloudyi.xyz/api/v1/clipboard/remove?title=${route.params.title}&password=${password.value}`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((_) => {
    successNofd();
        router.push({
        name: 'Clipboard',
      });
  }).catch((_) => {
          errorNof('删除失败，请稍后再试');
  })
}

const queryClipboard = async () => {
    queryNof();
    loading.value = true;
    if(!content.value){
    content.value = null;
    syntaxHighlighting.value = null;
    expire.value = null;
    snaphat.value = null;
    }
   axios.get(`https://satellite.cloudyi.xyz/api/v1/clipboard/query?title=${route.params.title}&password=${password.value}`,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    needPasswowrd.value = false;
    content.value = res.data.content;
    syntaxHighlighting.value = res.data.syntax_highlighting;
    expire.value = res.data.expire;
    snaphat.value = res.data.snapchat;
    successNof();
    setTimeout(() => {
      if(snaphat.value){
        if(res.data.read > 1){
          warringNof('阅后即焚功能开启，内容将会在查看后删除');
        }else{
          warringNof('阅后即焚功能开启，内容将会在下次查看后删除');
        }
      }
    }, 2000);
  }).catch((error) => {
    if(error.response.status == 404){
        nothas.value = true;
      errorNof('剪切板不存在或已过期');
    }else if(error.response.status == 403){
      if(needPasswowrd.value){
        errorNof('密码错误，请重新输入');
      }else{
        errorNof('剪切板需要密码，请输入密码后重试');
      }
            needPasswowrd.value = true;

    }else{
          errorNof('查询失败，请稍后再试');
    }
  }).finally(() => {
    loading.value = false;
  });
}
queryClipboard();
document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
</script>

<template>
              <div :class="content !== null ? 'global' : 'globals'">
            <transition name="el-zoom-in-center">
                <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;" v-if="loading && !needPasswowrd && !nothas && !content">
                                我思故我在
                  </div>
            </transition>
                <transition name="el-zoom-in-center">
                  <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;" v-if="content === null && !loading">
                  <div>荒无人烟</div>
                  <el-button  style="width: 200px; margin-top: 10px;" type="primary" @click="router.push({name: 'Clipboard'});">返回</el-button>
                </div>

               </transition>
                <transition name="el-zoom-in-center">

                  <div style="display: flex; justify-content: center; align-items: center;flex-direction: column;" v-if="needPasswowrd">
                  <el-input v-model="password" style="width: 200px" placeholder="请输入访问密码" />
                  <el-button  style="width: 200px; margin-top: 10px;" type="primary" @click="queryClipboard()">验证</el-button>
                </div>
               </transition>
                <transition name="el-zoom-in-center">

                <div v-if="content !== null">
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
                                      <el-button style="width: 100%;border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; border-top-left-radius: 0px; border-top-right-radius: 0px;" type="primary" @click="removeClipboard()">删除剪切板</el-button>

                </div>
                </div>
                               </transition>

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

  .globals{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

    .globals{
    width: 100%;
    height: var(--vh);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
