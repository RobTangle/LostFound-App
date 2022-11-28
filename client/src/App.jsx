import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Landing, Home, Register, Search, Post } from "./views";
=======
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";
import { Landing, Home, Register, Search, Found } from "./views";
>>>>>>> 697f7ab27ce78728218fe7d73246d0f1f8e8bc42

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
<<<<<<< HEAD
        <Route path="/post" element={<Post />} />
=======
        <Route path="/found" element={<Found />} />
        <Route path="/register" element={<Register />} />
        <Route path="/subscription" element={<SubscriptionForm />} />
>>>>>>> 697f7ab27ce78728218fe7d73246d0f1f8e8bc42
      </Routes>
    </BrowserRouter>
  );
}

export default App;
