import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/home" Component={Home} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
