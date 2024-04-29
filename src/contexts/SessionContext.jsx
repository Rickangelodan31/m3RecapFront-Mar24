import { createContext, useEffect, useState } from 'react'

export const SessionContext = createContext()

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState()

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('authToken', token)
    }
  }, [token])

  return <SessionContext.Provider value={{ token, setToken }}>{children}</SessionContext.Provider>
}

export default SessionContextProvider
