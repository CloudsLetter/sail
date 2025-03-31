<script setup lang="ts">
import { ref } from 'vue';
import DarkModeToggle from './DarkModeToggle.vue';
import Loading from './Loading.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter(); 

const title = ref(null);
const content = ref(null);
const syntaxHighlighting = ref(null);
const expire = ref(null);
const snaphat = ref(null);
const password = ref(null);
const loading = ref(false);

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
    title: '创建中',
    message: '正在创建',
    type: 'info',
    duration: 2000
  });

}
const successNof = () => {
  ElNotification({
    title: '成功',
    message: '创建成功',
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

function generateRandomString(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const pushClipboard = async () => {
    if (!content.value) {
      warringNof('剪切板内容不能为空');
      return;
    }
    queryNof();
    loading.value = true;
   let titles = title.value ? title.value : generateRandomString(6);
   axios.post('https://satellite.cloudyi.xyz/api/v1/clipboard/add', {
    title: titles,
    content: content.value ? content.value : "",
    syntax_highlighting: syntaxHighlighting.value ? syntaxHighlighting.value : 'text',
    password: password.value ? password.value : "",
    expire: expire.value ? parseInt(expire.value) : 1,
    snapchat: snaphat.value ? snaphat.value : false,
  },{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((_) => {
      successNof();
      // window.open(res.data.data.url, '_blank');
      router.push({
        name: 'ClipboardContent',
        params: {
          title: titles,
        },
      });
  }).catch((_) => {
    errorNof('创建失败，请稍后再试');
  }).finally(() => {    
    loading.value = false;
  });
}

</script>

<template>
    <div class="global">
                <el-input
                      v-model="content"
                      style="width: 100%"
                      type="textarea"
                      resize="none"
                      placeholder="请输入剪切板内容"
                      minlength="1"
                      maxlength="10000"
                      show-word-limit
                    />

                <div class="cards" style="border: solid 1px var(--el-br-w); margin-top: 10px;">
                  <div class="cardtitle">配置</div>
                  <div style="padding: 10px; display: flex ; flex-direction: column;gap: 10px;">
                  <div style="display: flex; flex-direction: row;  justify-content: space-between;">
                    <div>标题</div>
                    <el-input
                      v-model="title"
                      style="width: 40%"
                      type="text"
                      placeholder="请输入剪切板标题(默认为随机标题)"
                      minlength="1"
                      maxlength="20"
                      show-word-limit
                    />
                  </div>
                 <div style="display: flex; flex-direction: row;  justify-content: space-between;">
                    <div>密码</div>
                    <el-input
                      v-model="password"
                      style="width: 40%"
                      type="text"
                      placeholder="请输入剪切板密码(默认为无密码)"
                      minlength="1"
                      maxlength="20"
                      show-word-limit
                    />
                  </div>
                <div style="display: flex; flex-direction: row;  justify-content: space-between;">
                <div>过期时间</div>
                      <el-select v-model="expire" placeholder="选择时间(默认为 1 天)" style="width: 40%">
                        <el-option
                          key="1"
                          label="1 天"
                          value="1"
                        />

                        <el-option
                          key="3"
                          label="3 天"
                          value="3"
                        />

                        <el-option
                          key="7"
                          label="7 天"
                          value="7"
                        />

                        <el-option
                          key="14"
                          label="14 天"
                          value="14"
                        />

                        <el-option
                          key="30"
                          label="30 天"
                          value="30"
                        />

                      </el-select>
                    </div>
              <div style="display: flex; flex-direction: row;  justify-content: space-between;">
                <div>语法高亮</div>
                      <el-select v-model="syntaxHighlighting" placeholder="选择语言(默认为text)" style="width: 40%">
                        <el-option
                          key="text"
                          label="text"
                          value="text"
                        />

                        <el-option
                          key="go"
                          label="go"
                          value="go"
                        />

                        <el-option
                          key="cpp"
                          label="cpp"
                          value="cpp"
                        />

                      </el-select>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between;">
                        <div>阅后即焚</div>
                      <el-switch
                         v-model="snaphat"
                         class="ml-2"
                         style="--el-switch-on-color: var(--el-color-primary); --el-switch-off-color: var(--el-color-red);"
                       />
                    </div>
                  </div>

                    <el-button style="width: 100%;border-bottom-left-radius: 2px; border-bottom-right-radius: 2px; border-top-left-radius: 0px; border-top-right-radius: 0px;" type="primary" @click="pushClipboard">删除剪切板</el-button>
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