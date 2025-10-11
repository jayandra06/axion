"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inventoryProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch("/api/admin/products/stats"),
        fetch("/api/orders"),
      ]);

      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      const orders = ordersData.orders || [];
      const totalRevenue = orders
        .filter((o: any) => o.paymentStatus === "completed")
        .reduce((sum: number, o: any) => sum + o.totalAmount, 0);

      setStats({
        totalProducts: productsData.total || 0,
        inventoryProducts: productsData.inventory || 0,
        totalOrders: orders.length,
        pendingOrders: orders.filter(
          (o: any) => o.orderStatus === "pending" || o.orderStatus === "processing"
        ).length,
        totalRevenue,
        lowStockProducts: productsData.lowStock || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to Axion Scientifics Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Products</p>
                <p className="text-3xl font-bold">{stats.totalProducts}</p>
              </div>
              <Package className="w-12 h-12 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Inventory Products</p>
                <p className="text-3xl font-bold">{stats.inventoryProducts}</p>
              </div>
              <Package className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Orders</p>
                <p className="text-3xl font-bold">{stats.pendingOrders}</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Low Stock Alerts</p>
                <p className="text-3xl font-bold">{stats.lowStockProducts}</p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Monitor recent orders, product updates, and customer activities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Database</span>
                <span className="text-green-600 font-medium">✓ Connected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Gateway</span>
                <span className="text-green-600 font-medium">✓ Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Server Status</span>
                <span className="text-green-600 font-medium">✓ Running</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


