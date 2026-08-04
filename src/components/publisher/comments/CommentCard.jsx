import React, { useState } from 'react';
import {
  FiCheckCircle,
  FiXCircle,
  FiFlag,
  FiTrash2,
  FiClock,
  FiUser,
  FiMail,
  FiMoreVertical,
  FiCheck,
  FiX,
  FiMessageSquare,
  FiThumbsUp,
  FiThumbsDown,
  FiReply,
  FiStar,
  FiAlertCircle
} from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '../../common/Avatar';
import Badge from '../../common/Badge';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Input from '../../common/Input';

const CommentCard = ({
  comment,
  selected = false,
  onSelect,
  isSelectionMode = false,
  expanded = false,
  onToggleExpand,
  onApprove,
  onReject,
  onDelete,
  onModerate,
  className = '',
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    author,
    content,
    createdAt,
    status = 'pending',
    likes = 0,
    dislikes = 0,
    replies = [],
    reported = false,
    isEdited = false,
    parentId = null,
    sentiment = 'neutral',
    isVerified = false,
  } = comment;

  const getStatusInfo = () => {
    const statusMap = {
      pending: { 
        variant: 'warning', 
        label: 'Pending Review',
        icon: <FiClock size={12} />,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10'
      },
      approved: { 
        variant: 'success', 
        label: 'Approved',
        icon: <FiCheckCircle size={12} />,
        color: 'text-green-400',
        bg: 'bg-green-500/10'
      },
      rejected: { 
        variant: 'danger', 
        label: 'Rejected',
        icon: <FiXCircle size={12} />,
        color: 'text-red-400',
        bg: 'bg-red-500/10'
      },
      flagged: { 
        variant: 'danger', 
        label: 'Flagged',
        icon: <FiFlag size={12} />,
        color: 'text-red-400',
        bg: 'bg-red-500/10'
      },
      spam: { 
        variant: 'danger', 
        label: 'Spam',
        icon: <FiAlertCircle size={12} />,
        color: 'text-red-400',
        bg: 'bg-red-500/10'
      },
    };
    return statusMap[status] || statusMap.pending;
  };

  const getSentimentInfo = () => {
    const sentimentMap = {
      positive: { label: '😊', color: 'text-green-400' },
      neutral: { label: '😐', color: 'text-warmBeige-400' },
      negative: { label: '😞', color: 'text-red-400' },
    };
    return sentimentMap[sentiment] || sentimentMap.neutral;
  };

  const statusInfo = getStatusInfo();
  const sentimentInfo = getSentimentInfo();

  const isPending = status === 'pending' || status === 'flagged';
  const canModerate = isPending || status === 'spam';

  const CommentContent = () => (
    <>
      {/* Comment Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {isSelectionMode && (
            <div 
              className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0
                ${selected 
                  ? 'bg-terracotta-500 border-terracotta-500' 
                  : 'border-warmBeige-500/30 bg-navy-800/80'
                }
              `}
              onClick={(e) => {
                e.stopPropagation();
                onSelect && onSelect();
              }}
            >
              {selected && <FiCheck className="text-white" size={12} />}
            </div>
          )}

          <Avatar 
            src={author?.avatar} 
            alt={author?.name} 
            size="md"
          />
          
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-warmBeige-100">
                {author?.name || 'Anonymous'}
              </span>
              {isVerified && (
                <Badge variant="success" size="xs">✓ Verified</Badge>
              )}
              <Badge variant={statusInfo.variant} size="xs">
                {statusInfo.icon}
                {statusInfo.label}
              </Badge>
              {reported && (
                <Badge variant="danger" size="xs">
                  <FiFlag size={10} /> Reported
                </Badge>
              )}
              {isEdited && (
                <Badge variant="glass" size="xs">Edited</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-xs text-warmBeige-400">
              <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
              {parentId && (
                <>
                  <span>•</span>
                  <span className="text-terracotta-400">Reply</span>
                </>
              )}
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiThumbsUp size={12} />
                {likes}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiThumbsDown size={12} />
                {dislikes}
              </span>
              <span>•</span>
              <span className={sentimentInfo.color}>
                {sentimentInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        {!isSelectionMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              <FiMoreVertical size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Comment Content */}
      <div 
        className={`
          mt-2 text-warmBeige-200 leading-relaxed
          ${expanded ? '' : 'line-clamp-3'}
        `}
      >
        {content}
      </div>

      {/* Expand/Collapse */}
      {content && content.length > 300 && (
        <button
          onClick={onToggleExpand}
          className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors mt-1"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}

      {/* Actions Bar */}
      {!isSelectionMode && (
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-warmBeige-500/10">
          {canModerate && (
            <>
              <Button
                variant="success"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove && onApprove();
                }}
                icon={<FiCheck size={14} />}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject && onReject();
                }}
                icon={<FiX size={14} />}
              >
                Reject
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowReply(!showReply);
            }}
            icon={<FiReply size={14} />}
          >
            Reply
          </Button>

          {reported && (
            <Badge variant="danger" size="sm">
              <FiFlag size={12} /> Reported
            </Badge>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete();
            }}
            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all ml-auto"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      )}

      {/* Reply Input */}
      {showReply && (
        <div className="mt-3 p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
          <div className="flex gap-2">
            <Input
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                // Handle reply submission
                setReplyText('');
                setShowReply(false);
              }}
              icon={<FiSend size={14} />}
            >
              Reply
            </Button>
          </div>
        </div>
      )}

      {/* Replies */}
      {replies && replies.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-warmBeige-500/10 space-y-2">
          {replies.slice(0, expanded ? undefined : 2).map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              isSelectionMode={false}
              className="bg-navy-800/20 border border-warmBeige-500/5"
            />
          ))}
          {replies.length > 2 && !expanded && (
            <button
              onClick={onToggleExpand}
              className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors"
            >
              View all {replies.length} replies
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Card 
      variant="glass" 
      padding="md"
      className={`
        hover:border-terracotta-500/30 hover:shadow-xl hover:shadow-terracotta-500/5
        transition-all duration-300
        ${selected ? 'border-terracotta-500/50 ring-2 ring-terracotta-500/30' : ''}
        ${isPending ? 'border-yellow-500/30' : ''}
        ${reported ? 'border-red-500/30' : ''}
        ${className}
      `}
      onClick={() => isSelectionMode && onSelect && onSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowActions(false);
      }}
    >
      <CommentContent />
    </Card>
  );
};

export default CommentCard;