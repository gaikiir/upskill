import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarMain from "./components/layouts/Navbar";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <NavbarMain />
      <div className="app">
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
