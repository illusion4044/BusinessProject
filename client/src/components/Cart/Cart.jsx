import styles from "./Cart.module.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    const isWeighed = (item) => item.unit === 'кг';

    const handleCheckout = () => {
        onClose();
        navigate("/order");
    };

    const handleWeightChange = (itemId, value) => {
        const weight = parseFloat(value);
        if (!isNaN(weight) && weight > 0) {
            updateQuantity(itemId, weight);
        }
    };

    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

            <div className={`${styles.cart} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h2>Кошик</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className={styles.items}>
                    {cartItems.length === 0 ? (
                        <p>Тут поки що пусто</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className={styles.cartItem}>
                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
                                <img
                                    src={item.image ? `${import.meta.env.VITE_API_URL}${item.image}` : "/images/NoImageCard.png"}
                                    alt={item.name}
                                    className={styles.itemImage}
                                />
                                <div className={styles.itemInfo}>
                                    <div className={styles.nameBlock}>
                                        <p className={styles.itemName}>{item.name}</p>
                                        {!isWeighed(item) && <p className={styles.itemUnit}>{item.unit || ""}</p>}
                                    </div>
                                    <div className={styles.priceBlock}>
                                        <p className={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)}₴</p>
                                        <div className={styles.qtyControls}>
                                            {isWeighed(item) ? (
                                                <>
                                                    <button onClick={() => handleWeightChange(item.id, (item.quantity - 0.1).toFixed(1))}>−</button>
                                                    <span>{item.quantity.toFixed(1)} кг</span>
                                                    <button onClick={() => handleWeightChange(item.id, (item.quantity + 0.1).toFixed(1))}>+</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>До сплати:</span>
                        <span>{totalPrice}₴</span>
                    </div>
                    <button
                        className={styles.checkoutBtn}
                        onClick={handleCheckout}
                    >
                        Оформити замовлення
                    </button>
                </div>
            </div>
        </>
    );
}