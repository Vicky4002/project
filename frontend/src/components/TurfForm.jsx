import { useState } from 'react'
import { createTurf } from '../services/api'

const initialState = {
  name: '',
  city: '',
  sport: '',
  address: '',
  latitude: '',
  longitude: '',
  hourlyRate: '',
  available: true
}

export default function TurfForm({ token, onCreated }) {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setStatus('Login required for turf management')
      return
    }

    const payload = {
      ...form,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      hourlyRate: Number(form.hourlyRate)
    }

    try {
      await createTurf(payload, token)
      setStatus('Turf created')
      setForm(initialState)
      onCreated()
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Add Turf (Manager/Admin)</h3>
      <div className="grid">
        {['name', 'city', 'sport', 'address', 'latitude', 'longitude', 'hourlyRate'].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={onChange} placeholder={field} required={['name', 'city', 'sport'].includes(field)} />
        ))}
      </div>
      <label>
        <input type="checkbox" name="available" checked={form.available} onChange={onChange} /> Available
      </label>
      <button type="submit">Create Turf</button>
      {status && <p>{status}</p>}
    </form>
  )
}
