import { Link } from 'react-router-dom';
import styles from '../styles/ProductCard.module.css';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};