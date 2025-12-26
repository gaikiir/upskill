import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { FavoriteProvider } from "./components/hooks/FavoriteContext";
import NavbarMain from "./components/layouts/Navbar";
import HomeComponent from "./components/pages/HomePage";
import { ProductDetailPage } from "./components/pages/ProductDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <FavoriteProvider>
        <NavbarMain />
        <div className="app">
          {/* Toaster */}
          <Toaster />
          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
          </Routes>
        </div>
      </FavoriteProvider>
    </BrowserRouter>
  );
}

export default App;
