import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiTrendingUp,
  FiClock,
  FiBookmark,
  FiStar,
  FiArrowRight,
  FiZap,
  FiSparkles,
  FiUsers,
  FiEye,
  FiMessageSquare,
  FiHeart,
  FiChevronRight
} from 'react-icons/fi';
import { useArticles } from '../../hooks/useArticles';
import { useAuth } from '../../hooks/useAuth';
import { useStreak } from '../../hooks/useStreak';
import ArticleCard from '../../components/articles/ArticleCard';
import FeaturedArticles from '../../components/reader/feeds/FeaturedArticles';
import CategoryFilter from '../../components/reader/feeds/CategoryFilter';
import PublisherCard from '../../components/reader/publishers/PublisherCard';
import StreakBadge from '../../components/reader/streaks/StreakBadge';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import AISummary from '../../components/ai/AISummary';

const HomePage = () => {
  const { user } = useAuth();
  const { 
    getArticles, 
    getTrending, 
    getRecommended,
    loading 
  } = useArticles();
  const { streak } = useStreak();

  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [topPublishers, setTopPublishers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loadingStates, setLoadingStates] = useState({
    featured: true,
    trending: true,
    recommended: true,
    publishers: true,
  });

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      // Fetch featured articles
      const featured = await getArticles({ featured: true, limit: 5 });
      setFeaturedArticles(featured.articles || []);
      setLoadingStates(prev => ({ ...prev, featured: false }));

      // Fetch trending articles
      const trending = await getTrending({ limit: 6 });
      setTrendingArticles(trending || []);
      setLoadingStates(prev => ({ ...prev, trending: false }));

      // Fetch recommended articles
      const recommended = await getRecommended({ limit: 4 });
      setRecommendedArticles(recommended || []);
      setLoadingStates(prev => ({ ...prev, recommended: false }));

      // Fetch top publishers
      // Mock data for now
      setTopPublishers([
        { id: 1, name: 'Tech Daily', logo: null, verified: true, followerCount: 12345, articleCount: 234 },
        { id: 2, name: 'Global News', logo: null, verified: true, followerCount: 9876, articleCount: 189 },
        { id: 3, name: 'Science Weekly', logo: null, verified: false, followerCount: 5432, articleCount: 156 },
        { id: 4, name: 'Business Insider', logo: null, verified: true, followerCount: 8765, articleCount: 201 },
      ]);
      setLoadingStates(prev => ({ ...prev, publishers: false }));
    } catch (error) {
      console.error('Failed to fetch home data:', error);
      setLoadingStates({
        featured: false,
        trending: false,
        recommended: false,
        publishers: false,
      });
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Loading skeletons
  const renderSkeleton = (type = 'card', count = 3) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(count)].map((_, i) => (
          <Skeleton key={i} variant={type} height="280px" />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-terracotta-500/20 to-navy-800/50 border border-warmBeige-500/10 p-6 md:p-8 lg:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="glass" size="md" className="flex items-center gap-1">
                <FiSparkles className="text-yellow-400" size={14} />
                AI-Powered News
              </Badge>
              {user && <StreakBadge variant="compact" size="md" />}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmBeige-100">
              {user ? (
                <>
                  Welcome back, <span className="text-terracotta-400">{user.name?.split(' ')[0]}</span>! 👋
                </>
              ) : (
                <>
                  Discover <span className="text-terracotta-400">Smarter</span> News
                </>
              )}
            </h1>
            <p className="text-warmBeige-300 mt-2 max-w-2xl">
              {user 
                ? 'Your personalized feed is ready. Catch up on the latest stories tailored just for you.'
                : 'AI-powered news platform connecting readers and publishers in a unified digital ecosystem.'
              }
            </p>
            {!user && (
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="primary" onClick={() => window.location.href = '/register'}>
                  Get Started
                  <FiArrowRight className="ml-2" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/feed'}>
                  Explore Feed
                </Button>
              </div>
            )}
          </div>
          {user && (
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <Button variant="primary" onClick={() => window.location.href = '/feed'}>
                My Feed
                <FiChevronRight className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* AI Summary Section */}
      {featuredArticles.length > 0 && (
        <AISummary 
          articles={featuredArticles.slice(0, 5)}
          onViewAll={() => window.location.href = '/feed'}
        />
      )}

      {/* Featured Articles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiStar className="text-yellow-400" />
            Featured Stories
          </h2>
          <Link to="/feed" className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1">
            View all
            <FiArrowRight size={14} />
          </Link>
        </div>
        {loadingStates.featured ? (
          renderSkeleton('card', 3)
        ) : (
          <FeaturedArticles articles={featuredArticles} />
        )}
      </section>

      {/* Trending Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiTrendingUp className="text-terracotta-400" />
            Trending Now
          </h2>
          <Link to="/feed?sort=trending" className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1">
            View all
            <FiArrowRight size={14} />
          </Link>
        </div>
        {loadingStates.trending ? (
          renderSkeleton('card', 3)
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} variant="standard" />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section>
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
        />
      </section>

      {/* Recommended & Top Publishers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Articles */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-warmBeige-100 flex items-center gap-2">
              <FiZap className="text-yellow-400" />
              Recommended for You
            </h2>
            <Link to="/feed" className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1">
              View all
              <FiArrowRight size={14} />
            </Link>
          </div>
          {loadingStates.recommended ? (
            renderSkeleton('horizontal', 2)
          ) : (
            <div className="space-y-3">
              {recommendedArticles.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          )}
        </div>

        {/* Top Publishers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-warmBeige-100 flex items-center gap-2">
              <FiUsers className="text-terracotta-400" />
              Top Publishers
            </h2>
            <Link to="/publishers" className="text-sm text-terracotta-400 hover:text-terracotta-300 transition-colors flex items-center gap-1">
              View all
              <FiArrowRight size={14} />
            </Link>
          </div>
          {loadingStates.publishers ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} variant="card" height="80px" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {topPublishers.map((publisher) => (
                <PublisherCard key={publisher.id} publisher={publisher} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-3xl font-bold text-terracotta-400">10K+</div>
          <p className="text-sm text-warmBeige-400">Active Readers</p>
        </Card>
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-3xl font-bold text-terracotta-400">50+</div>
          <p className="text-sm text-warmBeige-400">Publishers</p>
        </Card>
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-3xl font-bold text-terracotta-400">100K+</div>
          <p className="text-sm text-warmBeige-400">Articles Published</p>
        </Card>
        <Card variant="glass" padding="md" className="text-center">
          <div className="text-3xl font-bold text-terracotta-400">4.8★</div>
          <p className="text-sm text-warmBeige-400">Average Rating</p>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;