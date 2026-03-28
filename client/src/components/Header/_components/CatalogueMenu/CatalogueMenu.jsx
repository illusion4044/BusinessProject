import { useState } from "react";
import styles from "./CatalogueMenu.module.css";
import { useNavigate } from "react-router-dom";

import OvocheiFruktiIcon from './images/Ovocieifrukti.svg';
import BakaliaIcon from './images/Bakalia.svg';
import MilkIcon from './images/Milk.svg';
import AlkoholIcon from './images/Alkohol.svg';

export default function CatalogueMenu() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    const navigate = useNavigate();

    const categories = [
        {
            name: "Овочі та фрукти",
            icon: OvocheiFruktiIcon,
            subcategories: {
                "Овочі": ["Картопля", "Капуста", "Гарбуз", "Огірки", "Перець", "Помідори", "Цибуля, часник"],
                "Фрукти": ["Банан", "Виноград", "Груша", "Кавун, диня", "Цитрусові"],
                "Зелень": ["Зелена цибуля", "Зелень мікс", "Кріп", "Петрушка"]
            }
        },
        { name: "Бакалія", icon: BakaliaIcon },
        { name: "Молочні продукти та яйця", icon: MilkIcon },
        { name: "Алкоголь", icon: AlkoholIcon },
        { name: "Напої безалкогольні", icon: "images/icons/drinks.png" },
        { name: "Сири", icon: "images/icons/cheese.png" },
        { name: "М'ясо", icon: "images/icons/meat.png" },
        { name: "Кондитерські вироби", icon: "images/icons/sweets.png" },
        { name: "Риба і морепродукти", icon: "images/icons/fish.png" },
        { name: "Товари для дому", icon: "images/icons/home.png" },
        { name: "Кава, чай", icon: "images/icons/coffee.png" },
        { name: "Товари для дітей", icon: "images/icons/kids.png" },
        { name: "Чіпси, снеки", icon: "images/icons/snacks.png" },
    ];

    return (
    <div className={styles.catalogContainer}>
        <button
            type="button"
            className={styles.btnCatalogue}
            onClick={() => setOpen(!open)}
        >
            <img src="/images/category 1.png" alt="Catalogue" className={styles.catalogueIcon} />
            Каталог
            <img src="/images/downrow.svg" alt="arrow" className={styles.arrowIcon} />
        </button>

        {open && (
            <div
                className={styles.overlay}
                onClick={() => setOpen(false)}
            />
        )}

        {open && (
            <div className={styles.dropdownCatalog}>
                <ul className={styles.categoryList}>
                    <li
                        className={`${styles.categoryItem} ${styles.allProducts}`}
                        onClick={() => { navigate("/all-products"); setOpen(false); }}
                    >
                        <span>Усі товари</span>
                    </li>
                    {categories.map((cat, index) => (
                        <li
                            key={index}
                            className={`${styles.categoryItem} ${activeCategory === cat.name ? styles.activeCategory : ""}`}
                            onMouseEnter={() => setActiveCategory(cat.name)}
                        >
                            <div className={styles.categoryLeft}>
                                {cat.icon && (
                                    <img src={cat.icon} alt={cat.name} className={styles.categoryIcon} />
                                )}
                                <span>{cat.name}</span>
                            </div>
                            {cat.subcategories && <span className={styles.arrow}>›</span>}
                        </li>
                    ))}
                </ul>

                {activeCategory && categories.find(c => c.name === activeCategory)?.subcategories && (
                    <div className={styles.subcategoryPanel}>
                        {Object.entries(categories.find(c => c.name === activeCategory).subcategories).map(([group, items]) => (
                            <div key={group} className={styles.subcategoryColumn}>
                                <h4>{group}</h4>
                                <ul>
                                    {items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
    </div>
);
}