import styles from './LoginOverlay.module.css'
import { useState } from 'react'

export default function LoginOverlay({ onClose }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    
    // Login state
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    // Reg state
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    
    // Loading states
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin() {
        if (!loginEmail || !loginPassword) {
            alert("Заповніть всі поля");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: loginEmail, 
                    password: loginPassword 
                })
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
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRegister() {
        if (!registerName || !registerEmail || !registerPassword) {
            alert("Заповніть всі поля");
            return;
        }

        if (registerName.trim().length < 2) {
            alert("Ім'я має бути мінімум 2 символи");
            return;
        }

        if (registerPassword.length < 6) {
            alert("Пароль має бути мінімум 6 символів");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    name: registerName,
                    email: registerEmail, 
                    password: registerPassword 
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            alert(data.message || "Реєстрація успішна!");
            onClose();

            window.location.href = "/";

        } catch (err) {
            console.error(err);
            alert("Помилка сервера");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className={styles.blurOverlay} onClick={onClose}></div>

            {isLoginMode ? (
                <form key="login" className={styles.LoginOverlayWindow}>
                    <span onClick={onClose} className={styles.btnClose}>×</span>

                    <img className={styles.logoImg} src="images\logo.png" alt="" />

                    <span className={styles.enterWord}>
                        Ласкаво просимо
                    </span>

                    <div className={styles.loginInputs}>
                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>
                                Увійдіть за номером телефону або електронною поштою
                            </span>
                            <input 
                                type="email" 
                                className={styles.inputPhoneEmail} 
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="example@email.com"
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Пароль</span>
                            <input 
                                type="password" 
                                className={styles.inputPassword} 
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="••••••"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button 
                        className={styles.loginBtn} 
                        onClick={handleLogin}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Завантаження..." : "Увійти"}
                    </button>

                    <span
                        className={styles.registerTextBtn}
                        onClick={() => setIsLoginMode(false)}
                    >
                        Реєстрація
                    </span>
                </form>
            ) : (
                <form key="register" className={styles.RegisterOverlayWindow}>
                    <span onClick={onClose} className={styles.btnClose}>×</span>
                    <img className={styles.logoImg} src="images\logo.png" alt="" />
                    <span className={styles.enterWord}>
                        Зареєструйтесь!
                    </span>

                    <div className={styles.loginInputs}>
                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Ім'я</span>
                            <input 
                                type="text" 
                                className={styles.inputName}
                                value={registerName}
                                onChange={(e) => setRegisterName(e.target.value)}
                                placeholder="Ваше ім'я"
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>
                                Введіть номер телефону або електронну пошту
                            </span>
                            <input 
                                type="email" 
                                className={styles.inputPhoneEmail}
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                                placeholder="example@email.com"
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.loginBlocks}>
                            <span className={styles.marginText}>Пароль (мінімум 6 символів)</span>
                            <input 
                                type="password" 
                                className={styles.inputPassword}
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                placeholder="••••••"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button 
                        className={styles.loginBtn}
                        onClick={handleRegister}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading ? "Завантаження..." : "Зареєструватись"}
                    </button>

                    <span
                        className={styles.registerTextBtn}
                        onClick={() => setIsLoginMode(true)}
                    >
                        Увійти
                    </span>
                </form>
            )}
        </>
    )
}