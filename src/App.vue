<template>
  <v-app>
    <router-view />
    <v-bottom-navigation v-model="value" color="teal" grow>
      <v-btn :to="{ name: 'home' }">
        <v-icon>mdi-history</v-icon>

        Items
      </v-btn>

      <v-btn :to="{ name: 'issueditems' }">
        <v-icon>mdi-heart</v-icon>
        Issued Items
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
const value = ref(1);
</script>
<style></style>
