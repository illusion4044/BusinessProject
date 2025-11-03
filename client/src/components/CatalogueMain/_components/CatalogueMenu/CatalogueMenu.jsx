import { useState } from "react";
import styles from "./CatalogueMenu.module.css";

export default function CatalogueMenu() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [
        {
            name: "Овочі та фрукти",
            subcategories: {
                "Овочі": ["Картопля", "Капуста", "Гарбуз", "Огірки", "Перець", "Помідори", "Цибуля, часник"],
                "Фрукти": ["Банан", "Виноград", "Груша", "Кавун, диня", "Цитрусові"],
                "Зелень": ["Зелена цибуля", "Зелень мікс", "Кріп", "Петрушка"]
            }
        },
        { name: "Бакалія" },
        { name: "Молочні продукти та яйця" },
        { name: "Алкоголь" },
        { name: "Напої безалкогольні" },
        { name: "Сири" },
        { name: "М’ясо" },
        { name: "Кондитерські вироби" },
        { name: "Риба і морепродукти" },
        { name: "Товари для дому" },
        { name: "Кава, чай" },
        { name: "Товари для дітей" },
        { name: "Чіпси, снеки" }
    ];

    return (
        <div className={styles.catalogContainer}>
            <button
                type="button"
                className={styles.btnCatalogue}
                onClick={() => setOpen(!open)}
            >
                <img src="images\category 1.png" alt="Catalogue" className={styles.catalogueIcon} />
                Каталог
                <img src="images\downrow.svg" alt="arrow" className={styles.arrowIcon} />
            </button>

            {open && (
                <div className={styles.dropdownCatalog}>
                    <ul className={styles.categoryList}>
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                className={`${styles.categoryItem} ${activeCategory === cat.name ? styles.activeCategory : ""}`}
                                onMouseEnter={() => setActiveCategory(cat.name)}
                            >
                                <span>{cat.name}</span>
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
