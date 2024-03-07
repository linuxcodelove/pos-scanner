<template>
  <v-container fluid style="height: 100vh">
    <v-card title="Inventory Items" flat>
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          single-line
        ></v-text-field>
      </template>

      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:[`item.issue`]="{ item }">
          <div>
            <v-btn icon="mdi-arrow-right-thin" @click="issue(item.id)" flat>
              <v-icon color="primary"></v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "HomeView",
  setup() {
    const router = useRouter();

    const items = [
      {
        name: "African Elephant",
        id: 1,
      },
      {
        name: "African Lion",
        id: 2,
      },
      {
        name: "Tiger",
        id: 3,
      },
    ];
    const headers = [
      {
        key: "name",
        title: "Name",
      },
      { key: "issue", title: "Issue" },
    ];
    const search = ref("");

    function issue(id) {
      router.push({ name: "issue", params: { id } });
    }

    return {
      search,
      items,
      headers,
      issue,
    };
  },
};
</script>
