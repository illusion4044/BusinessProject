import styles from './ProductSmallCard.module.css';
import { useCart } from '../CartContext/CartContext';

export default function ProductSmallCard({ product }) {
    const { addToCart } = useCart(); // ← додати

    const discount = product.discount || 0;
    const oldPrice = discount > 0
        ? Math.round(product.price / (1 - discount / 100))
        : null;

    return (
        <div className={styles.card}>
            <img
                src={product.image ? `http://localhost:3001${product.image}` : "images/NoImageCard.png"}
                alt={product.name}
                className={styles.cardImage}
            />
            <div className={styles.cardInfo}>
                <span className={styles.priceNow}>{product.price}₴</span>
                {discount > 0 && oldPrice > 0 && (
                    <div className={styles.priceBlock}>
                        <span className={styles.priceOld}>{oldPrice}₴</span>
                        <span className={styles.discountPercent}>-{discount}%</span>
                    </div>
                )}
                <div className={styles.rowCart}>
                    <p className={styles.cardName}>{product.name}</p>
                    <div className={styles.sss}></div>
                </div>
                <button
                    className={styles.cartBtn}
                    onClick={() => addToCart(product)}
                >
                    <img src="images/CartBtn.png" alt="Додати в кошик" />
                </button>
            </div>
        </div>
    );
}