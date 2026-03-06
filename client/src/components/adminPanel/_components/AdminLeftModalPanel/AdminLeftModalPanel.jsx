import { useEffect } from 'react';
import styles from './AdminLeftModalPanel.module.css'

export default function AdminLeftModalPanel({ setActivePage, collapsed, setCollapsed,  activePage  }) {

    useEffect(() => {
        if (activePage === "defaultPage") {
            setCollapsed(false);
        }
    }, [activePage, setCollapsed]);

    function handleExit () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        window.location.href = "/catalogue"; 
    }

    return (
        <>
            <div className={`${styles.panel} ${collapsed ? styles.collapsed : ""}`}>
                {!collapsed && (
                    <h2 className={styles.adminStyle}>Адміністративна панель</h2>
                )}

                <div className={styles.buttonBlock}>
                    <div className={`${styles.button} ${styles.AddButtonBlock}`}
                        onClick={() => { 
                            setActivePage("addProduction");
                            setCollapsed(true)
                        }}>
                        <img src="images\AddButton.png" alt="" />
                        {!collapsed && "Додавання продукції" }
                    </div>

                    <div className={`${styles.button} ${styles.AddCategoryButtonBlock}`}
                        onClick={() => { 
                            setActivePage("addCategory");
                            setCollapsed(true)
                        }}>
                        <img src="images\Plus.png" alt="" />
                        {!collapsed && "Додавання категорії" }
                    </div>

                    <div className={`${styles.button} ${styles.InfoButtonBlock}`}
                        onClick={() => setActivePage("ordersInfo")}>
                        <img src="images\InfoButton.png" alt="" />
                        {!collapsed && "Інформація про замовлення"}
                    </div>
                </div>

                <div className={`${styles.button} ${styles.logout}`}>
                    <img src="images\Logout.png" onClick={handleExit} alt="" />
                    {!collapsed && "Вийти" }
                </div>
            </div>
        </>
    )
}