import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList,
  FiRefreshCw,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiCopy,
  FiMoreVertical,
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';
import { useArticles } from '../../../hooks/useArticles';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Input from '../../common/Input';
import Skeleton from '../../common/Skeleton';
import EmptyState from '../../common/EmptyState';
import Modal from '../../common/Modal';
import Toast from '../../common/Toast';
import ArticleStatus from './ArticleStatus';
import DraftList from './DraftList';
import { format, formatDistanceToNow } from 'date-fns';

const ArticleManager = ({ className = '' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    articles,
    loading,
    error,
    getPublisherArticles,
    deleteArticle,
    duplicateArticle,
    updateArticleStatus,
    refreshArticles,
    totalCount
  } = useArticles();

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Articles' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'archived', label: 'Archived' },
    { value: 'pending', label: 'Pending Review' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'views', label: 'Most Views' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'comments', label: 'Most Comments' },
    { value: 'title', label: 'Alphabetical' },
  ];

  useEffect(() => {
    fetchArticles();
  }, [statusFilter, sortBy, page]);

  const fetchArticles = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const data = await getPublisherArticles({
        status: statusFilter === 'all' ? undefined : statusFilter,
        sort: sortBy,
        page: currentPage,
        limit: 12,
        search: searchQuery,
      });
      setHasMore(data.hasMore);
      setPage(currentPage + 1);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to fetch articles',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleSearch = useCallback(() => {
    fetchArticles(true);
  }, [searchQuery]);

  const handleRefresh = () => {
    fetchArticles(true);
    setToastData({
      message: 'Articles refreshed!',
      type: 'success'
    });
    setShowToast(true);
  };

  const handleDelete = async (articleId) => {
    try {
      await deleteArticle(articleId);
      setShowDeleteConfirm(null);
      fetchArticles(true);
      setToastData({
        message: 'Article deleted successfully',
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to delete article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedArticles.map(id => deleteArticle(id)));
      setSelectedArticles([]);
      setIsSelectionMode(false);
      setShowBulkDeleteConfirm(false);
      fetchArticles(true);
      setToastData({
        message: `${selectedArticles.length} articles deleted`,
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: 'Failed to delete articles',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleDuplicate = async (articleId) => {
    try {
      await duplicateArticle(articleId);
      fetchArticles(true);
      setToastData({
        message: 'Article duplicated successfully!',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: 'Failed to duplicate article',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleStatusChange = async (articleId, newStatus) => {
    try {
      await updateArticleStatus(articleId, newStatus);
      fetchArticles(true);
      setToastData({
        message: `Article status updated to ${newStatus}`,
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: 'Failed to update status',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const toggleSelectArticle = (id) => {
    setSelectedArticles(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(articles.map(a => a.id));
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      published: { variant: 'success', icon: <FiCheckCircle /> },
      draft: { variant: 'warning', icon: <FiFileText /> },
      scheduled: { variant: 'info', icon: <FiClock /> },
      archived: { variant: 'glass', icon: <FiArchive /> },
      pending: { variant: 'warning', icon: <FiAlertCircle /> },
    };
    return statusMap[status] || statusMap.draft;
  };

  const filteredArticles = articles.filter(article => {
    if (searchQuery) {
      return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Loading skeleton
  if (loading && articles.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="120px" height="40px" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton variant="text" width="300px" height="40px" />
          <Skeleton variant="button" width="100px" height="40px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" height="280px" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-warmBeige-100 flex items-center gap-2">
            <FiFileText className="text-terracotta-400" />
            Article Manager
            <Badge variant="glass" size="md">
              {totalCount || articles.length}
            </Badge>
          </h2>
          <p className="text-sm text-warmBeige-400 mt-1">
            Manage your articles, drafts, and scheduled content
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={() => navigate('/publisher/create-article')}
            icon={<FiPlus />}
          >
            Write Article
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDrafts(!showDrafts)}
            icon={<FiClock />}
          >
            {showDrafts ? 'Hide Drafts' : 'View Drafts'}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warmBeige-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="
              w-full pl-10 pr-4 py-2.5
              bg-navy-800/50 border border-warmBeige-500/20
              rounded-xl text-warmBeige-100 placeholder-warmBeige-500/50
              focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
              transition-all duration-300
            "
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
          >
            <FiGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
          >
            <FiList size={18} />
          </button>
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all ${loading ? 'animate-spin' : ''}`}
          >
            <FiRefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Selection Mode Bar */}
      {isSelectionMode && selectedArticles.length > 0 && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-terracotta-500/10 border border-terracotta-500/30">
          <div className="flex items-center gap-3">
            <button
              onClick={selectAll}
              className="text-sm text-warmBeige-300 hover:text-warmBeige-100"
            >
              {selectedArticles.length === articles.length ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-sm text-warmBeige-300">
              {selectedArticles.length} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowBulkDeleteConfirm(true)}
              icon={<FiTrash2 />}
            >
              Delete Selected
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedArticles([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Drafts List */}
      {showDrafts && (
        <DraftList onPublish={() => fetchArticles(true)} />
      )}

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No matching articles' : 'No articles yet'}
          description={
            searchQuery 
              ? 'Try adjusting your search terms.'
              : 'Start publishing your first article and share your content with the world.'
          }
          icon={searchQuery ? '🔍' : '✍️'}
          action={
            !searchQuery && (
              <Button variant="primary" onClick={() => navigate('/publisher/create-article')}>
                Write Your First Article
              </Button>
            )
          }
        />
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
          : 'space-y-3'
        }>
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`
                relative group
                ${isSelectionMode ? 'cursor-pointer' : ''}
              `}
              onClick={() => {
                if (isSelectionMode) {
                  toggleSelectArticle(article.id);
                }
              }}
            >
              {isSelectionMode && (
                <div className="absolute top-3 left-3 z-10">
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedArticles.includes(article.id) 
                      ? 'bg-terracotta-500 border-terracotta-500' 
                      : 'border-warmBeige-500/30 bg-navy-800/80'
                    }
                  `}>
                    {selectedArticles.includes(article.id) && (
                      <FiCheckCircle className="text-white" size={12} />
                    )}
                  </div>
                </div>
              )}

              <Card 
                variant="glass" 
                padding="md"
                className={`
                  hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
                  transition-all duration-300
                  ${selectedArticles.includes(article.id) ? 'border-terracotta-500/50 ring-2 ring-terracotta-500/30' : ''}
                `}
              >
                {/* Cover Image */}
                {article.coverImage && (
                  <div className="relative -m-4 mb-3 h-40 overflow-hidden rounded-t-2xl">
                    <img 
                      src={article.coverImage} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                  </div>
                )}

                <div className="space-y-2">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <ArticleStatus status={article.status} />
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-warmBeige-400">
                        {formatDistanceToNow(new Date(article.updatedAt || article.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <Link to={`/publisher/edit-article/${article.id}`}>
                    <h3 className="text-lg font-semibold text-warmBeige-100 hover:text-terracotta-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-sm text-warmBeige-400 line-clamp-2">
                    {article.excerpt || 'No excerpt available'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-xs text-warmBeige-400 pt-2 border-t border-warmBeige-500/10">
                    <span className="flex items-center gap-1">
                      <FiEye size={12} />
                      {article.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiTrendingUp size={12} />
                      {article.likes || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {article.readTime || 0}m
                    </span>
                  </div>

                  {/* Actions */}
                  {!isSelectionMode && (
                    <div className="flex items-center justify-end gap-1 pt-2 border-t border-warmBeige-500/10">
                      <Link
                        to={`/article/${article.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                        title="View Article"
                      >
                        <FiEye size={14} />
                      </Link>
                      <Link
                        to={`/publisher/edit-article/${article.id}`}
                        className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                        title="Edit Article"
                      >
                        <FiEdit2 size={14} />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDuplicate(article.id);
                        }}
                        className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                        title="Duplicate"
                      >
                        <FiCopy size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowDeleteConfirm(article.id);
                        }}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                        title="Delete"
                      >
                        <FiTrash2 size={14} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Show status change dropdown
                          }}
                          className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                        >
                          <FiMoreVertical size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => fetchArticles(false)}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </Button>
        </div>
      )}

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Article"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-warmBeige-300">
            Are you sure you want to delete this article? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowDeleteConfirm(null)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(showDeleteConfirm)}
              fullWidth
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Delete Confirmation */}
      <Modal
        isOpen={showBulkDeleteConfirm}
        onClose={() => setShowBulkDeleteConfirm(false)}
        title="Delete Selected Articles"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-warmBeige-300">
            Are you sure you want to delete {selectedArticles.length} selected articles? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowBulkDeleteConfirm(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleBulkDelete}
              fullWidth
            >
              Delete All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ArticleManager;