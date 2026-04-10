import { useEffect, useState } from "react";
import styles from './ProductInfo.module.css';
import ConfirmModal from '../../_components/AddingProductionWindow/_components/ConfirmModal/ConfirmModal';

export default function ProductInfo({ setActivePage }) {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [openOrders, setOpenOrders] = useState([]);
    const [deleteModal, setDeleteModal] = useState(null);

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3001/admin/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleOrder = (id) => {
        setOpenOrders(prev =>
            prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
        );
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:3001/admin/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            setOrders(prev =>
                prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:3001/admin/orders/${deleteModal}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(prev => prev.filter(o => o.id !== deleteModal));
            setDeleteModal(null);
        } catch (err) {
            console.error(err);
        }
    };

    const statusLabel = {
        pending: "Очікує оплати",
        processing: "В обробці",
        shipped: "Відправлено",
        completed: "Виконано",
        cancelled: "Скасовано"
    };

    const filtered = orders.filter(o =>
        String(o.id).includes(search) ||
        (o.first_name + " " + o.last_name).toLowerCase().includes(search.toLowerCase()) ||
        o.phone?.includes(search)
    );

    return (
        <div className={styles.container}>

            {/* Модальне вікно видалення */}
            {deleteModal && (
                <ConfirmModal
                    text={`Видалити замовлення #${deleteModal}?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteModal(null)}
                />
            )}

            <div className={styles.backBtn} onClick={() => setActivePage("defaultPage")}>
                <img src="images/BackRow.png" alt="" />
                Інформація про замовлення
            </div>

            <div className={styles.searchWrap}>
                <img src="images/Search.png" alt="" className={styles.searchIcon} />
                <input
                    className={styles.searchInput}
                    placeholder="Пошук за ID, ім'ям, телефоном..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.list}>
                {filtered.map(order => {
                    const isOpen = openOrders.includes(order.id);
                    return (
                        <div key={order.id} className={`${styles.orderCard} ${styles[order.status]}`}>
                            <div className={styles.orderRow}>
                                <div className={styles.orderLeft}>
                                    <span className={styles.orderId}>#{order.id}</span>
                                    <span className={styles.orderName}>{order.first_name} {order.last_name}</span>
                                    <span className={styles.orderPhone}>{order.phone}</span>
                                    <span className={styles.orderTotal}>{Number(order.total_amount).toFixed(2)}₴</span>
                                </div>
                                <div className={styles.orderRight}>
                                    <select
                                        className={`${styles.statusSelect} ${styles["s_" + order.status]}`}
                                        value={order.status}
                                        onChange={e => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {Object.entries(statusLabel).map(([val, label]) => (
                                            <option key={val} value={val}>{label}</option>
                                        ))}
                                    </select>
                                    <button className={styles.detailsBtn} onClick={() => toggleOrder(order.id)}>
                                        {isOpen ? "Сховати" : "Детальніше"}
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => setDeleteModal(order.id)}>
                                        🗑
                                    </button>
                                </div>
                            </div>

                            {isOpen && (
                                <div className={styles.orderDetails}>
                                    <div className={styles.detailMeta}>
                                        <span>👤 {order.first_name} {order.last_name}</span>
                                        <span>📧 {order.email}</span>
                                        <span>📞 {order.phone}</span>
                                        <span>📍 {order.shipping_address}</span>
                                        <span>💳 {order.payment_method === "cash" ? "При отриманні" : "Безготівково"}</span>
                                        {order.comment && <span>💬 {order.comment}</span>}
                                    </div>
                                    <div className={styles.itemsList}>
                                        {order.items?.map((item, i) => (
                                            <div key={i} className={styles.itemRow}>
                                                <img
                                                    src={item.image ? `http://localhost:3001${item.image}` : "images/NoImageCard.png"}
                                                    alt={item.name}
                                                    className={styles.itemImg}
                                                />
                                                <span className={styles.itemName}>{item.name}</span>
                                                <span className={styles.itemQty}>{item.quantity} шт.</span>
                                                <span className={styles.itemPrice}>{Number(item.price).toFixed(2)}₴</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}