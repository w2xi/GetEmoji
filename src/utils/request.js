import axios from "axios"
import { Toast, Notify } from "vant"

const request = axios.create({
  baseURL: '',
})

request.interceptors.request.use(config => {
  return config
})

request.interceptors.response.use(response => {
  console.log(response);

  return response
}, error => {
  console.log(error.response);

  Toast({ 
    type: 'fail', 
    duration: 5000,
    position: 'top',
    message: error.response.data.msg,
  })

  return Promise.reject(error)
})

export default request