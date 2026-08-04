import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotifications';
import { 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiBell, 
  FiUser, 
  FiBookmark,
  FiHome,
  FiTrendingUp,
  FiGlobe,
  FiLogOut,
  FiSettings,
  FiChevronDown
} from 'react-icons/fi';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import NotificationBell from '../notifications/NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/feed', label: 'Feed', icon: FiTrendingUp },
    { path: '/bookmarks', label: 'Bookmarks', icon: FiBookmark },
  ];

  const publisherLinks = [
    { path: '/publisher/dashboard', label: 'Dashboard' },
    { path: '/publisher/articles', label: 'My Articles' },
    { path: '/publisher/analytics', label: 'Analytics' },
  ];

  return (
    <nav className={`
      sticky top-0 z-50
      transition-all duration-300
      ${isScrolled 
        ? 'bg-navy-900/95 backdrop-blur-xl shadow-2xl border-b border-warmBeige-500/10' 
        : 'bg-navy-900/80 backdrop-blur-md'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center shadow-lg shadow-terracotta-500/25">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold text-warmBeige-100 group-hover:text-terracotta-400 transition-colors">
              Barta<span className="text-terracotta-500">One</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  flex items-center gap-2
                  ${location.pathname === link.path
                    ? 'bg-terracotta-500/20 text-terracotta-400'
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}

            {user?.role === 'publisher' && (
              <div className="h-6 w-px bg-warmBeige-500/20 mx-2" />
            )}

            {user?.role === 'publisher' && (
              <Link
                to="/publisher/dashboard"
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${location.pathname.includes('/publisher')
                    ? 'bg-terracotta-500/20 text-terracotta-400'
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                Publisher Hub
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    w-48 lg:w-64 px-4 py-2 pl-10
                    bg-navy-800/50 border border-warmBeige-500/20
                    rounded-xl text-warmBeige-100 placeholder-warmBeige-500/50
                    focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 focus:border-transparent
                    transition-all duration-300
                  "
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-warmBeige-500" />
              </form>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              <FiSearch size={20} />
            </button>

            {/* Notifications */}
            {user && <NotificationBell />}

            {/* Language Selector */}
            <button className="hidden md:flex items-center gap-1 px-3 py-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all">
              <FiGlobe size={18} />
              <span className="text-sm">EN</span>
            </button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-navy-700/50 transition-all group"
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="sm"
                    status="online"
                  />
                  <FiChevronDown className={`
                    text-warmBeige-400 transition-transform duration-300
                    ${isProfileDropdownOpen ? 'rotate-180' : ''}
                  `} />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 py-2 bg-navy-800/95 backdrop-blur-xl border border-warmBeige-500/20 rounded-2xl shadow-2xl animate-slideDown">
                    <div className="px-4 py-3 border-b border-warmBeige-500/10">
                      <p className="text-warmBeige-100 font-medium">{user.name}</p>
                      <p className="text-sm text-warmBeige-400">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-terracotta-500/20 text-terracotta-400">
                        {user.role}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 transition-all"
                      >
                        <FiUser size={18} />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-warmBeige-300 hover:bg-navy-700/50 hover:text-warmBeige-100 transition-all"
                      >
                        <FiSettings size={18} />
                        Settings
                      </Link>
                      <hr className="border-warmBeige-500/10 my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 w-full transition-all"
                      >
                        <FiLogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-3 animate-slideDown">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full px-4 py-3 pl-12
                  bg-navy-800/50 border border-warmBeige-500/20
                  rounded-xl text-warmBeige-100 placeholder-warmBeige-500/50
                  focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
                  transition-all duration-300
                "
                autoFocus
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-warmBeige-500" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-900/95 backdrop-blur-xl border-t border-warmBeige-500/10 animate-slideDown">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${location.pathname === link.path
                    ? 'bg-terracotta-500/20 text-terracotta-400'
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            ))}

            {user?.role === 'publisher' && (
              <>
                <div className="h-px bg-warmBeige-500/10 my-2" />
                {publisherLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${location.pathname.includes(link.path)
                        ? 'bg-terracotta-500/20 text-terracotta-400'
                        : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            <div className="h-px bg-warmBeige-500/10 my-2" />
            
            {/* Language Selector Mobile */}
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 w-full transition-all">
              <FiGlobe size={20} />
              Language: English
            </button>

            {!user && (
              <>
                <div className="h-px bg-warmBeige-500/10 my-2" />
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 w-full transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-terracotta-500/20 text-terracotta-400 hover:bg-terracotta-500/30 w-full transition-all"
                >
                  Sign Up
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