import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing, Home, Register, Search, Found, Profile, Error404, About, Services, Us, Contact } from "./views";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<Found />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/subscription" element={<SubscriptionForm />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/us" element={<Us />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
