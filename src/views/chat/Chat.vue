<template>
  <el-container>
    <el-main style="height: 600px; overflow-y:auto;">
      <el-card class="box-card" v-for="(chat, idx) in chats" style="width: 60%; align-self: center; margin: auto;"
      :style="{backgroundColor: (chat.role === 'user' ? 'white' : 'whitesmoke')}">
        <div :key="idx" class="text item" v-html="mark(chat.content)" v-highlight>
        </div>
      </el-card>
    </el-main>

    <div style="margin-top: 15px; width: 60%; position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); text-align: center">
      <el-input placeholder="请输入内容" v-model="input" type="textarea" autosize style="width: 80%;">
      </el-input>
      <el-button size="small" type="info" plain @click="chatCompletion" :disabled="isChatting">发送</el-button>

    </div>
  </el-container>
</template>

<script>
import axios from "axios";
import {Configuration, OpenAIApi} from 'openai';
import {marked} from 'marked';


export default {
  name: "Chat",
  data() {
    return {
      chats: [],
      input: '',
      openai: null,
      isChatting: false
    }
  },
  computed: {

  },
  async created() {
    const configuration = new Configuration({
      apiKey: 'sk-***',
    });
    this.openai = new OpenAIApi(configuration);

    /*axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: 'post',
      headers: {
        authorization: 'Bearer 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'
      },
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "如果面试金融科技岗位，自我介绍太夸张了，吹的牛有点大，领导反问时没答上来，结果会怎么样"}],
        "stream": false
      }
    }).then(res => {
     this.content = res.data.choices[0].message.content
    })*/
  },
  methods: {
    async chatCompletion() {
      /*this.chats.push({role: 'user', content: this.input})
      this.input = ''
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: this.chats,
        stream: false,
      });
      this.chats.push(completion.data.choices[0].message);*/

      if (this.input.trim() === '') {
        return
      }
      this.isChatting = true
      this.chats.push({role: 'user', content: this.input})
      this.input = ''
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: this.chats,
          stream: true,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer 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'
        }
      })
      //获取UTF8的解码
      const encode = new TextDecoder("utf-8");
      //获取body的reader
      const reader = response.body.getReader();
      // 循环读取reponse中的内容
      this.chats.push({
        role: 'assistant',
        content: ''
      })
      while (true) {
        const {done, value} = await reader.read();
        if (done) {
          this.isChatting = false
          break;
        }
        // 解码内容
        let text = encode.decode(value);

        const lines = text.split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          const message = line.replace(/^data: /, '');
          if (message === '[DONE]') {
            this.isChatting = false
            break; // Stream finished
          }
          try {
            const parsed = JSON.parse(message);
            var content = parsed.choices[0].delta.content;
            if (content) {
              this.chats[this.chats.length - 1].content += content
            }
          } catch (error) {
            console.error('Could not JSON parse stream message', message, error);
          }
        }
      }

      // this.chats.push(completion)
    },
    mark(content) {
      return marked(content)
    }
  }
}
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
