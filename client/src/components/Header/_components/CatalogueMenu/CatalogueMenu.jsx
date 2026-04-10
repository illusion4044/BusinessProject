import { useState } from "react";
import styles from "./CatalogueMenu.module.css";
import { useNavigate } from "react-router-dom";

import OvocheiFruktiIcon from './images/Ovocieifrukti.svg';
import BakaliaIcon from './images/Bakalia.svg';
import MilkIcon from './images/Milk.svg';
import AlkoholIcon from './images/Alkohol.svg';
import Juice from './images/Juice.svg';
import Cheese from './images/Cheese.svg';
import Meat from './images/Meat.svg';
import Dessert from './images/Dessert.svg';
import Fishfood from './images/Fish Food.svg';
import Furniture from './images/Furniture.svg';
import Coffeecup from './images/Coffee cup.svg';
import Teddy from './images/Teddy Bear.svg';
import Potatochips from './images/Potato Chips.svg';

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
        { name: "Напої безалкогольні", icon: Juice },
        { name: "Сири", icon: Cheese },
        { name: "М'ясо", icon: Meat },
        { name: "Кондитерські вироби", icon: Dessert },
        { name: "Риба і морепродукти", icon: Fishfood },
        { name: "Товари для дому", icon: Furniture },
        { name: "Кава, чай", icon: Coffeecup },
        { name: "Товари для дітей", icon: Teddy },
        { name: "Чіпси, снеки", icon: Potatochips },
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
                                onMouseEnter={() => setActiveCategory(cat.name)}
                                className={`${styles.categoryItem} ${activeCategory === cat.name ? styles.activeCategory : ""}`}
                                onClick={() => {
                                    navigate("/all-products", {
                                        state: { category: cat.name }
                                    });
                                    setOpen(false);
                                }}
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
                                    <h4
                                        className={styles.subcategoryGroup}
                                        onClick={() => {
                                            const groupMap = {
                                                "Овочі": ["Картопля", "Капуста", "Гарбуз", "Огірки", "Перець", "Помідори", "Цибуля, часник"],
                                                "Фрукти": ["Банан", "Виноград", "Груша", "Кавун, диня", "Цитрусові"],
                                                "Зелень": ["Зелена цибуля", "Зелень мікс", "Кріп", "Петрушка"]
                                            };

                                            navigate("/all-products", {
                                                state: { subcategory: group }
                                            });
                                            setOpen(false);
                                        }}
                                    >
                                        {group}
                                    </h4>
                                    <ul>
                                        {items.map((item, i) => (
                                            <li
                                                key={i}
                                                onClick={() => {
                                                    navigate("/all-products", {
                                                        state: { subcategory: item }
                                                    });
                                                    setOpen(false);
                                                }}
                                            >
                                                {item}
                                            </li>
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