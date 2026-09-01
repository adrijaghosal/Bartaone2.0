// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiBell, 
  FiSearch,
  FiUser,
  FiLogOut,
  FiSettings,
  FiHome,
  FiBookOpen,
  FiTrendingUp,
  FiPlusCircle,
  FiUserPlus,
  FiMoon,
  FiSun,
  FiGlobe,
  FiChevronDown
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
// ✅ REMOVED: useTheme import - we'll handle theme manually
// import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Dropdown from '../common/Dropdown';
import NotificationBell from '../notifications/NotificationBell';

const Navbar = ({ className = '' }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  // ✅ REMOVED: useTheme
  // const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, languages } = useLanguage();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check theme on mount and when it changes
  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setIsDark(savedTheme === 'dark');
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      checkTheme();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    setIsDark(newTheme === 'dark');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // User menu items
  const userMenuItems = [
    {
      label: 'Profile',
      icon: <FiUser size={16} />,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Settings',
      icon: <FiSettings size={16} />,
      onClick: () => navigate('/settings'),
    },
    {
      label: 'My Articles',
      icon: <FiBookOpen size={16} />,
      onClick: () => navigate('/my-articles'),
    },
    {
      label: 'Logout',
      icon: <FiLogOut size={16} />,
      onClick: logout,
      divider: true,
    },
  ];

  // Publisher menu items
  const publisherMenuItems = [
    {
      label: 'Dashboard',
      icon: <FiHome size={16} />,
      onClick: () => navigate('/publisher/dashboard'),
    },
    {
      label: 'New Article',
      icon: <FiPlusCircle size={16} />,
      onClick: () => navigate('/publisher/create-article'),
    },
    {
      label: 'Analytics',
      icon: <FiTrendingUp size={16} />,
      onClick: () => navigate('/publisher/analytics'),
    },
    ...userMenuItems,
  ];

  const menuItems = user?.role === 'publisher' ? publisherMenuItems : userMenuItems;

  // Language options
  const languageOptions = languages?.map(lang => ({
    label: lang.name,
    value: lang.code,
    onClick: () => setLanguage(lang.code),
  })) || [];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-navy-950/95 backdrop-blur-xl border-b border-warmBeige-500/10 shadow-lg' 
        : 'bg-transparent'
      }
      ${className}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center shadow-lg shadow-terracotta-500/25 group-hover:shadow-terracotta-500/40 transition-shadow duration-300">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-warmBeige-100 hidden sm:block">
                BartaOne
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
            >
              Explore
            </Link>
            <Link 
              to="/trending" 
              className="px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
            >
              Trending
            </Link>
            {user?.role === 'publisher' && (
              <Link 
                to="/publisher/create-article" 
                className="px-3 py-2 rounded-lg bg-terracotta-500/20 text-terracotta-400 hover:bg-terracotta-500/30 transition-all duration-200"
              >
                <FiPlusCircle className="inline mr-1" size={16} />
                Write
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search Button (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
            >
              <FiSearch size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
              title={isDark ? 'Switch to light' : 'Switch to dark'}
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Language Dropdown */}
            {languageOptions.length > 0 && (
              <Dropdown
                trigger={
                  <button className="p-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200 flex items-center gap-1">
                    <FiGlobe size={20} />
                    <span className="text-sm uppercase hidden sm:inline">{language}</span>
                    <FiChevronDown size={14} />
                  </button>
                }
                items={languageOptions}
                position="bottom-right"
              />
            )}

            {/* Notifications */}
            {isAuthenticated && (
              <NotificationBell />
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-navy-800/50 transition-all duration-200">
                    <Avatar 
                      src={user?.avatar} 
                      alt={user?.name || 'User'} 
                      size="sm"
                      status="online"
                    />
                    <span className="text-sm text-warmBeige-100 hidden lg:block">
                      {user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <FiChevronDown size={14} className="text-warmBeige-400 hidden lg:block" />
                  </button>
                }
                items={menuItems}
                position="bottom-right"
              />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  <FiUserPlus className="mr-1" size={16} />
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-warmBeige-500/10">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 rounded-xl bg-navy-800/50 border border-warmBeige-500/20 text-warmBeige-100 placeholder-warmBeige-500/50 focus:outline-none focus:ring-2 focus:ring-terracotta-500/50"
                autoFocus
              />
              <Button type="submit" variant="primary" size="sm">
                <FiSearch size={16} />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-900/95 backdrop-blur-xl border-t border-warmBeige-500/10">
          <div className="px-4 py-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-lg text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="block px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/trending" 
              className="block px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trending
            </Link>
            {user?.role === 'publisher' && (
              <Link 
                to="/publisher/create-article" 
                className="block px-3 py-2 rounded-lg text-terracotta-400 hover:bg-terracotta-500/10 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiPlusCircle className="inline mr-1" size={16} />
                Write
              </Link>
            )}
            {isAuthenticated && (
              <>
                <hr className="my-2 border-warmBeige-500/10" />
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="inline mr-2" size={16} />
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-3 py-2 rounded-lg text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-800/50 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiSettings className="inline mr-2" size={16} />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                  <FiLogOut className="inline mr-2" size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;