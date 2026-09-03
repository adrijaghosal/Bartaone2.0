// src/components/reader/feeds/CategoryFilter.jsx
import React from 'react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'technology', label: 'Technology' },
  { id: 'science', label: 'Science' },
  { id: 'business', label: 'Business' },
  { id: 'health', label: 'Health' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports', label: 'Sports' },
  { id: 'politics', label: 'Politics' },
];

const CategoryFilter = ({ selectedCategory = 'all', onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-terracotta-500 text-white'
              : 'bg-navy-800/50 text-warmBeige-400 hover:bg-navy-700/50 hover:text-warmBeige-100'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
