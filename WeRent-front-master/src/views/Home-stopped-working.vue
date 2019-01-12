
<template>

<div class="outer-container">
   <v-app light>
    <!-- <v-toolbar class="white">
      <v-toolbar-title></v-toolbar-title>
    </v-toolbar> -->
    <v-content>
        <!-- <div class="pic-cover"></div> -->
      <section>
       <v-parallax class="wide-screen top-pic" src="https://res.cloudinary.com/tomerberman/image/upload/v1534265907/rentapp/homescreen_wide.png">
       <!-- <v-parallax class="top-pic" src="https://res.cloudinary.com/cloudsts/image/upload/v1534230484/home.jpg"> -->

        <!-- <v-parallax class="top-pic" src="https://st2.depositphotos.com/2931363/10483/i/950/depositphotos_104838936-stock-photo-young-people-drinking-beer.jpg">     -->
        <!-- <v-parallax class="top-pic" src="https://st2.depositphotos.com/2931363/10483/i/950/depositphotos_104838936-stock-photo-young-people-drinking-beer.jpg"> -->
                <!-- <v-parallax class="top-pic" src="https://thumbs.dreamstime.com/z/tourist-girl-back-sack-tracking-sticks-staying-lawn-bushes-pink-rhododendrons-tourist-girl-119439266.jpg"> -->
              <!-- <v-parallax class="top-pic" src="https://previews.123rf.com/images/deagreez/deagreez1509/deagreez150900714/45603428-couple-in-love-together-to-ride-a-bicycle-with-ballons.jpg"> -->
          <v-layout 
            class="opaque-background" 
            column
            align-center
            justify-end
          >
            <h1 class="layout-test1 display-3 text-xs-center color:#162044 ">Rent anything, anywhere, anytime</h1>
            <div class="subheading mb-3 text-xs-center"></div>
            <div class="subheading mb-3 text-xs-center"></div>
            <div class="subheading mb-3 text-xs-center"></div>
            <div class="subheading mb-3 text-xs-center"></div>
   

<v-form @submit="onSearch" class="header-search-bar">
  <v-card 
    class="pa-3 search-bar"
    color="transparent"
    flat
  >
    <v-toolbar 
      dense
      floating
    >
      <v-text-field class="search-input-text" 
        v-model="searchStr"
        
        hide-details
        single-line
        placeholder="I'm looking for"
      ></v-text-field>

      <v-btn class="search-input-icon" icon @click="onSearch">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
  </v-form>


          </v-layout>
        </v-parallax>
      </section>
      <section class="first-section">
        <v-layout
          column
          wrap
          class= "site-description"
          align-center
        >
          <v-flex class="my-3" xs12 sm4>
            <div class="text-xs-center">
              <h2 class="first-headline"> Search for anything you need , Book it , Enjoy it</h2>
              <span class="subheading">
              
              </span>
            </div>
          </v-flex>
        </v-layout>
      </section>
