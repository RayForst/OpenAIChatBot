<template>
  <div
    ref="chatWindow"
    class="fixed bg-white rounded-[10px] shadow-lg flex flex-col overflow-hidden"
    :style="windowStyles"
  >
    <div class="flex justify-between items-center p-4 border-b">
      <h3 class="font-semibold">Чат-ассистент</h3>
      <button
        @click="animateClose"
        class="w-[20px] h-[20px] flex items-center justify-center hover:text-gray-300"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4" ref="messagesContainer">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['mb-4', msg.author === 'user' ? 'text-right' : 'text-left']"
      >
        <div
          :class="[
            'inline-block p-3 rounded-lg max-w-[80%]',
            msg.author === 'user' ? 'bg-[#0066ff] text-white' : 'bg-gray-100'
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
      @submit.prevent="$emit('sendMessage')"
      class="p-4 border-t flex items-center"
    >
      <input
        type="text"
        :value="userMessage"
        @input="$emit('updateUserMessage', $event.target.value)"
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
</template>

<script>
import anime from "animejs";

export default {
  name: "ChatWindow",
  props: {
    messages: Array,
    loading: Boolean,
    error: String,
    userMessage: String
  },
  data() {
    return {
      isAnimating: false
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    },
    windowStyles() {
      return "bottom: 20px; right: 20px;";
    }
  },
  mounted() {
    this.animateOpen();
  },
  methods: {
    animateOpen() {
      const chatWindow = this.$refs.chatWindow;
      chatWindow.style.position = "fixed";

      anime({
        targets: chatWindow,
        width: this.isMobile ? ["60px", "100%"] : ["60px", "360px"],
        height: this.isMobile ? ["60px", "100%"] : ["60px", "480px"],
        bottom: this.isMobile ? ["20px", "0"] : "20px",
        right: this.isMobile ? ["20px", "0"] : "20px",
        borderRadius: ["50%", "10px"],
        duration: 300,
        easing: "easeInOutQuad",
        complete: () => {
          this.$emit("animationComplete");
        }
      });
    },
    animateClose() {
      const chatWindow = this.$refs.chatWindow;

      anime({
        targets: chatWindow,
        width: this.isMobile ? ["100%", "0"] : "60px",
        height: this.isMobile ? ["100%", "0"] : "60px",
        bottom: "50px",
        right: "50px",
        borderRadius: ["10px", "10%"],
        duration: 300,
        easing: "easeInOutQuad",
        complete: () => {
          this.$emit("closeChat");
        }
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  watch: {
    messages: {
      handler() {
        this.scrollToBottom();
      },
      deep: true
    }
  }
};
</script>
