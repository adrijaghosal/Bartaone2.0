import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useAuth } from '../../hooks/useAuth';

const Layout = ({ children, showSidebar = true, className = '' }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Pages where sidebar should be hidden
  const hideSidebarPages = [
    '/login',
    '/register',
    '/verify-email',
    '/publisher/create-article',
    '/publisher/edit-article',
  ];

  const shouldShowSidebar = showSidebar && user && !hideSidebarPages.includes(location.pathname);

  // Pages where navbar should be transparent or different
  const isAuthPage = ['/login', '/register', '/verify-email'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        {shouldShowSidebar && (
          <>
            <Sidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
            />
            {/* Desktop Sidebar Toggle for small screens */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden fixed bottom-24 right-4 z-40 p-3 rounded-full bg-terracotta-500 shadow-lg shadow-terracotta-500/25 hover:bg-terracotta-600 transition-all"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </>
        )}

        {/* Page Content */}
        <main className={`
          flex-1 min-h-[calc(100vh-4rem)]
          ${shouldShowSidebar ? 'lg:ml-72' : ''}
          ${isAuthPage ? 'flex items-center justify-center' : ''}
          ${className}
        `}>
          <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      {!isAuthPage && <Footer />}

      {/* Mobile Navigation */}
      {user && !isAuthPage && <MobileNav />}
    </div>
  );
};

export default Layout;