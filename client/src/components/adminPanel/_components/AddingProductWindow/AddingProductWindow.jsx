import styles from './AddingProductWindow.module.css'

export default function AddingProductWindow () {

    return(
        <>
            <div className={styles.MainWindow}>
                <div className={styles.TopPanelBlock}>
                    <div className={styles.FirstSection}>
                        <div className={styles.BackToLobby}>
                            <img src="images\BackRow.png" className={styles.leftRow} alt="" />
                            Додавання товару
                        </div>

                        <img src="images\Search.png" alt="search" className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Пошук..."
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.SecondSection}>

                        <button
                            type="button"
                            className={styles.btnCatalogue}
                            onClick={() => setOpen(!open)}
                        >
                        <img src="images\category 1.png" alt="Catalogue" className={styles.catalogueIcon} />
                            Каталог
                        <img src="images\downrow.svg" alt="arrow" className={styles.arrowIcon} />
                        </button>

                        <button>
                            <img src="images\AddButton.png" alt="" />
                            Додати категорію
                        </button>
                        <button>
                            <img src="images\AddButton.png" alt="" />
                            Додати товар
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}