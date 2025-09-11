import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Finder from "./pages/Finder";
import Remedies from "./pages/Remedies";
import Emergency from "./pages/Emergency";
import SOS from "./pages/SOS";
import SecondReview from "./pages/SecondReview";
import Charity from "./pages/Charity";
import VideoCall from "./pages/VideoCalling";

export default function App() {
  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/finder" element={<Finder />} />
          <Route path="/remedies" element={<Remedies />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/second-review" element={<SecondReview />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/videoCall" element={<VideoCall />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
