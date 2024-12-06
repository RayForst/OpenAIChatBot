<template>
  <div class="font-roboto">
    <button
      ref="bubbleButton"
      v-show="!isOpen"
      @click="openChat"
      class="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#0066ff] rounded-full flex items-center justify-center shadow-lg hover:bg-[#0052cc] transition-all duration-300"
    >
      <i class="fas fa-comment text-white text-xl"></i>
    </button>

    <div
      ref="chatWindow"
      v-show="isOpen"
      class="fixed bottom-5 right-5 bg-white rounded-[10px] shadow-lg flex flex-col overflow-hidden"
      style="width: 60px; height: 60px"
    >
      <div v-show="animationComplete" class="flex flex-col h-full">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="font-semibold">Чат-ассистент</h3>
          <button
            @click="closeChat"
            class="w-[20px] h-[20px] flex items-center justify-center hover:text-gray-300"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 anim" ref="messagesContainer">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="[
              'mb-4',
              msg.author === 'user' ? 'text-right' : 'text-left'
            ]"
          >
            <div
              :class="[
                'inline-block p-3 rounded-lg max-w-[80%]',
                msg.author === 'user'
                  ? 'bg-[#0066ff] text-white'
                  : 'bg-gray-100'
              ]"
            >
              {{ msg.text }}
            </div>
          </div>

          <div v-if="loading" class="mb-4 text-left">
            <div class="inline-block p-3 rounded-lg max-w-[80%] bg-gray-100">
              набирает...
            </div>
          </div>

          <div v-if="error" class="text-red-300 p-2">
            {{ error }}
          </div>
        </div>

        <form
          @submit.prevent="sendMessage"
          class="p-4 border-t flex items-center"
        >
          <input
            type="text"
            v-model="userMessage"
            @keydown.enter="sendMessage"
            placeholder="Введите сообщение..."
            class="flex-1 p-2 border rounded-lg mr-2 focus:outline-none focus:border-[#0066ff]"
          />
          <button
            type="submit"
            class="w-[50px] h-[50px] bg-[#0066ff] text-white rounded-lg flex items-center justify-center hover:bg-[#0052cc]"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import { loadMessages, saveMessages } from "../services/chatStorage";
import { sendToGPT } from "../services/gptApi";

export default {
  name: "ChatBubble",
  data() {
    return {
      isOpen: false,
      userMessage: "",
      messages: [],
      loading: false,
      error: null,
      animationComplete: false
    };
  },
  mounted() {
    const saved = loadMessages();
    if (saved && Array.isArray(saved)) {
      this.messages = saved;
    }
  },
  watch: {
    messages: {
      deep: true,
      handler(newVal) {
        saveMessages(newVal);
      }
    }
  },
  methods: {
    openChat() {
      this.isOpen = true;
      this.animationComplete = false;
      const chatWindow = this.$refs.chatWindow;

      anime({
        targets: chatWindow,
        width: ["60px", "360px"],
        height: ["60px", "480px"],
        borderRadius: ["50%", "10px"],
        duration: 300,
        easing: "easeInOutQuad",
        complete: () => {
          this.animationComplete = true;
          this.scrollToBottom();
        }
      });
    },
    closeChat() {
      const chatWindow = this.$refs.chatWindow;

      anime({
        targets: chatWindow,
        width: ["360px", "60px"],
        height: ["480px", "60px"],
        borderRadius: ["10px", "50%"],
        duration: 300,
        easing: "easeInOutQuad",
        complete: () => {
          this.isOpen = false;
        }
      });
    },
    async sendMessage() {
      if (!this.userMessage.trim()) return;
      const userText = this.userMessage.trim();
      this.messages.push({ author: "user", text: userText });
      this.userMessage = "";

      this.loading = true;
      this.error = null;

      try {
        const responseText = await sendToGPT(this.messages, userText);
        this.messages.push({ author: "assistant", text: responseText });
      } catch (e) {
        this.error = "Произошла ошибка: " + (e.message || "Потрачено");
      } finally {
        this.loading = false;
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  }
};
</script>
