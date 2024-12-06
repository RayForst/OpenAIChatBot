<template>
  <button
    class="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#0066ff] rounded-full flex items-center justify-center shadow-lg hover:bg-[#0052cc] transition-all duration-300"
    @click="openChat"
  >
    <i class="fas fa-comment text-white text-xl"></i>
  </button>
</template>

<script setup>
const emit = defineEmits(["openChat"]);

const openChat = () => {
  emit("openChat");
};
</script>
