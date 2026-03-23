import styles from "./Order.module.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

export default function Order() {
    const { cartItems, updateQuantity } = useCart(); // ← додати updateQuantity
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
        <>
            <Header />
            <div className={styles.page}>
                <div className={styles.modal}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <h2>Оформити замовлення</h2>

                            <h3>Контактні дані</h3>
                            <input placeholder="Імʼя" />
                            <input placeholder="Прізвище" />
                            <input placeholder="Мобільний телефон" />
                            <input placeholder="Електронна адреса" />

                            <h3>Спосіб оплати</h3>
                            <label className={styles.radio}>
                                <input type="radio" name="payment" defaultChecked />
                                При отриманні
                            </label>
                            <label className={styles.radio}>
                                <input type="radio" name="payment" />
                                Безготівковий розрахунок
                            </label>

                            <h3>Додати коментар</h3>
                            <textarea rows="4" />
                        </div>

                        <div className={styles.right}>
                            <div className={styles.products}>
                                {cartItems.map((item) => (
                                    <div key={item.id} className={styles.product}>
                                        <img
                                            src={item.image ? `http://localhost:3001${item.image}` : "images/NoImageCard.png"}
                                            alt={item.name}
                                        />
                                        <div className={styles.productInfo}>
                                            <p>{item.name}</p>
                                            <span className={styles.productPrice}>{item.price}₴</span>
                                            {/* ← замінити .productQty на .qtyControls */}
                                            <div className={styles.qtyControls}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.total}>
                                <span>До сплати:</span>
                                <span>{totalPrice.toFixed(2)}₴</span>
                            </div>

                            <button className={styles.submitBtn}>
                                Оформити замовлення
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}