
import EventBusService from '../services/EventBusService.js'
import storageService from './storageService.js'
const STORAGE_KEY = 'loggedinUser';
import axios from 'axios'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

// const axios = require('axios')
const USER_URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:3000/user';


var loggedinUser = storageService.loadFromStorage(STORAGE_KEY) || null;

function login({ user }) {
    return axios.post(`${USER_URL}/checkLogin`, { user })
        .then(res => {
            _setLoggedinUser(res.data)
            return (res.data)
        })
}

function signup(userDetails) {
    return axios.post(`${USER_URL}/signup`, userDetails.user)
        .then(res => res.data)
        .catch(err => err)
}

function getUserById(userId) {
    return axios.get(`${USER_URL}/${userId}`)
        .then(res => {
            return res.data
        })
}

function logOut() {
    loggedinUser = null;
    storageService.clearStorage(STORAGE_KEY);
}

function getLoggedInUser() {
    return loggedinUser
}

function getUserLatLng(userAddress) {   
    return axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${GOOGLE_API_KEY}`,
        {
            withCredentials: false
        }
    )
        .then(res => {
            var itemLatLng = res.data.results[0].geometry.location
            return itemLatLng;
        })
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    storageService.saveToStorage(STORAGE_KEY, loggedinUser)
}

function addFavorites(user, item) {
    return axios.post(`${USER_URL}/favorites/${item._id}`, user)
        .then(res => {
            return res.data
        })

}

function updateUser(user) {
    return axios.put(`${USER_URL}/${user._id}`, user)
        .then(res => res.data)
}

function getAllItemsByUser(userId) {
    return axios.get(`${USER_URL}/item/${userId}`)
        .then(res => {
            return res.data
        })
}

export default {
    login,
    getLoggedInUser,
    logOut,
    getUserById,
    signup,
    addFavorites,
    getAllItemsByUser,
    getUserLatLng,
    updateUser,
}