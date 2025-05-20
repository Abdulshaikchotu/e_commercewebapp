import { useCart } from '../contexts/CartContext';
import styles from '../styles/CartPage.module.css';

export const CartPage = () => {
  const { cart, removeFromCart, totalPrice } = useCart();

  return (
    <div className={styles.cartPage}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <h3>{item.name}</h3>
              <p>${item?.price?.toFixed(2)} × {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className={styles.total}>
            <strong>Total: ${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};