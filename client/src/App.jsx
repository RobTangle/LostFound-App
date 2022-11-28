import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Home, Register, Search, Post, Found } from "./views";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post" element={<Post />} />
        <Route path="/found" element={<Found />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subscription" element={<SubscriptionForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
