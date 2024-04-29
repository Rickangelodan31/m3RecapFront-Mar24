import { useContext, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext'

const LoginPage = () => {
  const { setToken } = useContext(SessionContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData.token)
        setToken(responseData.token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input value={username} onChange={event => setUsername(event.target.value)} />
        </label>
        <label>
          password
          <input value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <button type='submit'>log in</button>
      </form>
    </>
  )
}

export default LoginPage
