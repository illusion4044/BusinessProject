import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./PurchaseHistory.css";
import placeholderImg from "./images/none.jpg";
import { useNavigate } from "react-router-dom";
import officeIcon from "./images/officeicon.png";
import listIcon from "./images/listicon.png";
import exitIcon from "./images/exiticon.png";

const userIcon = "/images/Contacts.png";

const PurchaseHistory = () => {
    const [orders, setOrders] = useState([]);
    const [openOrders, setOpenOrders] = useState([]);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/catalogue";
    };

    const [user, setUser] = useState({
        firstName: "Ім'я",
        lastName: "Прізвище",
    });

    const toggleOrder = (id) => {
        setOpenOrders((prev) =>
            prev.includes(id)
                ? prev.filter((orderId) => orderId !== id)
                : [...prev, id]
        );
    };

    const calculateTotal = (items) => {
        return items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:3001/my", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                setOrders(data.orders);
                setUser(data.user);
            } catch (err) {
                console.error("Помилка:", err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
            <Header />

            <div className="history-container">
                <div className="history-wrapper">

                    <div className="user-panel">
                        <div className="user-info">
                            <img src={userIcon} alt="user" />
                            <span>{user.firstName} {user.lastName}</span>
                        </div>

                        <div className="user-actions">
                            <button className="nav-btn" onClick={() => navigate("/profile")}>
                                <img src={officeIcon} alt="" />
                                Кабінет
                            </button>

                            <button className="nav-btn active">
                                <img src={listIcon} alt="" />
                                Історія покупок
                            </button>

                            <button className="nav-btn logout" onClick={logout}>
                                <img src={exitIcon} alt="" />
                                Вийти
                            </button>
                        </div>
                    </div>

                    <div className="history-card">
                        <h2>Історія покупок</h2>

                        <div className="history-table">

                            <div className="history-header">
                                <div>№</div>
                                <div>Товари</div>
                                <div>Ціна</div>
                                <div>К-сть</div>
                                <div>Сума</div>
                            </div>

                            {orders.map((order) => {
                                const isOpen = openOrders.includes(order.id);
                                const total = calculateTotal(order.items);

                                return (
                                    <div key={order.id} className="order-block">

                                        {order.items
                                            .slice(0, isOpen ? order.items.length : 1)
                                            .map((item, index) => (
                                                <div key={index} className="history-row">

                                                    <div className="order-id">
                                                        {index === 0 ? order.id : ""}
                                                    </div>

                                                    <div className="item-left">
                                                        <img
                                                            src={
                                                                item.image
                                                                    ? `http://localhost:3001${item.image}`
                                                                    : placeholderImg
                                                            }
                                                            alt=""
                                                        />
                                                        <div>
                                                            <div>{item.name}</div>
                                                            <small>{item.quantity} шт.</small>
                                                        </div>
                                                    </div>

                                                    <div className="price">
                                                        {Number(item.price).toFixed(2)}₴
                                                    </div>

                                                    <div className="qty">
                                                        {item.quantity}
                                                    </div>

                                                    <div className="total">
                                                        {index === 0
                                                            ? `${Number(total).toFixed(2)}₴`
                                                            : ""}
                                                    </div>

                                                </div>
                                            ))}

                                        {!isOpen && order.items.length > 1 && (
                                            <div className="more-items">
                                                ще {order.items.length - 1} товарів
                                            </div>
                                        )}

                                        {order.items.length > 1 && (
                                            <button
                                                className="details-btn"
                                                onClick={() => toggleOrder(order.id)}
                                            >
                                                {isOpen ? "Приховати деталі" : "Деталі замовлення"}
                                            </button>
                                        )}

                                    </div>
                                );
                            })}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PurchaseHistory;