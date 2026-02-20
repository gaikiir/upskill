import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/layouts/Footer";
import NavbarMain from "./components/layouts/Navbar";
import HomePageComponent from "./components/pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <NavbarMain />
      <div className="app">
        <Routes>
          <Route exact path="/" element={<HomePageComponent />} />
          {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
