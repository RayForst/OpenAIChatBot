<template>
  <div
    class="fixed bottom-5 right-5 bg-white rounded-[10px] shadow-lg flex flex-col overflow-hidden"
    :class="isMobile ? 'w-full h-full' : 'w-[360px] h-[480px]'"
  >
    <!-- Шапка окна -->
    <div class="flex justify-between items-center p-4 border-b">
      <h3 class="font-semibold">Чат-ассистент</h3>
      <button
        @click="$emit('closeChat')"
        class="w-[20px] h-[20px] flex items-center justify-center hover:text-gray-300"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Сообщения -->
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

    <!-- Ввод сообщения -->
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
export default {
  name: "ChatWindow",
  props: {
    messages: Array,
    loading: Boolean,
    error: String,
    userMessage: String
  },
  computed: {
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    messages: {
      handler() {
        this.scrollToBottom();
      },
      deep: true
    }
  },
  methods: {
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
