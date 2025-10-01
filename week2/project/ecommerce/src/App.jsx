import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Products";
import ProductDetail from "./ProductDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
