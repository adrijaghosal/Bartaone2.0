// src/components/reader/feeds/FeaturedArticles.jsx
import React from 'react';
import ArticleCard from '../../articles/ArticleCard';

const FeaturedArticles = ({ articles = [] }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-warmBeige-400">
        <p>No featured articles available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <ArticleCard 
          key={article.id || index} 
          article={article} 
          variant={index === 0 ? 'featured' : 'standard'}
        />
      ))}
    </div>
  );
};

export default FeaturedArticles;
