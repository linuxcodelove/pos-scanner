<template>
  <div>
    <alert-dialog
      v-if="message"
      :message="message"
      title="Bluetooth"
      type="error"
    ></alert-dialog>
    <!-- @close="checkBluetooth" -->

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
import { ref, onBeforeMount, computed, watch } from "vue";
import AlertDialog from "./AlertDialog.vue";
import useBtStore from "@/store/bluetooth";

export default {
  components: {
    AlertDialog,
  },
  props: ["message"],
  setup(_, context) {
    const enabled = ref(false);
    const connected = ref(false);
    const btStore = useBtStore();

    onBeforeMount(() => {
      // checkBluetooth();
    });

    const deviceList = computed(() => {
      console.log(btStore.devicesList, "list");
      return btStore.devicesList;
    });

    const getDevice = computed(
      () => btStore.bluetoothEnabled && !btStore.bluetoothConnected
    );

    watch(getDevice, () => {
      getBtDevicesList();
    });

    function deviceSelected(id) {
      connectDevice(id, () => context.emit("connected"));
    }

    // function checkBluetooth() {
    //   if (btStore.bluetoothEnabled && !btStore.bluetoothConnected) {
    //   }
    // }

    const { isBtEnabled, isBtConnected, getBtDevicesList, connectDevice } =
      useBluetooth();
    return {
      enabled,
      connected,
      deviceList,
      isBtEnabled,
      isBtConnected,
      getBtDevicesList,
      // checkBluetooth,
      connectDevice,
      deviceSelected,
    };
  },
};
</script>

<style></style>
./bluetooth.vue
