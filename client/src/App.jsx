
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing , Home} from "./views";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
