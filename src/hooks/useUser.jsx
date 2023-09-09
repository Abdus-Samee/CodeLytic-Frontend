import { useState } from 'react'

export default function useUser() {
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('codelytic-user'))
    return user
  }

  const [user, setUser] = useState(getUser())

  const saveUser = user => {
    localStorage.setItem('codelytic-user', JSON.stringify(user))
    setUser(user)
  }

  return {
    setUser: saveUser,
    user
  }
}