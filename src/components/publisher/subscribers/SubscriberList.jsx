import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiUsers, 
  FiSearch, 
  FiFilter, 
  FiDownload,
  FiRefreshCw,
  FiMail,
  FiCalendar,
  FiClock,
  FiMoreVertical,
  FiUserCheck,
  FiUserX,
  FiTrash2,
  FiSend,
  FiStar,
  FiTrendingUp,
  FiTrendingDown,
  FiAward,
  FiTag,
  FiPlus,
  FiX
} from 'react-icons/fi';
import { useSubscribers } from '../../../hooks/useSubscribers';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Input from '../../common/Input';
import Skeleton from '../../common/Skeleton';
import EmptyState from '../../common/EmptyState';
import Modal from '../../common/Modal';
import Toast from '../../common/Toast';
import SubscriberCard from './SubscriberCard';
import { format, formatDistanceToNow } from 'date-fns';

const SubscriberList = ({ className = '' }) => {
  const { user } = useAuth();
  const {
    subscribers,
    loading,
    error,
    getSubscribers,
    searchSubscribers,
    exportSubscribers,
    sendBulkEmail,
    updateSubscriberStatus,
    deleteSubscriber,
    refreshSubscribers,
    totalCount,
    activeCount,
    inactiveCount,
    newCount,
  } = useSubscribers();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showBulkEmail, setShowBulkEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Subscribers' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'new', label: 'New' },
    { value: 'premium', label: 'Premium' },
  ];

  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Alphabetical' },
    { value: 'engagement', label: 'Highest Engagement' },
  ];

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter, sortBy, page]);

  const fetchSubscribers = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const data = await getSubscribers({
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
        message: err.message || 'Failed to fetch subscribers',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleSearch = useCallback(() => {
    if (searchQuery) {
      searchSubscribers(searchQuery);
    } else {
      fetchSubscribers(true);
    }
  }, [searchQuery]);

  const handleRefresh = () => {
    fetchSubscribers(true);
    setToastData({
      message: 'Subscribers refreshed!',
      type: 'success'
    });
    setShowToast(true);
  };

  const handleExport = async () => {
    try {
      const data = await exportSubscribers({
        status: statusFilter === 'all' ? undefined : statusFilter,
        format: 'csv'
      });
      
      // Create download link
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscribers_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      setToastData({
        message: 'Subscribers exported successfully!',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to export subscribers',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleSendBulkEmail = async () => {
    if (!emailSubject || !emailBody) {
      setToastData({
        message: 'Please fill in both subject and body',
        type: 'warning'
      });
      setShowToast(true);
      return;
    }

    try {
      await sendBulkEmail({
        subscriberIds: selectedSubscribers.length > 0 ? selectedSubscribers : undefined,
        subject: emailSubject,
        body: emailBody,
      });
      
      setShowBulkEmail(false);
      setEmailSubject('');
      setEmailBody('');
      setSelectedSubscribers([]);
      setIsSelectionMode(false);
      
      setToastData({
        message: `Email sent to ${selectedSubscribers.length > 0 ? selectedSubscribers.length : 'all'} subscribers!`,
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to send email',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleStatusUpdate = async (subscriberId, status) => {
    try {
      await updateSubscriberStatus(subscriberId, status);
      fetchSubscribers(true);
      setToastData({
        message: `Subscriber status updated to ${status}`,
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to update status',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleDelete = async (subscriberId) => {
    try {
      await deleteSubscriber(subscriberId);
      setShowDeleteConfirm(null);
      fetchSubscribers(true);
      setToastData({
        message: 'Subscriber removed successfully',
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to remove subscriber',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const toggleSelectSubscriber = (id) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedSubscribers.length === subscribers.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(subscribers.map(s => s.id));
    }
  };

  // Loading skeleton
  if (loading && subscribers.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="200px" height="32px" />
          <Skeleton variant="button" width="150px" height="40px" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton variant="text" width="300px" height="40px" />
          <Skeleton variant="button" width="100px" height="40px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="card" height="200px" />
          ))}
        </div>
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
            <FiUsers className="text-terracotta-400" />
            Subscribers
            <Badge variant="glass" size="md">
              {totalCount || subscribers.length}
            </Badge>
          </h2>
          <p className="text-sm text-warmBeige-400 mt-1">
            Manage your audience and engagement
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowBulkEmail(true)}
            icon={<FiSend />}
          >
            Send Newsletter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            icon={<FiDownload />}
          >
            Export
          </Button>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <p className="text-xs text-warmBeige-400">Total</p>
          <p className="text-xl font-bold text-warmBeige-100">{totalCount || 0}</p>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-xs text-warmBeige-400">Active</p>
          <p className="text-xl font-bold text-green-400">{activeCount || 0}</p>
        </div>
        <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-xs text-warmBeige-400">New</p>
          <p className="text-xl font-bold text-yellow-400">{newCount || 0}</p>
        </div>
        <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <p className="text-xs text-warmBeige-400">Inactive</p>
          <p className="text-xl font-bold text-warmBeige-400">{inactiveCount || 0}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warmBeige-500" />
          <input
            type="text"
            placeholder="Search subscribers..."
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
            <FiUsers size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-terracotta-500/20 text-terracotta-400' : 'text-warmBeige-400 hover:text-warmBeige-100'}`}
          >
            <FiMoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Selection Mode Bar */}
      {isSelectionMode && selectedSubscribers.length > 0 && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-terracotta-500/10 border border-terracotta-500/30">
          <div className="flex items-center gap-3">
            <button
              onClick={selectAll}
              className="text-sm text-warmBeige-300 hover:text-warmBeige-100"
            >
              {selectedSubscribers.length === subscribers.length ? 'Deselect All' : 'Select All'}
            </button>
            <span className="text-sm text-warmBeige-300">
              {selectedSubscribers.length} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowBulkEmail(true)}
              icon={<FiSend />}
            >
              Email Selected
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedSubscribers([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Subscribers Grid */}
      {subscribers.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No matching subscribers' : 'No subscribers yet'}
          description={
            searchQuery 
              ? 'Try adjusting your search terms.'
              : 'Start building your audience by publishing great content.'
          }
          icon={searchQuery ? '🔍' : '👥'}
          action={
            !searchQuery && (
              <Button variant="primary" onClick={() => window.location.href = '/publisher/create-article'}>
                Publish Article
              </Button>
            )
          }
        />
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
          : 'space-y-3'
        }>
          {subscribers.map((subscriber) => (
            <SubscriberCard
              key={subscriber.id}
              subscriber={subscriber}
              variant={viewMode === 'grid' ? 'default' : 'compact'}
              selected={selectedSubscribers.includes(subscriber.id)}
              onSelect={() => {
                if (isSelectionMode) {
                  toggleSelectSubscriber(subscriber.id);
                }
              }}
              isSelectionMode={isSelectionMode}
              onStatusUpdate={handleStatusUpdate}
              onDelete={() => setShowDeleteConfirm(subscriber.id)}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => fetchSubscribers(false)}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {/* Bulk Email Modal */}
      <Modal
        isOpen={showBulkEmail}
        onClose={() => {
          setShowBulkEmail(false);
          setEmailSubject('');
          setEmailBody('');
        }}
        title="Send Newsletter"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-warmBeige-400">
            {selectedSubscribers.length > 0 
              ? `Sending to ${selectedSubscribers.length} selected subscribers`
              : 'Sending to all subscribers'
            }
          </p>
          
          <Input
            label="Subject"
            placeholder="Enter email subject..."
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
          
          <div>
            <label className="block text-sm font-medium text-warmBeige-200 mb-2">
              Message
            </label>
            <textarea
              placeholder="Write your newsletter content..."
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={8}
              className="
                w-full px-4 py-3
                bg-navy-800/50 backdrop-blur-sm
                border border-warmBeige-500/20
                rounded-xl
                text-warmBeige-100 placeholder-warmBeige-500/50
                focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
                transition-all duration-300
                resize-none
              "
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                setShowBulkEmail(false);
                setEmailSubject('');
                setEmailBody('');
              }}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSendBulkEmail}
              fullWidth
              disabled={!emailSubject || !emailBody}
            >
              Send Newsletter
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Remove Subscriber"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-warmBeige-300">
            Are you sure you want to remove this subscriber? This action cannot be undone.
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
              Remove
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriberList;