import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiLoader,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiGoogle,
  FiShield,
  FiUser,
  FiArrowLeft
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Toast from '../../components/common/Toast';
import { validateEmail, validatePassword } from '../../utils/validators';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: '', type: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'publisher') {
        navigate('/publisher/dashboard');
      } else {
        navigate(from);
      }
    }
  }, [isAuthenticated, user, navigate, from]);

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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await login(formData.email, formData.password, formData.rememberMe);
      setToastData({
        message: 'Welcome back! 🎉',
        type: 'success'
      });
      setShowToast(true);
    } catch (err) {
      setToastData({
        message: err.message || 'Login failed. Please try again.',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    setToastData({
      message: `Connecting to ${provider}...`,
      type: 'info'
    });
    setShowToast(true);
    // Social login logic here
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('demo@bartaone.com', 'DemoPassword123!', false);
    } catch (err) {
      setToastData({
        message: 'Demo login failed. Please try again.',
        type: 'error'
      });
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
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
        className="w-full max-w-md relative overflow-hidden"
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
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center shadow-lg shadow-terracotta-500/25">
                <span className="text-white font-bold text-3xl">B</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-warmBeige-100">Welcome Back</h1>
            <p className="text-warmBeige-400 mt-1">Sign in to continue to BartaOne</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-warmBeige-200">Password</label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-terracotta-400 hover:text-terracotta-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  touched={!!errors.password}
                  icon={<FiLock />}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] text-warmBeige-500 hover:text-warmBeige-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-warmBeige-500/30 bg-navy-800/50 text-terracotta-500 focus:ring-terracotta-500/50 focus:ring-2"
                />
                <span className="text-sm text-warmBeige-400">Remember me</span>
              </label>
              <div className="flex items-center gap-1 text-xs text-warmBeige-500">
                <FiShield size={12} />
                <span>Secure</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting || loading}
              disabled={isSubmitting || loading}
              icon={!isSubmitting && !loading ? <FiLogIn /> : null}
            >
              {isSubmitting || loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Account */}
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              fullWidth
              onClick={handleDemoLogin}
              loading={isLoading}
              disabled={isLoading}
              icon={<FiUser />}
            >
              Try Demo Account
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warmBeige-500/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-navy-900/80 text-warmBeige-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              icon={<FiGoogle />}
              fullWidth
              size="sm"
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('GitHub')}
              icon={<FiGithub />}
              fullWidth
              size="sm"
              disabled={isLoading}
            >
              GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-warmBeige-400">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-terracotta-400 hover:text-terracotta-300 font-medium transition-colors inline-flex items-center gap-1"
              >
                Sign up
                <FiArrowRight size={14} />
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-4 text-center text-xs text-warmBeige-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-warmBeige-400 hover:text-warmBeige-300 transition-colors">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-warmBeige-400 hover:text-warmBeige-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;