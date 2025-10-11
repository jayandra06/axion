"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Loader, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice, formatDate } from "@/lib/utils";

export default function FlashSalesPage() {
  const [flashSales, setFlashSales] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFlashSales();
    fetchProducts();
  }, []);

  const fetchFlashSales = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/flash-sales");
      const data = await response.json();
      setFlashSales(data.flashSales || []);
    } catch (error) {
      console.error("Error fetching flash sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?status=inventory");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this flash sale?")) return;

    try {
      const response = await fetch(`/api/admin/flash-sales/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFlashSales();
      }
    } catch (error) {
      console.error("Error deleting flash sale:", error);
    }
  };

  const isActive = (sale: any) => {
    const now = new Date();
    const start = new Date(sale.startDate);
    const end = new Date(sale.endDate);
    return sale.isActive && now >= start && now <= end;
  };

  const getStatusBadge = (sale: any) => {
    if (!sale.isActive) return <Badge variant="secondary">Inactive</Badge>;
    if (isActive(sale)) return <Badge variant="success">Active</Badge>;
    if (new Date() < new Date(sale.startDate)) return <Badge variant="warning">Upcoming</Badge>;
    return <Badge variant="default">Expired</Badge>;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Flash Sales Management</h1>
          <p className="text-gray-600">Create and manage flash sales for products</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Flash Sale
        </Button>
      </div>

      {/* Flash Sales Table */}
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
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sold / Max
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
                  {flashSales.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No flash sales created yet
                      </td>
                    </tr>
                  ) : (
                    flashSales.map((sale) => (
                      <tr key={sale._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium">{sale.productId?.name || "N/A"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="danger" className="text-sm">
                            <Zap className="w-3 h-3 mr-1 inline" />
                            {sale.discountPercentage}% OFF
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm">{formatDate(sale.startDate)}</td>
                        <td className="px-6 py-4 text-sm">{formatDate(sale.endDate)}</td>
                        <td className="px-6 py-4 text-sm">
                          {sale.soldQuantity} / {sale.maxQuantity}
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(sale)}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(sale._id)}
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

      {/* Create Modal placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Create Flash Sale</h2>
            <p className="text-gray-600 mb-4">
              Form would include: Product selection, discount percentage, start/end dates, max quantity
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">Create Flash Sale</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


