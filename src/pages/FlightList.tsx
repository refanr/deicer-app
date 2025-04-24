import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFlights } from '../services/flights';
import { Flight } from '../types';

export default function FlightList() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchFlights();
      setFlights(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading flights…</p>;
  if (flights.length === 0) return <p>No flights available (offline?).</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Upcoming Flights</h1>
      <ul className="space-y-2">
        {flights.map(f => (
          <li key={f.id}>
            <Link
              to={`/deice/${f.id}`}
              className="block p-3 bg-white rounded shadow hover:bg-gray-50"
            >
              <div className="font-medium">{f.id} @ {new Date(f.scheduledTime).toLocaleTimeString()}</div>
              <div className="text-sm text-gray-600">Stand: {f.stand} — {f.status}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
