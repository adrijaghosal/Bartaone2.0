import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiBookmark, 
  FiShare2, 
  FiHeart,
  FiMessageSquare,
  FiClock,
  FiEye,
  FiTrendingUp,
  FiTwitter,
  FiFacebook,
  FiLink,
  FiMoreHorizontal,
  FiFlag,
  FiSave
} from 'react-icons/fi';
import { formatDistanceToNow, format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../hooks/useAuth';
import { useArticles } from '../../hooks/useArticles';
import { useBookmarks } from '../../hooks/useBookmarks';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ReadingProgress from './ReadingProgress';
import RelatedArticles from './RelatedArticles';
import CommentSection from '../publisher/comments/CommentSection';
import Skeleton from '../common/Skeleton';
import Toast from '../common/Toast';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getArticle, loading, error } = useArticles();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [readingTime, setReadingTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const contentRef = useRef(null);
  const articleRef = useRef(null);

  // Fetch article on mount
  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(id);
      if (data) {
        setArticle(data);
        setLikesCount(data.likes || 0);
        setLiked(data.isLiked || false);
        // Calculate reading time
        const wordsPerMinute = 200;
        const wordCount = data.content?.split(/\s+/).length || 0;
        setReadingTime(Math.ceil(wordCount / wordsPerMinute));
      }
    };
    fetchArticle();
  }, [id, getArticle]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { top, height } = contentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - top) / height, 0), 1);
      // Update progress in ReadingProgress component via context or prop
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = async () => {
    if (!user) {
      setToastMessage('Please login to like articles');
      setToastType('warning');
      setShowToast(true);
      return;
    }
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    // API call to like/unlike
  };

  const handleBookmark = async () => {
    if (!user) {
      setToastMessage('Please login to bookmark articles');
      setToastType('warning');
      setShowToast(true);
      return;
    }
    await toggleBookmark(id);
    const isBookmarkedNow = isBookmarked(id);
    setToastMessage(isBookmarkedNow ? 'Article bookmarked!' : 'Bookmark removed');
    setToastType(isBookmarkedNow ? 'success' : 'info');
    setShowToast(true);
  };

  const handleShare = async (platform = 'copy') => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article on BartaOne';
    
    try {
      if (platform === 'copy') {
        await navigator.clipboard.writeText(url);
        setToastMessage('Link copied to clipboard!');
        setToastType('success');
        setShowToast(true);
      } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    } catch (error) {
      setToastMessage('Failed to share article');
      setToastType('error');
      setShowToast(true);
    }
    setShowShareMenu(false);
  };

  const handleReport = () => {
    setToastMessage('Article reported. We will review it shortly.');
    setToastType('info');
    setShowToast(true);
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton variant="card" height="60px" />
        <Skeleton variant="title" height="48px" width="80%" />
        <Skeleton variant="text" height="20px" count={3} />
        <Skeleton variant="card" height="400px" />
        <div className="space-y-2">
          <Skeleton variant="text" height="20px" count={5} />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Article Not Found</h2>
        <p className="text-warmBeige-400 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')} variant="primary">
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" ref={articleRef}>
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Reading Progress Bar */}
      <ReadingProgress targetRef={articleRef} />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-warmBeige-400 hover:text-warmBeige-100 transition-colors mb-6 group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      {/* Article Header */}
      <header className="mb-8">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {article.categories?.map((category) => (
            <Badge key={category} variant="primary" size="md">
              {category}
            </Badge>
          ))}
          {article.trending && (
            <Badge variant="warning" size="md" icon={<FiTrendingUp size={14} />}>
              Trending
            </Badge>
          )}
          {article.exclusive && (
            <Badge variant="glass" size="md">Exclusive</Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmBeige-100 leading-tight mb-4">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-lg text-warmBeige-300 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
        )}

        {/* Author & Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-warmBeige-500/10">
          <div className="flex items-center gap-4">
            <Avatar 
              src={article.author?.avatar} 
              alt={article.author?.name}
              size="lg"
              status="online"
            />
            <div>
              <div className="flex items-center gap-2">
                <Link 
                  to={`/publisher/${article.author?.id}`}
                  className="text-warmBeige-100 font-semibold hover:text-terracotta-400 transition-colors"
                >
                  {article.author?.name}
                </Link>
                {article.author?.verified && (
                  <Badge variant="success" size="xs">✓ Verified</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-warmBeige-400">
                <span>{article.publisher?.name}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-warmBeige-400">
            <span className="flex items-center gap-1">
              <FiEye size={16} />
              {article.views || 0} views
            </span>
            <span className="flex items-center gap-1">
              <FiMessageSquare size={16} />
              {article.comments || 0}
            </span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="relative mb-8 rounded-3xl overflow-hidden">
          <img 
            src={article.coverImage} 
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
          {article.coverCaption && (
            <p className="text-sm text-warmBeige-400 mt-2 text-center">
              {article.coverCaption}
            </p>
          )}
        </div>
      )}

      {/* Article Content */}
      <div 
        ref={contentRef}
        className={`
          prose prose-invert max-w-none
          prose-headings:text-warmBeige-100
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-warmBeige-300 prose-p:leading-relaxed
          prose-a:text-terracotta-400 prose-a:no-underline hover:prose-a:text-terracotta-300
          prose-strong:text-warmBeige-100
          prose-ul:text-warmBeige-300 prose-ol:text-warmBeige-300
          prose-blockquote:border-terracotta-500 prose-blockquote:bg-navy-800/50
          prose-blockquote:rounded-lg prose-blockquote:py-2 prose-blockquote:px-6
          prose-img:rounded-xl prose-img:shadow-xl
          prose-code:text-terracotta-400 prose-code:bg-navy-800/50 prose-code:px-1 prose-code:rounded
          prose-pre:bg-navy-800/50 prose-pre:border prose-pre:border-warmBeige-500/10
          ${!isExpanded ? 'max-h-[800px] overflow-hidden relative' : ''}
        `}
      >
        <ReactMarkdown>
          {article.content || ''}
        </ReactMarkdown>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Read More Toggle */}
      {!isExpanded && article.content?.length > 2000 && (
        <button
          onClick={() => setIsExpanded(true)}
          className="mt-4 text-terracotta-400 hover:text-terracotta-300 font-medium transition-colors"
        >
          Read Full Article →
        </button>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-warmBeige-500/10">
          <h4 className="text-sm font-medium text-warmBeige-400 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${tag}`}
                className="px-3 py-1 rounded-full bg-navy-800/50 text-warmBeige-400 text-sm hover:text-terracotta-400 hover:bg-terracotta-500/20 transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 py-6 border-y border-warmBeige-500/10">
        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant={liked ? 'primary' : 'outline'}
            onClick={handleLike}
            icon={<FiHeart className={liked ? 'fill-white' : ''} />}
          >
            {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </Button>

          <Button
            variant={isBookmarked(id) ? 'primary' : 'outline'}
            onClick={handleBookmark}
            icon={<FiBookmark className={isBookmarked(id) ? 'fill-white' : ''} />}
          >
            {isBookmarked(id) ? 'Bookmarked' : 'Bookmark'}
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowShareMenu(!showShareMenu)}
              icon={<FiShare2 />}
            >
              Share
            </Button>

            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-xl shadow-2xl min-w-[200px] animate-slideDown z-50">
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 rounded-lg transition-all"
                >
                  <FiTwitter className="text-blue-400" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 rounded-lg transition-all"
                >
                  <FiFacebook className="text-blue-600" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 rounded-lg transition-all"
                >
                  <FiLink />
                  Copy Link
                </button>
                <hr className="border-warmBeige-500/10 my-1" />
                <button
                  onClick={handleReport}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <FiFlag />
                  Report Article
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Bio */}
      {article.author?.bio && (
        <div className="mt-8 p-6 rounded-2xl bg-navy-800/50 border border-warmBeige-500/10">
          <div className="flex items-start gap-4">
            <Avatar src={article.author.avatar} alt={article.author.name} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-warmBeige-100 font-semibold">{article.author.name}</h4>
                {article.author.verified && (
                  <Badge variant="success" size="xs">Verified</Badge>
                )}
              </div>
              <p className="text-sm text-warmBeige-400 mb-2">{article.author.bio}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-warmBeige-400">
                  <span className="text-warmBeige-100 font-medium">{article.author.articles || 0}</span> articles
                </span>
                <span className="text-warmBeige-400">
                  <span className="text-warmBeige-100 font-medium">{article.author.followers || 0}</span> followers
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Articles */}
      <RelatedArticles 
        articleId={id} 
        category={article.categories?.[0]} 
        tags={article.tags}
      />

      {/* Comments Section */}
      {user && (
        <CommentSection 
          articleId={id}
          commentsCount={article.comments || 0}
        />
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-warmBeige-500/10 text-center text-sm text-warmBeige-500">
        <p>© {new Date().getFullYear()} BartaOne. All rights reserved.</p>
        <p className="mt-1">This article was published on {format(new Date(article.publishedAt), 'MMMM d, yyyy')}</p>
      </div>
    </div>
  );
};

export default ArticleDetail;