<section class="categories"> 
<v-layout>
 <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent" >
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Events And Weddings</div>
                    </v-card-title>
                    <v-card-media height = "200px" src="https://thumbs.dreamstime.com/b/festival-event-party-people-blurred-background-outdoor-65006620.jpg" @click="onCategory('events')">     
                    </v-card-media>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent" >
                     <v-card-title primary-title class="layout justify-center" > 
                      <div class="headline">Transportation</div>
                    </v-card-title>
                    <v-card-media height = "200px" src="https://images.pexels.com/photos/310983/pexels-photo-310983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" @click="onCategory('transportation')">     
                    </v-card-media>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent" >
                     <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Travel And Sports</div>
                    </v-card-title>
                     <v-card-media height = "200px" src="https://thumbs.dreamstime.com/z/hiking-equipment-backpack-boots-top-mountain-beautiful-view-to-ranges-fog-filled-valleys-89063285.jpg"  @click="onCategory('travel')">     
                    </v-card-media>
                  </v-card>
                </v-flex>
                  <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                     <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Kids and Games</div>
                    </v-card-title>
                     <v-card-media height = "200px" src="https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350" @click="onCategory('kids')">     
                    </v-card-media>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                     <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Home and kitchen</div>
                    </v-card-title>
                     <v-card-media height = "200px" src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" @click="onCategory('kitchen')">     
                    </v-card-media>
                  </v-card>
                </v-flex>
                  <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                     <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Music</div>
                    </v-card-title>
                     <v-card-media height = "200px" src="https://images.pexels.com/photos/860707/pexels-photo-860707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" @click="onCategory('music')">     
                    </v-card-media>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <div class="see-all-container" @click="showLoading">
         <v-btn 
              class="see-all teal mt-5"
              light
              large
            >
            <router-link class="see-all" to="/item">
              See All Items
              </router-link>
            </v-btn>
            </div>

            <!-- <div class="loader" v-if="showLoader"></div> -->
  

    <div class="opinions-container">
      <!-- <div>Customers Recommend:</div> -->
    </div>

   <div id="header-carousel">
      <v-carousel class="opinions" hide-controls hide-delimiters interval=3000 transition="fade">
        <v-carousel-item v-for="(slide, i) in slides"
         :src="slide.src" 
         :key="i"
         reverse-transition="fade"
         transition="fade"
      >
          <v-jumbotron dark>
            <v-container fill-height>
              <v-layout align-top align-left>
                <v-flex>
                  <h3 class="display-3">{{ slide.title }}</h3>
                  <span class="subheading">{{ slide.text }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-jumbotron>
        </v-carousel-item>
      </v-carousel>
    </div>

    </v-content>
   </v-app>
</div>
</template>



<script>
// <img class="main-pic" src="https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data: () => ({
    searchStr: "",
    lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,

    slides: [
      {
        src:
          "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&h=800",
        title: "Dana Levi, 28, Tel Aviv",
        text: "Amazing products, amazing price. great website by the way."
      },
      {
        src:
          "https://images.pexels.com/photos/1080243/pexels-photo-1080243.png?auto=compress&cs=tinysrgb&h=800",
        title: "Henry Orwell, 36, New York City",
        text:
          "What I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy."
      },
      {
        src:
          "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750",
        title: "Yonit Kaspi, 44, Netanya",
        text:
          "I thought it is a waste of time and money but I was surprised it was actually great!"
      },
      {
        src:
          "https://images.pexels.com/photos/325682/pexels-photo-325682.jpeg?auto=compress&cs=tinysrgb&h=800",
        title: "Takashi Kurosawa, 22, Tokyo",
        text:
          "BEST SERVICE EVER. period. I like about WeRent, is the ease of use they offer. The whole process starting with choosing the right product and the right owner, picking up the stuff and all the way to returning it and paying- was silky smooth and super easy."
      }
    ],
    showLoader: false
  }),

  name: "home",
  components: {
    HelloWorld
  },

  created() {
    this.showLoader = false;
  },

  methods: {
    onSearch() {
      // console.log('query for search:',this.searchStr);
      this.$router.push(`/item/?search=${this.searchStr}`);
    },

    onCategory(category) {
      this.$router.push(`/item/?category=${category}`);
    },
    showLoading() {
      console.log(this.showLoader);
      this.showLoader = true;
      console.log(this.showLoader);
    }
  }
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.display-1,
.display-2,
.display-3,
.headline {
  font-family: "varela_Round" !important;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.v-parallax img{
  opacity: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.first-section {
  // background-color: #EEEEEE;
}

.v-carousel {
  height: 330px;
}

.top-pic {
  height: 530px;
  opacity: 1;
}

.categories {
  cursor: pointer;
}

.first-headline {
  font-size: 30px;
  font-weight: lighter;
}

.outer-container {
  margin: 0 auto;
}

.v-toolbar__content,
.v-toolbar__extension {
  width: 100% !important;
}

// .primary--text input{
//   caret-color: black !important;
// }

.v-toolbar {
  width: 100%;
}

.main-title {
  height: 80px;
  padding: 0;
  margin: 0;
  font-size: 2.5em;
}

.descrip {
  display: block;
}

.testing {
  height: 100%;
  background-image: url("https://st2.depositphotos.com/1010613/11931/i/950/depositphotos_119313002-stock-photo-the-happy-couple-cycling-in.jpg");
}

/* .test1 {
  height: 440px;
} */

h1 {
  color: white;
  z-index: 20;
}

/* .title { */
/* height: 500px; */
/* } */

.pic3 {
  min-height: 240px;
  /* background-image: url("https://www.dhresource.com/0x0s/f2-albu-g3-M00-61-8D-rBVaHVX35Y-AXKZDAAZsfqEcV8U465.jpg/night-club-lighting-24-patterns-rgb-laser.jpg"); */
  background-image: url("https://thumbs.dreamstime.com/b/festival-event-party-people-blurred-background-outdoor-65006620.jpg");
  background-size: cover;
  cursor: pointer;
}

.pic2 {
  height: 180px;
  /* background-image: url("http://familypoolcleaning.com/wp-content/uploads/Plantation-Pool-Cleaning-Service.jpg"); */
  background-image: url("https://previews.123rf.com/images/famveldman/famveldman1505/famveldman150500052/39757272-kids-playing-with-wooden-toys-two-children-cute-toddler-girl-and-funny-baby-boy-playing-with-toy-blo.jpg");
  background-size: cover;
  background-position-y: 82%;
  /* margin-bottom: 150px; */
  cursor: pointer;
}

.pic1 {
  height: 220px;
  background-image: url("http://www.rentacarvietnam.com/wp-content/uploads/2017/02/rent-a-car-1.jpg");
  background-size: cover;
  background-position-x: 45%;
  cursor: pointer;
}

.pic1b {
  height: 220px;
  background-image: url("https://previews.123rf.com/images/alexutemov/alexutemov1604/alexutemov160401499/54904458-home-appliances-design-cooking-applications-and-home-appliances-equipment-kitchen-home-appliances-ho.jpg");
  background-size: cover;
  background-position-x: 65%;
  cursor: pointer;
}

.pic0 {
  height: 200px;
  background-image: url("https://thumbs.dreamstime.com/z/hiking-equipment-backpack-boots-top-mountain-beautiful-view-to-ranges-fog-filled-valleys-89063285.jpg");
  background-size: cover;
  background-position-y: 50%;
  cursor: pointer;
}

.highlighted-products {
  padding: 0;
  margin-bottom: 20px;
}

.card-test1,
.card-test2,
.card-test3 {
  cursor: pointer;
}

.pic2:hover,
.pic1:hover,
.pic1b:hover,
.pic0:hover,
.pic3:hover {
  filter: brightness(1.11);
  transition: 0.3s;
}

.top-left {
  left: 12px;
  top: 10px;
  /* font-size: 1.1rem; */
  line-height: 1.6em;
  text-align: left;
  width: 250px;
  height: 0px;
  position: relative;
  z-index: 10;
  /* background-color: rgba(190, 240, 0, 0.6); */
}

.opaque-background {
  /* content: ''; */
  // background: linear-gradient(
  //   rgba(30, 30, 60, 0),
  //   rgba(30, 30, 60, 0),
  //   rgba(30, 30, 60, 0),
  //   rgba(0, 0, 0, 0.4),
  //   rgba(0, 0, 0, 0.4),
  //   rgba(30, 30, 60, 0.1)
  // );
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  /* opacity: 0.95; */
}

.header-search-bar {
  z-index: 1;
  width: 60%;
}

.search-bar {
  width: 100%;
}

.layout-test1 {
  text-shadow: 0 0 2px black;
  position: absolute;
  bottom: 23%;
}

.opinions-container {
  padding-left: 16px;
  font-size: 2rem;
  margin: 80px 0 10px 0 !important;
  background-color: #eeeeee;
}

#header-carousel {
  /* text-shadow : 0 0 2px grey; */
  text-align: left;
}

.v-jumbotron {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0)
  );
}

