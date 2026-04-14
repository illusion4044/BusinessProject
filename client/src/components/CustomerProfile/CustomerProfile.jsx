import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./CustomerProfile.module.css";

import officeIcon from "../PurchaseHistory/images/officeicon.png";
import listIcon from "../PurchaseHistory/images/listicon.png";
import exitIcon from "../PurchaseHistory/images/exiticon.png";

const userIcon = "/images/Contacts.png";

export default function CustomerProfile() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        gender: "male"
    });
    const [statusMessage, setStatusMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setProfile({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    gender: data.gender || "m",
                });
            })
            .catch((err) => console.error("Помилка завантаження профілю:", err));
    }, []);

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleGenderChange = (value) => {
        setProfile((prev) => ({ ...prev, gender: value }));
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setStatusMessage("");

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            if (!res.ok) throw new Error("Помилка збереження");

            setStatusMessage("Дані успішно збережено");
        } catch (err) {
            console.error(err);
            setStatusMessage("Помилка при збереженні, спробуйте пізніше");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/catalogue";
    };

    return (
        <>
            <Header />
            <div className={styles.profileContainer}>
                <div className={styles.profileWrapper}>
                    <div className={styles.userPanel}>
                        <div className={styles.userInfo}>
                            <img src={userIcon} alt="user" />
                            <span>
                                {profile.firstName || "Ім'я"} {profile.lastName}
                            </span>
                        </div>

                        <div className={styles.userActions}>
                            <button className={`${styles.navBtn} ${styles.active}`}>
                                <img src={officeIcon} alt="" />
                                Кабінет
                            </button>
                            <button className={styles.navBtn} onClick={() => navigate("/orders")}>
                                <img src={listIcon} alt="" />
                                Історія покупок
                            </button>
                            <button className={`${styles.navBtn} ${styles.logout}`} onClick={handleLogout}>
                                <img src={exitIcon} alt="" />
                                Вийти
                            </button>
                        </div>
                    </div>

                    <div className={styles.profileCard}>
                        <h2>Персональна інформація</h2>
                        <form className={styles.form} onSubmit={handleSave}>
                            <div className={styles.row}>
                                <div className={styles.field}>

                                    <input
                                        className={styles.input}
                                        type="text"
                                        value={profile.firstName}
                                        onChange={handleChange("firstName")}
                                        placeholder="Ім'я"
                                    />
                                </div>
                                <div className={styles.field}>

                                    <input
                                        className={styles.input}
                                        type="text"
                                        value={profile.lastName}
                                        onChange={handleChange("lastName")}
                                        placeholder="Прізвище"
                                    />
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.field}>

                                    <input
                                        className={styles.input}
                                        type="tel"
                                        value={profile.phone}
                                        onChange={handleChange("phone")}
                                        placeholder="Номер телефону"
                                    />
                                </div>
                                <div className={styles.field}>

                                    <input
                                        className={styles.input}
                                        type="email"
                                        value={profile.email}
                                        onChange={handleChange("email")}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className={styles.genderBlock}>
                                <span>Стать</span>
                                <div className={styles.genderToggle}>
                                    <button
                                        type="button"
                                        className={`${styles.genderBtn} ${profile.gender === "m" ? styles.selected : ""}`}
                                        onClick={() => handleGenderChange("m")}
                                    >
                                        Ч
                                    </button>
                                    <button
                                        type="button"
                                        className={`${styles.genderBtn} ${profile.gender === "f" ? styles.selected : ""}`}
                                        onClick={() => handleGenderChange("f")}
                                    >
                                        Ж
                                    </button>
                                </div>
                            </div>

                            {statusMessage && <div className={styles.statusMessage}>{statusMessage}</div>}

                            <button className={styles.saveBtn} type="submit" disabled={isSaving}>
                                {isSaving ? "Збереження..." : "Зберегти"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
