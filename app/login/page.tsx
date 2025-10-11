"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Fetch session to verify customer role
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        
        // Only allow customers to login here
        if (session?.user?.role === "admin") {
          setError("This is customer login. Please use Admin Login from footer.");
          // Sign out admin user
          await fetch("/api/auth/signout", { method: "POST" });
          return;
        }
        
        // Redirect customer to their dashboard
        router.push("/customer/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="text-center">
              <CardTitle>Customer Login</CardTitle>
              <p className="text-sm text-gray-500 mt-2">Login to shop and track your orders</p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-center">
              <p className="text-sm text-yellow-800">
                <strong>Admin?</strong> Please use the Admin Login link in the footer
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                This login is for customers only. Admins cannot login here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

