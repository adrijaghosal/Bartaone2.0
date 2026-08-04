import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiBriefcase,
  FiCheckCircle,
  FiArrowRight,
  FiUserCheck,
  FiBookOpen,
  FiTrendingUp,
  FiAward,
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiStar,
  FiInfo
} from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button';
import Card from '../../common/Card';
import Toast from '../../common/Toast';

const RoleSelection = ({ className = '' }) => {
  const navigate = useNavigate();
  const { user, updateUserRole, loading, isAuthenticated } = useAuth();

  const [selectedRole, setSelectedRole] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
    // If user already has a role, redirect
    if (user?.role) {
      navigate(user.role === 'publisher' ? '/publisher/dashboard' : '/');
    }
  }, [isAuthenticated, user, navigate]);

  const roles = [
    {
      id: 'reader',
      title: 'Reader',
      icon: <FiUser className="text-4xl" />,
      description: 'Discover and enjoy curated content',
      features: [
        'Personalized AI-powered feed',
        'Bookmark and save articles',
        'Follow publishers and topics',
        'Reading streak and achievements',
        'Multi-language support',
        'Comment and engage with content',
      ],
      color: 'terracotta',
    },
    {
      id: 'publisher',
      title: 'Publisher',
      icon: <FiBriefcase className="text-4xl" />,
      description: 'Create and monetize your content',
      features: [
        'Publish articles and manage drafts',
        'Advanced analytics dashboard',
        'Revenue and subscriber management',
        'AI-powered content suggestions',
        'Comment moderation tools',
        'Audience insights and growth metrics',
      ],
      color: 'blue',
    },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setToastData({
        message: 'Please select a role to continue',
        type: 'warning'
      });
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateUserRole(selectedRole);
      setToastData({
        message: `Welcome to BartaOne as a ${selectedRole}! 🎉`,
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => {
        navigate(selectedRole === 'publisher' ? '/publisher/dashboard' : '/');
      }, 1500);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to update role',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-navy-950 p-4 ${className}`}>
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      )}

      <Card variant="gradient" padding="lg" className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-warmBeige-100">Choose Your Role</h1>
          <p className="text-warmBeige-400 mt-2">
            Select how you want to use BartaOne
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-warmBeige-500">
            <FiInfo size={14} />
            <span>You can change this later in settings</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`
                p-6 rounded-2xl cursor-pointer transition-all duration-300
                ${selectedRole === role.id 
                  ? `bg-${role.color}-500/10 border-2 border-${role.color}-500 shadow-lg shadow-${role.color}-500/10` 
                  : 'bg-navy-800/30 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                }
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center
                  ${selectedRole === role.id 
                    ? `bg-${role.color}-500/20 text-${role.color}-400` 
                    : 'bg-navy-800/50 text-warmBeige-400'
                  }
                `}>
                  {role.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-warmBeige-100">{role.title}</h3>
                    {selectedRole === role.id && (
                      <FiCheckCircle className="text-terracotta-400" size={20} />
                    )}
                  </div>
                  <p className="text-sm text-warmBeige-400 mt-1">{role.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-1.5">
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-warmBeige-400">
                    <FiCheckCircle className="text-terracotta-400 flex-shrink-0" size={12} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {selectedRole === role.id && (
                <div className="mt-4 p-2 rounded-lg bg-terracotta-500/10 border border-terracotta-500/20">
                  <p className="text-xs text-terracotta-400 text-center">
                    ✓ Selected as {role.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            fullWidth
          >
            Skip for now
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            loading={isSubmitting}
            disabled={isSubmitting || !selectedRole}
            icon={!isSubmitting && selectedRole ? <FiArrowRight /> : null}
            fullWidth
          >
            {isSubmitting ? 'Setting up...' : 'Continue'}
          </Button>
        </div>

        <div className="mt-4 text-center text-xs text-warmBeige-500">
          <p>You can change your role at any time from your profile settings</p>
        </div>
      </Card>
    </div>
  );
};

export default RoleSelection;