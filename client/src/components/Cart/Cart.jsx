import { useState } from "react"
import styles from "./Cart.module.css"
import Order from "../Order/Order"

export default function Cart({ isOpen, onClose }) {
    const [isOrderOpen, setIsOrderOpen] = useState(false)

    return (
        <>
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={onClose}
                ></div>
            )}

            <div className={`${styles.cart} ${isOpen ? styles.open : ""}`}>
                <div className={styles.header}>
                    <h2>Кошик</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className={styles.items}>
                    <p>Тут поки що пусто</p>
                </div>

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>До сплати:</span>
                        <span>0 ₴</span>
                    </div>

                    <button
                        className={styles.checkoutBtn}
                        onClick={() => setIsOrderOpen(true)}
                    >
                        Оформити замовлення
                    </button>
                </div>
            </div>

            {/* <Order
                isOpen={isOrderOpen}
                onClose={() => setIsOrderOpen(false)}
            /> */}
        </>
    )
}