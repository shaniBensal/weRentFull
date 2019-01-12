<template>
    <div class="orders">
        <div class="passiveTrasactions">
            <h1>Items ordered from me</h1>
            <ul>
                <li v-for="transaction in trans" :key="transaction._id" class="flex" v-if="isFutureDate(transaction.dates)"
                    :class="{newTrans:(transaction.isNew && newNotification)}">
                    <div class="img-item">
                        <img :src="transaction.item.images[0]">
                    </div>
                    <div>
                        <h3>{{transaction.item.title}}</h3>
                        <p> price: {{transaction.item.price}}$</p>
                    </div>
                    <div class="details">
                        <p>
                            <v-icon>far fa-handshake </v-icon> Orderd from: {{transaction.rentedTo.name}}</p>
                        <p>email: {{transaction.rentedTo.email}}</p>
                        <p>Day of picking-up: {{transaction.dates}} ({{transaction.dates | moment("from")}})</p>
                    </div>
                    <!-- <div class= "img-new" v-if="transaction.isNew && newNotification">
                      <img src="https://www.getgeared.co.uk/shopflow/img/badges/newItemBadge.png">
                        </div> -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props: ["transactions"],
  data() {
    return {
      newNotification: null,
      trans: null
    };
  },
  created() {
    this.newNotification = this.$store.getters.isNewNote;
    this.$emit("orders-checked");
    this.sortTransactions();
    var header = document.querySelector("html");
    header.scrollIntoView();
  },
  methods: {
    isFutureDate(date) {
      var rentingDate = new Date(date);
      var dayAheadTimeStamp = Date.now() + 24 * 60 * 60 * 1000;
      if (+rentingDate > dayAheadTimeStamp) return true;
      return false;
    },
    sortTransactions() {
      var transactions = JSON.parse(JSON.stringify(this.transactions));
      this.trans = transactions.sort((transaction1, transaction2) => {
        return (
          transaction2.transactionTimeStamp - transaction1.transactionTimeStamp
        );
      });
    }
  },
  computed: {}
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
