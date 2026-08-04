import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiShield,
  FiBriefcase,
  FiUserCheck,
  FiGithub,
  FiGoogle,
  FiInfo,
  FiArrowLeft,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Toast from '../../components/common/Toast';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'reader',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      setToastData({
        message: error,
        type: 'error'
      });
      setShowToast(true);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

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

  const getPasswordRequirements = () => {
    const password = formData.password;
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'Uppercase & lowercase', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
      { label: 'At least one number', met: /\d/.test(password) },
      { label: 'Special character', met: /[^a-zA-Z\d]/.test(password) },
    ];
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setToastData({
        message: 'Account created successfully! 🎉',
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => {
        navigate('/role-selection');
      }, 1500);
    } catch (err) {
      setToastData({
        message: err.message || 'Registration failed. Please try again.',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setIsLoading(true);
    setToastData({
      message: `Connecting to ${provider}...`,
      type: 'info'
    });
    setShowToast(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

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

      <Card 
        variant="gradient" 
        padding="lg"
        className="w-full max-w-md relative overflow-hidden max-h-[95vh] overflow-y-auto"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-terracotta-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="absolute top-0 left-0 p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
          >
            <FiArrowLeft size={20} />
          </button>

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center shadow-lg shadow-terracotta-500/25">
                <span className="text-white font-bold text-3xl">B</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-warmBeige-100">Create Account</h1>
            <p className="text-warmBeige-400 mt-1">Join BartaOne and start your journey</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex-1 h-1 rounded-full ${currentStep >= 1 ? 'bg-terracotta-500' : 'bg-warmBeige-500/20'}`} />
            <div className={`flex-1 h-1 rounded-full ${currentStep >= 2 ? 'bg-terracotta-500' : 'bg-warmBeige-500/20'}`} />
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Basic Info */}
            <div className={currentStep === 1 ? 'block' : 'hidden'}>
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                touched={!!errors.name}
                icon={<FiUser />}
                required
                autoComplete="name"
              />

              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                touched={!!errors.email}
                icon={<FiMail />}
                required
                autoComplete="email"
              />

              <div>
                <label className="text-sm font-medium text-warmBeige-200 mb-2 block">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'reader' }))}
                    className={`
                      p-4 rounded-xl text-center transition-all
                      ${formData.role === 'reader' 
                        ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                        : 'bg-navy-800/50 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                      }
                    `}
                  >
                    <FiUserCheck className={`mx-auto mb-2 ${formData.role === 'reader' ? 'text-terracotta-400' : 'text-warmBeige-400'}`} size={24} />
                    <p className={`text-sm font-medium ${formData.role === 'reader' ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>Reader</p>
                    <p className="text-xs text-warmBeige-500">Discover content</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'publisher' }))}
                    className={`
                      p-4 rounded-xl text-center transition-all
                      ${formData.role === 'publisher' 
                        ? 'bg-terracotta-500/20 border-2 border-terracotta-500' 
                        : 'bg-navy-800/50 border-2 border-warmBeige-500/10 hover:border-warmBeige-500/30'
                      }
                    `}
                  >
                    <FiBriefcase className={`mx-auto mb-2 ${formData.role === 'publisher' ? 'text-terracotta-400' : 'text-warmBeige-400'}`} size={24} />
                    <p className={`text-sm font-medium ${formData.role === 'publisher' ? 'text-warmBeige-100' : 'text-warmBeige-400'}`}>Publisher</p>
                    <p className="text-xs text-warmBeige-500">Publish content</p>
                  </button>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                onClick={() => setCurrentStep(2)}
                fullWidth
              >
                Continue
                <FiArrowRight className="ml-2" />
              </Button>
            </div>

            {/* Step 2: Password & Terms */}
            <div className={currentStep === 2 ? 'block' : 'hidden'}>
              <div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Password"
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
                
                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-warmBeige-400">Strength: <span className={getPasswordStrengthColor()}>{getPasswordStrengthLabel()}</span></span>
                      <span className="text-xs text-warmBeige-400">{passwordStrength}/4</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 h-1 rounded-full ${level <= passwordStrength ? 'bg-terracotta-500' : 'bg-warmBeige-500/20'}`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      {getPasswordRequirements().map((req, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          {req.met ? (
                            <FiCheck className="text-green-400" size={12} />
                          ) : (
                            <FiX className="text-warmBeige-500" size={12} />
                          )}
                          <span className={req.met ? 'text-green-400' : 'text-warmBeige-500'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                touched={!!errors.confirmPassword}
                icon={<FiLock />}
                required
                autoComplete="new-password"
              />

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-warmBeige-500/30 bg-navy-800/50 text-terracotta-500 focus:ring-terracotta-500/50 focus:ring-2"
                />
                <div>
                  <label className="text-sm text-warmBeige-400">
                    I agree to the{' '}
                    <Link to="/terms" className="text-terracotta-400 hover:text-terracotta-300 transition-colors">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-terracotta-400 hover:text-terracotta-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-xs text-red-400 mt-1">{errors.agreeTerms}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setCurrentStep(1)}
                  fullWidth
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting || loading}
                  disabled={isSubmitting || loading}
                  icon={!isSubmitting && !loading ? <FiUserPlus /> : null}
                >
                  {isSubmitting || loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warmBeige-500/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-navy-900/80 text-warmBeige-500">Or continue with</span>
            </div>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialRegister('Google')}
              icon={<FiGoogle />}
              fullWidth
              size="sm"
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialRegister('GitHub')}
              icon={<FiGithub />}
              fullWidth
              size="sm"
              disabled={isLoading}
            >
              GitHub
            </Button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-warmBeige-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-terracotta-400 hover:text-terracotta-300 font-medium transition-colors inline-flex items-center gap-1"
              >
                Sign in
                <FiArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;