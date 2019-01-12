
import axios from 'axios'

const GOOGLE_API_KEY = 'AIzaSyAT6kgeeG5OSYsEuffWJVuFeRPhnOa0Di0';



function getUserLatLng(userAddress) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${GOOGLE_API_KEY}`,
        {
            withCredentials: false
        }
    )
        .then(res => {
            var itemLatLng = res.data.results[0].geometry.location
            return itemLatLng;
        })
}

function calcDistanceFromLatLngInKm({ lat1, lng1, lat2, lng2 }) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLng = deg2rad(lng2 - lng1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function geolocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log('position is' , position)
            var currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            return currentLocation;
            resolve();
        });
    });
}






export default {
    getUserLatLng,
    calcDistanceFromLatLngInKm,
    geolocation
}