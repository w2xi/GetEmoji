import request from "../utils/request";

const userAPI = {
  login(data){
    return request({
      url: '/api/v1.user/login',
      method: 'POST',
      data,
    })
  },

  register(data){
    return request({
      url: '/api/v1.user/register',
      method: 'POST',
      data,
    })
  },

  refresh(params){
    return request({
      url: '/api/v1.token/refresh',
      method: 'GET',
      params,
    })
  },
}

export default userAPI
