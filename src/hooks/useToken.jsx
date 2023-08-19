import { useState } from 'react'

export default function useToken() {
  const getToken = () => {
    const userToken = localStorage.getItem('codelytic-token')
    return userToken
  }

  const [token, setToken] = useState(getToken())

  const saveToken = userToken => {
    localStorage.setItem('codelytic-token', userToken)
    setToken(userToken)
  }

  return {
    setToken: saveToken,
    token
  }
}