import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ExternalLink, Clock, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    buyingOptions: {
      amazon?: { link: string; price: number };
      flipkart?: { link: string; price: number };
      axion: { price: number; stock: number };
    };
    category: { name: string };
    tags: string[];
    flashSale?: {
      discount: number;
      endDate: string;
      maxQuantity: number;
      soldQuantity: number;
    };
  };
  onAddToCart?: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const finalPrice = product.flashSale
    ? product.buyingOptions.axion.price * (1 - product.flashSale.discount / 100)
    : product.buyingOptions.axion.price;

  const isFeatured = product.tags.includes("featured");
  const isSpecialOffer = product.tags.includes("special-offer");

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-primary-300 flex flex-col h-full">
      {/* Image */}
      <Link href={`/products/${product._id}`} className="block relative">
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Package className="w-16 h-16 mb-2" />
              <span className="text-sm">No Image</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />

          {/* Flash Sale Badge */}
          {product.flashSale && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-lg animate-pulse">
              <Clock className="w-4 h-4" />
              <span>{product.flashSale.discount}% OFF</span>
            </div>
          )}

          {/* Featured Star */}
          {isFeatured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-2 rounded-lg shadow-lg">
              <Star className="w-4 h-4 fill-current" />
            </div>
          )}

          {/* Tags */}
          {!isFeatured && product.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge 
                variant={isSpecialOffer ? "danger" : "primary"} 
                className="text-xs font-semibold shadow-lg"
              >
                {product.tags[0]}
              </Badge>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-xs bg-white/90 backdrop-blur-sm">
              {product.category.name}
            </Badge>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary-600 transition line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          {product.flashSale ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-red-600">{formatPrice(finalPrice)}</span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.buyingOptions.axion.price)}
              </span>
              <span className="text-xs text-red-600 font-semibold">
                Save {product.flashSale.discount}%
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.buyingOptions.axion.price)}
            </span>
          )}
          <div className="text-xs mt-2">
            {product.buyingOptions.axion.stock > 0 ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">
                  In Stock ({product.buyingOptions.axion.stock} units)
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">Out of Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            className="w-full py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            onClick={onAddToCart}
            disabled={product.buyingOptions.axion.stock === 0}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {product.buyingOptions.axion.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>

          {/* Alternative Purchase Options */}
          {(product.buyingOptions.amazon || product.buyingOptions.flipkart) && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center font-medium">Or buy from:</p>
              <div className="grid grid-cols-2 gap-2">
                {product.buyingOptions.amazon && (
                  <a
                    href={product.buyingOptions.amazon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition flex items-center justify-center font-medium shadow-sm hover:shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Amazon
                  </a>
                )}
                {product.buyingOptions.flipkart && (
                  <a
                    href={product.buyingOptions.flipkart.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center font-medium shadow-sm hover:shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Flipkart
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}
