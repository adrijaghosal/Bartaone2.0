import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PublisherProfile from '../../components/reader/publishers/PublisherProfile';
import { usePublishers } from '../../hooks/usePublishers';
import Skeleton from '../../components/common/Skeleton';
import Button from '../../components/common/Button';
import Toast from '../../components/common/Toast';
import { FiArrowLeft } from 'react-icons/fi';

const PublisherPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPublisher, loading, error } = usePublishers();

  const [publisher, setPublisher] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchPublisher();
  }, [id]);

  const fetchPublisher = async () => {
    try {
      const data = await getPublisher(id);
      setPublisher(data);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to load publisher',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton variant="card" height="200px" />
        <Skeleton variant="title" width="300px" height="32px" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" height="200px" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !publisher) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-warmBeige-100 mb-2">Publisher Not Found</h2>
        <p className="text-warmBeige-400 mb-6">The publisher you're looking for doesn't exist.</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}
      <PublisherProfile publisher={publisher} />
    </div>
  );
};

export default PublisherPage;