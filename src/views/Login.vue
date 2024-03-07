<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card class="pa-8" max-width="500" max-height="400" flat>
      <v-form v-model="formValid">
        <v-row>
          <v-col cols="12" style="height: 120px; width: 300px">
            <v-img
              src="http://staging-pos.digitory.com/img/Light_Transparent.6bab865f.png"
            ></v-img>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Email"
              v-model="form.email"
              solo
              flat
              type="text"
              prepend-icon="mdi-email-outline"
              hide-details="auto"
              :rules="[rules.required, rules.email]"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password"
              v-model="form.password"
              solo
              flat
              type="text"
              prepend-icon="mdi-lock-open-outline"
              hide-details="auto"
              :rules="[rules.required, rules.password]"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn color="#ff5a10" :disabled="!formValid" @click.prevent="login"
              >Login</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { rules } from "@/helpers/validation.js";
export default {
  name: "AppLogin",
  setup() {
    const form = reactive({
      email: "admin@bobsbar.in",
      password: "welcome123",
    });
    let formValid = ref(false);
    const router = useRouter();

    function login() {
      router.push({ name: "home" });
    }
    return {
      form,
      formValid,
      rules,
      login,
    };
  },
};
</script>

<style></style>
