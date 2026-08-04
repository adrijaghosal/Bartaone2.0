import React, { useState } from 'react';
import { 
  FiSend, 
  FiClock, 
  FiCalendar, 
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import Input from '../../common/Input';
import Badge from '../../common/Badge';
import Toast from '../../common/Toast';
import ArticleStatus from './ArticleStatus';

const PublishButton = ({ 
  articleId, 
  status = 'draft', 
  onPublish,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [publishOption, setPublishOption] = useState('publish');
  const [scheduledDate, setScheduledDate] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  const handlePublish = async () => {
    if (publishOption === 'publish') {
      setIsLoading(true);
      try {
        await onPublish('published', null);
        setIsOpen(false);
        setToastData({
          message: 'Article published successfully! 🎉',
          type: 'success'
        });
        setShowToast(true);
      } catch (error) {
        setToastData({
          message: error.message || 'Failed to publish',
          type: 'error'
        });
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    } else if (publishOption === 'schedule') {
      if (!scheduledDate) {
        setToastData({
          message: 'Please select a date and time',
          type: 'warning'
        });
        setShowToast(true);
        return;
      }
      
      setIsLoading(true);
      try {
        await onPublish('scheduled', scheduledDate);
        setIsOpen(false);
        setToastData({
          message: `Article scheduled for ${new Date(scheduledDate).toLocaleString()}`,
          type: 'success'
        });
        setShowToast(true);
      } catch (error) {
        setToastData({
          message: error.message || 'Failed to schedule',
          type: 'error'
        });
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getButtonText = () => {
    if (status === 'published') return 'Published';
    if (status === 'scheduled') return 'Scheduled';
    if (status === 'pending') return 'Pending Review';
    return 'Publish';
  };

  const getButtonVariant = () => {
    if (status === 'published') return 'success';
    if (status === 'scheduled') return 'info';
    if (status === 'pending') return 'warning';
    return 'primary';
  };

  const isPublished = status === 'published' || status === 'scheduled';

  return (
    <>
      <Button
        variant={getButtonVariant()}
        onClick={() => !isPublished && setIsOpen(true)}
        disabled={disabled || isPublished || status === 'pending'}
        className={className}
      >
        {status === 'published' && <FiCheckCircle className="mr-1" />}
        {status === 'scheduled' && <FiClock className="mr-1" />}
        {status === 'pending' && <FiAlertCircle className="mr-1" />}
        {getButtonText()}
      </Button>

      {/* Publish Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Publish Article"
        size="md"
      >
        <div className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <span className="text-sm text-warmBeige-400">Current Status:</span>
            <ArticleStatus status={status} />
          </div>

          {/* Publish Options */}
          <div className="space-y-2">
            <button
              onClick={() => setPublishOption('publish')}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all
                ${publishOption === 'publish' 
                  ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                  : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                }
              `}
            >
              <div className="w-8 h-8 rounded-full bg-terracotta-500/20 flex items-center justify-center">
                <FiSend className="text-terracotta-400" size={16} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-warmBeige-100">Publish Now</p>
                <p className="text-xs text-warmBeige-400">Instantly publish your article</p>
              </div>
              {publishOption === 'publish' && (
                <FiCheckCircle className="text-terracotta-400" size={18} />
              )}
            </button>

            <button
              onClick={() => setPublishOption('schedule')}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all
                ${publishOption === 'schedule' 
                  ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                  : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                }
              `}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FiCalendar className="text-blue-400" size={16} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-warmBeige-100">Schedule</p>
                <p className="text-xs text-warmBeige-400">Set a date and time to publish</p>
              </div>
              {publishOption === 'schedule' && (
                <FiCheckCircle className="text-terracotta-400" size={18} />
              )}
            </button>
          </div>

          {/* Schedule Date Picker */}
          {publishOption === 'schedule' && (
            <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
              <Input
                type="datetime-local"
                label="Schedule Date & Time"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handlePublish}
              loading={isLoading}
              fullWidth
            >
              {publishOption === 'publish' ? 'Publish Now' : 'Schedule'}
            </Button>
          </div>

          {/* Warning */}
          <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-start gap-2">
              <FiAlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={14} />
              <p className="text-xs text-warmBeige-400">
                Once published, your article will be visible to all readers. Make sure everything is perfect before publishing.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </>
  );
};

export default PublishButton;