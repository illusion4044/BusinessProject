import CatalogueMenu from '../CatalogueMenu/CatalogueMenu'
import LoginOverlay from './_components/LoginOverlay/LoginOverlay';
import styles from './Header.module.css'
import { useState, useRef } from 'react'
import { Link } from "react-router-dom";


export default function Header() {

    const [isLogined, setIsLogined] = useState(null)
    const [isBtnLoginClicked, setIsBtnLoginClicked] = useState(null)

    const handleLoginClick = () => {
        setIsBtnLoginClicked(prev => !prev);
    };

    return (
        <>
            <header className={styles.mainHeader}>
                <div className={styles.headerItems}>

                    <div className={styles.Logo}>
                        Logo
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
                            <button type="button" className={styles.btnCustomer}>
                                <img src="images\Contacts.png" alt="Contacts" className={styles.icon} />
                                Користувач
                            </button>
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
                />
            )}
        </>
    )
}