#header-carousel h3 {
  align-self: top;
  font-size: 2.5rem !important;
  color: black;
  width: 320px;
}

#header-carousel .subheading {
  color: black;
  font-size: 1.1rem !important;

  width: 240px;
  display: inline-block;
}

// .v-card{
//   width: 500px;
// }

.v-card h1 {
  text-shadow: 0 0 4px black;
}

.v-card__media {
  border-radius: 3px;
  transition: all 0.3s;
}

.v-card__media:hover {
  opacity: 0.8;
}

.v-jumbotron .theme--dark {
  height: 100% !important;
}

div .fill-height {
  margin: 0;
}

.site-description {
  padding: 60px 0 60px 0 !important;
}

.v-footer.blue.darken-2 {
  background-color: #162044;
}

.all-items {
  background-color: #e4e7f1 !important;
  color: black !important;
}


.mobile-screen {
 background-image: url("https://res.cloudinary.com/tomerberman/image/upload/v1534265904/rentapp/homescreen_mobile_-_narrow.png");
}

@media (max-width: 440px) {

.mobile-screen {
 background-image: url("https://res.cloudinary.com/tomerberman/image/upload/v1534265904/rentapp/homescreen_mobile_-_narrow.png");
}

  .v-card__media {
    width: 85vw;
  }

  .v-card__media {
    width: 85vw;
  }

  .v-carousel {
    display: none;
  }

  .opinions-container div {
    font-size: 1.25rem;
    margin: 0px 0 10px 0 !important;
    padding-left: 16px;
    background-color: #eeeeee;
  }

  /* margin-top: 350px; */
  div.flex {
    justify-content: center;
    align-items: flex-end;
    align-content: flex-end;
    display: flex;
  }

  /* margin-top: 350px; */
  div.flex {
    justify-content: center;
    align-items: flex-end;
    align-content: flex-end;
    display: flex;
  }

  .top-left {
    left: 12px;
    top: 300px;
    /* font-size: 1.1rem; */
    line-height: 1.6em;
    text-align: left;
    width: 250px;
    height: 0px;
    position: relative;
    z-index: 10;
    /* background-color: rgba(190, 240, 0, 0.6); */
  }

  .v-jumbotron {
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0)
    );
  }

  #header-carousel h3 {
    align-self: bottom;
    font-size: 1.5rem !important;
    color: black;
    width: 240px;
  }

  #header-carousel .subheading {
    color: black;
    font-size: 0.8rem !important;

    width: 280px;
    display: inline-block;
  }
}

// img.mobile-screen {
//   visibility: hidden !important;
// }
</style>

<!-- not SCOPED -->
<style>
a.see-all {
  color: white !important;
  text-decoration: none;
}
.v-parallax img{
  opacity: 1 !important;
} 

div.see-all-container {
  display: flex;
  justify-content: center;
}

button.see-all.teal.mt-5.v-btn.v-btn--large.theme--light {
  background-color: #1da088c7 !important;
}


.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
  box-shadow: 0px;
}

.search-input-icon {
  justify-content: center !important;
}

.search-input-text {
  width: auto !important;
}

.v-toolbar__content,
.v-toolbar__extension {
  width: 100% !important;
}
.application .theme--light.v-text-field .v-input__slot:before,
.theme--light .v-text-field .v-input__slot:before {
  border-color: #1da088;
}

</style>


<style scoped lang="stylus">

.fade {
  &-enter-active, &-leave-active, &-leave-to {
    transition: 1.1s linear;
    position: absolute;
    top: 0;
    left: 0;
  }

  &-enter, &-leave, &-leave-to {
    opacity: 0;
  }
}
</style>





