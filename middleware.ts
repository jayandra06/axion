import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    
    // Allow access to admin login page without authentication
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    
    const isAdminRoute = pathname.startsWith("/admin");
    const isCustomerRoute = pathname.startsWith("/customer");

    // Protect admin routes
    if (isAdminRoute && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Protect customer routes
    if (isCustomerRoute && token?.role !== "customer" && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to /admin/login without token
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};


