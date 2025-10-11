"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Package, ShoppingBag, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function CustomerDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      const orders = data.orders || [];

      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(
          (o: any) => o.orderStatus === "pending" || o.orderStatus === "processing"
        ).length,
        completedOrders: orders.filter((o: any) => o.orderStatus === "delivered").length,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {session?.user?.name}!</h1>
          <p className="text-gray-600">Manage your orders and account from here.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-primary-600" />
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
                <Package className="w-12 h-12 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Completed Orders</p>
                  <p className="text-3xl font-bold">{stats.completedOrders}</p>
                </div>
                <Package className="w-12 h-12 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-6 h-6 mr-2" />
                My Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View and track all your orders, check delivery status, and order history.
              </p>
              <Link href="/customer/orders">
                <Button variant="primary">
                  View Orders <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2" />
                Browse Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Explore our wide range of natural, science-backed feed supplements.
              </p>
              <Link href="/products">
                <Button variant="primary">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


