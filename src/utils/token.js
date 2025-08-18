function getAccessToken() {
  return localStorage.getItem('accessToken') || null
}

function setAccessToken(accessToken) {
  localStorage.setItem('accessToken', accessToken)
}

function getRefreshToken() {
  return localStorage.getItem('refreshToken') || null
}

function setRefreshToken(refreshToken) {
  localStorage.setItem('refreshToken', refreshToken)
}

export default {
  getAccessToken, setAccessToken,
  getRefreshToken, setRefreshToken
}
