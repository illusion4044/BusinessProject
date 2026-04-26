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
                                <img
                                    src={item.image ? `${import.meta.env.VITE_API_URL}${item.image}` : "/images/NoImageCard.png"}
                                    alt={item.name}
                                    className={styles.itemImage}
                                />
                                <div className={styles.itemInfo}>
                                    <p className={styles.itemName}>{item.name}</p>
                                    <p className={styles.itemUnit}>{item.unit || ""}</p>
                                    <p className={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)}₴</p>
                                    <div className={styles.bottomRow}>
                                        <div className={styles.qtyControls}>
                                            {isWeighed(item) ? (
                                                <div>
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        min="0.1"
                                                        value={item.quantity}
                                                        onChange={(e) => handleWeightChange(item.id, e.target.value)}
                                                        style={{ width: '60px' }}
                                                    />
                                                    <span> кг</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </>
                                            )}
                                        </div>
                                        <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
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