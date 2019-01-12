import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'


import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, 'http://socketserver.com:1923');
const SOCKET_URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3000/';

Vue.use(VueSocketio, socketio(SOCKET_URL));  

import './registerServiceWorker';
import '../public/scss/main.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import StarRating from 'vue-star-rating'

Vue.component('star-rating', StarRating);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAT6kgeeG5OSYsEuffWJVuFeRPhnOa0Di0',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },

})
Vue.use(Vuetify)
Vue.use(require('vue-moment'));

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
