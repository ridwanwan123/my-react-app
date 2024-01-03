import React from 'react'
import { useLogin } from '../hooks/useLogin'

const profilePage = () => {
  const username = useLogin();
  return (
    <div>
      username: {username} : 
    </div>
  )
}

export default profilePage