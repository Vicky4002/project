import { useCallback, useEffect, useMemo, useState } from 'react'
import AuthPanel from './components/AuthPanel'
import TurfForm from './components/TurfForm'
import TurfList from './components/TurfList'
import NearbyEvents from './components/NearbyEvents'
import { fetchTurfs } from './services/api'

const SPORTS = ['All', 'Football', 'Cricket', 'Badminton', 'Tennis', 'Basketball']

export default function App() {
  const [turfs, setTurfs] = useState([])
  const [filters, setFilters] = useState({ city: '', sport: '' })
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('discover')

  const loadTurfs = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([, value]) => value))
      const data = await fetchTurfs(cleanFilters)
      setTurfs(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadTurfs().catch(console.error)
  }, [loadTurfs])

  const stats = useMemo(() => {
    const total = turfs.length
    const open = turfs.filter((turf) => turf.available).length
    const cities = new Set(turfs.map((turf) => turf.city)).size
    return { total, open, cities }
  }, [turfs])

  return (
    <main className="container">
      <header className="hero">
        <h1>TurfHub</h1>
        <p>Discover turfs, manage listings, and find nearby sports events in real time.</p>
        <div className="stat-row">
          <span>{stats.total} Turfs</span>
          <span>{stats.open} Open Now</span>
          <span>{stats.cities} Cities</span>
        </div>
      </header>

      <AuthPanel onToken={setToken} />

      <div className="tabs">
        <button className={activeTab === 'discover' ? 'active' : ''} onClick={() => setActiveTab('discover')}>Discover Turfs</button>
        <button className={activeTab === 'manage' ? 'active' : ''} onClick={() => setActiveTab('manage')}>Manage Turf</button>
        <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Nearby Events</button>
      </div>

      {activeTab === 'discover' && (
        <>
          <section className="card">
            <h3>Search Turfs</h3>
            <div className="grid">
              <input placeholder="City" value={filters.city} onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))} />
              <input placeholder="Sport" value={filters.sport} onChange={(e) => setFilters((f) => ({ ...f, sport: e.target.value }))} />
            </div>
            <div className="chip-row">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  className={`chip ${filters.sport === (sport === 'All' ? '' : sport) ? 'selected' : ''}`}
                  onClick={() => setFilters((f) => ({ ...f, sport: sport === 'All' ? '' : sport }))}
                >
                  {sport}
                </button>
              ))}
            </div>
            <button onClick={loadTurfs} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
            {error && <p className="error-msg">{error}</p>}
          </section>

          <TurfList turfs={turfs} loading={loading} />
        </>
      )}

      {activeTab === 'manage' && <TurfForm token={token} onCreated={loadTurfs} />}
      {activeTab === 'events' && <NearbyEvents />}
    </main>
  )
}
