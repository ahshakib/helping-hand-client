import React, { createContext } from 'react'
import useCredential from '../hooks/useCredential'

export const AuthContext = createContext()
function AuthProvider({children}) {
    const allContext = useCredential()
  return (
    <AuthContext.Provider value={allContext}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider