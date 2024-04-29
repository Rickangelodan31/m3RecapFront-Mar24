import { useState } from 'react'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      if (response.status === 201) {
        const newUser = await response.json()
        console.log(newUser)
      } else if (response.status === 400) {
        const error = await response.json()
        console.log(error)
        throw new Error(error.message)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <>
      <h1>Signup</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input value={username} onChange={event => setUsername(event.target.value)} />
        </label>
        <label>
          password
          <input value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        <button type='submit'>sign up</button>
      </form>
    </>
  )
}

export default SignupPage
