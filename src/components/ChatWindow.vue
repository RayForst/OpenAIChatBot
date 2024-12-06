<template>
  <div
    ref="chatWindow"
    class="fixed bg-white rounded-[10px] shadow-lg flex flex-col overflow-hidden"
    :style="windowStyles"
  >
    <div class="flex justify-between items-center p-4 border-b">
      <h3 class="font-semibold">{{ chatTitle }}</h3>
      <button
        @click="animateClose"
        class="w-[20px] h-[20px] flex items-center justify-center hover:text-gray-300"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <ChatMessages
      class="flex-1 overflow-y-auto p-4 transition-opacity duration-300"
      :class="[isContentHidden ? 'opacity-0 pointer-events-none' : '']"
      :messages="messages"
      :loading="loading"
      :error="error"
    />

    <ChatForm
      class="p-4 border-t flex items-center transition-opacity duration-300"
      :class="[isContentHidden ? 'opacity-0 pointer-events-none' : '']"
      :userMessage="userMessage"
      @updateUserMessage="$emit('updateUserMessage', $event)"
      @sendMessage="$emit('sendMessage')"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import anime from "animejs";
import ChatForm from "./ChatForm.vue";
import ChatMessages from "./ChatMessages.vue";
import { useChatAnimations } from "../composables/useChatAnimations";

const props = defineProps({
  messages: Array,
  loading: Boolean,
  error: String,
  userMessage: String
});

const emit = defineEmits([
  "updateUserMessage",
  "sendMessage",
  "animationComplete",
  "closeChat"
]);

const chatWindow = ref(null);
const isContentHidden = ref(true);
const chatTitle = import.meta.env.VITE_APP_CHAT_TITLE || "Чат-ассистент";

const isMobile = computed(() => window.innerWidth <= 768);
const windowStyles = computed(() =>
  isMobile.value ? "bottom: 0; right: 0;" : "bottom: 20px; right: 20px;"
);

const { animateOpen, animateClose } = useChatAnimations({
  chatWindow,
  isContentHidden,
  emit,
  isMobile
});

onMounted(() => {
  animateOpen();
});
</script>
