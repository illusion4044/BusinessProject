import styles from './Header.module.css'

export default function Header () {

    return (
        <>
            <header className={styles.mainHeader}>
                <div className={styles.headerItems}>


                    <div className={styles.rightBtnCon}>
                        <button type="button" className={styles.btnSignUp}>
                            <img src="images\Contacts.png" alt="Contacts" />
                        </button>   
                    </div>
                </div>
            </header>
        </>
    )
}