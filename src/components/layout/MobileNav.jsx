import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  FiHome, 
  FiTrendingUp, 
  FiBookmark, 
  FiUser, 
  FiPlusCircle,
  FiBell,
  FiSearch,
  FiBarChart2,
  FiFileText
} from 'react-icons/fi';
import Badge from '../common/Badge';
import NotificationBell from '../notifications/NotificationBell';

const MobileNav = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const readerTabs = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/feed', label: 'Feed', icon: FiTrendingUp },
    { path: '/bookmarks', label: 'Saved', icon: FiBookmark, badge: '12' },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ];

  const publisherTabs = [
    { path: '/publisher/dashboard', label: 'Home', icon: FiBarChart2 },
    { path: '/publisher/articles', label: 'Articles', icon: FiFileText },
    { path: '/publisher/create-article', label: 'Write', icon: FiPlusCircle, highlight: true },
    { path: '/publisher/analytics', label: 'Analytics', icon: FiTrendingUp },
  ];

  const tabs = user?.role === 'publisher' ? publisherTabs : readerTabs;

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/publisher/dashboard' && location.pathname === '/publisher/dashboard') return true;
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-xl border-t border-warmBeige-500/10">
        <div className="flex items-center justify-around px-2 py-1.5">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`
                relative flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all
                ${isActive(tab.path)
                  ? 'text-terracotta-400'
                  : 'text-warmBeige-500 hover:text-warmBeige-300'
                }
                ${tab.highlight ? 'bg-terracotta-500/20 text-terracotta-400' : ''}
              `}
            >
              <div className="relative">
                <tab.icon size={22} />
                {tab.badge && (
                  <Badge
                    variant="danger"
                    size="xs"
                    className="absolute -top-1 -right-2 px-1.5 min-w-[18px] h-[18px] flex items-center justify-center"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          ))}

          {/* Notification Bell */}
          {user && (
            <div className="flex flex-col items-center gap-0.5 py-1.5 px-3">
              <NotificationBell size="sm" />
              <span className="text-[10px] font-medium text-warmBeige-500">Alerts</span>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar for Mobile */}
      {isSearchOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-xl p-4 animate-slideDown">
          <form className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="
                w-full px-4 py-3 pl-12
                bg-navy-800/50 border border-warmBeige-500/20
                rounded-xl text-warmBeige-100 placeholder-warmBeige-500/50
                focus:outline-none focus:ring-2 focus:ring-terracotta-500/50
                transition-all
              "
              autoFocus
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-warmBeige-500" />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warmBeige-400 hover:text-warmBeige-100"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default MobileNav;