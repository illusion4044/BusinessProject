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
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
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