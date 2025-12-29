import styles from './LoginOverlay.module.css'
import { useState } from 'react'

export default function LoginOverlay({ onClose }) {

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            onClose();

            if (data.role === "admin") {
                window.location.href = "/admin";
            } else {
                window.location.href = "/";
            }

        } catch (err) {
            console.error(err);
            alert("Помилка сервера");
        }
    }

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
                            <input 
                                type="text" 
                                className={styles.inputPhoneEmail} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Пароль</span>
                            <input 
                                type="password" 
                                className={styles.inputPassword} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className={styles.loginBtn} onClick={handleLogin}>
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