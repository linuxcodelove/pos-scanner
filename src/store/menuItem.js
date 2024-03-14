import { defineStore } from "pinia";
export default defineStore("menuItem", {
  state: () => ({
    items: [
      {
        name: "Smirnoff",
        id: 1,
        type: "Vodka",
      },
      {
        name: "Bacardi Black",
        id: 2,
        type: "Rum",
      },
      {
        name: "Jagermiester",
        id: 3,
        type: "Liqueur",
      },
      {
        name: "Jack Daniels",
        id: 4,
        type: "Whisky",
      },
      {
        name: "Ballentines Finest",
        id: 5,
        type: "Whisky",
      },
      {
        name: "Budweiser",
        id: 6,
        type: "Beer",
      },
      {
        name: "Johnnie walker",
        id: 7,
        type: "Whisky",
      },
      {
        name: "Red label",
        id: 8,
        type: "Whisky",
      },
      {
        name: "Baileys",
        id: 9,
        type: "Liqueur",
      },
    ],
  }),
  getters: {
    findItem: (state) => (id) => state.items.find((item) => item.id === id),
  },
});
