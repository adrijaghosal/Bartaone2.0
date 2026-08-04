import React, { useState, useEffect } from 'react';
import { FiUserPlus, FiUserCheck, FiUserMinus } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { usePublishers } from '../../hooks/usePublishers';
import Button from '../common/Button';
import Toast from '../common/Toast';

const FollowButton = ({ 
  publisherId,
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  className = '',
  onToggle,
  showToast = true,
}) => {
  const { user } = useAuth();
  const { isFollowing, followPublisher, unfollowPublisher, loading } = usePublishers();
  const [isFollowingState, setIsFollowingState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    if (publisherId) {
      setIsFollowingState(isFollowing(publisherId));
    }
  }, [publisherId, isFollowing]);

  const handleToggle = async () => {
    if (!user) {
      if (showToast) {
        setToastData({
          message: 'Please login to follow publishers',
          type: 'warning'
        });
        setShowToastMessage(true);
      }
      return;
    }

    setIsLoading(true);
    try {
      if (isFollowingState) {
        await unfollowPublisher(publisherId);
        setToastData({
          message: `Unfollowed successfully`,
          type: 'info'
        });
      } else {
        await followPublisher(publisherId);
        setToastData({
          message: `Now following! 🎉`,
          type: 'success'
        });
      }
      
      const newState = !isFollowingState;
      setIsFollowingState(newState);
      
      if (onToggle) {
        onToggle(newState);
      }

      if (showToast) {
        setShowToastMessage(true);
      }
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to update follow status',
        type: 'error'
      });
      setShowToastMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-7 py-3.5',
  };

  const variants = {
    primary: {
      following: 'bg-terracotta-500/20 text-terracotta-400 border-terracotta-500/30 hover:bg-terracotta-500/30',
      notFollowing: 'bg-terracotta-500 text-white hover:bg-terracotta-600',
    },
    outline: {
      following: 'border-terracotta-500 text-terracotta-400 hover:bg-terracotta-500/10',
      notFollowing: 'border-warmBeige-500/30 text-warmBeige-100 hover:border-terracotta-500 hover:text-terracotta-400',
    },
    ghost: {
      following: 'text-terracotta-400 hover:bg-terracotta-500/10',
      notFollowing: 'text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10',
    },
  };

  const getVariantClasses = () => {
    const state = isFollowingState ? 'following' : 'notFollowing';
    return variants[variant][state];
  };

  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    return isFollowingState ? 'Following' : 'Follow';
  };

  const getButtonIcon = () => {
    if (isLoading) return null;
    return isFollowingState ? <FiUserCheck /> : <FiUserPlus />;
  };

  return (
    <>
      <Button
        variant={isFollowingState ? 'outline' : variant}
        size={size}
        fullWidth={fullWidth}
        onClick={handleToggle}
        disabled={isLoading}
        loading={isLoading}
        icon={getButtonIcon()}
        className={`
          transition-all duration-300
          ${!isFollowingState ? '' : getVariantClasses()}
          ${className}
        `}
      >
        {getButtonText()}
      </Button>

      {showToastMessage && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToastMessage(false)}
          duration={3000}
        />
      )}
    </>
  );
};

export default FollowButton;