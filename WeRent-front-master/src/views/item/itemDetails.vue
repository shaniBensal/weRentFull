<template>
    <section v-if="itemForDisplay">
        <book-item @cancel-deal="cancelDeal" v-if="isBooked" :selectedDate="selectedDate||null"></book-item>
        <div v-else class="main-container flex space-between">
            <div class="item-details">
                <div class="header">
                    <div>
                        <h1 class="bold-font"> {{itemForDisplay.title}}</h1>
                        <span>
                            <v-icon color="yellow">fas fa-star</v-icon>{{itemForDisplay.ranking? itemForDisplay.ranking.avg.toFixed(1) : ''}} ({{itemForDisplay.ranking?
                            itemForDisplay.ranking.count : ''}}) </span>
                    </div>
                    <div class="seller-details">
                        <div class="owner-pic" :style="{backgroundImage: `url(${owner.image})`}"></div>
                        <div class="chat-opener" @click="chatOpener">
                            <label v-if="owner">{{owner.name}} </label>
                            <a class="bold-font">
                                <i class="far fa-comments"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <p class="bold-font">
                    <i class="fas fa-dollar-sign"></i>
                    {{itemForDisplay.price}}$ per day </p>
                <p class="show-calender" @click="showCalender">
                    <i class="fas fa-calendar-alt"></i>Check Availability</p>
                <p>
                    <i class="fas fa-info"></i>{{itemForDisplay.description}}</p>
                <div class="d-flex flex-column" v-if="itemForDisplay.images">
                    <img class="main-image" :src="mainImage">
                    <div class="spacer-paragrph"></div>
                    <div class="image-gallery d-flex" v-if="itemForDisplay.images.length > 1">
                        <div v-if="itemForDisplay.images.length > 1" v-for="(image,idx) in itemForDisplay.images" :key="idx" class="small-image">
                            <img class="thumb-photo" :src="image" @click="switchMainImg(idx)">
                        </div>


                        <div class="spacer-paragrph">
                        </div>
                        <!-- <v-btn class="btn-chat">Start Chat</v-btn> -->
                    </div>
                </div>
            </div>
            <chat-socket class="chat-box" v-if="isChat" :user="user" v-bind:owner="owner"></chat-socket>
            <div class="more-details">
                <div class="show-map">
                    <div class="location" v-if="distance">
                        <i class="fas fa-map-marker-alt"></i> Pick up from:
                        <br> {{owner.address}} ( {{distance}} Km from you)
                    </div>
                    <GmapMap ref="mapRef" :center="{lat:currentLocation.lat, lng:currentLocation.lng}" :zoom="13" map-type-id="roadmap" style="width: 400px; height: 300px">
                        <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" :clickable="true" :draggable="true"
                            :icon="marker.icon" />
                    </GmapMap>
                </div>
                <div class="date-book" :class="{show: showDates}">
                    <i class="far fa-calendar-alt"></i> Availability:
                    <div class="calender">
                        <date-picker @selected-date="selectDate" v-if="itemForDisplay" :unAvailableDates="itemForDisplay.occupiedDates"></date-picker>
                    </div>
                    <sign-up-modal v-if="!user" @signedUp="bookNow"></sign-up-modal>
                    <div v-if="user && (owner.name !==user.name)">
                        <v-btn class="btn-book bold-font" @click="bookNow">Book Now</v-btn>
                    </div>
                </div>
            </div>
        </div>
        <!-- reviews -->
        <div class="reviews-container" v-if="!isBooked">
            <h2>Customer reviews</h2>
            <ul class="reviews">
                <li v-for="review in itemForDisplay.reviews" :key="review.id" v-if="review">
                    <div class="review-user-details">
                        <div class="review-img" :style="{backgroundImage: `url(${review.userImg})`}"></div>
                        <h3>{{review.userName}}</h3>
                    </div>
                    <div class="review-content">
                        <h4>
                            <span v-for="star in review.rank" :key="star">
                                ⭐
                            </span>
                        </h4>
                        <p>published: {{+review.dateCreated | moment("DD/MM/YYYY")}} </p>
                        <p>{{review.content}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
import datePicker from "../../components/datePicker.vue";
import bookItem from "../../components/bookItem.vue";
import StarRating from "vue-star-rating";
import signUpModal from "../../components/signUpModal.vue";
import { gmapApi } from "vue2-google-maps";
import mapService from "../../services/mapService.js";
import chatSocket from "../chatSocket.vue";

export default {
  name: "itemDetails",
  data() {
    return {
      isBooked: false,
      isChat : false,
      // rating: 4,
      dialog: false,
      owner: {},
      currUser: {},
      // user: {},
      selectedDate: "",
      showDates: false,
      // selectedEndDate:"",
      distance: null,
      images: [],
      mainImage: "",
      currentLocation: { lat: 0, lng: 0 },
      markers: [{ position: { lat: 0, lng: 0 }, icon: "/img/marker.png" }]
    };
  },
  created() {
    this.loadItem(this.$route.params.id)
      .then(() => {
        var userLocPrm = this.geolocation();
        var itemLocPrm = this.getItemLocation(this.owner.address);
        return Promise.all([userLocPrm, itemLocPrm]);
      })
      .then(this.calcDistance);
    this.user();
    var header = document.querySelector("html");
    header.scrollIntoView();
  },
  computed: {
    itemForDisplay() {
      return this.$store.getters.selectedItem;
    },
  
    google: gmapApi,

    ranking() {}
  },
  mounted() {},

  methods: {
      user() {
      this.currUser = this.$store.getters.loggedinUser;
      console.log('currUser = ',this.$store.getters.loggedinUser);
      // return this.currUser;
    },
    chatOpener(){
      this.isChat = !this.isChat;
    },
    loadItem(itemId) {
      return this.$store
        .dispatch({ type: "loadItemById", itemId })
        .then(item => {
          this.images = item.images;
          this.mainImage = item.images[0];
          return this.loadOwner(item.ownerId);
        });
    },
    switchMainImg(idx) {
      this.mainImage = this.images[idx];
    },
    goBackToList() {
      this.$router.push("/app");
      this.$store.commit({ type: "unSetItem" });
    },
    cancelDeal() {
      this.isBooked = false;
    },
    selectFirstDate(date) {
      this.selectedStartDate = date;
    },
    setRating(rating) {
      this.$store.commit({ type: "updateItemRank", rating });
      this.$store.dispatch({ type: "updateItem" });
    },
    loadOwner(ownerId) {
      return this.$store
        .dispatch({ type: "loadOwnerById", ownerId })
        .then(owner => {
          this.owner = owner;
        });
    },
    bookNow() {
      this.isBooked = true;
    },
    selectDate(date) {
      this.selectedDate = date;
    },

    showCalender() {
      console.log(this.showDates);
      this.showDates = !this.showDates;
    },

    geolocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log('position is' , position)
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.markers[0].position = this.currentLocation;
          resolve();
        });
      });
    },

    getItemLocation(ownerAddress) {
      return mapService.getUserLatLng(ownerAddress).then(itemLocation => {
        this.markers.push({ position: itemLocation });
      });
    },

    calcDistance() {
      var coords = {
        lat1: this.markers[0].position.lat,
        lng1: this.markers[0].position.lng,
        lat2: this.markers[1].position.lat,
        lng2: this.markers[1].position.lng
      };

      var distance = mapService.calcDistanceFromLatLngInKm(coords);
      this.distance = distance.toFixed(2);
    }
  },

  components: {
    datePicker,
    signUpModal,
    bookItem,
    chatSocket
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.space-between {
  justify-content: space-between;
}

.show-calender {
  display: none;
}

.more-details {
  height: 1000px;
  margin-right: 20px;
}

.item-details p {
  margin: 15px 0;
}

.location {
  margin-bottom: 20px;
}

// .seller-details {
// }
.date-book {
  width: 0%;
  height: fit-content;
  position: sticky;
  top: 10px;
  transition: all 0.3s ease-in;
  // transform: translateX();
}

.main-container {
  max-width: 100vw;
  margin: 20px;
  padding: 10px;
  padding-top: 20px;
  height: 800px;
  // font-family: "Roboto Slab";
}
.reviews-container {
  max-width: 980px;
  margin: 20px;
  padding: 20px;
}

.main-image {
  max-width: 380px;
}

.small-image {
  width: max-content;
}
.review-img {
  width: 50px;
  height: 50px;
  border-radius: 20%;
  margin-right: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.item-details {
  display: flex;
  height: fit-content;
  padding: 20px 20px;
  flex-direction: column;
  text-align: left;
  width: 50%;
  color: black;
  align-items: flex-start;
  border: 1px solid #00000017;
  margin-left: 10px;
}

.image-gallery {
  align-items: center;
}

.image-gallery img {
  border: 1px solid #61616138;
}

.spacer-paragrph {
  margin: 18px 0px;
}
.owner-pic {
  width: 50px;
  height: 50px;
  border-radius: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.spacer-right {
  margin: 0px 10px;
}

.reviews {
  width: 460px;
  list-style: none;
}

.reviews li {
  display: flex;
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid #0000002e;
}

.thumb-photo {
  width: 80px;
  margin: 10px;
  cursor: pointer;
}

.show-map {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
}

.btn-book {
  background-color: #0fa086;
  margin-top: 25px;
  box-shadow: none;
  color: #fff;
  width: 290px;
}

.btn-chat {
  margin: 0;
}

h1 {
  font-size: 1.8rem;
}

i {
  padding-right: 10px;
  cursor: pointer;
}

.chat-opener {
  cursor: pointer !important;
}

.chat-opener:hover {
  cursor: pointer !important;
  font-weight: bold;
}

.chat-opener .far:hover {
  font-weight: bold;
}

.chat-opener label {
  cursor: unset;
}

.chat-box {
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 10;
}

@media (max-width: 940px) {
  .main-container {
    min-width: 50vw;
    flex-direction: column;
    height: 100%;
  }

  .show-calender {
    display: block;
    cursor: pointer;
  }

  .show-calender:hover {
    color: #0fa086;
  }
  .date-book {
    width: 60%;
    position: absolute;
    top: 295px;
    display: none;
    background: #FAF6F6;
  }

  .show-map {
    margin-bottom: 0;
  }

  .item-details {
    width: 100%;
    margin-bottom: 20px;
  }

  .show {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .more-details {
    height: fit-content;
  }

  // .calender {
  //   background: #828a95a3;
  //   width: max-content;
  //   padding-bottom: 10px;
  // }
}

@media (max-width: 500px) {
  .main-container {
    align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 100vw;
    margin: 0 auto;
    padding: 0;
    padding-top: 0;
    // height: 800px;
  }

  // .show-calender {
  //   display: block;
  // }
  .date-book {
    width: 90%;
    top: 250px;
  }

  // .item-details {
  //   width: 100%;
  // }
  .item-details {
    width: 100%;
  }

  .main-image {
    max-width: 300px;
  }

  .reviews {
    width: 90vw;
    margin: 0 10px 0 0;
    padding: 10px;
  }

  .header {
    // width: 255px;
  }
  .vue-map-container {
    width: 300px !important;
    height: 300px !important;
  }
  // .calender {
  //   background: #828a95a3;
  //   width: max-content;
  //   padding-bottom: 10px;
  // }
}
</style>

