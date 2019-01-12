import axios from 'axios'

const ITEM_URL = (process.env.NODE_ENV !== 'development')
    ? '/item'
    : '//localhost:3000/item';


function getAllItems(filterBy = '') {
    return axios.get(`${ITEM_URL}`, {
        params: {
            filterBy
        }
    }) 
        .then(res => res.data)
}

function getItemById(itemId) {
    return axios.get(`${ITEM_URL}/${itemId}`)
        .then(res => res.data)
}

function getItemByOwnerId(ownerId){
    return axios.get(`${ITEM_URL}/query/${ownerId}`)
    .then(res => res.data)
}

function deleteItem(itemId) {
    return axios.delete(`${ITEM_URL}/${itemId}`)
}

function addItem(item) {
    return axios.post(ITEM_URL, item)
        .then(res => res.data)
}

function updateItem(item) {
    return axios.put(`${ITEM_URL}/${item._id}`, item)
        .then(res => res.data)
}


export default {
    getAllItems,
    getItemById,
    deleteItem,
    addItem,
    updateItem,
    getItemByOwnerId
}
