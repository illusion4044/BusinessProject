import styles from "./SettingsOverlay.module.css";
import { Link } from "react-router-dom";

export default function SettingsOverlay({ onClose }) {

    function unlogin() {
        localStorage.removeItem("token")
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/catalogue";
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <Link to="/profile" className={styles.item}>
                    Особистий кабінет
                </Link>

                <Link to="/orders" className={styles.item}>
                    Історія покупок
                </Link>

                <button onClick={unlogin} className={`${styles.logout} ${styles.item}`}>
                    Вийти
                </button>
            </div>
        </div>
    );
}