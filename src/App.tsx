import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FlightList from './pages/FlightList';
import DeiceEvent from './pages/DeiceEvent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/flights" replace />} />
        <Route path="/flights" element={<FlightList />} />
        <Route path="/deice/:flightId" element={<DeiceEvent />} />
      </Routes>
    </BrowserRouter>
  );
}
