import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";
import { Landing, Home, Register, Search, Found } from "./views";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/found" element={<Found />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subscription" element={<SubscriptionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
