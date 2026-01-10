import styles from './ListCardProduct.module.css'
import { useEffect, useState } from 'react';

export default function ListCardProduct ({ product, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: product.name,
        price: product.price,
        qty: product.qty
    });

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            await fetch(`http://localhost:3001/admin/editproduct/${product.id}`, {
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
            <div className={styles.blockImage}>
                <img src={product.image} alt="" />
            </div>

            <div className={styles.blockName}>
                <p>{product.name}</p>
            </div>

            <div className={styles.blockPrice}>
                Ціна:
                {isEditing ? (
                    <input
                        type="number"
                        value={form.price}
                        onChange={e =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                ) : (
                    <span> {product.price} грн</span>
                )}
            </div>

            {/* <div className={styles.blockDiscountPrice}>
                Акційна ціна:
                {isEditing ? (
                    <input
                        type="number"
                        value={form.price}
                        onChange={e =>
                            setForm({ ...form, price: e.target.value })
                        }
                    />
                ) : (
                    <span> {product.price} грн</span>
                )}
            </div> */}

            <div className={styles.blockQty}>
                Кількість:
                {isEditing ? (
                    <input
                        type="number"
                        value={form.qty}
                        onChange={e =>
                            setForm({ ...form, qty: e.target.value })
                        }
                    />
                ) : (
                    <span> {product.qty}</span>
                )}
            </div>

            {isEditing ? (
                <>
                    <button onClick={handleSave}>✔</button>
                    <button onClick={() => setIsEditing(false)}>✖</button>
                </>
            ) : (
                <>
                    <img
                        className={styles.Pencil}
                        onClick={() => setIsEditing(true)}
                        src="images/Pencil.png"
                        alt=""
                    />
                    <img
                        className={styles.Trash}
                        onClick={() => onDelete(product)}
                        src="images/DeleteBtn.png"
                        alt=""
                    />
                </>
            )}
        </div>
    );
}