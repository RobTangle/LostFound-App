import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Landing,
  Home,
  Register,
  Search,
  Found,
  Profile,
  Error404,
  About,
  Services,
  Us,
  Contact,
  Detail,
} from "./views";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";
import ProxyProgressBar from './components/ProxyProgressBar/ProxyProgressBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProxyProgressBar componentToPassDown={<Landing />}/>} />
        <Route path="/home" element={<ProxyProgressBar componentToPassDown={<Home />}/>} />
        <Route path="/post" element={<ProxyProgressBar componentToPassDown={<Found />}/>} />
        <Route path="/profile" element={<ProxyProgressBar componentToPassDown={<Profile />}/>} />
        <Route path="/register" element={<ProxyProgressBar componentToPassDown={<Register />}/>} />
        <Route path="/search" element={<ProxyProgressBar componentToPassDown={<Search />}/>} />
        <Route path="/subscription" element={<ProxyProgressBar componentToPassDown={<SubscriptionForm />}/>} />
        <Route path="/about" element={<ProxyProgressBar componentToPassDown={<About />}/>} />
        <Route path="/services" element={<ProxyProgressBar componentToPassDown={<Services />}/>} />
        <Route path="/us" element={<ProxyProgressBar componentToPassDown={<Us />}/>} />
        <Route path="/contact" element={<ProxyProgressBar componentToPassDown={<Contact />}/>} />
        <Route path="*" element={<ProxyProgressBar componentToPassDown={<Error404 />}/>} />
        <Route path="/postdetail/:post_id" element={<ProxyProgressBar componentToPassDown={<Detail />}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
