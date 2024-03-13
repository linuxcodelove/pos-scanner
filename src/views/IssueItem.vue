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
    <app-bluetooth
      v-if="connectBt"
      :message="message"
      @connected="message = null"
    ></app-bluetooth>
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBluetooth } from "@/hooks/bluetooth.js";
import AppScanner from "@/components/Scanner.vue";
import AppBluetooth from "@/components/AppBluetooth.vue";
import useBtStore from "@/store/bluetooth";
// import { mapState } from "pinia";

export default {
  name: "IssueItem",
  components: {
    AppScanner,
    AppBluetooth,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = reactive({});
    const showScanner = ref(false);
    const btStore = useBtStore();

    function onDecode(res) {
      product.id = res;
      showScanner.value = false;
    }

    function submit() {
      router.push({ name: "home" });
    }

    const connectBt = computed(() => {
      return !btStore.bluetoothEnabled || !btStore.bluetoothConnected;
    });

    const message = computed(() =>
      !btStore.bluetoothEnabled
        ? "Bluetooth is not Enabled! Please enable Bluetooth"
        : !btStore.bluetoothConnected
        ? "Please pair bluetooth with the appropriate device!"
        : null
    );

    function findProductWeight() {
      if (connectBt.value) return;
      console.log("connected");
    }

    onBeforeMount(() => {
      // get Api using route.params.id
      isBtEnabled();
      isBtConnected();
    });

    const { isBtEnabled, isBtConnected } = useBluetooth();

    return {
      showScanner,
      product,
      route,
      connectBt,
      message,
      onDecode,
      submit,
      findProductWeight,
      isBtEnabled,
      isBtConnected,
    };
  },
};
</script>

<style></style>
