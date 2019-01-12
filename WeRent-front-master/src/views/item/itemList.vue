<template>
    <keep-alive>
        <section>
            <div class="toolbar-container container">
                <div class="search-container">
                    <v-form @submit="onSearch">
                        <v-card class="pa-3" color="transparent" flat>
                            <v-text-field class="search-item" placeholder="Search" v-model="searchStr" @input="onSearch" hide-details single-line>
                                <v-btn icon @click="onSearch">
                                    <v-icon>search</v-icon>
                                </v-btn>
                                <v-icon>search</v-icon>
                            </v-text-field>
                        </v-card>
                    </v-form>
                </div>
                <div class="toolbar-buttons-container">
                    <v-btn-toggle v-model="toggle_exclusive" class="transparent">
                        <div v-for="(category, idx) in categories" :key="idx">
                            <v-btn class="toolbar-buttons" :value="idx" flat @click="setFiltersByCategory(category)">
                                <div>{{category}}</div>
                            </v-btn>
                        </div>
                    </v-btn-toggle>
                    <v-menu transition="slide-x-transition" class="show-sort" bottom right>
                        <v-btn slot="activator" class="activator" dark>
                            Sort By
                            <v-icon class="arrow">fas fa-chevron-circle-down</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile v-for="(sorting, i) in sortings" :key="i" @click="changeSort(sorting)">
                                <v-list-tile-title>{{ sorting }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <div class="mobile-buttons">
                <div>
                    <div class="text-xs-center">
                        <v-form @submit.prevent="onSearch">
                            <v-btn slot="activator" color="primary" dark>
                                Search
                            </v-btn>
                            <v-card class="pa-3" color="transparent" flat>
                                <v-text-field placeholder="Search" v-model="searchStr" @input="onSearch" autofocus hide-details single-line>
                                    <v-btn icon @click.stop="onSearch">
                                        <v-icon>search</v-icon>
                                    </v-btn>
                                    <v-icon>search</v-icon>
                                </v-text-field>
                            </v-card>
                        </v-form>
                        <v-menu transition="slide-x-transition" class="show-sort" bottom right>
                            <v-btn slot="activator" class="activator teal" dark>
                                Sort
                            </v-btn>
                            <v-list>
                                <v-list-tile v-for="(sorting, i) in sortings" :key="i" @click="changeSort(sorting)">
                                    <v-list-tile-title>{{ sorting }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <v-menu transition="slide-y-transition" class="show-sort" bottom>
                            <v-btn slot="activator" class="teal activator" dark>
                                Categories
                            </v-btn>
                            <v-list>
                                <v-list-tile v-for="(category, i) in categories" :key="i" @click="setFiltersByCategory(category)">
                                    <v-list-tile-title>{{ category }}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
            <ul class="items-list container">
                <li class="items" v-for="item in sortedItems" :key="item._id">
                    <item-preview :item="item" @getDistance="sortByDistance($event ,item._id)"></item-preview>
                </li>
            </ul>
        </section>
    </keep-alive>
</template>
<script>
import itemPreview from "../../components/item/itemPreview.vue";

export default {
  name: "ItemList",

  data() {
    return {
      searchStr: "",
      categories: [],
      toggle_exclusive: [],
      toggle_exclusive_2: [],
      sortings: ["Name", "Availiblity", "Price", "Distance", "Rating"],
      toggle_multiple: null,
      sortBy: ""
    };
  },

  created() {
    var header = document.querySelector("html");
    header.scrollIntoView();
    var queryString = window.location.href.replace(/.*\?/, "");
    var uParams = new URLSearchParams(queryString);
    var textParam = uParams.get("search");
    var categoryParam = uParams.get("category");
    if (textParam) this.setFiltersByTitle(textParam);
    if (categoryParam) this.setFiltersByCategory(categoryParam);
    this.loadCategories();
    this.loadItems();
  },

  mounted() {
    this.searchStr = "";
    this.onSearch();
  },

  methods: {
    onSearch() {
      var query = "search=" + this.searchStr;
      var category = this.$route.query.category;
      if (category) {
        query += "&category=" + category;
      }
      this.$router.push(`${this.$route.path}?${query}`);
      var urlStr = window.location.href;
      this.setFiltersByTitle(this.searchStr);
    },
    loadItems() {
      this.$store.dispatch({ type: "loadItems" });
    },
    loadCategories() {
      this.categories = this.$store.getters.categories;
    },
    setFiltersByCategory(category) {
      if (category !== "all") {
        this.$store.commit("setFiltersByCategory", {
          category: category
        });
      } else {
        this.$store.commit("setFiltersByCategory", {
          category: ""
        });
      }
      var query = "category=" + category;
      var search = this.$route.query.search;
      if (search) {
        query += "&search=" + search;
      }
      this.$router.push(`${this.$route.path}?${query}`);
    },

    setFiltersByTitle(txt) {
      this.$store.commit("setFiltersByTitle", { txt: txt });
    },

    changeSort(criteria) {
      this.sortBy = criteria;
    },

    sortByDistance(dist, itemId) {
      var currItem = this.sortedItems.find(item => {
        return item._id === itemId;
      });
      currItem.distance = dist;
    }
  },

  computed: {
    itemsForDisplay() {
      return this.$store.getters.itemsForDisplay;
    },

    sortedItems() {
      var itemsCopy = this.itemsForDisplay.slice();
      switch (this.sortBy) {
        case "Name":
          itemsCopy.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            else return -1;
          });
          break;

        case "Price":
          itemsCopy.sort((a, b) => {
            if (+a.price > +b.price) return 1;
            else return -1;
          });
          break;

        case "Rating":
          itemsCopy.sort((a, b) => {
            if (+a.ranking.avg > +b.ranking.avg) return -1;
            else if (+a.ranking.avg < +b.ranking.avg) return 1;
            return 0;
          });
          break;

        case "Distance":
          itemsCopy.sort((a, b) => {
            if (+a.distance > +b.distance) return 1;
            else return -1;
          });
          break;
      }
      return itemsCopy;
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
  max-width: 980px;
}

h3 {
  margin: 0;
  padding: 5px;
}
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 180px);
}
.show-sort {
  display: flex;
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
  /* border-radius: 50%; */
  width: 30px;
}

