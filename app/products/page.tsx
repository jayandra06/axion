"use client";

import React, { useState, useEffect } from "react";
import { Search, Loader, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { useCart } from "@/contexts/CartContext";
import Badge from "@/components/ui/Badge";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    species: "",
    market: "",
    tags: "",
    minPrice: "",
    maxPrice: "",
  });
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, search]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      // Only add filters for inventory products
      params.append("status", "inventory");
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: "",
      species: "",
      market: "",
      tags: "",
      minPrice: "",
      maxPrice: "",
    });
    setSearch("");
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.flashSale
        ? product.buyingOptions.axion.price * (1 - product.flashSale.discount / 100)
        : product.buyingOptions.axion.price,
      quantity: 1,
      image: product.images[0] || "",
      stock: product.buyingOptions.axion.stock,
    });
  };

  // Separate products by tags
  const featuredProducts = products.filter((p: any) => p.tags.includes("featured"));
  const frequentProducts = products.filter((p: any) => p.tags.includes("frequent"));
  const seasonalProducts = products.filter((p: any) => p.tags.includes("seasonal"));
  const specialOffers = products.filter((p: any) => p.tags.includes("special-offer"));

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-primary-100">
            Natural, science-backed feed supplements for livestock
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-16 z-40">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, species, or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <Badge variant="danger" className="ml-2">
                  Active
                </Badge>
              )}
            </button>

            {/* Results Count */}
            <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg">
              <span className="text-gray-700 font-medium">
                {products.length} {products.length === 1 ? "Product" : "Products"}
              </span>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
              {filters.category && (
                <Badge variant="primary" className="flex items-center space-x-1">
                  <span>Category</span>
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleFilterChange("category", "")}
                  />
                </Badge>
              )}
              {filters.species && (
                <Badge variant="primary" className="flex items-center space-x-1">
                  <span>{filters.species}</span>
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleFilterChange("species", "")}
                  />
                </Badge>
              )}
              {filters.tags && (
                <Badge variant="primary" className="flex items-center space-x-1">
                  <span>{filters.tags}</span>
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleFilterChange("tags", "")}
                  />
                </Badge>
              )}
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-40">
              <ProductFilters
                filters={filters}
                categories={categories}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <Loader className="w-12 h-12 animate-spin text-primary-600 mb-4" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Featured Products - Large Cards */}
                {featuredProducts.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                          ⭐ Featured Products
                        </h2>
                        <p className="text-gray-600 mt-2 text-lg">Our top recommended products for optimal results</p>
                      </div>
                    </div>
                    {/* Large Featured Layout - 2 columns for more prominence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {featuredProducts.slice(0, 4).map((product: any) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          onAddToCart={() => handleAddToCart(product)}
                        />
                      ))}
                    </div>
                    {featuredProducts.length > 4 && (
                      <div className="text-center mt-8">
                        <button
                          onClick={() => handleFilterChange("tags", "featured")}
                          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium shadow-md hover:shadow-lg transition"
                        >
                          View all {featuredProducts.length} featured products →
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* Special Offers - Horizontal Scroll Cards */}
                {specialOffers.length > 0 && (
                  <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl p-8 shadow-lg border-2 border-red-200">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <div className="inline-block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold mb-3 animate-pulse">
                          LIMITED TIME ONLY
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 flex items-center">
                          🔥 Special Offers
                        </h2>
                        <p className="text-red-700 mt-2 text-lg font-medium">Grab them before they're gone!</p>
                      </div>
                    </div>
                    {/* Horizontal scrollable layout for offers */}
                    <div className="overflow-x-auto pb-4 -mx-4 px-4">
                      <div className="flex space-x-6 min-w-max">
                        {specialOffers.slice(0, 8).map((product: any) => (
                          <div key={product._id} className="w-80 flex-shrink-0">
                            <ProductCard
                              product={product}
                              onAddToCart={() => handleAddToCart(product)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {specialOffers.length > 8 && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => handleFilterChange("tags", "special-offer")}
                          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium shadow-md hover:shadow-lg transition"
                        >
                          See All {specialOffers.length} Special Offers →
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* All Products Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
                      <p className="text-gray-600 mt-1">
                        Browse our complete collection
                      </p>
                    </div>
                  </div>
                  {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {products.map((product: any) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          onAddToCart={() => handleAddToCart(product)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-xl">
                      <p className="text-xl text-gray-500 mb-2">No products found</p>
                      <p className="text-gray-400 mb-4">Try adjusting your filters or search</p>
                      <button
                        onClick={handleClearFilters}
                        className="text-primary-600 hover:underline font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </section>

                {/* Frequently Bought - Compact Grid */}
                {frequentProducts.length > 0 && !hasActiveFilters && (
                  <section className="bg-blue-50 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                          🛒 Frequently Bought
                        </h2>
                        <p className="text-blue-700 mt-2">Popular choices among customers</p>
                      </div>
                    </div>
                    {/* 4 column grid for compact view */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {frequentProducts.slice(0, 8).map((product: any) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          onAddToCart={() => handleAddToCart(product)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Seasonal Products - Mixed Layout */}
                {seasonalProducts.length > 0 && !hasActiveFilters && (
                  <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                          🌿 Seasonal Products
                        </h2>
                        <p className="text-green-700 mt-2">Perfect for the current season</p>
                      </div>
                    </div>
                    {/* Mixed: 1 large + 2 small layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {seasonalProducts.slice(0, 6).map((product: any, index: number) => (
                        <div key={product._id} className={index === 0 ? "md:col-span-2 md:row-span-1" : ""}>
                          <ProductCard
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
