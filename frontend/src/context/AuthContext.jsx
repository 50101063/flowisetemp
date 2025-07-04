import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // In a real application, you would check for a token in localStorage
  // and validate it with your backend here on initial load.
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData) => {
    // In a real application, this would involve an API call
    // to your backend for authentication.
    console.log("Attempting to log in with:", userData)
    const mockUser = { username: userData.username, token: 'mock-jwt-token' } // Mock token
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = (userData) => {
    // In a real application, this would involve an API call
    // to your backend for user registration.
    console.log("Attempting to register with:", userData)
    // For simplicity, mock registration also logs in the user directly
    login({ username: userData.username, password: userData.password }) 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
