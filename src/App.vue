<script setup>
import Chat from "./components/Chat.vue";
</script>

<template>
  <main>
    <iframe
      src="https://www.aiprosync.com/about"
      class="full-page-iframe"
    ></iframe>
    <Chat />
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
