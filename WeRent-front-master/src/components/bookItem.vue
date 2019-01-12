<template>
    <div class="book-page">
        <confirm-modal :open="open" @closeModal="closeModal"></confirm-modal>
        <div class="d-flex flex-column">
            <div class="close-deal d-flex">
                <div>
                    <img class="main-image" :src="item.images[0]">
                </div>
                <div class="details">
                    <h1>Hi {{user.name}}!</h1>
                    <br /> You chose to rent {{item.title}}
                    <p>From {{owner.name}} </p>
                    <p> Pickup address is: {{owner.address}}</p>
                    <p>
                      <!-- Start Date: {{dealDetails.firstDay}} <br />
            Last Date: {{dealDetails.lastDay}} <br /> -->
                        <!-- Days Count: {{dealDetails.daysToRent}} <br /> -->
                        In date: {{selectedDateRent | moment('DD-MM-2018')}}
                        <br /> Price Per Day: {{item.price}}$
                        <br />
                        <!-- Price: {{totalCost}}$ -->
                    </p>
                    <!-- <v-flex class="d-inline-flex">
            <div class="date-picker-schedual table-container">
                <v-date-picker header-color="blue" @input="calculateFirstDate" v-model="dealDetails.firstDay" :allowed-dates="allowedDates" :min="today"></v-date-picker>
            </div>
            <div class="date-picker-schedual table-container">
                <v-date-picker header-color="blue" @input="daysCount" v-model="dealDetails.lastDay" :allowed-dates="allowedDates" :min="dealDetails.firstDay||today"></v-date-picker>
            </div>
        </v-flex> -->
                    <button class="btn bold-font" @click.prevent="approveDeal">Submit</button>
                    <br />
                    <button class="btn cancel bold-font" @click.prevent="cancel">Cancel</button>
                    <br />
                </div>
            </div>

            <br>
            <hr/>
            <br>

            <div>
                <h2>Similar items you might be intrested:</h2>
                <ul class="items-list" v-if="itemsForDisplay">
                    <li v-for="item in itemsForDisplay" :key="item._id">
                        <item-preview :item="item"></item-preview>
                    </li>
                </ul>
                <!-- <item-list-category :item="item._id" :category="item.category"></item-list-category> -->
                <!-- <div class="spacer"> -->
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import datePicker from "./datePicker.vue";
import confirmModal from "./confirmModal.vue";
// import itemListCategory from "../views/item/itemListCategory.vue";
import itemPreview from "../components/item/itemPreview.vue";

