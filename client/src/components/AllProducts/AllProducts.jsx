import { useState, useEffect } from "react";
import styles from "./AllProducts.module.css";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import ProductSmallCard from "../ProductSmallCard/ProductSmallCard";

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("default");
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [priceRange, setPriceRange] = useState([1, 10000]);
    const [qtyRange, setQtyRange] = useState([1, 1000]);
    const [selectedTrademarks, setSelectedTrademarks] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [openSections, setOpenSections] = useState({
        category: true,
        subcategory: true,
        discount: true,
        trademark: true,
        price: true,
        qty: true,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const location = useLocation();
    const selectedCategoryFromMenu = location.state?.category || null;
    const selectedSubcategoryFromMenu = location.state?.subcategory || null;
    const selectedSubcategoriesFromMenu = location.state?.subcategories || null;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);

                const maxPrice = Math.max(...data.map(p => p.price));
                const maxQty = Math.max(...data.map(p => p.qty));
                setPriceRange([1, maxPrice]);
                setQtyRange([1, maxQty]);

                setLoading(false);

                if (selectedCategoryFromMenu) {
                    setSelectedCategories([selectedCategoryFromMenu]);
                }

                if (selectedSubcategoryFromMenu) {
                    setSelectedSubcategories([selectedSubcategoryFromMenu]);
                }

                if (selectedSubcategoriesFromMenu) {
                    setSelectedSubcategories(selectedSubcategoriesFromMenu);
                }

            })
            .catch(console.error);
    }, [location.state]);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleSection = (key) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleSubcategory = (sub) => {
        setSelectedSubcategories(prev =>
            prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
        );
    };

    const toggleDiscount = (val) => {
        setSelectedDiscounts(prev =>
            prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
        );
    };

    const toggleTrademark = (tm) => {
        setSelectedTrademarks(prev =>
            prev.includes(tm) ? prev.filter(t => t !== tm) : [...prev, tm]
        );
    };
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const subcategories = [...new Set(products.map(p => p.subcategory).filter(Boolean))];
    const trademarks = [...new Set(products.map(p => p.trademark).filter(Boolean))];
    const discountValues = [...new Set(
        products.filter(p => Number(p.discount) > 0)
                .map(p => Math.round(Number(p.discount)))
    )].sort((a, b) => b - a);

    const sortOptions = [
        { value: "default", label: "За замовчуванням" },
        { value: "price_asc", label: "Спочатку дешеві" },
        { value: "price_desc", label: "Спочатку дорогі" },
        { value: "name_asc", label: "За назвою A-Я" },
        { value: "discount", label: "За знижкою" },
    ];

    const maxPrice = products.length ? Math.max(...products.map(p => p.price)) : 10000;
    const maxQty = products.length ? Math.max(...products.map(p => p.qty)) : 1000;

    // 🔹 Фільтрація
    const filtered = products
        .filter(p => {
            if (selectedCategoryFromMenu) return p.category === selectedCategoryFromMenu;
            if (selectedCategories.length > 0) return selectedCategories.includes(p.category);
            return true;
        })
        .filter(p => {
            if (selectedSubcategories.length > 0) {
                return selectedSubcategories.includes(p.subcategory);
            }
            return true;
        })
        .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
        .filter(p => p.qty >= qtyRange[0] && p.qty <= qtyRange[1])
        .filter(p => selectedTrademarks.length === 0 || selectedTrademarks.includes(p.trademark))
        .filter(p => selectedDiscounts.length === 0 || selectedDiscounts.includes(Math.round(Number(p.discount))))
        .sort((a, b) => {
            if (sortBy === "price_asc") return a.price - b.price;
            if (sortBy === "price_desc") return b.price - a.price;
            if (sortBy === "name_asc") return a.name.localeCompare(b.name);
            if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
            return 0;
        });

    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                <h2 className={styles.title}>
                    {selectedSubcategoryFromMenu 
                    || selectedCategoryFromMenu 
                    || (selectedSubcategoriesFromMenu ? "Обрана група" : "Усі товари")}
                </h2>

                <div className={styles.mobileFilterBtn}>
                    <button
                        className={styles.filterToggleBtn}
                        onClick={() => setIsFilterOpen(prev => !prev)}
                    >
                        Фільтр ▼
                    </button>
                </div>

                <div className={styles.contentRow}>
                    <aside className={`${styles.filterPanel} ${isFilterOpen ? styles.open : ""}`}>

                        {/* Категорії */}
                        <div className={styles.filterBlock}>
                            <div className={styles.filterTitle} onClick={() => toggleSection("category")}>
                                <span>Категорії</span>
                                <span className={`${styles.arrow} ${openSections.category ? styles.arrowOpen : ""}`}>›</span>
                            </div>
                            {openSections.category && (
                                <div className={styles.filterContent}>
                                    {categories.map(cat => (
                                        <label key={cat} className={styles.checkboxRow}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                            />
                                            <span className={styles.checkboxLabel}>{cat}</span>
                                            <span className={styles.count}>
                                                {products.filter(p => p.category === cat).length}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Підкатегорії */}
                        <div className={styles.filterBlock}>
                            <div className={styles.filterTitle} onClick={() => toggleSection("subcategory")}>
                                <span>Підкатегорії</span>
                                <span className={`${styles.arrow} ${openSections.subcategory ? styles.arrowOpen : ""}`}>›</span>
                            </div>
                            {openSections.subcategory && (
                                <div className={styles.filterContent}>
                                    {subcategories.map(sub => (
                                        <label key={sub} className={styles.checkboxRow}>
                                            <input
                                                type="checkbox"
                                                checked={selectedSubcategories.includes(sub)}
                                                onChange={() => toggleSubcategory(sub)}
                                            />
                                            <span className={styles.checkboxLabel}>{sub}</span>
                                            <span className={styles.count}>
                                                {products.filter(p => p.subcategory === sub).length}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Акції */}
                        <div className={styles.filterBlock}>
                            <div className={styles.filterTitle} onClick={() => toggleSection("discount")}>
                                <span>Акції 🔥</span>
                                <span className={`${styles.arrow} ${openSections.discount ? styles.arrowOpen : ""}`}>›</span>
                            </div>
                            {openSections.discount && (
                                <div className={styles.filterContent}>
                                    {discountValues.length === 0 ? (
                                        <span className={styles.emptyLabel}>Немає акцій</span>
                                    ) : discountValues.map(val => (
                                        <label key={val} className={styles.checkboxRow}>
                                            <input
                                                type="checkbox"
                                                checked={selectedDiscounts.includes(val)}
                                                onChange={() => toggleDiscount(val)}
                                            />
                                            <span className={styles.checkboxLabel}>Знижка -{val}%</span>
                                            <span className={styles.count}>
                                                {products.filter(p => Math.round(Number(p.discount)) === val).length}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Торгова марка */}
                        <div className={styles.filterBlock}>
                            <div className={styles.filterTitle} onClick={() => toggleSection("trademark")}>
                                <span>Торгова марка</span>
                                <span className={`${styles.arrow} ${openSections.trademark ? styles.arrowOpen : ""}`}>›</span>
                            </div>
                            {openSections.trademark && (
                                <div className={styles.filterContent}>
                                    {trademarks.map(tm => (
                                        <label key={tm} className={styles.checkboxRow}>
                                            <input
                                                type="checkbox"
                                                checked={selectedTrademarks.includes(tm)}
                                                onChange={() => toggleTrademark(tm)}
                                            />
                                            <span className={styles.checkboxLabel}>{tm}</span>
                                            <span className={styles.count}>
                                                {products.filter(p => p.trademark === tm).length}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Ціна */}
                        <div className={styles.filterBlock}>
                            <div className={styles.filterTitle} onClick={() => toggleSection("price")}>
                                <span>Ціна</span>
                                <span className={`${styles.arrow} ${openSections.price ? styles.arrowOpen : ""}`}>›</span>
                            </div>
                            {openSections.price && (
                                <div className={styles.filterContent}>
                                    <div className={styles.rangeRow}>
                                        <div className={styles.rangeInputWrap}>
                                            <span className={styles.rangeLabel}>Від</span>
                                            <input type="number" className={styles.rangeInput}
                                                value={priceRange[0]}
                                                onChange={e => setPriceRange([+e.target.value, priceRange[1]])} />
                                        </div>
                                        <div className={styles.rangeDash}>—</div>
                                        <div className={styles.rangeInputWrap}>
                                            <span className={styles.rangeLabel}>До</span>
                                            <input type="number" className={styles.rangeInput}
                                                value={priceRange[1]}
                                                onChange={e => setPriceRange([priceRange[0], +e.target.value])} />
                                        </div>
                                    </div>
                                    <input type="range" min={1} max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                                        className={styles.slider} />
                                </div>
                            )}
                        </div>

                        {/* Кількість */}
                        <div className={styles.filterBlock}>
                            <div className={styles.filterTitle} onClick={() => toggleSection("qty")}>
                                <span>Кількість</span>
                                <span className={`${styles.arrow} ${openSections.qty ? styles.arrowOpen : ""}`}>›</span>
                            </div>
                            {openSections.qty && (
                                <div className={styles.filterContent}>
                                    <div className={styles.rangeRow}>
                                        <div className={styles.rangeInputWrap}>
                                            <span className={styles.rangeLabel}>Від</span>
                                            <input type="number" className={styles.rangeInput}
                                                value={qtyRange[0]}
                                                onChange={e => setQtyRange([+e.target.value, qtyRange[1]])} />
                                        </div>
                                        <div className={styles.rangeDash}>—</div>
                                        <div className={styles.rangeInputWrap}>
                                            <span className={styles.rangeLabel}>До</span>
                                            <input type="number" className={styles.rangeInput}
                                                value={qtyRange[1]}
                                                onChange={e => setQtyRange([qtyRange[0], +e.target.value])} />
                                        </div>
                                    </div>
                                    <input type="range" min={1} max={maxQty}
                                        value={qtyRange[1]}
                                        onChange={e => setQtyRange([qtyRange[0], +e.target.value])}
                                        className={styles.slider} />
                                </div>
                            )}
                        </div>

                    </aside>

                    <div className={styles.rightSection}>
                        {/* Сортування */}
                        <div className={styles.sortContainer}>
                            <button
                                className={styles.sortBtn}
                                onClick={() => setShowSortMenu(p => !p)}
                            >
                                {sortOptions.find(o => o.value === sortBy)?.label} ▼
                            </button>
                            {showSortMenu && (
                                <div className={styles.sortDropdown}>
                                    {sortOptions.map(opt => (
                                        <div
                                            key={opt.value}
                                            className={`${styles.sortOption} ${sortBy === opt.value ? styles.activeSort : ""}`}
                                            onClick={() => {
                                                setSortBy(opt.value);
                                                setShowSortMenu(false);
                                            }}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <p>Завантаження...</p>
                        ) : filtered.length === 0 ? (
                            <p className={styles.emptyLabel}>Товарів не знайдено</p>
                        ) : (
                            <div className={styles.grid}>
                                {filtered.map(product => (
                                    <ProductSmallCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showScrollTop && (
                <button
                    className={styles.scrollTopBtn}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    ↑
                </button>
            )}
        </>
    );
}

