import styles from './LoginOverlay.module.css'

export default function LoginOverlay () {



    
    return (
        <>
            <div className={styles.blurOverlay}></div>

            <div className={styles.LoginOverlayWindow}>
                <div className={styles.logo}>Logo</div>
                <span className={styles.enterWord}>Ласкаво просимо</span>

                <div className={styles.loginInputs}>
                    <div className={styles.loginBlocks}>
                        <span className={styles.marginText}>Увійдіть за номером телефону або електрона пошта</span>
                        <input type="text" className={styles.inputPhoneEmail}/>
                    </div>

                    <div className={styles.loginBlocks}>
                        <span className={styles.marginText}>Пароль</span>
                        <input type="text" className={styles.inputPassword}/>
                    </div>
                </div>

                <button className={styles.loginBtn}>Увійти</button>
                <span className={styles.registerTetxBtn}>Реєстрація</span>
            </div>
        </>
    )
}