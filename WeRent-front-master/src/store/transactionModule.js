import transactionsService from '../services/transactionsService.js';
// import { log } from 'util';

export default {
  state: {
    newNotification: null
  },

  mutations: {
    setNewNotification(state, {status}) {
      return state.newNotification = status;
    }
  },

  // ********************************

  getters: {
    isNewNote(state) {
      return state.newNotification;
    }
  },
  actions: {
    newTransaction(context, { trans }) {
      return transactionsService.newTransaction(trans)
    },
    getTransactionsByOwner(context, { userId }) {
      return transactionsService.getTransactionsByOwner(userId);
    },

    getTransactionsByRenter(context, { userId }) {
      return transactionsService.getTransactionsByRenter(userId);
    },
    updateTransaction(context, { transaction }) {           
      return transactionsService.updateTransaction(transaction)
    }
  }
};
