import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AppLayout from "./Layout/AppLayout.jsx";
import CardDetails from "./components/CardDetails.jsx";
import Header from "./Layout/Header.jsx";
import Footer from "./Layout/Footer.jsx";
import Cards from "./components/Cards.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppLayout Header={<Header />} Footer={<Footer />}>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/view-cart" element={<CardDetails />} />
      </Routes>
    </AppLayout>
  </Router>
);
