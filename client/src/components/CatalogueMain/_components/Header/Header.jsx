import CatalogueMenu from '../CatalogueMenu/CatalogueMenu'
import styles from './Header.module.css'

export default function Header() {

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
                        <button type="button" className={styles.btnSignUp}>
                            <img src="images\Contacts.png" alt="Contacts" className={styles.icon} />
                            Увійти
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}