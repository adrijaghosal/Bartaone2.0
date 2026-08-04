import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTwitter, 
  FiFacebook, 
  FiInstagram, 
  FiYoutube,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowUp
} from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-950/50 border-t border-warmBeige-500/10 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold text-warmBeige-100">
                Barta<span className="text-terracotta-500">One</span>
              </span>
            </Link>
            <p className="text-warmBeige-400 text-sm leading-relaxed mb-4">
              AI-powered multilingual news platform connecting readers and publishers in a unified digital ecosystem.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all">
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-warmBeige-100 font-semibold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-warmBeige-400 hover:text-terracotta-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="py-6 border-t border-warmBeige-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-warmBeige-400">
              <FiMail className="text-terracotta-400 flex-shrink-0" />
              <span className="text-sm">support@bartaone.com</span>
            </div>
            <div className="flex items-center gap-3 text-warmBeige-400">
              <FiPhone className="text-terracotta-400 flex-shrink-0" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-warmBeige-400">
              <FiMapPin className="text-terracotta-400 flex-shrink-0" />
              <span className="text-sm">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-warmBeige-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-warmBeige-500">
            © {new Date().getFullYear()} BartaOne. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-warmBeige-500 hover:text-warmBeige-300 transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-warmBeige-500 hover:text-warmBeige-300 transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="text-warmBeige-500 hover:text-warmBeige-300 transition-colors">
              Cookies
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-navy-800/50 text-warmBeige-400 hover:text-terracotta-400 hover:bg-terracotta-500/10 transition-all group"
          >
            <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;