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
      url: '/api/blog/add',
      method: 'POST',
      data,
    })
  },

  detail(params){
    return request({
      url: '/api/blog/detail',
      method: 'GET',
      params,
    })
  },

  search(params){
    return request({
      url: '/api/blog/search',
      method: 'GET',
      params,
    })
  },

  upload(data){
    return request({
      url: '/api/blog/upload',
      method: 'POST',
      data,
    })
  },
}

export default blogAPI