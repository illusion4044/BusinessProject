import styles from './ListCardProduct.module.css';
import { useState } from 'react';
import ConfirmModal from "../ConfirmModal/ConfirmModal";

export default function ListCardProduct({ product, onEdit, onDelete, setActivePage, onEditFull }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: product.name,
        price: product.price,
        qty: product.qty,
        discount: product.discount || 0
    });
    const [showModal, setShowModal] = useState(false);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            await fetch(`${import.meta.env.VITE_API_URL}/admin/editproduct/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            onEdit({ ...product, ...form });
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.card}>

            {/* Фото */}
            <div className={styles.blockImage}>
                {product.image ? (
                    <img
                        src={`${import.meta.env.VITE_API_URL}${product.image}`}
                        alt={product.name}
                    />
                ) : (
                    <div className={styles.noImage}>Немає фото</div>
                )}
            </div>

            {/* Назва */}
            <div className={styles.blockName}>
                <p>{product.name}</p>
            </div>

            {/* Ціна */}
            <div className={styles.blockPrice}>
                <span className={styles.label}>Ціна</span>
                {isEditing ? (
                    <input
                        className={styles.editInput}
                        type="number"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                    />
                ) : (
                    <span>{product.price} грн</span>
                )}
            </div>

            {/* Знижка */}
            <div className={styles.blockDiscountPrice}>
                <span className={styles.label}>Знижка</span>
                {isEditing ? (
                    <input
                        className={styles.editInput}
                        type="number"
                        min="0"
                        max="99"
                        value={form.discount || ""}
                        onChange={e => setForm({ ...form, discount: e.target.value })}
                    />
                ) : Number(product.discount) > 0 ? (
                    <span>
                        {Math.round(product.price * (1 - Number(product.discount) / 100))} грн
                        <span style={{ color: "#774A8D", marginLeft: 6 }}>
                            -{Math.round(Number(product.discount))}%
                        </span>
                    </span>
                ) : (
                    <span style={{ color: "#aaa", fontWeight: 400 }}>немає</span>
                )}
            </div>

            {/* Кількість */}
            <div className={styles.blockQty}>
                <span className={styles.label}>Кількість</span>
                {isEditing ? (
                    <input
                        className={styles.editInput}
                        type="number"
                        value={form.qty}
                        onChange={e => setForm({ ...form, qty: e.target.value })}
                    />
                ) : (
                    <span>{product.qty}</span>
                )}
            </div>

            {/* Кнопки */}
            <div className={styles.actions}>
                {isEditing ? (
                    <>
                        <button className={styles.saveBtn} onClick={handleSave}>✔</button>
                        <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>✖</button>
                    </>
                ) : (
                    <>
                        <img
                            className={styles.Pencil}
                            onClick={() => onEditFull(product)}
                            src="images/Pencil.png"
                            alt="Редагувати"
                        />
                        <img
                            className={styles.Trash}
                            src="images/DeleteBtn.png"
                            alt="Видалити"
                            onClick={() => setShowModal(true)}
                        />
                    </>
                )}
            </div>

            {/* Модальне вікно підтвердження */}
            {showModal && (
                <ConfirmModal
                    text="Ви точно бажаєте видалити товар?"
                    onConfirm={() => {
                        onDelete(product);
                        setShowModal(false);
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
}