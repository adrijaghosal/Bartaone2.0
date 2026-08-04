import React, { useState, useMemo } from 'react';
import { 
  FiTrendingUp, 
  FiBook, 
  FiCode, 
  FiBriefcase, 
  FiHeart,
  FiSmile,
  FiCpu,
  FiGlobe,
  FiStar,
  FiChevronDown
} from 'react-icons/fi';

const CategoryFilter = ({ 
  selectedCategory = 'all', 
  onCategoryChange,
  showAll = true,
  className = '',
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    { id: 'all', label: 'All', icon: FiStar },
    { id: 'technology', label: 'Technology', icon: FiCpu },
    { id: 'business', label: 'Business', icon: FiBriefcase },
    { id: 'science', label: 'Science', icon: FiBook },
    { id: 'health', label: 'Health', icon: FiHeart },
    { id: 'politics', label: 'Politics', icon: FiGlobe },
    { id: 'entertainment', label: 'Entertainment', icon: FiSmile },
    { id: 'world', label: 'World News', icon: FiGlobe },
    { id: 'sports', label: 'Sports', icon: FiTrendingUp },
    { id: 'design', label: 'Design', icon: FiCode },
    { id: 'education', label: 'Education', icon: FiBook },
    { id: 'environment', label: 'Environment', icon: FiGlobe },
  ];

  const visibleCategories = useMemo(() => {
    if (showAllCategories) return categories;
    return categories.slice(0, 8);
  }, [showAllCategories, categories]);

  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId);
  };

  const CategoryButton = ({ category }) => {
    const isSelected = selectedCategory === category.id;
    const Icon = category.icon;

    return (
      <button
        key={category.id}
        onClick={() => handleCategoryClick(category.id)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap
          transition-all duration-300 text-sm font-medium
          ${isSelected
            ? 'bg-terracotta-500 text-white shadow-lg shadow-terracotta-500/25'
            : 'bg-navy-800/50 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 border border-warmBeige-500/10'
          }
        `}
      >
        <Icon size={16} className={isSelected ? 'text-white' : ''} />
        {category.label}
      </button>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {visibleCategories.map((category) => (
          <CategoryButton key={category.id} category={category} />
        ))}

        {categories.length > 8 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            {showAllCategories ? 'Show Less' : 'More'}
            <FiChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${showAllCategories ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>

      {/* Selected Category Indicator */}
      {selectedCategory !== 'all' && (
        <div className="mt-3 flex items-center gap-2 text-sm text-warmBeige-400">
          <span>Showing:</span>
          <Badge variant="primary" size="sm">
            {categories.find(c => c.id === selectedCategory)?.label || selectedCategory}
          </Badge>
          <button
            onClick={() => handleCategoryClick('all')}
            className="text-warmBeige-500 hover:text-warmBeige-300 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};

// Badge component needed for CategoryFilter
const Badge = ({ children, variant = 'primary', size = 'sm', className = '' }) => {
  const variants = {
    primary: 'bg-terracotta-500/20 text-terracotta-400 border-terracotta-500/30',
    glass: 'bg-white/10 text-warmBeige-100 border-white/20 backdrop-blur-sm',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`
      inline-flex items-center border font-medium rounded-full
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default CategoryFilter;