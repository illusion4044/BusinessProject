import styles from './AdminLeftModalPanel.module.css'

export default function AdminLeftModalPanel({ setActivePage, collapsed, setCollapsed  }) {


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

                    <div className={`${styles.button} ${styles.InfoButtonBlock}`}
                        onClick={() => setActivePage("ordersInfo")}>
                        <img src="images\InfoButton.png" alt="" />
                        {!collapsed && "Інформація про замовлення"}
                    </div>
                </div>

                <div className={`${styles.button} ${styles.logout}`}>
                    <img src="images\Logout.png" alt="" />
                    {!collapsed && "Вийти" }
                </div>
            </div>
        </>
    )
}