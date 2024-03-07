<template>
  <div>
    <alert-dialog
      v-if="message"
      :message="message"
      title="Bluetooth"
      type="error"
      @close="checkBluetooth"
    ></alert-dialog>

    <v-list v-if="deviceList.length">
      <v-list-item
        v-for="device in deviceList"
        :key="device.id"
        :title="device.name"
        :subtitle="device.id"
        @click="deviceSelected(device.id)"
      ></v-list-item>
    </v-list>
  </div>
</template>

<script>
import { useBluetooth } from "@/hooks/bluetooth.js";
import { ref, onBeforeMount } from "vue";
import AlertDialog from "./AlertDialog.vue";
export default {
  components: {
    AlertDialog,
  },
  setup(_, context) {
    const enabled = ref(false);
    const connected = ref(false);
    const message = ref(null);

    onBeforeMount(() => {
      checkBluetooth();
    });

    function deviceSelected(id) {
      if (!connectDevice(id)) {
        message.value = "Device Not connected!";
        return;
      }

      context.emit("connected");
    }

    const deviceList = ref([]);
    function checkBluetooth() {
      enabled.value = isBtEnabled();
      connected.value = isBtConnected();
      if (!enabled.value) {
        message.value = "Bluetooth is not Enabled! Please enable Bluetooth";
        return;
      }
      if (!connected.value) {
        message.value = "Please pair bluetooth with the appropriate device!";
        deviceList.value = getBtDevicesList();
        return;
      }
    }

    const { isBtEnabled, isBtConnected, getBtDevicesList, connectDevice } =
      useBluetooth();
    return {
      enabled,
      connected,
      message,
      deviceList,
      isBtEnabled,
      isBtConnected,
      getBtDevicesList,
      checkBluetooth,
      connectDevice,
      deviceSelected,
    };
  },
};
</script>

<style></style>
./bluetooth.vue
