"use client";

import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import SessionWrapper from "@/components/SessionWrapper";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide header and footer for admin routes (except login)
  const isAdminRoute = pathname?.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminLogin = pathname === "/admin/login";
  
  // Show header/footer for public pages and customer pages
  const showHeaderFooter = !isAdminRoute && !isAdminLogin;

  return (
    <body className={inter.className}>
      <SessionWrapper>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            {showHeaderFooter && <Header />}
            <main className={showHeaderFooter ? "flex-grow" : "min-h-screen"}>{children}</main>
            {showHeaderFooter && <Footer />}
          </div>
        </CartProvider>
      </SessionWrapper>
    </body>
  );
}

