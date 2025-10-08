import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FavouritesProvider } from "./context/FavouritesContext";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import FavouritesPage from "./pages/FavouritesPage";
import "./App.css";

export default function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <nav className="main-nav">
          <NavLink to="/">Products</NavLink>
          <NavLink to="/favourites">Favourites</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  );
}
