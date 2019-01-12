<template>
    <v-form ref="form">
        <v-text-field v-model="itemToUpdate.title" label="item name"></v-text-field>
        <v-text-field v-model="itemToUpdate.price" label="Price per day($)"></v-text-field>
         <v-text-field v-model="itemToUpdate.description" label="Short description"></v-text-field>
        <v-select v-model="itemToUpdate.category" :items="categories" label="Choose category" @change="setCategory"></v-select>
        <span>pick available dates:</span>
        <date-picker v-model="itemToUpdate.occupiedDates"  @selected-date="selectDate" :unAvailableDates="itemToUpdate.occupiedDates"></date-picker>
        <div class="upload-img">
        <img v-for="(img,i) in itemToUpdate.images" :key="itemToUpdate.images[i]" :src="itemToUpdate.images[i]" v-if="itemToUpdate.images[0] && showAllImages">
             </div>
              <img class="newImg" :src ="imgUrl" v-if="imgUrl">
              <div class="file-input custom">
                <span>Select image</span>
              <input type="file" @change="handleFileUpload($event)" >
              </div>
              <!-- <button class="saveImg" v-if="imgUrl" @click.stop="saveImg">Save new image</button>  -->
    <div class="actions">
        <v-btn @click="updateItem">
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
        </div>
    </v-form>
</template>
<script>
import cloudinaryService from "../../services/cloudinaryService.js";
import datePicker from "../../components/datePicker.vue";
export default {
  name: "itemEdit",

  data() {
    return {
      itemToUpdate: {
        category: [],
        title: "",
        description: "",
        ranking: {
          count: 0.0,
          avg: 0.0,
          totalRank: 0
        },
        price: "",
        dateCreated: "",
        keyWords: [],
        ownerId: "",
        occupiedDates: [],
        images: []
      },
      categories: [],
      imgUrl: "",
      fileUpload: "",
      showAllImages: true
    };
  },

  created() {
    this.showAllImages = true;
    const itemId = this.$route.params.id;
    this.getCategories();
    if (itemId) {
      this.loadItem(itemId);
    } else return;
  },

  mounted() {},

  methods: {
    updateItem() {
      const itemId = this.$route.params.id;
      if (itemId) {
        console.log("updating item", this.itemToUpdate);
        this.$store
          .dispatch({ type: "updateItem", item: this.itemToUpdate })
          .then(item => {
            this.itemToUpdate = this.getEmptyItem;
            this.$router.push("/user/" + this.user._id);
          });
      } else {
        console.log("adding...");
        this.$store
          .dispatch({ type: "addNewItem", item: this.itemToUpdate })
          .then(item => {
            this.itemToUpdate = this.getEmptyItem();
            this.$router.push("/user/" + this.user._id);
          });
        // }.then(item =>{
        // this.itemToUpdate = this.getEmptyItem;
        // this.imgUrl = "";
        // this.$router.push("/user/" + this.user._id);
        // })
      }
    },

    handleFileUpload(ev) {
      // console.log("event", ev);
      this.showAllImages = false;
      this.fileUpload = ev.target.files[0];
      console.log(this.fileUpload);
      cloudinaryService.doUploadImg(this.fileUpload).then(img => {
        this.imgUrl = img.url;
        console.log("img url is", this.imgUrl);
        let newArr = JSON.parse(JSON.stringify(this.itemToUpdate.images));
        newArr.push(this.imgUrl);
        this.itemToUpdate.images = newArr;
        console.log(this.itemToUpdate.images);
      });
    },

    loadItem(itemId) {
      this.$store.dispatch({ type: "loadItemById", itemId }).then(item => {
        this.itemToUpdate = { ...item };
      });
    },

    clear() {
      this.$refs.form.reset();
      this.imgUrl = "";
    },

    getEmptyItem() {
      return {
        _id: null,
        category: [],
        title: "",
        description: "",
        ranking: {
          count: 0.0,
          avg: 0.0,
          totalRank: 0
        },
        price: "",
        dateCreated: "",
        keyWords: [],
        ownerId: "",
        occupiedDates: [],
        images: []
      };
    },
    getCategories() {
      this.categories = this.$store.getters.categories;
    },

    selectDate(date) {
      console.log(date);
      this.itemToUpdate.occupiedDates.push(date);
    },
    saveImg() {
      let newArr = JSON.parse(JSON.stringify(this.itemToUpdate.images));
      newArr.push(this.imgUrl);
      this.itemToUpdate.images = newArr;
      console.log(this.itemToUpdate.images);
    },
    setCategory(category) {
      console.log(category);
      // let newArr = JSON.parse(JSON.stringify(this.itemToUpdate.category));
      // console.log('new is:' , newArr)
      // newArr.push(category);
      // console.log('new is:' , newArr)
      // this.itemToUpdate.category = newArr;
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    }
  },
  components: {
    datePicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
form {
  margin: 20px 0;
}

.v-label.v-label--active {
  color: #1da088;
}
.v-input {
  width: 50vw;
  outline: #1da088;
  margin: 20px 0;
}

.v-list {
  top: 0;
}

.actions {
  display: flex;
  margin: 10px 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newImg {
  width: 260px;
  margin: 20px;
  padding: 10px;
}

.file-input.custom {
  /*your custom styles*/
  background: #00d8ae;
  width: 100px;
  height: 30px;
  border-radius: 10px;
}

.file-input {
  pointer-events: none;
  position: relative;
  overflow: hidden;
}

.v-menu > .v-menu__content {
  top: 10px !important;
  left: 0 !important;
  background-color: lightgray;
}

.file-input > * {
  pointer-events: none;
}

.file-input > input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  pointer-events: all;
  cursor: pointer;
  height: 100%;
  width: 100%;
}

.upload-img img {
  width: 160px;
  height: 160px;
  margin: 10px 10px;
  border: 1px solid;
}

.select-category {
  display: flex;
}
</style>


