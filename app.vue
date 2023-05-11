<template>
  <div>
    <input type="text" v-model="url" />
    <button @click="get()">GET</button>
  </div>
</template>

<script setup lang="ts">
const url = ref("")

async function get() {
  await $fetch("/api/video", { method: "POST", body: { url: url.value } })
}
</script>
