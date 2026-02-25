import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from './AdminPanel.module.css'
import AdminLeftModalPanel from "./_components/AdminLeftModalPanel/AdminLeftModalPanel";
import AddingProductionWindow from "./_components/AddingProductionWindow/AddingProductionWindow";
import ProductInfo from "./_components/ProductInfo/ProductInfo";
import AddProduct from "./_components/AddProduct/AddProduct";

export default function AdminPanel () {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [activePage, setActivePage] = useState("defaultPade");
    const [collapsed, setCollapsed] = useState(false);

    

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetch("http://localhost:3001/auth/check", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Invalid token");
            }
            return res.json();
        })
        .catch(() => {
            localStorage.clear();
            navigate("/");
        });

    }, []);


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
                        {activePage === "addProduction" && <AddingProductionWindow setActivePage={setActivePage}/>} 
                        {/* поменять на Production */}
                        {activePage === "ordersInfo" && <ProductInfo />}
                        {activePage === "addProduct" && <AddProduct/>}
                    </div>
                </div>
            </div>
        </>
    )
}