import { useEffect, useState } from 'react'
import { auth, loginWithGoogle, logout } from '../services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function AuthPanel({ onToken }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        const token = await currentUser.getIdToken()
        onToken(token)
      } else {
        onToken('')
      }
    })
    return unsub
  }, [onToken])

  return (
    <div className="card">
      <h3>Authentication</h3>
      {!user ? (
        <button onClick={loginWithGoogle}>Sign in with Google</button>
      ) : (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  )
}
