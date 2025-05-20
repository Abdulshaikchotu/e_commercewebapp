import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext.tsx';
import { Home } from './pages/Home.tsx';
import { ProductDetail } from './pages/ProductDetail.tsx';
import { CartPage } from './pages/CartPage.tsx';
import { Navbar } from './components/Navbar.tsx';

export const App = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};