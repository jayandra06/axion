"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ExternalLink, Loader, Clock, Check, Star, Package, FileText, MessageSquare } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const { addToCart } = useCart();

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const [productRes, reviewsRes] = await Promise.all([
        fetch(`/api/products/${params.id}`),
        fetch(`/api/products/${params.id}/reviews`),
      ]);

      const productData = await productRes.json();
      const reviewsData = await reviewsRes.json();

      setProduct(productData.product);
      setRelatedProducts(productData.relatedProducts || []);
      setReviews(reviewsData.reviews || []);
      setReviewStats(reviewsData.stats);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) {
      alert("Please write a comment");
      return;
    }

    try {
      const response = await fetch(`/api/products/${params.id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });

      if (response.ok) {
        setShowReviewForm(false);
        setReviewForm({ rating: 5, comment: "" });
        fetchProduct(); // Refresh reviews
      } else {
        const data = await response.json();
        alert(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const finalPrice = product.flashSale
        ? product.buyingOptions.axion.price * (1 - product.flashSale.discount / 100)
        : product.buyingOptions.axion.price;

      addToCart({
        productId: product._id,
        name: product.name,
        price: finalPrice,
        quantity: quantity,
        image: product.images[0] || "",
        stock: product.buyingOptions.axion.stock,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  const finalPrice = product.flashSale
    ? product.buyingOptions.axion.price * (1 - product.flashSale.discount / 100)
    : product.buyingOptions.axion.price;

  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "specifications", label: "Specifications", icon: Package },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">
              Home
            </Link>
            {" / "}
            <Link href="/products" className="hover:text-primary-600">
              Products
            </Link>
            {" / "}
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Product Detail */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="bg-gray-100 rounded-2xl mb-4 aspect-square relative overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
                {product.flashSale && (
                  <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-xl">
                    <Clock className="w-6 h-6" />
                    <span className="text-lg">{product.flashSale.discount}% OFF</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-gray-100 rounded-lg cursor-pointer border-3 transition-all ${
                        selectedImage === idx
                          ? "border-primary-600 ring-2 ring-primary-300"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        width={150}
                        height={150}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary">{product.category.name}</Badge>
                {product.tags.map((tag: string) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
                {product.market && (
                  <Badge variant={product.market === "international" ? "success" : "default"}>
                    {product.market}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              {reviewStats && reviewStats.total > 0 && (
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(reviewStats.avgRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({reviewStats.avgRating} out of 5)
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{reviewStats.total} reviews</span>
                </div>
              )}

              <div className="mb-8 pb-8 border-b">
                {product.flashSale ? (
                  <div>
                    <div className="flex items-baseline space-x-3 mb-2">
                      <span className="text-5xl font-bold text-red-600">
                        {formatPrice(finalPrice)}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        {formatPrice(product.buyingOptions.axion.price)}
                      </span>
                    </div>
                    <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold">
                      You save {formatPrice(product.buyingOptions.axion.price - finalPrice)} ({product.flashSale.discount}% OFF)
                    </div>
                  </div>
                ) : (
                  <span className="text-5xl font-bold text-gray-900">
                    {formatPrice(product.buyingOptions.axion.price)}
                  </span>
                )}
                <div className="mt-4">
                  {product.buyingOptions.axion.stock > 0 ? (
                    <div className="flex items-center space-x-2 text-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 font-semibold">
                        In Stock ({product.buyingOptions.axion.stock} units available)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-red-600 font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-lg">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3 text-gray-700">Quantity:</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.buyingOptions.axion.stock, quantity + 1))
                    }
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:bg-gray-100 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buying Options */}
              <div className="space-y-4">
                <h3 className="font-bold text-xl mb-4">Choose Your Buying Option:</h3>

                {/* Buy from Axion */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full py-4 text-lg"
                  onClick={handleAddToCart}
                  disabled={product.buyingOptions.axion.stock === 0}
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  {product.buyingOptions.axion.stock === 0 ? "Out of Stock" : "Add to Cart - Buy from Axion"}
                </Button>

                {/* Alternative Options */}
                {(product.buyingOptions.amazon || product.buyingOptions.flipkart) && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Or buy from our partners:</p>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Buy from Amazon */}
                      {product.buyingOptions.amazon && (
                        <a
                          href={product.buyingOptions.amazon.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center p-4 border-2 border-orange-300 bg-orange-50 rounded-xl hover:bg-orange-100 transition group"
                        >
                          <ExternalLink className="w-6 h-6 text-orange-600 mb-2" />
                          <span className="font-semibold text-orange-900">Buy from Amazon</span>
                          <span className="text-lg font-bold text-orange-700 mt-1">
                            {formatPrice(product.buyingOptions.amazon.price)}
                          </span>
                        </a>
                      )}

                      {/* Buy from Flipkart */}
                      {product.buyingOptions.flipkart && (
                        <a
                          href={product.buyingOptions.flipkart.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center justify-center p-4 border-2 border-blue-300 bg-blue-50 rounded-xl hover:bg-blue-100 transition group"
                        >
                          <ExternalLink className="w-6 h-6 text-blue-600 mb-2" />
                          <span className="font-semibold text-blue-900">Buy from Flipkart</span>
                          <span className="text-lg font-bold text-blue-700 mt-1">
                            {formatPrice(product.buyingOptions.flipkart.price)}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-12">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex space-x-1 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-primary-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                </div>

                {product.benefits && product.benefits.length > 0 && (
                  <div className="p-6 bg-green-50 rounded-xl">
                    <h4 className="font-bold text-xl mb-4 text-green-900">Key Benefits:</h4>
                    <ul className="space-y-3">
                      {product.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.ingredients && (
                  <div>
                    <h4 className="font-bold text-xl mb-3">Ingredients:</h4>
                    <p className="text-gray-700 leading-relaxed">{product.ingredients}</p>
                  </div>
                )}

                {product.dosage && (
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-blue-900">Dosage Instructions:</h4>
                    <p className="text-gray-800">{product.dosage}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-semibold text-gray-600">Category:</span>
                    <p className="text-lg font-medium">{product.category.name}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-semibold text-gray-600">Market:</span>
                    <p className="text-lg font-medium capitalize">{product.market}</p>
                  </div>
                  {product.species && product.species.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="font-semibold text-gray-600">Species:</span>
                      <p className="text-lg font-medium capitalize">{product.species.join(", ")}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <span className="font-semibold text-gray-600">Stock Status:</span>
                    <p className="text-lg font-medium">
                      {product.buyingOptions.axion.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                  {product.ingredients && (
                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                      <span className="font-semibold text-gray-600">Active Ingredients:</span>
                      <p className="text-lg">{product.ingredients}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Customer Reviews</h3>
                  <Button variant="primary" onClick={() => setShowReviewForm(!showReviewForm)}>
                    Write a Review
                  </Button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h4 className="font-bold mb-4">Share Your Experience</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Rating:</label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  star <= reviewForm.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                } hover:fill-yellow-300 transition`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Review:</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows={4}
                          placeholder="Share your thoughts about this product..."
                          value={reviewForm.comment}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, comment: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="primary" onClick={handleSubmitReview}>
                          Submit Review
                        </Button>
                        <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overall Rating */}
                {reviewStats && reviewStats.total > 0 ? (
                  <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary-600">
                          {reviewStats.avgRating}
                        </div>
                        <div className="flex mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= Math.round(reviewStats.avgRating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mt-1">{reviewStats.total} reviews</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {reviewStats.distribution.map((dist: any) => (
                          <div key={dist.rating} className="flex items-center space-x-3">
                            <span className="text-sm w-3">{dist.rating}</span>
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full transition-all"
                                style={{ width: `${dist.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">
                              {Math.round(dist.percentage)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl mb-8">
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review: any) => (
                    <div key={review._id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{review.userName}</span>
                        {review.isVerifiedPurchase && (
                          <Badge variant="success" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct: any) => (
                <ProductCard
                  key={relProduct._id}
                  product={relProduct}
                  onAddToCart={() => {
                    const price = relProduct.flashSale
                      ? relProduct.buyingOptions.axion.price *
                        (1 - relProduct.flashSale.discount / 100)
                      : relProduct.buyingOptions.axion.price;
                    addToCart({
                      productId: relProduct._id,
                      name: relProduct.name,
                      price: price,
                      quantity: 1,
                      image: relProduct.images[0] || "",
                      stock: relProduct.buyingOptions.axion.stock,
                    });
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
