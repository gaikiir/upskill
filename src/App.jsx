import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/layouts/Footer";
import NavbarMain from "./components/layouts/Navbar";
import AboutUsPage from "./components/pages/aboutUs_Page";
import HomePage from "./components/pages/HomePage";
import ProductMenu from "./components/pages/product_menu";
function App() {
  return (
    <BrowserRouter>
      <NavbarMain />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/menu" element={<ProductMenu />} /> */}
          <Route path="/menu" element={<ProductMenu />} />
          <Route path="/about" element={<AboutUsPage />} />

          {/* <Route path="/" element={<HomePageComponent />} />
          
          <Route
            path="/productdetails/:productId"
            element={
              <>
                <MenuPage />
                <ProductDetail />
              </>
            }
          /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
