import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Axion Scientifics</h3>
            <p className="text-sm">
              Empowered by Science, Innovative in Solutions. Natural, science-backed feed
              supplements for livestock worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="hover:text-primary-400 transition text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary-400 transition text-sm">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Access */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Admin Access</h3>
            <div className="p-4 bg-primary-700 rounded-lg border-2 border-primary-500">
              <Link 
                href="/admin/login" 
                className="flex items-center space-x-2 hover:text-primary-300 transition font-semibold text-white"
              >
                <span className="text-2xl">🔐</span>
                <div>
                  <div className="text-base">Admin Portal</div>
                  <div className="text-xs text-primary-200">Staff Login Only</div>
                </div>
              </Link>
            </div>
            <ul className="space-y-2 mt-4">
              <li className="text-xs text-gray-400">
                For authorized personnel only
              </li>
            </ul>
          </div>


          {/* Contact & Invest */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Axion Scientifics Pvt. Ltd, India</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@axionscientifics.com</span>
              </li>
            </ul>
            <Link
              href="/invest"
              className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition text-sm font-medium"
            >
              Invest In Us
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Axion Scientifics Pvt. Ltd. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="hover:text-primary-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


