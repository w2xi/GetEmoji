const TokenKey = 'Get-Emoji-Token'
const UserInfoKey = 'Get-Emoji-User-Info'

export function getToken(){
  return localStorage.getItem(TokenKey)
}

export function setToken(value){
  localStorage.setItem(TokenKey, value)
}

export function removeToken(){
  localStorage.removeItem(TokenKey)
}

export function getUserInfo(){
  const userInfo = localStorage.getItem(UserInfoKey) || '{}'

  return JSON.parse(userInfo)
}

export function setUserInfo(value){
  localStorage.setItem(UserInfoKey, JSON.stringify(value))
}

export function removeUserInfo(){
  localStorage.removeItem(UserInfoKey)
}

