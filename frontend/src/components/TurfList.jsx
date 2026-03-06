export default function TurfList({ turfs }) {
  return (
    <div className="card">
      <h3>Available Turfs</h3>
      <ul>
        {turfs.map((turf) => (
          <li key={turf.id}>
            <strong>{turf.name}</strong> · {turf.sport} · {turf.city} · ₹{turf.hourlyRate}/hr · {turf.available ? 'Open' : 'Closed'}
          </li>
        ))}
      </ul>
      {!turfs.length && <p>No turfs found.</p>}
    </div>
  )
}
