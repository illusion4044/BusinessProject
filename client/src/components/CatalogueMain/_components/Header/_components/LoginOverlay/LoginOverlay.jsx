import styles from './LoginOverlay.module.css'
import { useState } from 'react'

export default function LoginOverlay({ onClose }) {

    const [isLoginMode, setIsLoginMode] = useState(true);

    return (
        <>
            <div className={styles.blurOverlay} onClick={onClose}></div>

            {isLoginMode ? (<>
                <div key="login" className={styles.LoginOverlayWindow}>
                    <span onClick={onClose} className={styles.btnClose}>×</span>

                    <div className={styles.logo}>Logo</div>
                    <span className={styles.enterWord}>
                        Ласкаво просимо
                    </span>

                    <div className={styles.loginInputs}>
                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>
                                Увійдіть за номером телефону або електронною поштою
                            </span>
                            <input type="text" className={styles.inputPhoneEmail} />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Пароль</span>
                            <input type="password" className={styles.inputPassword} />
                        </div>
                    </div>

                    <button className={styles.loginBtn}>
                        Увійти
                    </button>

                    <span
                        className={styles.registerTextBtn}
                        onClick={() => setIsLoginMode(prev => !prev)}
                    >Реєстрація</span>
                </div>
            </>) : (<>
                <div key="register" className={styles.RegisterOverlayWindow}>
                    <span onClick={onClose} className={styles.btnClose}>×</span>
                    <div className={styles.logo}>Logo</div>
                    <span className={styles.enterWord}>
                        Зареєструйтесь!
                    </span>

                    <div className={styles.loginInputs}>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Ім'я</span>
                            <input type="text" className={styles.inputName} />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>
                                Введіть номер телефону або електронну пошту
                            </span>
                            <input type="text" className={styles.inputPhoneEmail} />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Пароль</span>
                            <input type="password" className={styles.inputPassword} />
                        </div>
                    </div>

                    <button className={styles.loginBtn}>
                        Зареєструватись
                    </button>

                    <span
                        className={styles.registerTextBtn}
                        onClick={() => setIsLoginMode(prev => !prev)}
                    >Увійти</span>
                </div>
            </>)}
        </>
    )
}