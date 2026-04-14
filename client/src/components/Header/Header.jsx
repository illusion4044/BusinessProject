import CatalogueMenu from './_components/CatalogueMenu/CatalogueMenu'
import LoginOverlay from './_components/LoginOverlay/LoginOverlay';
import styles from './Header.module.css'
import { useState, useRef, useEffect } from 'react'
import SettingsOverlay from './_components/SettingsOverlay/SettingsOverlay';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../CartContext/CartContext";

export default function Header({ onCartOpen }) {

    const [isLogined, setIsLogined] = useState(null)
    const [isBtnLoginClicked, setIsBtnLoginClicked] = useState(null)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // === ЗМІНА: додано стейт для акордеону каталогу і список категорій ===
    const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
    const [mobileCategories, setMobileCategories] = useState([]);
    // =====================================================================
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchRef = useRef(null);
    const { totalCount, openCart } = useCart();

    const handleLoginClick = () => setIsBtnLoginClicked(prev => !prev);

    useEffect(() => {
        if (!searchQuery.trim()) { setSearchResults([]); return; }
        setSearchLoading(true);
        const timeout = setTimeout(() => {
            fetch(`${import.meta.env.VITE_API_URL}/products/search?q=${encodeURIComponent(searchQuery)}`)
                .then(res => res.json())
                .then(data => { setSearchResults(data.slice(0, 6)); setSearchLoading(false); })
                .catch(() => setSearchLoading(false));
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchResults([]);
                setSearchQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setIsLogined(true);
    }, []);

    // === ЗМІНА: завантажуємо категорії для мобільного акордеону ===
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                const parents = data.filter(c => !c.parent_id);
                setMobileCategories(parents);
            })
            .catch(console.error);
    }, []);
    // ==============================================================

    const role = localStorage.getItem("role");

    const handleCloseOverlay = () => {
        setIsBtnLoginClicked(false);
        const token = localStorage.getItem("token");
        if (token) setIsLogined(true);
    };

    const mobileMenuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(e.target) &&
                !e.target.closest(`.${styles.burgerBtn}`)
            ) {
                setIsMobileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const touchStartY = useRef(null);

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    useEffect(() => {
        function handleScroll() {
            setIsMobileMenuOpen(false);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchEndY - touchStartY.current > 50) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header className={styles.mainHeader}>
                <div className={styles.headerItems}>

                    {/* Гамбургер */}
                    <button
                        className={styles.burgerBtn}
                        onClick={() => setIsMobileMenuOpen(prev => !prev)}
                    >
                        <span className={isMobileMenuOpen ? styles.burgerOpen : ""}></span>
                        <span className={isMobileMenuOpen ? styles.burgerOpen : ""}></span>
                        <span className={isMobileMenuOpen ? styles.burgerOpen : ""}></span>
                    </button>

                    {/* Лого */}
                    <div className={styles.Logo}>
                        <img onClick={() => navigate("/catalogue")} src="/images/logo.png" alt="" />
                    </div>

                    {/* Каталог — ховається на мобільному */}
                    <div className={styles.catalogueWrap}>
                        <CatalogueMenu />
                    </div>

                    {/* Пошук — ховається на мобільному */}
                    <div className={styles.searchContainer} ref={searchRef}>
                        <img src="/images/Search.png" alt="search" className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Пошук..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        {(searchResults.length > 0 || searchLoading) && (
                            <div className={styles.searchDropdown}>
                                {searchLoading ? (
                                    <div className={styles.searchLoading}></div>
                                ) : searchResults.map(product => (
                                    <div
                                        key={product.id}
                                        className={styles.searchItem}
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSearchResults([]);
                                            navigate(`/product/${product.id}`);
                                        }}
                                    >
                                        <img
                                            src={product.image ? `${import.meta.env.VITE_API_URL}${product.image}` : "/images/NoImageCard.png"}
                                            alt={product.name}
                                            className={styles.searchItemImage}
                                        />
                                        <div className={styles.searchItemInfo}>
                                            <span className={styles.searchItemName}>{product.name}</span>
                                            <span className={styles.searchItemPrice}>{product.price}₴</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.rightBtnCon}>
                        <button onClick={openCart} type="button" className={styles.btnCart}>
                            <img src="/images/Shopping Basket.png" alt="Shopping Basket" className={styles.icon} />
                            <span className={styles.btnText}>Кошик</span>
                            {totalCount > 0 && (
                                <span className={styles.cartBadge}>{totalCount}</span>
                            )}
                        </button>

                        {isLogined ? (<>
                            <button
                                type="button"
                                className={styles.btnCustomer}
                                onClick={() => setIsSettingsOpen(prev => !prev)}
                            >
                                <img src="/images/Contacts.png" alt="Contacts" className={styles.icon} />
                                <span className={styles.btnText}>Користувач</span>
                            </button>

                            {role === "admin" && (
                                <Link className={styles.link} to="/admin">
                                    <button type="button" className={`${styles.btnCustomer} ${styles.adminBtn}`}>
                                        <span className={styles.btnText}>Адмін панель</span>
                                    </button>
                                </Link>
                            )}
                        </>) : (
                            <button onClick={handleLoginClick} type="button" className={styles.btnSignUp}>
                                <img src="/images/Contacts.png" alt="Contacts" className={styles.icon} />
                                <span className={styles.btnText}>Увійти</span>
                            </button>
                        )}
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div
                        className={styles.mobileMenu}
                        ref={mobileMenuRef}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className={styles.mobileSearch}>
                            <img src="/images/Search.png" alt="search" className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Пошук..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />

                            {(searchResults.length > 0 || searchLoading) && (
                                <div className={styles.searchDropdown}>
                                    {searchLoading ? (
                                        <div className={styles.searchLoading}>Завантаження...</div>
                                    ) : searchResults.map(product => (
                                        <div
                                            key={product.id}
                                            className={styles.searchItem}
                                            onClick={() => {
                                                setSearchQuery("");
                                                setSearchResults([]);
                                                setIsMobileMenuOpen(false);
                                                navigate(`/product/${product.id}`);
                                            }}
                                        >
                                            <img
                                                src={product.image ? `${import.meta.env.VITE_API_URL}${product.image}` : "/images/NoImageCard.png"}
                                                alt={product.name}
                                                className={styles.searchItemImage}
                                            />
                                            <div className={styles.searchItemInfo}>
                                                <span className={styles.searchItemName}>{product.name}</span>
                                                <span className={styles.searchItemPrice}>{product.price}₴</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className={styles.mobileLinks}>

                            {/* === ЗМІНА: "Каталог" тепер акордеон з категоріями === */}
                            <span
                                className={styles.mobileCatalogToggle}
                                onClick={() => setIsMobileCatalogOpen(prev => !prev)}
                            >
                                Каталог
                                <span className={`${styles.mobileCatalogArrow} ${isMobileCatalogOpen ? styles.mobileCatalogArrowOpen : ""}`}>
                                    ›
                                </span>
                            </span>

                            {isMobileCatalogOpen && (
                                <div className={styles.mobileCatalogList}>
                                    <span onClick={() => {
                                        navigate("/all-products");
                                        setIsMobileMenuOpen(false);
                                        setIsMobileCatalogOpen(false);
                                    }}>
                                        Усі товари
                                    </span>
                                    {mobileCategories.map(cat => (
                                        <span key={cat.id} onClick={() => {
                                            navigate("/all-products", { state: { category: cat.name } });
                                            setIsMobileMenuOpen(false);
                                            setIsMobileCatalogOpen(false);
                                        }}>
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {/* ================================================== */}

                            <span onClick={() => { navigate("/all-products"); setIsMobileMenuOpen(false); }}>Всі товари</span>
                            <span onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}>Профіль</span>
                            <span onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); }}>Замовлення</span>
                        </div>
                    </div>
                )}
            </header>

            {isBtnLoginClicked && (
                <LoginOverlay key={isBtnLoginClicked} onClose={handleCloseOverlay} />
            )}
            {isSettingsOpen && (
                <SettingsOverlay onClose={() => setIsSettingsOpen(false)} />
            )}
        </>
    )
}