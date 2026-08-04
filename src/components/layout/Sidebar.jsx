import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  FiHome,
  FiTrendingUp,
  FiBookmark,
  FiUsers,
  FiBarChart2,
  FiDollarSign,
  FiFileText,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiPlusCircle,
  FiMessageSquare,
  FiStar,
  FiClock
} from 'react-icons/fi';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const readerLinks = [
    { path: '/feed', label: 'Feed', icon: FiTrendingUp },
    { path: '/bookmarks', label: 'Bookmarks', icon: FiBookmark, badge: '12' },
    { path: '/following', label: 'Following', icon: FiUsers },
  ];

  const publisherLinks = [
    { path: '/publisher/dashboard', label: 'Dashboard', icon: FiBarChart2 },
    { path: '/publisher/articles', label: 'Articles', icon: FiFileText },
    { path: '/publisher/create-article', label: 'Write New', icon: FiPlusCircle, highlight: true },
    { path: '/publisher/analytics', label: 'Analytics', icon: FiBarChart2 },
    { path: '/publisher/subscribers', label: 'Subscribers', icon: FiUsers, badge: '156' },
    { path: '/publisher/earnings', label: 'Earnings', icon: FiDollarSign, badge: '$2.4K' },
    { path: '/publisher/comments', label: 'Comments', icon: FiMessageSquare, badge: '8' },
  ];

  const bottomLinks = [
    { path: '/settings', label: 'Settings', icon: FiSettings },
    { path: '/help', label: 'Help & Support', icon: FiHelpCircle },
  ];

  const links = user?.role === 'publisher' ? publisherLinks : readerLinks;

  const isActive = (path) => {
    if (path === '/feed' && location.pathname === '/') return true;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 min-h-screen sticky top-20 pt-6 pb-8">
        <div className="h-full px-4">
          {/* User Profile Card */}
          {user && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-navy-800/50 to-navy-900/50 border border-warmBeige-500/10">
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} alt={user.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-warmBeige-100 font-medium truncate">{user.name}</p>
                  <p className="text-sm text-warmBeige-400 truncate">{user.email}</p>
                </div>
              </div>
              {user.role === 'publisher' && (
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Badge variant="success" size="sm">Verified Publisher</Badge>
                  <Badge variant="glass" size="sm">
                    <FiStar className="inline mr-1" /> 4.8
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive(link.path)
                    ? 'bg-terracotta-500/20 text-terracotta-400 shadow-lg shadow-terracotta-500/10'
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                  ${link.highlight ? 'bg-terracotta-500/10 border border-terracotta-500/30 hover:bg-terracotta-500/20' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </div>
                {link.badge && (
                  <Badge 
                    variant={link.highlight ? 'primary' : 'glass'} 
                    size="sm"
                  >
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Reading Streak */}
          {user && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-terracotta-500/10 to-navy-800/30 border border-terracotta-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiClock className="text-terracotta-400" />
                  <span className="text-sm text-warmBeige-200">Reading Streak</span>
                </div>
                <Badge variant="primary" size="lg">
                  🔥 7 days
                </Badge>
              </div>
              <div className="mt-2 w-full h-1.5 bg-navy-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-terracotta-400 to-terracotta-500 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          )}

          {/* Bottom Links */}
          <div className="mt-6 pt-6 border-t border-warmBeige-500/10 space-y-1">
            {bottomLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            {user && (
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
              >
                <FiLogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 w-80 bg-navy-900/98 backdrop-blur-xl border-r border-warmBeige-500/10 z-50 transform transition-transform duration-300 lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full overflow-y-auto p-4">
          {/* Mobile content - same as desktop but with close button */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-warmBeige-100">
                Barta<span className="text-terracotta-500">One</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50"
            >
              ✕
            </button>
          </div>

          {/* Rest of the sidebar content */}
          {user && (
            <div className="mb-6 p-4 rounded-2xl bg-navy-800/50 border border-warmBeige-500/10">
              <div className="flex items-center gap-3">
                <Avatar src={user.avatar} alt={user.name} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-warmBeige-100 font-medium truncate">{user.name}</p>
                  <p className="text-sm text-warmBeige-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-xl transition-all
                  ${isActive(link.path)
                    ? 'bg-terracotta-500/20 text-terracotta-400'
                    : 'text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <link.icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </div>
                {link.badge && (
                  <Badge variant="glass" size="sm">{link.badge}</Badge>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-warmBeige-500/10 space-y-1">
            {bottomLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
              >
                <link.icon size={20} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
              >
                <FiLogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;