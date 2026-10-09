import React, { useState} from "react";
import { productsData } from "../homeCom/const/constDataAllArray";
import { useSearch } from "../homeCom/searchContext";
import Image1 from "../../assets/icons/icons_one.png";
import Image2 from "../../assets/icons/icon_two.png";
import Image3 from "../../assets/icons/icons_three.png";
import Image4 from "../../assets/icons/icons_four.png";
import Image5 from "../../assets/icons/icons_five.png";
import Image6 from "../../assets/icons/icons_six.png";
import Image7 from "../../assets/icons/icons_sev.png";
import Image8 from "../../assets/icons/icons_eigh.png";
import { useCart } from "./cartContext";

export const categories = Object.keys(productsData);

export const allProducts = (() => {
  let allItems = [];

  Object.entries(productsData).forEach(([category, items]) => {
    if (category === "fruits") {
      Object.entries(items).forEach(([subcategory, subcategoryItems]) => {
        subcategoryItems.forEach((item) => {
          allItems.push({ ...item, category: "fruits", subcategory });
        });
      });
    } else {
      items.forEach((item) => {
        allItems.push({ ...item, category });
      });
    }
  });

  return allItems;
})();

const categoryImages = {
  bread: Image1,
  cheese: Image2,
  alcohol: Image3,
  yogurt: Image4,
  fruits: Image5,
  watermelon: Image6,
  snack: Image7,
  cake: Image8,
  vegetable: Image1,
};

const AllArrayDisplay = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const { searchTerm, setSearchTerm } = useSearch();

  const filterProductsByCategory = () => {
    if (!activeCategory) {
      return [];
      // console.log(activeCategory);
    } else if (activeCategory === "fruits") {
      return allProducts.filter((product) => product.category === "fruits");
    } else {
      return allProducts.filter(
        (product) => product.category === activeCategory
      );
    }
  };

  const filterProductsBySearch = (products) => {
    if (!searchTerm) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredProducts = filterProductsBySearch(filterProductsByCategory());

  return (
    <div className="md:px-[120px] mx-auto px-2 py-8">
      {/* <h1 className="text-3xl font-bold mb-6">Product Catalog</h1> */}
      <div className="my-5">
        <ProductList products={filteredProducts} />
      </div>

      <CategorySelector
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categoryImages={categoryImages}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

const CategorySelector = ({
  categories,
  activeCategory,
  setActiveCategory,
  categoryImages,
}) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-9 lg:grid-cols-10 gap-1 md:gap-2 mb-6 justify-center">
      {/* <button
        className={`px-4 py-2 rounded ${
          activeCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveCategory("all")}
      >
        All Products
      </button> */}

      {categories.map((category) => (
        <button
          key={category}
          className={`px-2 md:px-3 py-2 rounded-full flex items-center gap-1 md:gap-3 text-xs md:text-base ${
            activeCategory === category
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveCategory(category)}
        >
          <img
            src={categoryImages[category]}
            alt={category}
            className="w-4 h-4  object-cover rounded"
          />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 hidden">
      <label htmlFor="search" className=" mb-2 font-medium">
        Search Products
      </label>
      <input
        type="text"
        id="search"
        className=" w-full p-2 border rounded"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { name, description, price, rating, duration, category, subcategory, id } = product;
  const formattedPrice = price.toFixed(2);
  const { addToCart, isInCart } = useCart();
  
  // Check if this product is in the cart
  const selected = isInCart(id, category, subcategory);
  
  // Handle click to add to cart
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div 
      className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer
        ${selected ? 'border-red-500 border-2' : 'border-gray-200'}`}
      onClick={handleAddToCart}
    >
      <div className="p-3">
        <div className="">
          <img
            src={product?.image || "/api/placeholder/300/200"}
            alt={name}
            className="max-w-[500px] w-full max-h-[150px] h-full object-cover p-[3px]"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <p className="text-xl font-bold text-green-600 mb-2">
          ${formattedPrice}
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>⭐ {rating}</span>
          <span>📅 {duration}</span>
        </div>
        <div className="mt-4 pt-2 border-t text-xs text-gray-400">
          <span>{category}</span>
          {subcategory && ` - ${subcategory}`}
        </div>
      </div>
    </div>
  );
};
const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-500">
          No products found
        </div>
      ) : (
        products.map((product, index) => (
          <ProductCard
            key={`${product.category}-${product.name}-${index}`}
            product={product}
          />
        ))
      )}
    </div>
  );
};

export default AllArrayDisplay;
