import Vue from 'vue';
import Vuex from 'vuex';
import itemModule from '../src/store/itemModule.js'
import userModule from '../src/store/userModule.js'
import transactionsModule from '../src/store/transactionModule.js'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    itemModule,
    userModule,
    transactionsModule
  }
});






