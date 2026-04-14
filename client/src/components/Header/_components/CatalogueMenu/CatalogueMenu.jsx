import { useState, useEffect } from "react";
import styles from "./CatalogueMenu.module.css";
import { useNavigate } from "react-router-dom";

import OvocheiFruktiIcon from './images/Ovocieifrukti.svg';
import BakaliaIcon from './images/Bakalia.svg';
import MilkIcon from './images/Milk.svg';
import AlkoholIcon from './images/Alkohol.svg';
<<<<<<< HEAD
import Orange_JuiceIcon from './images/Orange_Juice.svg';
import CheeseIcon from './images/Cheese.svg';
import MeatIcon from './images/Meat.svg';
import DessertIcon from './images/Dessert.svg';
import Fish_FoodIcon from './images/Fish_Food.svg';
import FurnitureIcon from './images/Furniture.svg';
import CoffeeIcon from './images/Coffee_cup.svg';
import Teddy_BearIcon from './images/Teddy_Bear.svg';
import Potato_ChipsIcon from './images/Potato_Chips.svg';
=======
import Juice from './images/Juice.svg';
import Cheese from './images/Cheese.svg';
import Meat from './images/Meat.svg';
import Dessert from './images/Dessert.svg';
import Fishfood from './images/Fish Food.svg';
import Furniture from './images/Furniture.svg';
import Coffeecup from './images/Coffee cup.svg';
import Teddy from './images/Teddy Bear.svg';
import Potatochips from './images/Potato Chips.svg';
>>>>>>> origin/main

export default function CatalogueMenu() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const iconMap = {
        "Овочі та фрукти": OvocheiFruktiIcon,
        "Бакалія": BakaliaIcon,
        "Молочні продукти та яйця": MilkIcon,
        "Алкоголь": AlkoholIcon,
        "Напої безалкогольні": Juice, 
        "Сири": Cheese, 
        "М'ясо": Meat, 
        "Кондитерські вироби": Dessert, 
        "Риба і морепродукти": Fishfood,
        "Товари для дому": Furniture,
        "Кава, чай": Coffeecup, 
        "Товари для дітей": Teddy, 
        "Чіпси, снеки": Potatochips
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
                const data = await res.json();

                // data — плаский масив, розбиваємо на батьківські + підкатегорії
                const parents = data.filter(c => !c.parent_id);
                const children = data.filter(c => c.parent_id);

                const built = parents.map(parent => ({
                    ...parent,
                    icon: iconMap[parent.name] || null,
                    subcategories: children.filter(c => c.parent_id === parent.id)
                }));

                setCategories(built);
            } catch (err) {
                console.error(err);
            }
<<<<<<< HEAD
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
=======
        };
        fetchCategories();
    }, []);

    const activeCat = categories.find(c => c.name === activeCategory);
>>>>>>> origin/main

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

            {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}

            {open && (
                <div className={styles.dropdownCatalog}>
                    <ul className={styles.categoryList}>
                        <li
                            className={`${styles.categoryItem} ${styles.allProducts}`}
                            onClick={() => { navigate("/all-products"); setOpen(false); }}
                        >
                            <span>Усі товари</span>
                        </li>
                        {categories.map((cat) => (
                            <li
                                key={cat.id}
                                onMouseEnter={() => setActiveCategory(cat.name)}
                                className={`${styles.categoryItem} ${activeCategory === cat.name ? styles.activeCategory : ""}`}
                                onClick={() => {
                                    navigate("/all-products", { state: { category: cat.name } });
                                    setOpen(false);
                                }}
                            >
                                <div className={styles.categoryLeft}>
<<<<<<< HEAD
                                    {/* ✅ Виправлено: додано перевірку на рядок vs імпортований модуль */}
                                    {cat.icon && (
                                        <img
                                            src={typeof cat.icon === 'string' ? cat.icon : cat.icon}
                                            alt={cat.name}
                                            className={styles.categoryIcon}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    )}
=======
                                    {cat.icon && <img src={cat.icon} alt={cat.name} className={styles.categoryIcon} />}
>>>>>>> origin/main
                                    <span>{cat.name}</span>
                                </div>
                                {cat.subcategories.length > 0 && <span className={styles.arrow}>›</span>}
                            </li>
                        ))}
                    </ul>

                    {activeCat && activeCat.subcategories.length > 0 && (
                        <div className={styles.subcategoryPanel}>
                            {activeCat.subcategories.map((sub) => (
                                <div key={sub.id} className={styles.subcategoryColumn}>
                                    <h4
                                        className={styles.subcategoryGroup}
                                        onClick={() => {
<<<<<<< HEAD
                                            navigate("/all-products", {
                                                state: { subcategory: group }
                                            });
=======
                                            navigate("/all-products", { state: { subcategory: sub.name } });
>>>>>>> origin/main
                                            setOpen(false);
                                        }}
                                    >
                                        {sub.name}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}