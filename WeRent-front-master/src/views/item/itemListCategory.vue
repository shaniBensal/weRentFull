<template>
    <section>
        <ul class="items-list" v-if="itemsForDisplay">
            <li v-for="item in itemsForDisplay" :key="item._id">
                <item-preview @click.native="goToItemDetails(item._id)" :item="item"></item-preview>
            </li>
        </ul>
    </section>
</template>

<script>
import itemPreview from "../../components/item/itemPreview.vue";

export default {
  name: "ItemCategoryList",
  props: ["category", "item"],

  data() {
    return {};
  },

  created() {
    this.loadItems();
  },

  methods: {
    loadItems() {
      this.$store.commit({ type: "setFilterItems", category:this.category });
    },
    goToItemDetails(){      
    }
  },

  computed: {
    itemsForDisplay() {
      return this.$store.getters.filteredItems;
    }
  },

  components: {
    itemPreview
  }
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 20px;
}

h3 {
  margin: 0;
  padding: 5px;
}

ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
    /* grid-gap: 20px; */
  /* grid-template-columns: repeat(auto-fill, 1fr); */
}

li {
  margin: 20px 20px;
}

a {
  text-decoration: none;
  color: #273e74;
}

a:visited {
  color: none;
}

button {
  cursor: pointer;
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
}


.v-btn.v-btn {
  // background-color: white;
  /* color: rgb(4, 4, 73); */
  opacity: 1;
  border: none;
}

.v-btn.v-btn--active {
  // background-color: white;
  color: rgb(33, 111, 42);
  text-shadow: 0 0 3px rgb(156, 247, 138);
  opacity: 1;
  border-bottom: 1px rgb(33, 111, 42) solid;
}

.v-btn.v-btn--active::before {
  // background-color: white;
  opacity: 1;
}
</style>