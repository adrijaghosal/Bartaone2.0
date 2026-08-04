import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiFileText,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiCalendar,
  FiArrowRight,
  FiCopy
} from 'react-icons/fi';
import { useArticles } from '../../../hooks/useArticles';
import Card from '../../common/Card';
import Button from '../../common/Button';
import Badge from '../../common/Badge';
import Skeleton from '../../common/Skeleton';
import EmptyState from '../../common/EmptyState';
import { formatDistanceToNow } from 'date-fns';

const DraftList = ({ onPublish, className = '' }) => {
  const navigate = useNavigate();
  const { getDrafts, deleteArticle, duplicateArticle, updateArticleStatus, loading } = useArticles();
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      setIsLoading(true);
      const data = await getDrafts();
      setDrafts(data);
    } catch (error) {
      console.error('Failed to fetch drafts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      await deleteArticle(id);
      fetchDrafts();
    }
  };

  const handleDuplicate = async (id) => {
    await duplicateArticle(id);
    fetchDrafts();
  };

  const handleContinueEditing = (id) => {
    navigate(`/publisher/edit-article/${id}`);
  };

  const handlePublish = async (id) => {
    await updateArticleStatus(id, 'published');
    fetchDrafts();
    if (onPublish) onPublish();
  };

  if (isLoading) {
    return (
      <div className={`space-y-3 ${className}`}>
        <Skeleton variant="title" width="150px" height="20px" />
        <Skeleton variant="card" height="80px" count={3} />
      </div>
    );
  }

  if (drafts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-warmBeige-400 flex items-center gap-2">
          <FiFileText />
          Drafts ({drafts.length})
        </h3>
        <Link to="/publisher/create-article" className="text-xs text-terracotta-400 hover:text-terracotta-300">
          New Draft +
        </Link>
      </div>

      <div className="space-y-2">
        {drafts.map((draft) => (
          <Card 
            key={draft.id} 
            variant="glass" 
            padding="sm"
            className="hover:border-terracotta-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              {/* Draft Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <FiFileText className="text-yellow-400" size={18} />
              </div>

              {/* Draft Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-warmBeige-100 truncate">
                    {draft.title || 'Untitled Draft'}
                  </h4>
                  <Badge variant="warning" size="xs">Draft</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-warmBeige-400">
                  <span className="flex items-center gap-1">
                    <FiClock size={12} />
                    Updated {formatDistanceToNow(new Date(draft.updatedAt || draft.createdAt), { addSuffix: true })}
                  </span>
                  <span>•</span>
                  <span>{draft.readTime || 0} min read</span>
                  <span>•</span>
                  <span>{draft.content?.split(/\s+/).filter(w => w.length > 0).length || 0} words</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleContinueEditing(draft.id)}
                  icon={<FiEdit2 />}
                >
                  Continue
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handlePublish(draft.id)}
                >
                  Publish
                </Button>
                <button
                  onClick={() => handleDuplicate(draft.id)}
                  className="p-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
                  title="Duplicate"
                >
                  <FiCopy size={14} />
                </button>
                <button
                  onClick={() => handleDelete(draft.id)}
                  className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View All Drafts Link */}
      <Link 
        to="/publisher/articles?status=draft" 
        className="flex items-center justify-center gap-1 text-sm text-warmBeige-400 hover:text-warmBeige-100 transition-colors pt-2"
      >
        View all drafts
        <FiArrowRight size={14} />
      </Link>
    </div>
  );
};

export default DraftList;