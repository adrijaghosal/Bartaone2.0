import React, { useState, useEffect, useCallback } from 'react';
import {
  FiMessageSquare,
  FiCheckCircle,
  FiXCircle,
  FiFlag,
  FiTrash2,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiClock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiMoreVertical,
  FiCheck,
  FiX,
  FiSend,
  FiStar,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';
import { useComments } from '../../../hooks/useComments';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Input from '../../common/Input';
import Skeleton from '../../common/Skeleton';
import EmptyState from '../../common/EmptyState';
import Modal from '../../common/Modal';
import Toast from '../../common/Toast';
import CommentCard from './CommentCard';
import CommentFilters from './CommentFilters';
import { formatDistanceToNow } from 'date-fns';

const CommentModeration = ({ 
  articleId = null,
  className = '',
}) => {
  const { user } = useAuth();
  const {
    comments,
    loading,
    error,
    getComments,
    moderateComment,
    deleteComment,
    approveComment,
    rejectComment,
    refreshComments,
    getCommentStats,
    totalCount,
    pendingCount,
    approvedCount,
    reportedCount,
  } = useComments();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedComments, setSelectedComments] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showBulkAction, setShowBulkAction] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [expandedComment, setExpandedComment] = useState(null);

  useEffect(() => {
    fetchComments();
    fetchStats();
  }, [filterStatus, filterType, sortBy, page, articleId]);

  const fetchComments = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const data = await getComments({
        articleId,
        status: filterStatus === 'all' ? undefined : filterStatus,
        type: filterType === 'all' ? undefined : filterType,
        sort: sortBy,
        page: currentPage,
        limit: 20,
        search: searchQuery,
      });
      setHasMore(data.hasMore);
      setPage(currentPage + 1);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to fetch comments',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getCommentStats(articleId);
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleSearch = useCallback(() => {
    fetchComments(true);
  }, [searchQuery]);

  const handleRefresh = () => {
    fetchComments(true);
    fetchStats();
    setToastData({
      message: 'Comments refreshed!',
      type: 'success'
    });
    setShowToast(true);
  };

  const handleModerate = async (commentId, action) => {
    try {
      await moderateComment(commentId, action);
      fetchComments(true);
      fetchStats();
      setToastData({
        message: `Comment ${action}d successfully`,
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to moderate comment',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleApprove = async (commentId) => {
    try {
      await approveComment(commentId);
      fetchComments(true);
      fetchStats();
      setToastData({
        message: 'Comment approved! ✅',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to approve comment',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleReject = async (commentId) => {
    try {
      await rejectComment(commentId);
      fetchComments(true);
      fetchStats();
      setToastData({
        message: 'Comment rejected',
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to reject comment',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setShowDeleteConfirm(null);
      fetchComments(true);
      fetchStats();
      setToastData({
        message: 'Comment deleted successfully',
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to delete comment',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedComments.length === 0) return;

    try {
      await Promise.all(
        selectedComments.map(id => {
          if (action === 'approve') return approveComment(id);
          if (action === 'reject') return rejectComment(id);
          if (action === 'delete') return deleteComment(id);
          return moderateComment(id, action);
        })
      );
      
      setSelectedComments([]);
      setIsSelectionMode(false);
      setShowBulkAction(null);
      fetchComments(true);
      fetchStats();
      
      setToastData({
        message: `${selectedComments.length} comments ${action}d successfully`,
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to perform bulk action',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const toggleSelectComment = (id) => {
    setSelectedComments(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedComments.length === comments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(comments.map(c => c.id));
    }
  };

  const toggleExpandComment = (id) => {
    setExpandedComment(expandedComment === id ? null : id);
  };

  // Loading skeleton
  if (loading && comments.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="120px" height="40px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="80px" />
          ))}
        </div>
        <Skeleton variant="card" height="120px" />
        <Skeleton variant="card" height="120px" />
        <Skeleton variant="card" height="120px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <Button onClick={handleRefresh} icon={<FiRefreshCw />}>
          Try Again
        </Button>
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
            <FiMessageSquare className="text-terracotta-400" />
            Comment Moderation
            <Badge variant="glass" size="md">
              {totalCount || comments.length}
            </Badge>
          </h2>
          <p className="text-sm text-warmBeige-400 mt-1">
            Manage and moderate comments on your articles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <div className="flex items-center justify-between">
              <p className="text-xs text-warmBeige-400">Total</p>
              <FiMessageSquare className="text-terracotta-400" size={14} />
            </div>
            <p className="text-xl font-bold text-warmBeige-100">{stats.total || 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <p className="text-xs text-warmBeige-400">Pending</p>
              <FiClock className="text-yellow-400" size={14} />
            </div>
            <p className="text-xl font-bold text-yellow-400">{stats.pending || 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center justify-between">
              <p className="text-xs text-warmBeige-400">Approved</p>
              <FiCheckCircle className="text-green-400" size={14} />
            </div>
            <p className="text-xl font-bold text-green-400">{stats.approved || 0}</p>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center justify-between">
              <p className="text-xs text-warmBeige-400">Reported</p>
              <FiFlag className="text-red-400" size={14} />
            </div>
            <p className="text-xl font-bold text-red-400">{stats.reported || 0}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <CommentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Selection Mode Bar */}
      {isSelectionMode && selectedComments.length > 0 && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-terracotta-500/10 border border-terracotta-500/30">
          <div className="flex items-center gap-3">
            <button
              onClick={selectAll}
              className="text-sm text-warmBeige-300 hover:text-warmBeige-100"
            >
              {selectedComments.length === comments.length ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-sm text-warmBeige-300">
              {selectedComments.length} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => setShowBulkAction('approve')}
              icon={<FiCheck />}
            >
              Approve All
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowBulkAction('reject')}
              icon={<FiX />}
            >
              Reject All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedComments([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No matching comments' : 'No comments to moderate'}
          description={
            searchQuery 
              ? 'Try adjusting your search terms.'
              : 'Comments will appear here once readers start engaging with your articles.'
          }
          icon={searchQuery ? '🔍' : '💬'}
          action={
            !searchQuery && (
              <Button variant="primary" onClick={() => window.location.href = '/publisher/articles'}>
                View Your Articles
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              selected={selectedComments.includes(comment.id)}
              onSelect={() => {
                if (isSelectionMode) {
                  toggleSelectComment(comment.id);
                }
              }}
              isSelectionMode={isSelectionMode}
              expanded={expandedComment === comment.id}
              onToggleExpand={() => toggleExpandComment(comment.id)}
              onApprove={() => handleApprove(comment.id)}
              onReject={() => handleReject(comment.id)}
              onDelete={() => setShowDeleteConfirm(comment.id)}
              onModerate={(action) => handleModerate(comment.id, action)}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => fetchComments(false)}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Comments'}
          </Button>
        </div>
      )}

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Comment"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-warmBeige-300">
            Are you sure you want to delete this comment? This action cannot be undone.
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

      {/* Bulk Action Confirmation */}
      <Modal
        isOpen={!!showBulkAction}
        onClose={() => setShowBulkAction(null)}
        title={`${showBulkAction?.charAt(0).toUpperCase() + showBulkAction?.slice(1)} Comments`}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-warmBeige-300">
            Are you sure you want to {showBulkAction} {selectedComments.length} selected comments?
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowBulkAction(null)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant={showBulkAction === 'delete' ? 'danger' : 'primary'}
              onClick={() => handleBulkAction(showBulkAction)}
              fullWidth
            >
              {showBulkAction?.charAt(0).toUpperCase() + showBulkAction?.slice(1)} All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CommentModeration;