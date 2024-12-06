<script setup>
import ChatBubble from "./components/ChatBubble.vue";
</script>

<template>
  <main>
    <iframe
      src="https://www.aiprosync.com/about"
      class="full-page-iframe"
    ></iframe>
    <ChatBubble />
  </main>
</template>

<style scoped>
.full-page-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
