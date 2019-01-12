<template>
    <header>
        <nav class="flex nav-bar-main" :class="{ open: display }">
            <div class="logo">
                <router-link :to="'/'">
                    <h1 class="logo">
                        <img src="/img/werent_logo.png">
                    </h1>
                </router-link>
            </div>
            <ul class="flex align-center clean-list nav-bar-actions">
                <li @click="display = !display">
                    <a v-if="user" @click="logOut">Log Out </a>
                    <a v-else href="#register" @click.prevent="open" class="sign-in"></a>
                </li>
                <li @click="display = !display">
                    <router-link to="/about">About</router-link>
                </li>
                <li @click="display = !display">
                    <router-link to="/item">Check our store</router-link>
                </li>
                <li class="envelope" @click="display = !display">
                    <router-link :to="'/user/'+user._id" v-if="user">
                        <v-badge overlap color="red" v-if="user && newNote">
                            <v-icon slot="badge" dark small>notifications</v-icon>
                            <v-icon class="envlope" color="grey">mail</v-icon>
                        </v-badge>
                    </router-link>
                </li>
                <li @click="display = !display">
                    <router-link :to="'/user/'+user._id" v-if="user">
                        <div class="user-pic" :style="{backgroundImage: `url(${user.image})`}"></div>
                    </router-link>
                </li>
            </ul>
            <div class="hamburger" @click="display = !display" :class="{ exit: display }"></div>
            <sign-in :class="{ active: isActive }" @close="closeModal" @connect="checkNewTransaction"></sign-in>
        </nav>
    </header>
</template>
<script>
import signIn from "./signIn.vue";
import eventBus, { MESSAGES_READ } from "../services/EventBusService.js";

export default {
  name: "navBar",
  data() {
    return {
      isActive: false,
      isOpen: false,
      display: false,
      newNote: false
    };
  },
  created() {
    eventBus.$on(MESSAGES_READ, _ => (this.newNote = false));
  },
  sockets: {
    renderTransactions(ownerId) {
      if (ownerId === this.$store.getters.loggedinUser._id)
        this.checkNewTransaction();
    }
  },
  computed: {
    user() {
      return this.$store.getters.loggedinUser;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch({ type: "logOut" });
      this.$router.push("/");
    },
    open() {
      this.isActive = true;
    },
    closeModal() {
      if (this.isActive) this.isActive = false;
      else return;
    },
    checkNewTransaction() {
      return this.$store
        .dispatch({
          type: "getTransactionsByOwner",
          userId: this.$store.getters.loggedinUser._id
        })
        .then(transactions => {
          transactions.forEach(transaction => {
            if (transaction.isNew) {
              this.newNote = true;
              this.$store.commit({ type: "setNewNotification", status: true });
            }
          });
        });
    }
  },
  components: {
    signIn
  }
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.hamburger {
  display: none;
  color: #1da088;
}

nav {
  height: 55px;
  // background-color: #eeeeee;
  background-color: #eeeeee61;
  justify-content: space-between;
}
.clean-list a {
  margin: 0px 10px;
  text-decoration: none;
  color: #eeeeee61;
  color: #1da088;
}

.clean-list .router-link-active {
  color: #2c3e50;
}

.clean-list a:hover {
  color: #2c3e50;
}

.nav-bar-actions {
  justify-content: flex-end;
}

.logo {
  color: #1da088;
  margin-top: 5px;
  padding: 15px;
  align-self: center;
}

.logo img {
  width: 50px;
}

.space-around {
  justify-content: space-around;
}
.links {
  padding-right: 20px;
  margin-right: 30px;
  align-items: center;
  text-align: center;
}

.user-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  margin-right: 20px;
}

.notification {
  color: red;
  position: absolute;
  top: 20px;
  /* left: 24px; */
  right: 52px;
}

.sign-in::after {
  content: "Sign in";
}
.envelope li {
  width: max-content;
}

.nav-bar-main li {
  color: #1da088;
}

@media (max-width: 540px) {
  // .clean-list li:first-child {
  //   margin: 80px 20px 20px 20px;
  // }

  .clean-list li:first-child {
    display: none;
  }

  .nav-bar-main.open li {
    width: 100%;
    font-size: 1.2em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hamburger {
    cursor: pointer;
    top: 0;
    right: 18px;
    display: flex;
    position: fixed;
    align-items: center;
    padding: 10px;
    color: #1da088;
    border: none;
    z-index: 2;
  }

  .hamburger::after {
    content: "\2630";
    font-size: 30px;
  }

  .exit.hamburger::after {
    content: "\2715";
    font-size: 30px;
  }

  .nav-bar-main ul {
    background-color: #eeeeee;
    right: -140px;
    transition: all 0.8s;
    padding-top: 20px;
    // transform: rotateY(90deg);
    opacity: 0;
  }

  .nav-bar-main.open ul {
    position: fixed;
    flex-direction: column;
    top: 0;
    z-index: 2;
    // top: 50;
    right: 20px;
    width: 90vw;
    height: 30vh;
    opacity: 1;
  }
}
</style>

<style>
.v-badge__badge {
  top: -6px;
  right: -10px;
  height: 18px;
  width: 18px;
}

.envlope {
  font-size: 24px;
}
</style>

