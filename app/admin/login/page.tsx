"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Shield } from "lucide-react";

export default function AdminLoginPage() {
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
        // Fetch session to verify admin role
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        
        if (session?.user?.role === "admin") {
          router.push("/admin/dashboard");
          router.refresh();
        } else {
          setError("Access denied. Only admin accounts can login here. Please use customer login from top navigation.");
          // Sign out non-admin users
          await fetch("/api/auth/signout", { method: "POST" });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding at top */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:opacity-80 transition">
            <div className="text-3xl font-bold text-white mb-2">
              Axion <span className="text-primary-400">Scientifics</span>
            </div>
          </Link>
          
          <div className="mt-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-full mb-4 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-lg">Secure Access Only</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
              )}

              <Input
                label="Admin Email"
                type="email"
                placeholder="admin@axionscientifics.com"
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
                {loading ? "Logging in..." : "Login as Admin"}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-xs text-blue-800 font-medium">Default Admin Credentials:</p>
              <p className="text-xs text-blue-600 mt-1">
                admin@axionscientifics.com / admin123
              </p>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-center">
              <p className="text-sm text-yellow-800">
                <strong>Customer?</strong> Use the Login button in the top navigation bar
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                ← Back to Home
              </Link>
            </div>
            
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                This login is for administrators only.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Axion Scientifics Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}

