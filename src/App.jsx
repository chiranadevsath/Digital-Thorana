import { BrowserRouter, Routes, Route } from "react-router-dom";

import DigitalThorana from "./DigitalThorana";
import QRTracker from "./pages/QRTracker";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigitalThorana />} />
        <Route path="/track/thorana-main" element={<QRTracker />} />
      </Routes>
    </BrowserRouter>
  );
}
