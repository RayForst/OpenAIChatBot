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

<script setup>
import { ref, watch, onMounted } from "vue";
import ChatBubble from "./ChatBubble.vue";
import ChatWindow from "./ChatWindow.vue";
import { loadMessages, saveMessages } from "../services/chatStorage";
import { sendToGPT } from "../services/gptApi";

const isOpen = ref(false);
const userMessage = ref("");
const messages = ref([]);
const loading = ref(false);
const error = ref(null);

const openChat = () => {
  isOpen.value = true;
};

const closeChat = () => {
  isOpen.value = false;
};

const sendMessage = async () => {
  if (!userMessage.value.trim()) return;

  const userText = userMessage.value.trim();
  messages.value.push({ author: "user", text: userText });
  userMessage.value = "";

  loading.value = true;
  error.value = null;

  try {
    const responseText = await sendToGPT(messages.value, userText);
    messages.value.push({ author: "assistant", text: responseText });
  } catch (e) {
    error.value = `Произошла ошибка: ${e.message || "Потрачено"}`;
  } finally {
    loading.value = false;
  }
};

const updateUserMessage = (message) => {
  userMessage.value = message;
};

onMounted(() => {
  const savedMessages = loadMessages();
  if (savedMessages && Array.isArray(savedMessages)) {
    messages.value = savedMessages;
  }
});

watch(
  messages,
  (newMessages) => {
    saveMessages(newMessages);
  },
  { deep: true }
);
</script>
