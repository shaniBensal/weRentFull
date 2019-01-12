<template>
    <div @click="close" class="user-modal-container">
        <div @click.stop class="user-modal">
            <ul class="form-switcher">
                <li @click.stop="flip(true)">
                    <a v-bind:class="{ active: log }">Login</a>
                </li>
                <li @click.stop="flip(false)">
                    <a v-bind:class="{ active: !log }">signUp</a>
                </li>
            </ul>
            <div class="form-login" v-if="log">
                <input type="text" placeholder="username" v-model="login.name">
                <input type="password" placeholder="Password" v-model="login.password">
                <button class="btn" @click.prevent="submitLogin">Submit</button>
                <button class="btn" @click.prevent="close">Cancel</button>
            </div>
            <div class="form-sign-up" v-if="!log">
                <input type="text" placeholder="Name" v-model="signUp.name">
                <input type="email" placeholder="Email" v-model="signUp.email">
                <input type="password" placeholder="Password" v-model="signUp.password">
                <input type="text" placeholder="address" v-model="signUp.address">
                <button class="btn" @click.prevent="submitSignUp">Submit</button>
                <button class="btn" @click.prevent="close">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "signIn",
  data() {
    return {
      log: true,
      login: {
        name: "",
        password: ""
      },
      signUp: {
        name: "",
        password: "",
        address: "",
        email: ""
      }
    };
  },
  methods: {
    close(event) {
      this.$emit("close");
    },
    flip(status) {
      this.log = status;
    },

    submitSignUp() {
      this.$store
        .dispatch({ type: "updateUser", user: this.signUp })
        .then(res => {
          this.$emit("close");
          this.signUp = {
            name: "",
            password: "",
            address: "",
            email: ""
          };
        })
        .catch(err => console.log(err));
    },

    submitLogin() {
      this.$store
        .dispatch({ type: "login", user: this.login })
        .then(res => {
          if (res) {
            this.$emit("close");
            this.login = {
              name: "",
              password: ""
            };
            this.log = true;
            this.$emit("connect");
          } else return;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style  scoped lang="scss">
.user-modal-container {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  overflow-y: auto;
  z-index: 3;
  font-size: 14px;
  background-color: rgba(17, 17, 17, 0.9);
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  transition: all 0.25s linear;
}

.user-modal-container.active {
  opacity: 1;
  visibility: visible;
}

.user-modal {
  position: relative;
  margin: 50px auto;
  width: 90%;
  max-width: 500px;
  background-color: #f6f6f6;
  cursor: initial;
}

.user-modal-container ul.form-switcher {
  margin: 0;
  padding: 0;
}

.user-modal-container ul.form-switcher li {
  list-style: none;
  display: inline-block;
  width: 50%;
  float: left;
  margin: 0;
}

.user-modal-container ul.form-switcher li a {
  width: 100%;
  cursor: pointer;
  display: block;
  height: 50px;
  line-height: 50px;
  color: #666666;
  background-color: #dddddd;
  text-align: center;
}

.user-modal-container ul.form-switcher li a.active {
  color: #000000;
  background-color: #f6f6f6;
}

.user-modal-container .form-login,
.user-modal-container .form-sign-up,
.user-modal-container .form-password {
  padding: 75px 25px 25px;
}

.user-modal-container .form-login.active,
.user-modal-container .form-sign-up.active,
.user-modal-container .form-password.active {
  display: block;
}

.user-modal-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
}

.user-modal-container .btn {
  width: 100%;
  height: 3em;
  font-size: 1.2em;
  color: #f6f6f6;
  border: 0;
  margin: 5px 0px;
  background-color: #3fb67b;
  cursor: pointer;
}

.btn:hover {
  background-color: #3aa771;
}
</style>
