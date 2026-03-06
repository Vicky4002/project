import { useState } from 'react'
import { fetchNearbyEvents } from '../services/api'

export default function NearbyEvents() {
  const [coords, setCoords] = useState({ lat: '', lon: '', radiusKm: 10 })
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fillCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported on this browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: position }) => {
        setCoords((prev) => ({
          ...prev,
          lat: position.latitude.toFixed(6),
          lon: position.longitude.toFixed(6)
        }))
        setError('')
      },
      () => setError('Unable to get current location')
    )
  }

  const handleFind = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await fetchNearbyEvents(coords)
      setEvents(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
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

      <div className="action-row">
        <button onClick={fillCurrentLocation}>Use Current Location</button>
        <button onClick={handleFind}>{loading ? 'Searching...' : 'Find Events'}</button>
      </div>

      {error && <p className="error-msg">{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title} · {event.venue} · {event.distanceKm.toFixed(2)} km</li>
        ))}
      </ul>
      {!loading && !events.length && <p>No nearby events found yet.</p>}
    </div>
  )
}
