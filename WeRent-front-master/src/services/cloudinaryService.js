var cloudinary = require('cloudinary');

const CLOUD_NAME = "cloudsts"
const PRESET = 'ruv7elcf'
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
// console.log('cloudinary' , cloudinary)

function doUploadImg(file) {

  var formData = new FormData();
  formData.append('file', file)
  formData.append('upload_preset', PRESET);

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(function (response) {
      return response.json()
    })
    .catch(function (error) {
      console.error(error)
    })
}


export default {
  doUploadImg
}