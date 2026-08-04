import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBookmark, 
  FiTrash2, 
  FiFolder, 
  FiFolderPlus,
  FiSearch,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiClock,
  FiFilter,
  FiX,
  FiCheck,
  FiMoreVertical,
  FiEdit2,
  FiMove,
  FiCopy
} from 'react-icons/fi';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useAuth } from '../../hooks/useAuth';
import ArticleCard from '../articles/ArticleCard';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Skeleton from '../common/Skeleton';
import EmptyState from '../common/EmptyState';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Toast from '../common/Toast';
import BookmarkFolder from './BookmarkFolder';

const BookmarkList = ({ 
  folderId = null,
  showFilters = true,
  className = '',
}) => {
  const { user } = useAuth();
  const { 
    bookmarks, 
    folders,
    loading, 
    error,
    getBookmarks,
    getBookmarksByFolder,
    removeBookmark,
    createFolder,
    deleteFolder,
    moveBookmark,
    searchBookmarks,
    refreshBookmarks,
    totalCount,
  } = useBookmarks();

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(folderId);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest', 'title'
  const [filterType, setFilterType] = useState('all'); // 'all', 'articles', 'folders'

  useEffect(() => {
    if (selectedFolder) {
      getBookmarksByFolder(selectedFolder);
    } else {
      getBookmarks();
    }
  }, [selectedFolder, getBookmarks, getBookmarksByFolder]);

  useEffect(() => {
    if (searchQuery) {
      searchBookmarks(searchQuery);
    }
  }, [searchQuery, searchBookmarks]);

  const handleRefresh = useCallback(async () => {
    await refreshBookmarks();
    setToastData({
      message: 'Bookmarks refreshed!',
      type: 'success'
    });
    setShowToast(true);
  }, [refreshBookmarks]);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      setToastData({
        message: 'Please enter a folder name',
        type: 'warning'
      });
      setShowToast(true);
      return;
    }

    try {
      await createFolder(folderName.trim());
      setFolderName('');
      setShowCreateFolder(false);
      setToastData({
        message: 'Folder created successfully! 📁',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to create folder',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);
      setShowDeleteConfirm(null);
      setToastData({
        message: 'Folder deleted successfully',
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to delete folder',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      await removeBookmark(bookmarkId);
      setToastData({
        message: 'Bookmark removed',
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: 'Failed to remove bookmark',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleBulkRemove = async () => {
    if (selectedBookmarks.length === 0) return;
    
    try {
      await Promise.all(selectedBookmarks.map(id => removeBookmark(id)));
      setSelectedBookmarks([]);
      setIsSelectionMode(false);
      setToastData({
        message: `${selectedBookmarks.length} bookmarks removed`,
        type: 'info'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: 'Failed to remove bookmarks',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const toggleSelectBookmark = (id) => {
    setSelectedBookmarks(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedBookmarks.length === bookmarks.length) {
      setSelectedBookmarks([]);
    } else {
      setSelectedBookmarks(bookmarks.map(b => b.id));
    }
  };

  const getSortedBookmarks = () => {
    let sorted = [...bookmarks];
    switch (sortBy) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return sorted;
  };

  const filteredBookmarks = getSortedBookmarks();

  // Loading skeleton
  if (loading && bookmarks.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <Skeleton variant="title" width="150px" height="28px" />
          <Skeleton variant="button" width="120px" height="40px" />
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
        <p className="text-red-400 mb-4">Failed to load bookmarks: {error}</p>
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
            <FiBookmark className="text-terracotta-400" />
            My Bookmarks
            <Badge variant="glass" size="md">
              {totalCount || bookmarks.length}
            </Badge>
          </h2>
          <p className="text-sm text-warmBeige-400 mt-1">
            Save and organize your favorite articles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowCreateFolder(true)}
            icon={<FiFolderPlus />}
          >
            New Folder
          </Button>
          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warmBeige-500" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2.5
                bg-navy-800/50 border border-warmBeige-500/20
                rounded-xl text-warmBeige-100 placeholder-warmBeige-500/50
                focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
                transition-all duration-300
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warmBeige-500 hover:text-warmBeige-100"
              >
                <FiX size={18} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title</option>
            </select>

            <button
              onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
              className="p-2.5 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              {viewMode === 'grid' ? <FiList size={18} /> : <FiGrid size={18} />}
            </button>

            {isSelectionMode ? (
              <Button
                variant="danger"
                size="sm"
                onClick={handleBulkRemove}
                disabled={selectedBookmarks.length === 0}
                icon={<FiTrash2 />}
              >
                Delete ({selectedBookmarks.length})
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSelectionMode(true)}
                icon={<FiCheck />}
              >
                Select
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Folders Grid */}
      {!selectedFolder && folders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {folders.map((folder) => (
            <BookmarkFolder
              key={folder.id}
              folder={folder}
              onClick={() => setSelectedFolder(folder.id)}
              onDelete={() => setShowDeleteConfirm(folder.id)}
            />
          ))}
        </div>
      )}

      {/* Folder Header */}
      {selectedFolder && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex items-center gap-3">
            <FiFolder className="text-terracotta-400" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-warmBeige-100">
                {folders.find(f => f.id === selectedFolder)?.name || 'Folder'}
              </h3>
              <p className="text-sm text-warmBeige-400">
                {bookmarks.length} articles
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedFolder(null);
              getBookmarks();
            }}
          >
            <FiX />
          </Button>
        </div>
      )}

      {/* Bookmarks */}
      {filteredBookmarks.length === 0 && !loading ? (
        <EmptyState
          title={searchQuery ? 'No matching bookmarks' : 'No bookmarks yet'}
          description={
            searchQuery 
              ? 'Try adjusting your search terms.'
              : 'Start saving your favorite articles to read later.'
          }
          icon={searchQuery ? '🔍' : '📌'}
          action={
            !searchQuery && (
              <Button variant="primary" onClick={() => window.location.href = '/feed'}>
                Browse Articles
              </Button>
            )
          }
        />
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
          : 'space-y-4'
        }>
          {filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className={`
                relative group
                ${isSelectionMode ? 'cursor-pointer' : ''}
              `}
              onClick={() => {
                if (isSelectionMode) {
                  toggleSelectBookmark(bookmark.id);
                }
              }}
            >
              {isSelectionMode && (
                <div className="absolute top-3 left-3 z-10">
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                    ${selectedBookmarks.includes(bookmark.id) 
                      ? 'bg-terracotta-500 border-terracotta-500' 
                      : 'border-warmBeige-500/30 bg-navy-800/80'
                    }
                  `}>
                    {selectedBookmarks.includes(bookmark.id) && (
                      <FiCheck className="text-white" size={12} />
                    )}
                  </div>
                </div>
              )}

              <ArticleCard
                article={bookmark}
                variant={viewMode === 'grid' ? 'standard' : 'horizontal'}
                showActions={false}
                className={`
                  ${isSelectionMode ? 'hover:border-terracotta-500/50' : ''}
                  ${selectedBookmarks.includes(bookmark.id) ? 'border-terracotta-500/50 ring-2 ring-terracotta-500/30' : ''}
                `}
              />

              {/* Quick Actions */}
              {!isSelectionMode && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 p-1 bg-navy-900/95 backdrop-blur-xl rounded-xl border border-warmBeige-500/10 shadow-xl">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Move to folder functionality
                      }}
                      className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                      title="Move to folder"
                    >
                      <FiFolder size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveBookmark(bookmark.id);
                      }}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                      title="Remove bookmark"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Folder Modal */}
      <Modal
        isOpen={showCreateFolder}
        onClose={() => {
          setShowCreateFolder(false);
          setFolderName('');
        }}
        title="Create New Folder"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            label="Folder Name"
            placeholder="Enter folder name..."
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            autoFocus
            icon={<FiFolder />}
          />
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                setShowCreateFolder(false);
                setFolderName('');
              }}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateFolder}
              fullWidth
              disabled={!folderName.trim()}
            >
              Create Folder
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Folder Confirmation */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Folder"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-warmBeige-300">
            Are you sure you want to delete this folder? All bookmarks in this folder will be moved to "All Bookmarks".
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
              onClick={() => handleDeleteFolder(showDeleteConfirm)}
              fullWidth
            >
              Delete Folder
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookmarkList;