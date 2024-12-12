import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (sectionId) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If we're already on home page, just scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-primary text-primaryContent shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl xl:text-2xl font-bold text-primaryContent">
                Sel3a TIC
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center space-x-4">
              <Link to="/" className="px-4 py-2 rounded-lg bg-actions text-primaryContent hover:bg-actionsHover transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5">
                About us
              </Link>
              <Link to="/advertisments" className="px-4 py-2 rounded-lg bg-actions text-primaryContent hover:bg-actionsHover transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5">
                Advertisments
              </Link>
              <button 
                onClick={() => handleSectionClick('services')} 
                className="px-4 py-2 rounded-lg bg-actions text-primaryContent hover:bg-actionsHover transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              >
                Services
              </button>
              <button 
                onClick={() => handleSectionClick('partners')} 
                className="px-4 py-2 rounded-lg bg-actions text-primaryContent hover:bg-actionsHover transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              >
                Our partners
              </button>
              <Link to="/login" className="px-4 py-2 rounded-lg bg-actions text-primaryContent hover:bg-actionsHover transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-primaryContent hover:opacity-75 transition-opacity"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 w-64 h-full bg-primary transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-primaryContent">Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-primaryContent hover:opacity-75 transition-opacity"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-primaryContent hover:opacity-75 transition-opacity py-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/advertisments"
                className="text-primaryContent hover:opacity-75 transition-opacity py-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                Advertisments
              </Link>
              <button
                onClick={() => handleSectionClick('services')}
                className="text-left text-primaryContent hover:opacity-75 transition-opacity py-2"
              >
                Services
              </button>
              <button
                onClick={() => handleSectionClick('partners')}
                className="text-left text-primaryContent hover:opacity-75 transition-opacity py-2"
              >
                Our partners
              </button>
              <Link
                to="/login"
                className="text-primaryContent hover:opacity-75 transition-opacity py-2"
                onClick={() => setIsSidebarOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: var(--color-primaryContent);
          transition: all 0.2s;
          background-color: var(--color-actions);
        }
        
        .nav-link:hover {
          background-color: var(--color-actionsHover);
        }
      `}</style>
    </>
  );
};

export default Navbar;
