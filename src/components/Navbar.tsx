import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/Navbar.module.css';

export const Navbar = () => {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>ShopEase</Link>
      
      <button 
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      
      <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link 
          to="/cart" 
          className={styles.cartLink}
          onClick={() => setMenuOpen(false)}
        >
          Cart ({totalItems})
        </Link>
      </div>
    </nav>
  );
};