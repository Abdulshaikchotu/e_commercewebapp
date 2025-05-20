import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { fetchProducts } from '../utils/api';
import styles from '../styles/ProductDetail.module.css';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
  const loadProduct = async () => {
    const products = await fetchProducts();
    const foundProduct = products.find(p => p.id === Number(id));
    console.log("Found product:", foundProduct);
    setProduct(foundProduct || null);
  };
  loadProduct();
}, [id]);


  if (!product) return <div className={styles.loading}></div>;

  return (
    <div className={styles.detailContainer}>
      <img src={product.image} alt={product.title} />
      <div className={styles.details}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product?.price?.toFixed(2)}</p>
        <button 
          onClick={() => addToCart({ 
            id: product.id, 
            name: product.title, 
            price: product.price 
          })}
          className={styles.addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};