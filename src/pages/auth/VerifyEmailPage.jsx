import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiArrowLeft,
  FiSend,
  FiClock,
  FiShield,
  FiInfo
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Toast from '../../components/common/Toast';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (token) {
      verifyEmail(token);
    }
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const verifyEmail = async (token) => {
    try {
      // Call API to verify email
      // const response = await verifyEmailToken(token);
      setVerificationStatus('success');
      setToastData({
        message: 'Email verified successfully! 🎉',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setVerificationStatus('error');
      setToastData({
        message: error.message || 'Verification failed. Please try again.',
        type: 'error'
      });
      setShowToast(true);
    }
  };

  const handleResendVerification = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      // Call API to resend verification email
      // await resendVerificationEmail(user.email);
      setResendCount(prev => prev + 1);
      setCountdown(60);
      setToastData({
        message: 'Verification email sent! 📧',
        type: 'success'
      });
      setShowToast(true);
    } catch (error) {
      setToastData({
        message: error.message || 'Failed to resend verification email',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-500 mx-auto" />
          <p className="text-warmBeige-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 p-4">
      {showToast && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/10 text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all z-50"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      <Card variant="gradient" padding="lg" className="w-full max-w-md relative overflow-hidden">
        <div className="relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-0 left-0 p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiArrowLeft size={20} />
          </button>

          <div className="text-center">
            {/* Icon */}
            <div className={`
              w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
              ${verificationStatus === 'pending' ? 'bg-yellow-500/20' : ''}
              ${verificationStatus === 'success' ? 'bg-green-500/20' : ''}
              ${verificationStatus === 'error' ? 'bg-red-500/20' : ''}
            `}>
              {verificationStatus === 'pending' && <FiMail className="text-yellow-400" size={40} />}
              {verificationStatus === 'success' && <FiCheckCircle className="text-green-400" size={40} />}
              {verificationStatus === 'error' && <FiAlertCircle className="text-red-400" size={40} />}
            </div>

            <h1 className="text-2xl font-bold text-warmBeige-100">
              {verificationStatus === 'pending' && 'Verify Your Email'}
              {verificationStatus === 'success' && 'Email Verified! ✅'}
              {verificationStatus === 'error' && 'Verification Failed'}
            </h1>

            <p className="text-warmBeige-400 mt-2">
              {verificationStatus === 'pending' && (
                <>
                  We've sent a verification link to <strong className="text-warmBeige-200">{user?.email}</strong>
                </>
              )}
              {verificationStatus === 'success' && (
                'Your email has been successfully verified. You can now access all features.'
              )}
              {verificationStatus === 'error' && (
                'We couldn't verify your email. The link may have expired or been invalid.'
              )}
            </p>
          </div>

          {/* Pending Status */}
          {verificationStatus === 'pending' && (
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                <div className="flex items-start gap-3">
                  <FiInfo className="text-terracotta-400 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm text-warmBeige-400">
                      Click the link in the email we sent to <strong className="text-warmBeige-200">{user?.email}</strong>
                    </p>
                    <p className="text-xs text-warmBeige-500 mt-1">
                      The link will expire in 15 minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
                <FiClock className="text-warmBeige-400" size={16} />
                <span className="text-sm text-warmBeige-400">Waiting for verification...</span>
              </div>

              <Button
                variant="outline"
                onClick={handleResendVerification}
                disabled={isResending || countdown > 0}
                loading={isResending}
                icon={!isResending && <FiSend />}
                fullWidth
              >
                {countdown > 0 
                  ? `Resend in ${countdown}s` 
                  : isResending 
                    ? 'Sending...' 
                    : resendCount > 0 
                      ? 'Resend Email' 
                      : 'Resend Verification Email'
                }
              </Button>

              <div className="text-center">
                <Link 
                  to="/" 
                  className="text-sm text-warmBeige-400 hover:text-warmBeige-100 transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          )}

          {/* Success Status */}
          {verificationStatus === 'success' && (
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-warmBeige-400">
                    Your account is now fully verified. You can now:
                  </p>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-warmBeige-400 ml-8">
                  <li>• Publish articles (if you're a publisher)</li>
                  <li>• Comment and engage with content</li>
                  <li>• Bookmark and save articles</li>
                  <li>• Receive notifications</li>
                </ul>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate(user?.role === 'publisher' ? '/publisher/dashboard' : '/')}
                fullWidth
              >
                Continue to Dashboard
                <FiArrowLeft className="ml-2 rotate-180" />
              </Button>
            </div>
          )}

          {/* Error Status */}
          {verificationStatus === 'error' && (
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <FiAlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm text-warmBeige-400">
                      The verification link may have expired or been invalid.
                    </p>
                    <p className="text-xs text-warmBeige-500 mt-1">
                      Request a new verification email below.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleResendVerification}
                disabled={isResending || countdown > 0}
                loading={isResending}
                icon={!isResending && <FiRefreshCw />}
                fullWidth
              >
                {countdown > 0 
                  ? `Resend in ${countdown}s` 
                  : isResending 
                    ? 'Sending...' 
                    : 'Resend Verification Email'
                }
              </Button>

              <div className="text-center">
                <Link 
                  to="/" 
                  className="text-sm text-warmBeige-400 hover:text-warmBeige-100 transition-colors"
                >
                  Skip for now
                </Link>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-warmBeige-500/10 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-warmBeige-500">
              <FiShield size={12} />
              <span>Secure verification</span>
            </div>
            <p className="text-xs text-warmBeige-500 mt-1">
              Need help? <Link to="/contact" className="text-terracotta-400 hover:text-terracotta-300 transition-colors">Contact Support</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;