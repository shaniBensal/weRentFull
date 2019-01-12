<template>
    <v-layout row>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-btn class="btn-book bold-font" slot="activator">Book Now!</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline"> In order to book this item please sign up:
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.name" label="full name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="user.email" label="Email" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-text-field v-model="user.address" label="address" required></v-text-field>
                            </v-flex>
                            <!-- <v-flex xs12 sm6>
                                <v-text-field v-model="user.image" label="image URL" required></v-text-field>
                            </v-flex> -->
                            
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="saveNewUser">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
  name: "SignUpModal",
  data() {
    return {
      dialog: false,
      user: {
        name: "",
        email: "",
        password: "",
        address: ""
        // image:''
      }
    };
  },

  methods: {
    saveNewUser() {
      this.$store.dispatch({ type: "updateUser", user: this.user });
      this.$emit("signedUp");
      this.dialog = false;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.btn-book {
  background-color: #1da088;
  min-width: 290px;
}

.v-card__text {
  background-color: white;
}

.v-card > :first-child:not(.v-btn):not(.v-chip) {
  background-color: #00d8ae;
}

.v-card > :last-child:not(.v-btn):not(.v-chip) {
  background-color: #00d8ae;
}
</style>
