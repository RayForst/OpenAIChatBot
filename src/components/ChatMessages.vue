<template>
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
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from "vue";

const props = defineProps({
  messages: Array,
  loading: Boolean,
  error: String
});

const messagesContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  console.log(
    "mounted",
    messagesContainer.value.scrollTop,
    messagesContainer.value.scrollHeight
  );
  scrollToBottom();
});

watch(
  () => props.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);
</script>
