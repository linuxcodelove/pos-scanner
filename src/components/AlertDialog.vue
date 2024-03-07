<template>
  <v-alert :text="message" :title="title" :type="type">
    <v-btn @click="$emit('close')">Dismiss</v-btn>
  </v-alert>
</template>

<script>
export default {
  props: ["message", "title", "type"],
  setup() {
    return {};
  },
};
</script>

<style></style>
