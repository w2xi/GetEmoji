import axios from "axios"
import { Toast, Notify } from "vant"

const request = axios.create({
  baseURL: '',
})

request.interceptors.request.use(config => {
  config.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkudzJ4aS5jb20iLCJhdWQiOiJ0ZXN0LmNvbSIsImlhdCI6MTY0NzA2MzgzNiwiZXhwIjoxNjQ3MDk5ODM2LCJ1aWQiOjF9.GZjY4KJY_2ikMgKj_81px58eyPs2f7Jag2yN0P3Fd0g'

  return config
})

request.interceptors.response.use(response => {
  const res = response.data

  if ( res.code !== 10000 ){
    Toast({
      type: 'fail',
      position: 'top',
      message: res.msg,
    })

    return Promise.reject(new Error(res.message) || 'Error')
  }

  return res
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