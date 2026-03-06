import { useCallback, useEffect, useState } from 'react'
import AuthPanel from './components/AuthPanel'
import TurfForm from './components/TurfForm'
import TurfList from './components/TurfList'
import NearbyEvents from './components/NearbyEvents'
import { fetchTurfs } from './services/api'

export default function App() {
  const [turfs, setTurfs] = useState([])
  const [filters, setFilters] = useState({ city: '', sport: '' })
  const [token, setToken] = useState('')

  const loadTurfs = useCallback(async () => {
    const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, value]) => value))
    const data = await fetchTurfs(cleanFilters)
    setTurfs(data)
  }, [filters])

  useEffect(() => {
    loadTurfs().catch(console.error)
  }, [loadTurfs])

  return (
    <main className="container">
      <h1>TurfHub: Turf Finder & Management</h1>
      <p>Secure platform to discover turfs and locate nearby sports events.</p>

      <AuthPanel onToken={setToken} />

      <section className="card">
        <h3>Search Turfs</h3>
        <div className="grid">
          <input placeholder="City" value={filters.city} onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))} />
          <input placeholder="Sport" value={filters.sport} onChange={(e) => setFilters((f) => ({ ...f, sport: e.target.value }))} />
        </div>
        <button onClick={loadTurfs}>Search</button>
      </section>

      <TurfList turfs={turfs} />
      <TurfForm token={token} onCreated={loadTurfs} />
      <NearbyEvents />
    </main>
  )
}
