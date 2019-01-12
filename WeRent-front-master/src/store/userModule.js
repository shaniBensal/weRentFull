import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService.js'
import itemService from '../services/itemService.js'
import { stat } from 'fs';

export default {
    state: {
        user: userService.getLoggedInUser(),
        userWithItems: null,
        owner: {}
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        // setRentedItems(state, { item }) {
        //     state.rentedItems.push(item)
        // },
        // setItemsForRent(state, { items }) {
        //     state.itemsForRent = items
        // },

        // setFavoriteItems(state, { item }) {
        //     state.favoriteItems.push(item)
        // },
        setOwner(state, { user }) {
            state.owner = user;
        },

        setUserWithItems(state, { user }) {
            state.userWithItems = user
        },
    },
    actions: {
        loadOwnerById(context, { ownerId }) {
            return userService.getUserById(ownerId)
                .then(user => {
                    context.commit({ type: 'setOwner', user })
                    return user;
                })
        },

        // loadOwnerById(context, { ownerId }) {
        //     return userService.getUserById(ownerId)
        // },

        // loadOwnerById(context, { owner }) {
        //     console.log('owner from store', owner);

        //     return userService.getUserById(owner)
        //         .then(owner =>
        //             context.commit({ type: 'setOwner', owner })
        //         )
        //     return owner;
        // },


        // loadRentedItems(context, { items }) {
        //     items.forEach(itemId => {
        //         return itemService.getItemById(itemId)
        //             .then(item => {
        //                 // console.log('you rented', item)
        //                 context.commit({ type: 'setRentedItems', item })
        //             })
        //     });
        // },

        // loadItemsForRent(context, { userId }) {
        //     return itemService.getItemByOwnerId(userId)
        //         .then(items => {
        //             // console.log('1111', items)
        //             context.commit({ type: 'setItemsForRent', items })
        //         })
        // },

        login(context, { user }) {
            return userService.login({ user })
                .then((user) => {
                    context.commit({ type: 'setUser', user })
                    return user;
                })
        },

        logOut(context) {
            userService.logOut()
            return context.commit({ type: 'setUser', user: null })
        },

        updateUser(context, { user }) {
            if (!user._id) {
                return userService.signup({ user })
                    .then((user) => {
                        return context.commit({ type: 'setUser', user })
                    })
            } else {
                return userService.updateUser(user)
                .then(user => {
                    return context.commit({ type: 'setUser', user });
                })
            }
        },
        addItemToFavorites(context, payload) {
            // console.log(payload.item, payload.user)
            var user = payload.user;
            var favoriteItem = payload.item
            userService.addFavorites(user, favoriteItem)
                .then((user) => {
                    for (var i = 0; i < user.favoriteItems.length; i++) {
                        itemService.getItemById(user.favoriteItems[i])
                        // .then(item => {
                        //     console.log('you liked', item)
                        // context.commit({ type: 'setFavoriteItems', item })
                        // })
                    }
                })
        },

        getUserWithItems(context, { userId }) {
            return userService.getAllItemsByUser(userId)
                .then((user) => {
                    context.commit({ type: "setUserWithItems", user })
                    return user
                })
        }
    },
    getters: {
        isAdmin(state) {
            return state.user ? state.user.isAdmin : false;
        },
        loggedinUser(state) {
            return state.user
        },
        rentedItemsByUser(state) {

            return state.userWithItems ? state.userWithItems.rentedItems : [];
        },

        itemsForRent(state) {
            return state.userWithItems ? state.userWithItems.owendItems : [];
        },

        favoriteItems(state) {
            return state.userWithItems ? state.userWithItems.favoriteItems : [];
        },

        itemOwner(state) {
            return state.owner
        }
    }
}