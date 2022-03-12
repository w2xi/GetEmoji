import request from "../utils/request";

const blogAPI = {
  get(params){
    return request({
      url: '/api/v1.blog/read',
      method: 'GET',
      params,
    })
  },

  add(data){
    return request({
      url: '/api/v1.blog/add',
      method: 'POST',
      data,
    })
  },

  detail(params){
    return request({
      url: '/api/v1.blog/detail',
      method: 'GET',
      params,
    })
  },

  search(params){
    return request({
      url: '/api/v1.blog/search',
      method: 'GET',
      params,
    })
  },

  upload(data){
    return request({
      url: '/api/v1.blog/upload',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data,
    })
  },
}

export default blogAPI