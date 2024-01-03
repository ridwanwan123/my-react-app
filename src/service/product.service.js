import axios from "axios";

export const getProducts = (callback) => {
  axios.get('https://fakestoreapi.com/products').then((response) => {
    callback(response.data)
  }).catch((error) => {
    console.log(error);
  })
}


export const getDetailProduct = (id, callback) => {
  axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
    callback(response.data)
  }).catch((error) => {
    console.log(error)
  })
}