import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMoreVertical } from 'react-icons/fi';
import Button from '../common/Button';

const Header = ({
  title,
  subtitle,
  backButton = false,
  onBack,
  actions = [],
  breadcrumbs = [],
  className = '',
}) => {
  return (
    <header className={`mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-warmBeige-400 mb-3">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-warmBeige-500/50">/</span>}
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-terracotta-400 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-warmBeige-100">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {backButton && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all"
            >
              <FiArrowLeft size={24} />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-warmBeige-100 truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-warmBeige-400 mt-1 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'primary'}
                size={action.size || 'md'}
                onClick={action.onClick}
                icon={action.icon}
                className="whitespace-nowrap"
              >
                {action.label}
              </Button>
            ))}
            {actions.length > 2 && (
              <button className="p-2 rounded-xl text-warmBeige-400 hover:text-warmBeige-100 hover:bg-navy-700/50 transition-all">
                <FiMoreVertical size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;