// src/services/flights.ts
import localforage from 'localforage';
import { Flight } from '../types';

const FLIGHTS_KEY = 'cachedFlights';

localforage.config({
  name: 'DeIcerApp',
  storeName: 'flights'
});

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;
const TIMETABLE_URL = 
  `https://api.aviationstack.com/v1/timetable` +
  `?iataCode=KEF&type=departure` +
  `&access_key=${API_KEY}` +
  `&airline_icao=ICE`;


interface AviationStackResponse {
  data: Array<{
    flight: { iata: string; icao: string };
    departure: { scheduled: string; terminal: string | null; gate: string | null };
    live: { updated: string | null };
  }>;
}

export async function fetchFlights(): Promise<Flight[]> {
  try {
    const res = await fetch(TIMETABLE_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json: AviationStackResponse = await res.json();

    // Map to our Flight model
    const flights: Flight[] = json.data.map(item => ({
      id: item.flight.iata || item.flight.icao,
      stand: item.departure.gate
        ? `Gate ${item.departure.gate}`
        : item.departure.terminal
          ? `Terminal ${item.departure.terminal}`
          : 'Stand N/A',
      scheduledTime: item.departure.scheduled,
      status: item.live?.updated ? 'InProgress' : 'Pending'

    }));

    // Cache for offline use
    await localforage.setItem(FLIGHTS_KEY, flights);
    return flights;
  } catch (e) {
    console.warn('Fetch failed, falling back to cache:', e);
    const cached = await localforage.getItem<Flight[]>(FLIGHTS_KEY);
    return cached ?? [];
  }
}
