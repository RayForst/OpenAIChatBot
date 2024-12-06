<script setup>
import Chat from "./components/Chat.vue";

const site = import.meta.env.VITE_APP_SITE;
</script>

<template>
  <main>
    <iframe :src="site" class="full-page-iframe"></iframe>
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
