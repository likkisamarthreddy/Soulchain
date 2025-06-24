import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="flex justify-center gap-6 py-4 bg-indigo-950 text-white z-20">
      <Link
        to="/community"
        className={`hover:underline ${isActive('/community') ? 'font-bold underline' : ''}`}
      >
        Community
      </Link>
      <Link
        to="/blog"
        className={`hover:underline ${isActive('/blog') ? 'font-bold underline' : ''}`}
      >
        Blog
      </Link>
    </nav>
  );
};

export default Navigation;

