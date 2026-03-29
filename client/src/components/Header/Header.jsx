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
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchRef = useRef(null);
    const { totalCount, openCart } = useCart();

    const handleLoginClick = () => {
        setIsBtnLoginClicked(prev => !prev);
    };

    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        setSearchLoading(true);
        const timeout = setTimeout(() => {
            fetch(`http://localhost:3001/products/search?q=${encodeURIComponent(searchQuery)}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResults(data.slice(0, 6));
                    setSearchLoading(false);
                })
                .catch(() => setSearchLoading(false));
        }, 300); // debounce
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

    const role = localStorage.getItem("role");

    const handleCloseOverlay = () => {
        setIsBtnLoginClicked(false);
        const token = localStorage.getItem("token");
        if (token) setIsLogined(true);
    };

    return (
        <>
            <header className={styles.mainHeader}>
                <div className={styles.headerItems}>

                    <div className={styles.Logo}>
                        <img onClick={(() => navigate("/catalogue"))} src="/images/logo.png" alt="" />
                    </div>

                    <CatalogueMenu />

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
                                            src={product.image ? `http://localhost:3001${product.image}` : "/images/NoImageCard.png"}
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
                            Кошик
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
                                Користувач
                            </button>

                            {role === "admin" && (
                                <Link className={styles.link} to="/admin">
                                    <button type="button" className={styles.btnCustomer}>
                                        Адмін панель
                                    </button>
                                </Link>
                            )}
                        </>) : (<>
                            <button onClick={handleLoginClick} type="button" className={styles.btnSignUp}>
                                <img src="images\Contacts.png" alt="Contacts" className={styles.icon} />
                                Увійти
                            </button>
                        </>)}
                    </div>
                </div>
            </header>

            {isBtnLoginClicked && (
                <LoginOverlay
                    key={isBtnLoginClicked}
                    onClose={handleCloseOverlay}
                />
            )}

            {isSettingsOpen && (
                <SettingsOverlay onClose={() => setIsSettingsOpen(false)} />
            )}
        </>
    )
}