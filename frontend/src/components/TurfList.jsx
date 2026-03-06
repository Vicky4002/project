export default function TurfList({ turfs, loading }) {
  return (
    <div className="card">
      <div className="title-row">
        <h3>Available Turfs</h3>
        <span className="badge">{turfs.length} results</span>
      </div>

      {loading && <p>Loading turfs...</p>}

      <div className="turf-grid">
        {turfs.map((turf) => (
          <article key={turf.id} className="turf-item">
            <h4>{turf.name}</h4>
            <p>{turf.sport} · {turf.city}</p>
            <p>{turf.address || 'Address unavailable'}</p>
            <div className="meta-row">
              <span>₹{turf.hourlyRate}/hr</span>
              <span className={turf.available ? 'pill open' : 'pill closed'}>{turf.available ? 'Open' : 'Closed'}</span>
            </div>
          </article>
        ))}
      </div>

      {!loading && !turfs.length && <p>No turfs found.</p>}
    </div>
  )
}
