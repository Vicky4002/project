const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export async function fetchTurfs(filters = {}) {
  const params = new URLSearchParams(filters)
  const res = await fetch(`${API_BASE_URL}/turfs?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch turfs')
  return res.json()
}

export async function fetchNearbyEvents({ lat, lon, radiusKm = 10 }) {
  const params = new URLSearchParams({ lat, lon, radiusKm })
  const res = await fetch(`${API_BASE_URL}/events/nearby?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch nearby events')
  return res.json()
}

export async function createTurf(payload, idToken) {
  const res = await fetch(`${API_BASE_URL}/turfs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) throw new Error('Failed to create turf')
  return res.json()
}
