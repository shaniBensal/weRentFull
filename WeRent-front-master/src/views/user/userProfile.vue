<template>
    <div class="user-profile container" v-if="user">
        <div class="user-contact-profile">
            <v-avatar size="120px" color="grey lighten-4">
                <img :src="user.image" alt="avatar">
            </v-avatar>
            <h2>{{user.name}}</h2>
            <h4>{{user.email}}</h4>
        </div>
        <div class="tabs bold-font">
            <ul class="tabs-buttons">
                <button class="tab1" @click="showItemsForRent">My items</button> |
                <button class="tab3" @click="showFavorites">My favorites</button> |
                <button class="tab4" @click="showMyRents">My Rents</button> |
                <button class="tab5" @click="showUserTrnsactions">My Rent Out
                    <v-badge overlap color="red" v-if="isNewNote">
                        <v-icon slot="badge" dark small>notifications</v-icon>
                    </v-badge>
                </button>
            </ul>
            <v-select class="tabs-switch" :items="itemsForDisplay" label="Choose category" @change="switchDisplay"></v-select>
        </div>
        <div class="user-profile-items" v-if="!transactionsState && !myOrders">
            <button class="add-item" v-if="isEditable">
                <router-link to="/item/edit" title="Add">
                    <v-icon dark>add</v-icon>
                </router-link>
            </button>
            <ul class="items-list" v-if="itemsToShow && !transactionsState && !myOrders">
                <li v-for="item in itemsToShow" :key="item._id">
                    <item-preview-for-user :item="item" :isEdit="isEditable"></item-preview-for-user>
                </li>
            </ul>
        </div>
        <my-orders v-if="myOrders" :transactions="transactions.activeTransactions"></my-orders>
        <transactions v-if="transactionsState" :transactions="transactions.passiveTransactions" @orders-checked="ordersChecked"></transactions>
    </div>

</template>
<script>
import itemList from "../item/itemList.vue";
import itemPreviewForUser from "../../components/item/itemPreviewForUser.vue";
import transactions from "../../components/transactions.vue";
import myOrders from "../../components/myOrders.vue";
import eventBus, { MESSAGES_READ } from "../../services/EventBusService.js";
export default {
  data() {
    return {
      user: null,
      userAndItems: null,
      itemsToShow: [],
      isEditable: true,
      transactionsState: false,
      myOrders: false,
      transactions: {
        passiveTransactions: [],
        activeTransactions: []
      },
      favoriteItems: [],
      checkOrders: false,
      isNewNote: false,
      itemsForDisplay: ["My Items", "Favorites", "Rent Out","My Rents"]
    };
  },

  created() {
    this.loadUser(this.$route.params.id);
    var header = document.querySelector("html");
    header.scrollIntoView();    
  },

  methods: {
    // loadUser(userId) {
    //   this.$store
    //     .dispatch({ type: "getUserWithItems", userId: userId })
    //     .then(currUser => {
    //       // console.log(currUser);
    //       this.user = currUser.user;
    //       this.userAndItems = currUser;
    //       this.itemsToShow = currUser.owendItems;
    //     });
    // },

    loadUser(userId) {
      this.user = { ...this.$store.getters.loggedinUser };
      this.$store
        .dispatch({ type: "getTransactionsByOwner", userId })
        .then(transactions => {
          this.transactions.passiveTransactions = transactions;
          this.$store
            .dispatch({ type: "getTransactionsByRenter", userId })
            .then(transactions => {
              this.transactions.activeTransactions = transactions;
              this.$store
                .dispatch({ type: "getUserWithItems", userId: userId })
                .then(currUser => {
                  this.user = currUser.user;
                  this.userAndItems = currUser;
                  this.itemsToShow = currUser.owendItems;
                  this.isNewNote = this.$store.getters.isNewNote;
                });
            });
        });
    },
    removeItem(itemId) {
      // console.log("removing...", itemId);
      this.$store
        .dispatch({ type: "deleteItem", itemId: itemId })
        .then(() => this.loadUser(this.$route.params.id));
    },
    showItemsForRent() {
      this.itemsToShow = this.userAndItems.owendItems;
      this.isEditable = true;
      this.transactionsState = false;
      this.myOrders = false;
    },
    showItemsRented() {
      this.itemsToShow = this.userAndItems.rentedItems;
      this.isEditable = false;
      this.transactionsState = false;
      this.myOrders = false;
    },
    showFavorites() {
      this.itemsToShow = this.userAndItems.favoriteItems;
      this.isEditable = false;
      this.transactionsState = false;
      this.myOrders = false;
    },
    showUserTrnsactions() {
      this.transactionsState = true;
      this.myOrders = false;
      this.itemsToShow = [];
      // this.isEditable = false;
    },
    showMyRents() {
      this.transactionsState = false;
      this.myOrders = true;
      this.itemsToShow = [];
      // this.isEditable = false;
    },
    ordersChecked() {
      this.checkOrders = true;
      if (this.isNewNote) {
        this.transactions.passiveTransactions.forEach(transaction => {
          if (transaction.isNew) {
            this.$store.dispatch({
              type: "updateTransaction",
              transaction: transaction
            });
          }
        });
        this.isNewNote = false;
        // this.loadUser(this.$route.params.id);
        this.$store.commit({
          type: "setNewNotification",
          status: false
        });
        eventBus.$emit(MESSAGES_READ);
      }
    },
    switchDisplay(value) {
      switch (value) {
        case "My Items":
          this.showItemsForRent();
          break;
        case "Favorites":
          this.showFavorites();
          break;
        case "Rent Out":
          this.showUserTrnsactions();
          break;
        case "My Rents":
        this.showMyRents();
        break;
      }
    }
  },
  computed: {
    // user(){
    //   return this.$store.getters.loggedinUser
    // }
  },
  components: {
    itemList,
    itemPreviewForUser,
    transactions,
    myOrders
  }
};
</script>


