import CatalogueMenu from './_components/CatalogueMenu/CatalogueMenu'
import LoginOverlay from './_components/LoginOverlay/LoginOverlay';
import styles from './Header.module.css'
import { useState, useRef, useEffect } from 'react'
import SettingsOverlay from './_components/SettingsOverlay/SettingsOverlay';
import { Link } from "react-router-dom";


export default function Header() {

    const [isLogined, setIsLogined] = useState(null)
    const [isBtnLoginClicked, setIsBtnLoginClicked] = useState(null)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLoginClick = () => {
        setIsBtnLoginClicked(prev => !prev);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setIsLogined(true);
    }, []);
    
    const role = localStorage.getItem("role");

    const handleCloseOverlay = () => {
        setIsBtnLoginClicked(false);
        const token = localStorage.getItem("token");
        if (token) setIsLogined(true);
    };

    return (
        <>
            <header className={styles.mainHeader}>
                <div className={styles.headerItems}>

                    <div className={styles.Logo}>
                        <img src="images\logo.png" alt="" />
                    </div>

                    <CatalogueMenu />

                    <div className={styles.searchContainer}>
                        <img src="images\Search.png" alt="search" className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Пошук..."
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.rightBtnCon}>
                        <button type="button" className={styles.btnCart}>
                            <img src="images\Shopping Basket.png" alt="Shopping Basket" className={styles.icon} />
                            Кошик
                        </button>

                        {isLogined ? (<>
                            <button
                                type="button"
                                className={styles.btnCustomer}
                                onClick={() => setIsSettingsOpen(prev => !prev)}
                            >
                                <img src="images\Contacts.png" alt="Contacts" className={styles.icon} />
                                Користувач
                            </button>

                            {role === "admin" && (
                                <Link className={styles.link} to="/admin">
                                    <button type="button" className={styles.btnCustomer}>
                                        Адмін панель
                                    </button>
                                </Link>
                            )}
                        </>) : (<>
                            <button onClick={handleLoginClick} type="button" className={styles.btnSignUp}>
                                <img src="images\Contacts.png" alt="Contacts" className={styles.icon} />
                                Увійти
                            </button>
                        </>)}
                    </div>
                </div>
            </header>

            {isBtnLoginClicked && (
                <LoginOverlay 
                    key={isBtnLoginClicked}
                    onClose={handleCloseOverlay}
                />
            )}

            {isSettingsOpen && (
                <SettingsOverlay onClose={() => setIsSettingsOpen(false)} />
            )}
        </>
    )
}