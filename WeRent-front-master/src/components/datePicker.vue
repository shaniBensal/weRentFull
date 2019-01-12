<template>
    <div v-if="unAvailableDates" class="date-picker">
        <v-date-picker header-color="teal accent-4" v-model="selectedDate" @input="sendDate" :allowed-dates="allowedDates" :min="today" class="mt-3"></v-date-picker>
    </div>
</template>
<script>
export default {
  name: "DatePicker",
  data() {
    return {
      selectedDate: "",
      today: ""
    };
  },
  props: ["unAvailableDates"],
  created() {
    this.todayDate();
  },
  mounted() {},
  computed: {},
  methods: {
    todayDate() {
      var result = "";
      var month = "";
      var d = new Date();
      var day = "";
      if (d.getMonth() + 1 < 10) {
        month = "0" + (d.getMonth() + 1);
      } else {
        month = d.getMonth() + 1;
      }
      if (d.getDate() < 10) {
        day = "0" + d.getDate();
      } else {
        day = d.getDate();
      }
      result += d.getFullYear() + "-" + month + "-" + day;
      this.date = result;
      this.today = result;
      console.log(this.today);
      
    },

    allowedDates(dateStr) {
      return !this.unAvailableDates.includes(dateStr);
    },

    sendDate() {
      this.$emit("selected-date", this.selectedDate);
    }
  }
};
</script>
<style>

.v-picker{
  margin-bottom: 20px;
}
.v-picker__title__btn:not(.active) {
  opacity: 1 !important;
}

.v-btn.v-btn--active {
  background: teal;
}

.date-picker .v-btn {
  min-width: 0;
}

.v-date-picker-title {
  flex-direction: row !important;
}

/* .v-date-picker-table .v-btn {
  font-family: "Roboto Slab-bold", serif;
} */

.v-btn--disabled {
  color: grey;
  opacity: 0.2;
}

.v-date-picker-table {
  background-color: #fff;
}


</style>

