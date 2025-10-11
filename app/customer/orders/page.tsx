"use client";

import React, { useState, useEffect } from "react";
import { formatPrice, formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Package, Loader } from "lucide-react";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: any = {
      pending: { variant: "warning", label: "Pending" },
      processing: { variant: "secondary", label: "Processing" },
      shipped: { variant: "primary", label: "Shipped" },
      delivered: { variant: "success", label: "Delivered" },
      cancelled: { variant: "danger", label: "Cancelled" },
    };

    const config = statusMap[status] || statusMap.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const statusMap: any = {
      pending: { variant: "warning", label: "Pending" },
      completed: { variant: "success", label: "Paid" },
      failed: { variant: "danger", label: "Failed" },
      refunded: { variant: "secondary", label: "Refunded" },
    };

    const config = statusMap[status] || statusMap.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-xl text-gray-500 mb-2">No orders yet</p>
              <p className="text-gray-400">Your order history will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order ID: #{order._id.slice(-8)}</p>
                      <p className="text-sm text-gray-500">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      {getPaymentBadge(order.paymentStatus)}
                      {getStatusBadge(order.orderStatus)}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-b py-4 mb-4">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Shipping Address:</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.name}, {order.shippingAddress.phone}
                      <br />
                      {order.shippingAddress.street}, {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.state}, {order.shippingAddress.pincode}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary-600">{formatPrice(order.totalAmount)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


