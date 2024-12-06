<template>
  <div>
    <ChatBubble v-if="!isOpen" @openChat="openChat" />

    <ChatWindow
      v-if="isOpen"
      :messages="messages"
      :loading="loading"
      :error="error"
      :userMessage="userMessage"
      @closeChat="closeChat"
      @sendMessage="sendMessage"
      @updateUserMessage="updateUserMessage"
    />
  </div>
</template>

<script>
import ChatBubble from "./ChatBubble.vue";
import ChatWindow from "./ChatWindow.vue";
import { loadMessages, saveMessages } from "../services/chatStorage";
import { sendToGPT } from "../services/gptApi";

export default {
  name: "Chat",
  components: {
    ChatBubble,
    ChatWindow
  },
  data() {
    return {
      isOpen: false,
      userMessage: "",
      messages: [],
      loading: false,
      error: null
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
    },
    closeChat() {
      this.isOpen = false;
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
      }
    },
    updateUserMessage(message) {
      this.userMessage = message;
    }
  }
};
</script>
