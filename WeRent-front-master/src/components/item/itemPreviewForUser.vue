<template>

    <div class="item-preview" v-if="item">

        <v-card :to="'/item/' + item._id">
            <v-card-media height="10em" :src="item.images[0]">
            </v-card-media>
            <v-card-title>
              <div class="d-flex flex-column">
                <div>
                    <h4>{{item.title}}</h4>
                </div>

                <div class="d-flex card-bottom">
                    <p class="price bold-font"><br/>{{item.price}}$ per day</p>
                    <!-- <div v-if="item">

                        <v-icon small light color="yellow">fas fa-star</v-icon>
                        {{avgRank}} ({{item.ranking.count}})
                    </div> -->
                    </div>
                </div>

            </v-card-title>
            <v-card-actions v-if="isEdit" class="d-flex">
                <div class="text-xs-center d-flex">

                    <!-- <v-btn fab dark small color="teal lighten-3"> -->
                        <router-link :to="'/item/edit/'+item._id" title="Edit">
                            <v-icon dark>edit</v-icon>
                        </router-link>
                    <!-- </v-btn> -->

                    <!-- <v-btn color="red lighten-3" fab dark small > -->
                        <v-icon dark @click="removeItem(item._id)">fas fa-trash-alt</v-icon>
                    <!-- </v-btn> -->
                </div>
            </v-card-actions>
        </v-card>

        <!-- <ul v-if="isEdit">
          dates occupied:
          <li  v-for="(date,idx) in item.occupiedDates" :key="idx" v-if="isFutureDate(date)">{{date}} ({{date | moment("from")}})
            <p> </p>
             </li>
          
        </ul> -->
    </div>

</template>
<script>
import signIn from "../signIn.vue";

export default {
  name: "ItemPreview",
  props: ["item", "isEdit"],
  data() {
    return {
      isUserLoggedIn: false,
      dialog: false
    };
  },
  methods: {
    addToFavorites() {
      var currUser = this.$store.getters.loggedinUser;
      if (currUser) {
        this.isUserLoggedIn = true;
        this.$store
          .dispatch({
            type: "addItemToFavorites",
            item: this.item,
            user: currUser
          })
          .then(() => {});
      } else this.showSignIn();
      this.isUserLoggedIn = false;
    },

    showSignIn() {
      this.isUserLoggedIn = false;
      alert("please sign in");
    },

    isFutureDate(date) {
      var rentingDate = new Date(date);
      var dayAheadTimeStamp = Date.now() + 24 * 60 * 60 * 1000;
      if (+rentingDate > dayAheadTimeStamp) return true;
      return false;
    }
  },

  created() {},

  computed: {
    // title() {
    //   if (this.item.title.length > 15)
    //     return this.item.title.substring(0, 15) + "...";
    //   else return this.item.title;
    // },
    avgRank() {
      return this.item.ranking.avg.toFixed(1);
    }
  },

  watch: {
    dialog(val) {
      if (!val) return;

      setTimeout(() => (this.dialog = false), 2000);
    }
  },
  components: {
    signIn
  }
};
</script>

<style scoped lang="scss">
.card-bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.226);
  justify-content: space-between;
  padding: 5px 0;
}
p {
  margin: 0;
  font-size: 12px;
}
body {
  text-transform: capitalize;
}

ul {
  list-style: none;
}
.item-preview {
  width: 100%;
}
.v-btn__content {
  height: 0;
  color: #fff;
}

.v-btn .v-btn__content .v-icon {
  color: #fff;
}
.price {
  color: #42b983;
}
.v-card {
  margin: auto;
  width: 180px;
  background-color: white;
  transition: all 0.8s;
}

.v-card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.v-icon {
  font-size: 20px;
}

h4 {
  max-width: 140px;
  margin: 0;
  overflow: hidden;
  height: 16px;
}

p.overflow {
  margin: 0;
  font-size: 12px;
  overflow: hidden;
  height: 16px;
}
// .v-btn--icon {
//   right: 10px;
//   transition: all 0.3s;
// }

.v-card__actions {
  padding: 10px 0px;
}

.v-icon.v-icon.v-icon--link {
  width: max-content;
}

a {
  color: #42b983;
}
.v-card__media {
  height: 16em;
  margin: 0 auto;
  transition: all 0.3s;
}

.v-card__media:hover {
  opacity: 0.8;
}

.v-card__title {
  color: black;
  text-align: left;
  width: 180px;
  // height: 53px;
  padding: 10px;
}

@media (max-width: 500px) {
  .item-preview,
  .v-card {
    width: 100%;
  }
}
</style>
