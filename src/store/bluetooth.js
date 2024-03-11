import { defineStore } from "pinia";

export default defineStore("bluetooth", {
  state: () => ({
    bluetoothEnabled: false,
    bluetoothConnected: false,
    devicesList: [],
  }),
  actions: {},
});
