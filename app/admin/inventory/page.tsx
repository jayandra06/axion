"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Edit, Search, Loader, AlertTriangle } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [catalogueProducts, setCatalogueProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showPromoteModal, setShowPromoteModal] = useState(false);

  useEffect(() => {
    fetchInventoryProducts();
    fetchCatalogueProducts();
  }, []);

  const fetchInventoryProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products?status=inventory");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogueProducts = async () => {
    try {
      const response = await fetch("/api/products?status=catalogue");
      const data = await response.json();
      setCatalogueProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching catalogue:", error);
    }
  };

  const handlePromote = async (productId: string, stock: number = 0) => {
    try {
      // First promote to inventory
      const promoteResponse = await fetch(`/api/admin/products/${productId}/promote`, {
        method: "POST",
      });

      if (promoteResponse.ok) {
        // Then update stock
        const updateResponse = await fetch(`/api/admin/products/${productId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "buyingOptions.axion.stock": stock,
          }),
        });

        if (updateResponse.ok) {
          fetchInventoryProducts();
          fetchCatalogueProducts();
          alert(`Product promoted to inventory with ${stock} units!`);
        }
      }
    } catch (error) {
      console.error("Error promoting product:", error);
      alert("Error promoting product");
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "buyingOptions.axion.stock": newStock,
        }),
      });

      if (response.ok) {
        fetchInventoryProducts();
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockProducts = filteredProducts.filter(
    (p) => p.buyingOptions.axion.stock < p.lowStockThreshold
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Inventory Management</h1>
          <p className="text-gray-600">Manage stock levels and promote products from catalogue</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowPromoteModal(true)}
        >
          <TrendingUp className="w-5 h-5 mr-2" />
          Promote Products
        </Button>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">
                {lowStockProducts.length} product(s) are running low on stock!
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Inventory Table */}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Low Stock Threshold
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No products in inventory
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const isLowStock =
                        product.buyingOptions.axion.stock < product.lowStockThreshold;

                      return (
                        <tr key={product._id} className={isLowStock ? "bg-red-50" : "hover:bg-gray-50"}>
                          <td className="px-6 py-4">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.category?.name}</div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            {formatPrice(product.buyingOptions.axion.price)}
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={product.buyingOptions.axion.stock}
                              onChange={(e) => handleUpdateStock(product._id, parseInt(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          </td>
                          <td className="px-6 py-4 text-sm">{product.lowStockThreshold}</td>
                          <td className="px-6 py-4">
                            {isLowStock ? (
                              <Badge variant="danger">Low Stock</Badge>
                            ) : (
                              <Badge variant="success">In Stock</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Promote Modal */}
      {showPromoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-primary-600 text-white">
              <h2 className="text-2xl font-bold">Promote Products to Inventory</h2>
              <p className="text-primary-100 mt-1">
                Select catalogue products and set initial stock levels
              </p>
            </div>

            <div className="p-6">
              {catalogueProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No catalogue products available</p>
                  <p className="text-sm text-gray-400">
                    Add products to catalogue first before promoting to inventory
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {catalogueProducts.map((product) => (
                    <div
                      key={product._id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category?.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm">
                              <strong>Axion Price:</strong> {formatPrice(product.buyingOptions.axion.price)}
                            </span>
                            {product.buyingOptions.amazon && (
                              <span className="text-sm text-orange-600">
                                ✓ Amazon: {formatPrice(product.buyingOptions.amazon.price)}
                              </span>
                            )}
                            {product.buyingOptions.flipkart && (
                              <span className="text-sm text-blue-600">
                                ✓ Flipkart: {formatPrice(product.buyingOptions.flipkart.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end space-x-4">
                        <div className="flex-1 max-w-xs">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Initial Stock Quantity *
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 50"
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            id={`stock-${product._id}`}
                          />
                        </div>
                        <Button
                          variant="primary"
                          onClick={() => {
                            const stockInput = document.getElementById(
                              `stock-${product._id}`
                            ) as HTMLInputElement;
                            const stock = parseInt(stockInput?.value || "0");
                            if (stock > 0) {
                              handlePromote(product._id, stock);
                            } else {
                              alert("Please enter a valid stock quantity");
                            }
                          }}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Promote to Inventory
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <Button variant="outline" onClick={() => setShowPromoteModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


