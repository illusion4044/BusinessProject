import styles from "./Order.module.css";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useState } from "react";

export default function Order() {
    const { cartItems, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        payment: "cash",
        comment: ""
    });

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Увійдіть в акаунт");
            return;
        }

        if (!form.firstName || !form.lastName || !form.phone || !form.email) {
            alert("Заповніть всі контактні дані");
            return;
        }

        if (cartItems.length === 0) {
            alert("Кошик порожній");
            return;
        }

        if (!form.firstName || !form.lastName || !form.phone || !form.email || !form.address) {
            alert("Заповніть всі контактні дані");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cartItems,
                    totalAmount: totalPrice,
                    comment: form.comment,
                    paymentMethod: form.payment,
                    shippingAddress: form.address
                })
            });

            const data = await res.json();

            if (data.success) {
                clearCart();
                navigate("/orders");
            } else {
                alert("Помилка при оформленні замовлення");
            }
        } catch (err) {
            console.error(err);
            alert("Помилка з'єднання з сервером");
        }
    };

    return (
        <>
            <Header />
            <div className={styles.page}>
                <div className={styles.modal}>
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <h2>Оформити замовлення</h2>

                            <h3>Контактні дані</h3>
                            <input name="firstName" placeholder="Імʼя" value={form.firstName} onChange={handleChange} />
                            <input name="lastName" placeholder="Прізвище" value={form.lastName} onChange={handleChange} />
                            <input name="phone" placeholder="Мобільний телефон" value={form.phone} onChange={handleChange} />
                            <input name="email" placeholder="Електронна адреса" value={form.email} onChange={handleChange} />
                            <input name="address" placeholder="Адреса доставки" value={form.address} onChange={handleChange} />

                            <h3>Спосіб оплати</h3>
                            <label className={styles.radio}>
                                <input type="radio" name="payment" value="cash"
                                    checked={form.payment === "cash"}
                                    onChange={handleChange} />
                                При отриманні
                            </label>
                            <label className={styles.radio}>
                                <input type="radio" name="payment" value="card"
                                    checked={form.payment === "card"}
                                    onChange={handleChange} />
                                Безготівковий розрахунок
                            </label>

                            <h3>Додати коментар</h3>
                            <textarea name="comment" rows="4" value={form.comment} onChange={handleChange} />
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

                            <button className={styles.submitBtn} onClick={handleSubmit}>
                                Оформити замовлення
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}