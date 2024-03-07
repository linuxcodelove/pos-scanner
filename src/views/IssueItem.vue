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
              <v-btn flat
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
  </div>
</template>

<script>
import { ref, reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppScanner from "@/components/Scanner.vue";
export default {
  name: "IssueItem",
  components: {
    AppScanner,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = reactive({});
    const showScanner = ref(false);

    function onDecode(res) {
      product.id = res;
      showScanner.value = false;
    }

    function submit() {
      router.push({ name: "home" });
    }

    onBeforeMount(() => {
      // get Api using route.params.id
    });

    return {
      showScanner,
      product,
      route,
      onDecode,
      submit,
    };
  },
};
</script>

<style></style>
