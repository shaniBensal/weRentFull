<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import navBar from "./components/navBar.vue";
import appFooter from "./components/footer.vue";
export default {
  components: {
    navBar,
    appFooter
  },
  created() {
    this.$store.dispatch({ type: "loadItems" });
  }
};
</script>
<style lang="scss">
#app {
  font-family: "varela_Round";
  font-size:1.2em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
// #nav {
//   padding: 20px;
//   margin: 0;
//   display: flex;
//   justify-content: space-between;
  
//   a {
//     font-weight: bold;
//     color: #00d8ae;
//     &.router-link-exact-active {
//       color: #00d8ae;
//     }
//   }
//   a:hover {
//     color: #ccc;
//   }

//   .logo {
//     color: #00d8ae;
//   }
// }
</style>