export default {
  name: "BookItem",
  props: ["selectedDate"],
  data() {
    return {
      firstDateTimeStamp: null,
      secDateTimeStamp: null,
      today: null,
      open: false,
      daysToRent: 1,
      firstDay: null,
      lastDay: null,
      dealDetails: {
        itemId: null,
        ownerId: null,
        isNew: true,
        price: null,
        renterId: null,
        dates: null,
        transactionTimeStamp: Date.now()
      },
      owner: null
    };
  },
  created() {
    this.loadItem(this.$route.params.id);
    this.todayDate();
    var header = document.querySelector("html");
    header.scrollIntoView();
  },
  methods: {
    loadItem(itemId) {
      this.$store
        .dispatch({ type: "loadItemById", itemId })
        .then(item => {
          return this.$store.dispatch({
            type: "loadOwnerById",
            ownerId: item.ownerId
          })
          .then(owner => this.owner = owner);
        })
        .then(item => {
          this.loadFirstData();
          this.$store.commit({
            type: "setFilterItems",
            category: this.item.category
          });
        });
    },
    loadFirstData() {
      this.dealDetails.itemId = this.$route.params.id;
      this.dealDetails.ownerId = this.$store.getters.itemOwner._id;
      this.dealDetails.renterId = this.$store.getters.loggedinUser._id;
      this.dealDetails.dates = this.selectedDate;
      this.dealDetails.price = this.item.price;
    },
    todayDate() {
      var result = "";
      var month = "";
      var d = new Date();
      if (d.getMonth() + 1 < 10) {
        month = "0" + (d.getMonth() + 1);
      } else {
        month = d.getMonth() + 1;
      }
      result += d.getFullYear() + "-" + month + "-" + d.getDate();
      this.today = result;
    },
    approveDeal() {
      var item = { ...this.$store.getters.selectedItem };
      let datesArray = JSON.parse(JSON.stringify(item.occupiedDates));
      datesArray.push(this.dealDetails.dates);
      item.occupiedDates = datesArray;
      this.$store
        .dispatch({
          type: "updateItem",
          item: item
        })
        .then(() => {
          this.$store
            .dispatch({
              type: "newTransaction",
              trans: this.dealDetails
            })
            .then(() => {
              this.open = true;
              this.$socket.emit("new-order", this.dealDetails.ownerId);
            });
        });
    },
    cancel() {
      this.$emit("cancel-deal");
    },
    closeModal() {
      this.open = false;
    }
    // exitFirst() {
    //   this.modal1 = false;
    //   this.firstDay = "";
    // },
    // exitSec() {
    //   this.modal2 = false;
    //   this.lastDay = "";
    // },
    // allowedDates(dateStr) {
    //   // console.log(this.unAvailableDates);

    //   return !this.unAvailableDates.includes(dateStr);
    // },

    // allowedDates(dateStr) {
    //   return !this.$store.getters.selectedItem.occupiedDates.includes(dateStr);
    // },
    // calculateFirstDate() {
    //   var firstDay = this.dealDetails.firstDay || this.today;
    //   var date = new Date(firstDay).getTime() / 1000;
    //   this.firstDateTimeStamp = date;
    //   daysCount();
    // },
    // daysCount() {
    //   var last = this.dealDetails.lastDay || this.dealDetails.firstDay;
    //   var date = new Date(last).getTime() / 1000;
    //   this.dealDetails.daysToRent = (date - this.firstDateTimeStamp)/86400;
    // }
  },
  computed: {
    // owner() {
    //   return this.$store.getters.itemOwner;
    // },
    item() {
      return this.$store.getters.selectedItem;
    },
    selectedDateRent() {
      return this.selectedDate || this.today;
    },
    itemsForDisplay() {
      return this.$store.getters.filteredItems;
    },
    user() {
      return this.$store.getters.loggedinUser;
    }
    // totalCost() {
    //   return (
    //     this.$store.getters.selectedItem.price * this.dealDetails.daysToRent
    //   );
    // }
  },
  components: {
    // datePicker,
    itemPreview,
    confirmModal
    // itemListCategory
  }
};
</script>

<style lang="scss" scoped>
.book-page {
  text-align: left;
  // width: 100vw;
  // margin: 5px 20px;
  margin: 10px 35px;
}

.details {
  // width: 50%;
  width: 20%;
  text-align: left;
}

.close-deal {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-size: 1em;
  align-items: center;
}

.main-image {
  max-width: 300px;
  margin: 10px 0px;
}

.btn {
  width: 40%;
  height: 2em;
  font-size: 1.2em;
  color: #f6f6f6;
  border: 0;
  margin: 5px 0px;
  background-color: #1da088;
  cursor: pointer;
}

.cancel {
  background-color: lightgray;
}

.btn:hover {
  opacity: 0.8;
}

.btn-book {
  background-color: #1da088;
  // color: #fff;
}

.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
  box-shadow: none;
}

.spacer {
  margin: 0px 10px;
}

.date-picker-schedual {
  // background-color: aliceblue;
  z-index: 2;
}
.table {
  height: 115px;
  width: min-content;
}
.v-picker {
  height: 360px;
}
.v-date-picker-table {
  height: 210px;
}

.table-container {
  margin: 10px;
}

h2 {
  margin: 10px 0px;
}

.container {
  padding: 0 20px;
}

h3 {
  margin: 0;
  padding: 5px;
}

ul {
  list-style-type: none;
  padding: 20px;
  display: grid;
  justify-content: space-evenly;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 200px);
}

// li {
// margin: 20px 20px;
// width: 20%;
// }

a {
  text-decoration: none;
  color: #273e74;
}

a:visited {
  color: none;
}

.v-btn.v-btn {
  // background-color: white;
  // color: rgb(4, 4, 73);
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

@media (max-width: 700px) {
  .close-deal {
    flex-direction: column;
  }
  .details {
    width: 90%;
    text-align: center;
  }
  .btn {
    width: 90%;
  }
  .main-image {
    max-width: 200px;
  }
}
</style>
