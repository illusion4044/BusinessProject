import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from './AdminPanel.module.css'
import AdminLeftModalPanel from "./_components/AdminLeftModalPanel/AdminLeftModalPanel";
import AddingProductWindow from "./_components/AddingProductWindow/AddingProductWindow";
import ProductInfo from "./_components/ProductInfo/ProductInfo";

export default function AdminPanel () {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [activePage, setActivePage] = useState("defaultPade");
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (role !== "admin") {
            navigate("/");
        }
    }, [role]);

    return (
        <>
            <Header />

            <div className={styles.mainContainer}>
                <div className={styles.AdminWindowContainer}>
                    <AdminLeftModalPanel 
                        setActivePage={setActivePage}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />

                    <div className={styles.content}>
                        {activePage === "defaultPade" && (<>
                            <div className={styles.welcome}>
                                <h2>Ласкаво просимо до адмін панелі!</h2>
                            </div>
                        </>)}
                        {activePage === "addProduct" && <AddingProductWindow />}
                        {activePage === "ordersInfo" && <ProductInfo />}
                    </div>
                </div>
            </div>
        </>
    )
}