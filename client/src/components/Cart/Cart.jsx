import styles from "./Cart.module.css";
import { useCart } from "../CartContext/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ isOpen, onClose }) {
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleCheckout = () => {
        onClose();
        navigate("/order");
    };

    const getWeightKg = (item) => Math.floor((item.quantity || 0) / 1000);
    const getWeightGr = (item) => (item.quantity || 0) % 1000;

    const handleWeightChange = (item, field, value) => {
        const numeric = Number(value);
        if (Number.isNaN(numeric) || numeric < 0) return;

        const kg = field === "kg" ? numeric : getWeightKg(item);
        const gr = field === "gr" ? numeric : getWeightGr(item);
        const normalizedGr = Math.min(999, gr);

        updateQuantity(item.id, kg * 1000 + normalizedGr);
    };

    const cartTotal = cartItems.reduce((sum, item) => {
        const itemTotal = item.isWeightProduct
            ? item.price * ((item.quantity || 0) / 1000)
            : item.price * item.quantity;
        return sum + itemTotal;
    }, 0);

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
                        cartItems.map(item => {
                            const itemTotal = item.isWeightProduct
                                ? item.price * ((item.quantity || 0) / 1000)
                                : item.price * item.quantity;

                            return (
                                <div key={item.id} className={styles.cartItem}>
                                    <img
                                        src={item.image ? `${import.meta.env.VITE_API_URL}${item.image}` : "/images/NoImageCard.png"}
                                        alt={item.name}
                                        className={styles.itemImage}
                                    />
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemName}>{item.name}</p>
                                        <p className={styles.itemUnit}>
                                            {item.isWeightProduct
                                                ? "кг / г"
                                                : item.unit || ""}
                                        </p>
                                        <p className={styles.itemPrice}>{itemTotal.toFixed(2)}₴</p>

                                        {item.isWeightProduct ? (
                                            <div className={styles.weightInputs}>
                                                <div className={styles.weightField}>
                                                    <label>Кілограми</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={getWeightKg(item)}
                                                        onChange={(e) => handleWeightChange(item, "kg", e.target.value)}
                                                    />
                                                </div>
                                                <div className={styles.weightField}>
                                                    <label>Грами</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="999"
                                                        value={getWeightGr(item)}
                                                        onChange={(e) => handleWeightChange(item, "gr", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.bottomRow}>
                                                <div className={styles.qtyControls}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
                                            </div>
                                        )}

                                        {item.isWeightProduct && (
                                            <div className={styles.weightSummary}>
                                                <span>{getWeightKg(item)} кг {getWeightGr(item)} г</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>До сплати:</span>
                        <span>{cartTotal.toFixed(2)}₴</span>
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