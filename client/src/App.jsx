import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import i18next from "./i18next";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>{i18next.t("home.salutehome")}</h1>
    </div>
  );
}

export default App;
