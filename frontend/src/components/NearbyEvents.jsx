import { useState } from 'react'
import { fetchNearbyEvents } from '../services/api'

export default function NearbyEvents() {
  const [coords, setCoords] = useState({ lat: '', lon: '', radiusKm: 10 })
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')

  const handleFind = async () => {
    try {
      setError('')
      const data = await fetchNearbyEvents(coords)
      setEvents(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h3>Nearby Events</h3>
      <div className="grid">
        <input placeholder="Latitude" value={coords.lat} onChange={(e) => setCoords((c) => ({ ...c, lat: e.target.value }))} />
        <input placeholder="Longitude" value={coords.lon} onChange={(e) => setCoords((c) => ({ ...c, lon: e.target.value }))} />
        <input placeholder="Radius (km)" value={coords.radiusKm} onChange={(e) => setCoords((c) => ({ ...c, radiusKm: e.target.value }))} />
      </div>
      <button onClick={handleFind}>Find Events</button>
      {error && <p>{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title} · {event.venue} · {event.distanceKm.toFixed(2)} km</li>
        ))}
      </ul>
    </div>
  )
}
