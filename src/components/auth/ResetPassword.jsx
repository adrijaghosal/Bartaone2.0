import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiShield
} from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Card from '../../common/Card';
import Toast from '../../common/Toast';
import { validatePassword } from '../../../utils/validators';

const ResetPassword = ({ className = '' }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { confirmResetPassword, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (error) {
      setToastData({
        message: error,
        type: 'error'
      });
      setShowToast(true);
    }
  }, [error]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    return labels[passwordStrength - 1] || 'Weak';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['text-red-400', 'text-yellow-400', 'text-blue-400', 'text-green-400'];
    return colors[passwordStrength - 1] || 'text-red-400';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await confirmResetPassword(token, formData.password);
      setIsSubmitted(true);
      setToastData({
        message: 'Password reset successful! 🎉',
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setToastData({
        message: err.message || 'Failed to reset password. Please try again.',
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
            <h2 className="text-2xl font-bold text-warmBeige-100">Password Reset Complete!</h2>
            <p className="text-warmBeige-400 mt-2">
              Your password has been successfully reset.
            </p>
          </div>

          <Button
            variant="primary"
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
            <FiLock className="text-terracotta-400" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-warmBeige-100">Set New Password</h1>
          <p className="text-warmBeige-400 mt-1">
            Create a new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="New Password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                touched={!!errors.password}
                icon={<FiLock />}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-warmBeige-500 hover:text-warmBeige-300 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-warmBeige-400">Strength:</span>
                  <span className={getPasswordStrengthColor()}>{getPasswordStrengthLabel()}</span>
                </div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 h-1 rounded-full ${level <= passwordStrength ? 'bg-terracotta-500' : 'bg-warmBeige-500/20'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              touched={!!errors.confirmPassword}
              icon={<FiLock />}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[42px] text-warmBeige-500 hover:text-warmBeige-300 transition-colors"
            >
              {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-navy-800/30 border border-warmBeige-500/10">
            <div className="flex items-start gap-2">
              <FiShield className="text-terracotta-400 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-sm text-warmBeige-400">
                  Password requirements:
                </p>
                <ul className="text-xs text-warmBeige-500 space-y-0.5 mt-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Contains at least one special character</li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting || loading}
            disabled={isSubmitting || loading}
            icon={!isSubmitting && !loading ? <FiCheckCircle /> : null}
          >
            {isSubmitting || loading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;