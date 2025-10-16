import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderComp from "./components/layouts/Header";
import NavbarMain from "./components/layouts/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavbarMain />
      <div className="app">
        <Routes>
          <Route exact path="/" element={<HeaderComp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
