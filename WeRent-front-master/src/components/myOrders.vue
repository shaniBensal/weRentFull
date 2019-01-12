<template>
    <div class="orders">
        <h1>Items I ordered</h1>
        <div class="activeTrasactions">
            <ul>
                <li v-for="transaction in transactions" :key="transaction._id" class="flex">
                    <div>
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>
                        <h3>{{transaction.item.title}}</h3>
                        <p> price: {{transaction.item.price}}$</p>
                    </div>
                    <div class="details">
                        <p>
                            <v-icon>far fa-handshake </v-icon> Rented from: {{transaction.fromOwner.name}}</p>
                        <p>Email: {{transaction.fromOwner.email}}</p>
                        <p>Day of picking-up: {{transaction.dates |moment("DD/MM/YYYY")}}</p>
                        <p>From: {{transaction.fromOwner.address}}</p>
                    </div>
                    <div class="rank">
                        <star-rating :star-size="15" @rating-selected="setRating($event,transaction.item)"></star-rating>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  props: ["transactions"],
  data() {
    return {};
  },
  created() {
    var header = document.querySelector("html");
    header.scrollIntoView();
  },
  methods: {
    setRating(rating, item) {
      item.ranking.totalRank += rating;
      this.$store
        .dispatch({ type: "updateItemWithRank", rating, item })
        .then(item => console.log("item updated", item));
    }
  },
  computed: {
    rating() {
      return Math.random() * (5 - 1 + 1) + 1;
    }
  }
};
</script>

<style scoped>
body {
  text-transform: capitalize;
}
.flex {
  display: flex;
}
h1 {
  padding: 20px;
  text-align: left;
}

hr {
  margin-top: 25px;
}

li {
  width: 80vw;
  padding: 20px;
  justify-content: space-around;
  text-align: left;
}

li:nth-child(odd) {
  background-color: #eeeeee;
}

.orders img {
  width: 80px;
}

.img-new {
  position: relative;
  bottom: 21px;
  height: 10%;
  left: 3.8em;
  /* height: max-content; */
}

.img-item {
  padding-right: 20px;
}

.newTrans {
  border: 2px solid black;
}

@media (max-width: 700px) {
  li {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 448px) {
  h1 {
    padding: 10px 15px;
    font-size: x-large;
  }
}
</style>
