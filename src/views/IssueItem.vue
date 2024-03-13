<template>
  <div>
    <app-scanner
      v-if="showScanner"
      @close="showScanner = false"
      @decode="onDecode"
    ></app-scanner>

    <v-card v-else class="mx-auto">
      <v-card-text>
        <v-card-title class="">Product Name</v-card-title>
        <v-card-subtitle>Category</v-card-subtitle>
        <div class="text--primary px-4 py-2">
          relating to or dependent on charity; charitable; charitable donations.
          Pertaining to alms.<br />
          "an eleemosynary educational institution."
        </div>
        <div class="text--primary px-4 py-2">
          <v-row>
            <v-col cols="5" class="px-0">
              <v-btn flat @click="showScanner = true"
                >Scan<v-icon
                  icon="mdi-scan-helper"
                  class="ml-2"
                  color="success"
                ></v-icon
              ></v-btn>
            </v-col>
            <v-col cols="6" class="px-0">
              <v-text-field
                v-model="product.id"
                label="Product value"
                density="compact"
                hide-details
                single-line
                solo
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="px-0">
              <v-btn v-if="product.id" icon="mdi-check-circle" flat>
                <v-icon color="success"></v-icon></v-btn
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="5" class="px-0">
              <v-btn flat @click="findProductWeight"
                >Weight<v-icon
                  icon="mdi-weight"
                  class="ml-2"
                  color="success"
                ></v-icon
              ></v-btn>
            </v-col>
            <v-col cols="6" class="px-0">
              <v-text-field
                v-model="product.weight"
                label="Product weight"
                density="compact"
                hide-details
                single-line
                solo
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="px-0">
              <v-btn v-if="product.weight" icon="mdi-check-circle" flat>
                <v-icon color="success"></v-icon></v-btn
            ></v-col>
          </v-row>
        </div>
        <v-card-actions class="px-3">
          <v-btn
            :disabled="!product.id || !product.weight"
            color="teal-accent-4"
            variant="text"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar"> {{ message }}</v-snackbar>
    <v-dialog fullscreen v-model="dialog">
      <p>{{ message }}</p>
      <v-list v-if="deviceList.length">
        <v-list-item
          v-for="device in deviceList"
          :key="device.id"
          :title="device.name"
          :subtitle="device.id"
          @click="deviceSelected(device.id)"
        ></v-list-item>
      </v-list>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBluetooth } from "@/hooks/bluetooth.js";
import AppScanner from "@/components/Scanner.vue";
import useBtStore from "@/store/bluetooth";

const route = useRoute();
const router = useRouter();
const product = reactive({});
const showScanner = ref(false);
const btStore = useBtStore();

const onDecode = (res) => {
  product.id = res;
  showScanner.value = false;
};

const submit = () => {
  console.log(product, "product");
  router.push({ name: "home" });
};

const snackbar = ref(false);
const message = ref(null);
const dialog = ref(false);

const deviceList = computed(() => {
  return btStore.devicesList;
});

const findProductWeight = () => {
  isBtEnabled();
  isBtConnected();
  if (!btStore.bluetoothEnabled) {
    message.value = "Bluetooth is not Enabled! Please enable Bluetooth";
    snackbar.value = true;
  } else if (!btStore.bluetoothConnected) {
    getBtDevicesList();
    message.value = "Please pair bluetooth with the appropriate device!";
    dialog.value = true;
  } else {
    getData((result) => {
      product.weight = result;
    });
  }
};

const deviceSelected = (id) => {
  dialog.value = false;
  connectDevice(id, (result) => {
    message.value = result ? "Device paired successfully!" : "Pairing Failed!";
    snackbar.value = true;
    isBtConnected();
  });
};

onBeforeMount(() => {
  // get Api using route.params.id
  console.log(route.query, "query");
  isBtEnabled();
  isBtConnected();
});

const { isBtEnabled, isBtConnected, getBtDevicesList, connectDevice, getData } =
  useBluetooth();
</script>

<style></style>