.filter {
  margin: 10px;
}

input {
  padding: 5px;
}

.v-input {
  width: 180px;
}

.v-toolbar {
  margin-bottom: 100px;
}

.v-btn {
  font-size: 0.77rem;
  background-color: white;
  // min-width: 80px;
  height: 28px;
  color: black;
  opacity: 1;
  border: none;
}

.show-sort .v-btn {
  // min-width: 60px;
  // height: 30px;
  background-color: #1da088;
  color: white;
}

.v-btn.v-btn--active {
  /* font-size: 0.5rem !important; */
  background-color: white;
  color: rgb(33, 111, 42);
  text-shadow: 0 0 3px rgb(156, 247, 138);
  opacity: 1;
  border-bottom: 1px rgb(33, 111, 42) solid;
}

.v-btn.v-btn--flat:visited {
  /* font-size: 0.5rem !important; */

  background-color: white;
  color: rgb(33, 111, 42);
  text-shadow: 0 0 3px rgb(156, 247, 138);
  opacity: 1;
  border-bottom: 1px rgb(33, 111, 42) solid;
}

.v-btn.v-btn--active::before {
  /* font-size: 0.5rem !important; */

  background-color: white;
  opacity: 1;
}
.toolbar {
  margin-bottom: 50px;
}

ul.items-list {
  margin: 0 auto;
  justify-content: center;
}

.toolbar-container {
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 90%;
}

.arrow {
  font-size: 10px;
}

.search-container {
  width: 220px;
}

.v-btn__content {
  height: 0;
}

.pa-3.v-card {
  padding: 0 !important;
}

.toolbar-buttons-container {
  display: flex;
  align-items: center;
}

// div.v-menu {
//   display: none;
// }

@media (max-width: 440px) {
  ul {
    grid-template-columns: 80vw;
    max-width: 100vw;
    padding: 10px;
    // grid-template-rows: repeat(auto-fill, 250px);
    // grid-gap: 70px;
  }

  .toolbar.item-list {
    display: none;
    font-size: 0.5rem;
  }

  .v-list-tile {
    /* background-color : rgba(222,177,0,1) !important; */
  }

  .v-list-tile-title {
    /* background-color : rgba(222,177,0,1) !important; */
  }
}
</style>


<!-- style not scoped:  -->
<style>
.v-btn-toggle .v-btn {
  /* opacity: 0.8 !important;
  color: rgb(22, 55, 11) !important; */
  padding: 0 5px 0 5px !important;
}
.transparent.v-btn {
  box-shadow: none !important;
}

.v-btn-toggle--selected {
  box-shadow: none !important;
  justify-content: flex-end;
}

button.toolbar-buttons:hover {
  /* color: green !important; */
  border-bottom: 1px solid green;
}

.item-list .v-toolbar__content {
  flex-wrap: wrap;
  height: 120px !important;
  padding-bottom: 20px;
}

.mobile-buttons {
  display: none;
}

@media (max-width: 640px) {
  div.v-menu {
    display: inline-block !important;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    color: white !important;
    margin-bottom: 16px;
  }

  .toolbar-container {
    display: none !important;
  }

  .mobile-buttons {
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
  }

  .mobile-buttons form {
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
  }

  .mobile-buttons {
    display: flex;
    justify-content: space-around;
    margin: 8px 0 12px 0;
  }

  .mobile-buttons button {
    border-radius: 5% !important;
    font-size: 0.8rem;
  }

  .v-menu__content {
    background-color: rgba(222, 222, 222, 0.94) !important;
    left: 0 !important;
    top: 50px !important;
  }
}
</style>

<style>
.activator .v-btn__content {
  justify-content: space-around !important;
  height: 20px !important;
}
</style>