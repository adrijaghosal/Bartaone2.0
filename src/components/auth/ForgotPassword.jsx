import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiMail,
  FiArrowLeft,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo
} from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Card from '../../common/Card';
import Toast from '../../common/Toast';
import { validateEmail } from '../../../utils/validators';

const ForgotPassword = ({ className = '' }) => {
  const navigate = useNavigate();
  const { resetPassword, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      setToastData({
        message: 'Password reset link sent to your email! 📧',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to send reset link. Please try again.',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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

        <Card variant="gradient" padding="lg" className="w-full max-w-md text-center">
          <div className="mb-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-green-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-warmBeige-100">Check Your Email</h2>
            <p className="text-warmBeige-400 mt-2">
              We've sent a password reset link to <strong className="text-warmBeige-200">{email}</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-800/30 border border-warmBeige-500/10 text-left space-y-2 mb-6">
            <div className="flex items-start gap-2">
              <FiInfo className="text-terracotta-400 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-warmBeige-400">
                The link will expire in <strong className="text-warmBeige-200">15 minutes</strong>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <FiInfo className="text-terracotta-400 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-warmBeige-400">
                Check your spam folder if you don't see the email
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            icon={<FiArrowLeft />}
            fullWidth
          >
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

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

      <Card variant="gradient" padding="lg" className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-terracotta-500/20 flex items-center justify-center mx-auto mb-4">
            <FiMail className="text-terracotta-400" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-warmBeige-100">Forgot Password?</h1>
          <p className="text-warmBeige-400 mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors(prev => ({ ...prev, email: '' }));
              }
            }}
            error={errors.email}
            touched={!!errors.email}
            icon={<FiMail />}
            required
            autoComplete="email"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting || loading}
            disabled={isSubmitting || loading}
            icon={!isSubmitting && !loading ? <FiSend /> : null}
          >
            {isSubmitting || loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-sm text-warmBeige-400 hover:text-warmBeige-100 transition-colors inline-flex items-center gap-1"
          >
            <FiArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;