<script setup lang="ts">
import { ref } from 'vue';
import DarkModeToggle from './DarkModeToggle.vue';

const title = ref(null);
const content = ref(null);
const syntaxHighlighting = ref(null);
const expire = ref(null);
const snaphat = ref(null);

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

</script>

<template>
    <div class="global">

    <div class="cards">
        <div class="cardtitle">剪切板</div>
        <div class="cardcontent">
        <!-- <el-skeleton style="height: 400px; width: 100%" :rows="10" :loading="!data"> -->
                <div style="width:100%;  padding: 10px;">

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
                <div>
                    <el-input
                      class="ep"
                      v-model="title"
                      style="width: 100%"
                      type="text"
                      placeholder="请输入剪切板标题"
                      minlength="1"
                      maxlength="20"
                      show-word-limit
                    />
                <el-input
                      class="ep"
                      v-model="expire"
                      style="width: 100%"
                      type="text"
                      placeholder="请输入剪切板过期时间(单位:天)"
                      minlength="1"
                      maxlength="20"
                      show-word-limit
                    />
                <el-input
                      class="ep"
                      v-model="syntaxHighlighting"
                      style="width: 100%"
                      type="text"
                      placeholder="请输入剪切板语法高亮语言(如:python)"
                      minlength="1"
                      maxlength="20"
                      show-word-limit
                    />
                <el-button class="ep" style="width: 100%" type="primary" @click="queryNof">创建</el-button>
                </div>
                 </div>
        <!-- </el-skeleton> -->
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
  .searchbar {
    width: 800px;
    /* height: 60px; */
      transition: all 0.5s ease-in-out;
  }
  .searchbar:hover {
  box-shadow: var(--sh-b);
  }
.cards {
  width: 800px;
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