<style scoped lang="scss">
.container {
  max-width: 980px;
}

button a {
  color: white;
}

.router-link :active {
  color: white;
}

a:active {
  color: white;
}

.tabs {
  width: 100%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.tabs ul {
  color: #162044;
  list-style: none;
}

.tabs-switch {
  display: none;
}
.user-profile-items {
  background-color: rgba(211, 211, 211, 0.692);
}

.user-profile-items ul {
  list-style-type: none;
  padding: 20px;
  display: grid;
  justify-content: space-evenly;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
}

/* .user-profile-items li{
  justify-items: center;

} */

.tabs button {
  margin: 0 10px;
}

.tabs button:focus {
  border-bottom: 1px solid #00d8ae;
  outline: none;
}
.tabs button:hover {
  background-color: rgba(211, 211, 211, 0.466);
}
.user-profile-items {
  width: 100%;
}

button a {
  text-decoration-line: none;
}
.v-icon {
  text-decoration-line: none;
}

.material-icons {
  display: flex;
}
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-contact-profile {
  display: flex;
  flex-direction: column;
  position: relative;
}

.v-avatar {
  align-self: center;
}

.v-avatar img {
  object-fit: cover;
}

.add-item {
  background-color: #1da088;
  padding: 10px;
  margin: 20px 0;
  text-align: center;
  border-radius: 20px;
}

.add-item:hover {
  background-color: #00d8ae;
}

.v-badge {
  top: -22px;
}
input,
select {
  // border-bottom: 1px solid black;
  width: 50%;
  color: #162044;
  padding: 5px;
}
@media (max-width: 520px){
  .tabs {
    margin: 0px;
  }
  .tabs-buttons {
    display: none;
  }
  .tabs-switch {
    display: inline;
  }
}

@media (max-width: 440px) {
  .user-profile-items {
    grid-template-columns: repeat(auto-fill, 80%);
    padding: 20px 0px;
  }
}
</style>

<style>
.v-list__tile,
.v-select__selection--comma {
  color: black;
}
</style>



