<template>
  <form @submit.prevent="handleSubmit" class="p-4 border-t flex items-center">
    <input
      type="text"
      :value="userMessage"
      @input="updateUserMessage($event.target.value)"
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
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  userMessage: String
});

const emit = defineEmits(["updateUserMessage", "sendMessage"]);

const handleSubmit = () => {
  emit("sendMessage");
};

const updateUserMessage = (message) => {
  emit("updateUserMessage", message);
};
</script>
