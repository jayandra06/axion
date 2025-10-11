"use client";

import React from "react";
import { X } from "lucide-react";

interface FilterProps {
  filters: {
    category: string;
    species: string;
    market: string;
    tags: string;
    minPrice: string;
    maxPrice: string;
  };
  categories: any[];
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export default function ProductFilters({
  filters,
  categories,
  onFilterChange,
  onClearFilters,
}: FilterProps) {
  const speciesOptions = ["aqua", "poultry", "dairy", "swine", "equine", "sheep-goat"];
  const tagOptions = ["featured", "frequent", "seasonal", "special-offer", "new-arrival"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-red-600 hover:underline flex items-center"
        >
          <X className="w-4 h-4 mr-1" />
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <FilterSection title="Category">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </FilterSection>

      {/* Species Filter */}
      <FilterSection title="Species">
        <div className="space-y-2">
          {speciesOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.species === option}
                onChange={(e) => onFilterChange("species", e.target.checked ? option : "")}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm capitalize">{option.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Market Filter */}
      <FilterSection title="Market">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="market"
              value=""
              checked={filters.market === ""}
              onChange={(e) => onFilterChange("market", "")}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">All</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="market"
              value="national"
              checked={filters.market === "national"}
              onChange={(e) => onFilterChange("market", e.target.value)}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">National</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="market"
              value="international"
              checked={filters.market === "international"}
              onChange={(e) => onFilterChange("market", e.target.value)}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">International</span>
          </label>
        </div>
      </FilterSection>

      {/* Tags Filter */}
      <FilterSection title="Tags">
        <div className="space-y-2">
          {tagOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tags === option}
                onChange={(e) => onFilterChange("tags", e.target.checked ? option : "")}
                className="rounded text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm capitalize">{option.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection title="Price Range (₹)">
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 pb-4 last:border-b-0">
      <h4 className="font-semibold mb-3 text-sm">{title}</h4>
      {children}
    </div>
  );
}


