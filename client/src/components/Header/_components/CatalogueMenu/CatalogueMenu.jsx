import { useState } from "react";
import styles from "./CatalogueMenu.module.css";
import { useNavigate } from "react-router-dom";

import OvocheiFruktiIcon from './images/Ovocieifrukti.svg';
import BakaliaIcon from './images/Bakalia.svg';
import MilkIcon from './images/Milk.svg';
import AlkoholIcon from './images/Alkohol.svg';
import Orange_JuiceIcon from './images/Orange_Juice.svg';
import CheeseIcon from './images/Cheese.svg';
import MeatIcon from './images/Meat.svg';
import DessertIcon from './images/Dessert.svg';
import Fish_FoodIcon from './images/Fish_Food.svg';
import FurnitureIcon from './images/Furniture.svg';
import CoffeeIcon from './images/Coffee_cup.svg';
import Teddy_BearIcon from './images/Teddy_Bear.svg';
import Potato_ChipsIcon from './images/Potato_Chips.svg';

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
        { name: "Напої безалкогольні", icon: Orange_JuiceIcon },
        { name: "Сири", icon: CheeseIcon },
        { name: "М'ясо", icon: MeatIcon },
        { name: "Кондитерські вироби", icon: DessertIcon },
        { name: "Риба і морепродукти", icon: Fish_FoodIcon },
        { name: "Товари для дому", icon: FurnitureIcon },
        { name: "Кава, чай", icon: CoffeeIcon },
        { name: "Товари для дітей", icon: Teddy_BearIcon },
        { name: "Чіпси, снеки", icon: Potato_ChipsIcon },
    ];

    return (
        <div className={styles.catalogContainer}>
            <button
                type="button"
                className={styles.btnCatalogue}
                onClick={() => setOpen(!open)}
            >
                {/* ✅ Виправлено: правильний шлях до публічних зображень */}
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
                                    {/* ✅ Виправлено: додано перевірку на рядок vs імпортований модуль */}
                                    {cat.icon && (
                                        <img
                                            src={typeof cat.icon === 'string' ? cat.icon : cat.icon}
                                            alt={cat.name}
                                            className={styles.categoryIcon}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
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