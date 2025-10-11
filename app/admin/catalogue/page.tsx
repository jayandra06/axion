"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

interface OtherPlatform {
  name: string;
  link: string;
  price: number;
}

export default function CataloguePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    images: [""],
    amazonLink: "",
    amazonPrice: "",
    flipkartLink: "",
    flipkartPrice: "",
    axionPrice: "",
    species: [] as string[],
    market: "national",
    tags: [] as string[],
    ingredients: "",
    benefits: [""],
    dosage: "",
  });

  const [otherPlatforms, setOtherPlatforms] = useState<OtherPlatform[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products?status=catalogue");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleOpenModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category._id || product.category,
        images: product.images.length > 0 ? product.images : [""],
        amazonLink: product.buyingOptions.amazon?.link || "",
        amazonPrice: product.buyingOptions.amazon?.price || "",
        flipkartLink: product.buyingOptions.flipkart?.link || "",
        flipkartPrice: product.buyingOptions.flipkart?.price || "",
        axionPrice: product.buyingOptions.axion.price || "",
        species: product.species || [],
        market: product.market || "national",
        tags: product.tags || [],
        ingredients: product.ingredients || "",
        benefits: product.benefits.length > 0 ? product.benefits : [""],
        dosage: product.dosage || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        category: "",
        images: [""],
        amazonLink: "",
        amazonPrice: "",
        flipkartLink: "",
        flipkartPrice: "",
        axionPrice: "",
        species: [],
        market: "national",
        tags: [],
        ingredients: "",
        benefits: [""],
        dosage: "",
      });
      setOtherPlatforms([]);
    }
    setShowModal(true);
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.category || !formData.axionPrice) {
      alert("Please fill in required fields: Name, Category, and Axion Price");
      return;
    }

    setSaving(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      images: formData.images.filter((img) => img.trim() !== ""),
      buyingOptions: {
        amazon: formData.amazonLink
          ? { link: formData.amazonLink, price: parseFloat(formData.amazonPrice) || 0 }
          : undefined,
        flipkart: formData.flipkartLink
          ? { link: formData.flipkartLink, price: parseFloat(formData.flipkartPrice) || 0 }
          : undefined,
        axion: {
          price: parseFloat(formData.axionPrice),
          stock: 0, // No stock in catalogue
        },
      },
      species: formData.species,
      market: formData.market,
      tags: formData.tags,
      status: "catalogue",
      isActive: true,
      ingredients: formData.ingredients,
      benefits: formData.benefits.filter((b) => b.trim() !== ""),
      dosage: formData.dosage,
      lowStockThreshold: 10,
    };

    try {
      const url = editingProduct
        ? `/api/admin/products/${editingProduct._id}`
        : "/api/admin/products";
      const method = editingProduct ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setShowModal(false);
        fetchProducts();
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleArrayAdd = (field: "images" | "benefits") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleArrayRemove = (field: "images" | "benefits", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [""] });
  };

  const handleArrayChange = (field: "images" | "benefits", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const toggleSpecies = (species: string) => {
    setFormData({
      ...formData,
      species: formData.species.includes(species)
        ? formData.species.filter((s) => s !== species)
        : [...formData.species, species],
    });
  };

  const toggleTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter((t) => t !== tag)
        : [...formData.tags, tag],
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Catalogue Management</h1>
          <p className="text-gray-600">
            Add products with ecommerce links. Promote to inventory to enable sales.
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={() => handleOpenModal()}>
          <Plus className="w-5 h-5 mr-2" />
          Add Product to Catalogue
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Axion Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amazon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Flipkart
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No products in catalogue. Click &quot;Add Product&quot; to get started.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              {product.tags.map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="mr-1 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{product.category?.name || "N/A"}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {formatPrice(product.buyingOptions.axion.price)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {product.buyingOptions.amazon ? (
                            <span className="text-green-600">
                              ✓ {formatPrice(product.buyingOptions.amazon.price)}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {product.buyingOptions.flipkart ? (
                            <span className="text-green-600">
                              ✓ {formatPrice(product.buyingOptions.flipkart.price)}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleOpenModal(product)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Basic Information</h3>
                <Input
                  label="Product Name *"
                  placeholder="e.g., Aqua Raksha"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Product description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Product Images</h3>
                {formData.images.map((img, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder="Image URL"
                      value={img}
                      onChange={(e) => handleArrayChange("images", index, e.target.value)}
                      className="flex-1"
                    />
                    {formData.images.length > 1 && (
                      <Button
                        variant="danger"
                        onClick={() => handleArrayRemove("images", index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={() => handleArrayAdd("images")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image URL
                </Button>
              </div>

              {/* Pricing & Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">E-commerce Links & Pricing</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Axion Price (₹) *"
                    type="number"
                    placeholder="1000"
                    value={formData.axionPrice}
                    onChange={(e) => setFormData({ ...formData, axionPrice: e.target.value })}
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Stock will be added when promoting to inventory
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Amazon Link"
                    placeholder="https://amazon.in/product"
                    value={formData.amazonLink}
                    onChange={(e) => setFormData({ ...formData, amazonLink: e.target.value })}
                  />
                  <Input
                    label="Amazon Price (₹)"
                    type="number"
                    placeholder="1200"
                    value={formData.amazonPrice}
                    onChange={(e) => setFormData({ ...formData, amazonPrice: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Flipkart Link"
                    placeholder="https://flipkart.com/product"
                    value={formData.flipkartLink}
                    onChange={(e) => setFormData({ ...formData, flipkartLink: e.target.value })}
                  />
                  <Input
                    label="Flipkart Price (₹)"
                    type="number"
                    placeholder="1150"
                    value={formData.flipkartPrice}
                    onChange={(e) => setFormData({ ...formData, flipkartPrice: e.target.value })}
                  />
                </div>
              </div>

              {/* Species & Market */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Classification</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                  <div className="flex flex-wrap gap-2">
                    {["aqua", "poultry", "dairy", "swine", "equine", "sheep-goat"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSpecies(s)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.species.includes(s)
                            ? "bg-primary-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Market</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="national"
                        checked={formData.market === "national"}
                        onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                        className="mr-2"
                      />
                      National
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="international"
                        checked={formData.market === "international"}
                        onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                        className="mr-2"
                      />
                      International
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {["featured", "frequent", "seasonal", "special-offer", "new-arrival"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTag(t)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.tags.includes(t)
                            ? "bg-primary-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Additional Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredients
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={2}
                    placeholder="Key ingredients..."
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits
                  </label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <Input
                        placeholder="Benefit..."
                        value={benefit}
                        onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                        className="flex-1"
                      />
                      {formData.benefits.length > 1 && (
                        <Button
                          variant="danger"
                          onClick={() => handleArrayRemove("benefits", index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => handleArrayAdd("benefits")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Benefit
                  </Button>
                </div>

                <Input
                  label="Dosage Instructions"
                  placeholder="e.g., 5-10g per kg of feed"
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                />
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-4 sticky bottom-0">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveProduct} disabled={saving}>
                {saving ? "Saving..." : editingProduct ? "Update Product" : "Add to Catalogue"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
