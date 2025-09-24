import { useState } from "react";
import "./App.css";
import categories from "./fake-data/all-categories.js";
import allProducts from "./fake-data/all-products.js";
import Category from "./Category.jsx";
import Product from "./Product.jsx";
import { filterCategory } from "./productUtils.js";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryItems = ["All", ...categories];

  const filteredProducts = filterCategory(allProducts, selectedCategory);

  return (
    <>
      <h1>Products</h1>
      <Category
        items={categoryItems}
        activeCategory={selectedCategory}
        onItemClick={setSelectedCategory}
      />
      <Product items={filteredProducts} />
    </>
  );
}

export default App;
