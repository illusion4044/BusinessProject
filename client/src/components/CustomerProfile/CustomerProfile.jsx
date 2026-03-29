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
        gender: "m"
    });
    const [statusMessage, setStatusMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem("profile");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setProfile((prev) => ({ ...prev, ...parsed }));
            } catch (err) {
                console.error("Не вдалося розпарсити profile з localStorage", err);
            }
        }

        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:3001/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.user) {
                        setProfile((prev) => ({
                            ...prev,
                            firstName: data.user.firstName || prev.firstName,
                            lastName: data.user.lastName || prev.lastName,
                        }));
                    }
                })
                .catch((err) => {
                    console.warn("Не вдалося отримати дані профілю з /my", err);
                });
        }
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
            const profileData = { ...profile };
            localStorage.setItem("profile", JSON.stringify(profileData));

            const token = localStorage.getItem("token");
            if (token) {
                await fetch("http://localhost:3001/profile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(profileData),
                }).catch(() => {

                });
            }

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
                                {profile.firstName || "Ім'я"} {profile.lastName || "Прізвище"}
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
