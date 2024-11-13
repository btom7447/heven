import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import NavPop from './NavPop';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Initialize AOS and scroll listener
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true, // Ensure AOS animation only happens once when it becomes sticky
    });

    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar ${isSticky ? 'sticky-navbar' : ''}`}
      data-aos={isSticky ? 'fade-down' : ''} // Trigger AOS only when sticky
      key={isSticky ? 'sticky' : 'normal'} // Re-trigger AOS animation on sticky change
    >
      <div className="logo">
        <h2>Hevens</h2>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? (
          <XMarkIcon className="w-6 h-6 text-black" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-black" />
        )}
      </div>

      <AnimatePresence>
        {(isMenuOpen || window.innerWidth > 768) && (
          <motion.div
            className="nav-links"
            initial={{ x: isMenuOpen ? '-100%' : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
            data-aos="flip-down"
          >
            <ul>
              <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>About</NavLink></li>
              <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Products</NavLink></li>
              <li><NavLink to="/order-shipping" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Order & Shipping</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>Contact</NavLink></li>
            </ul>
            <NavPop user={user} setUser={setUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;