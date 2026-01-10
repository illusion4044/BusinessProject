import ListCardProduct from './_components/listCardProduct/ListCardProduct';
import styles from './AddingProductionWindow.module.css'

import { useEffect, useState } from 'react';

export default function AddingProductionWindow({ setActivePage }) {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase())
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3001/productlist");
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const handleEdit = (updatedProduct) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            )
        );
    };

    const handleDelete = async (product) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:3001/admin/deleteproduct/${product.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setProducts(prev =>
                prev.filter(p => p.id !== product.id)
            );

        } catch (err) {
            console.error("Error after deleting:", err);
        }
    };

    return (
        <>
            <div className={styles.MainWindow}>
                <div className={styles.TopPanelBlock}>
                    <div className={styles.FirstSection}>
                        <div className={styles.BackToLobby}>
                            <img src="images\BackRow.png" className={styles.leftRow} alt="" />
                            Додавання продукції
                        </div>

                        <div className={styles.searchContainer}>
                            <img src="images\Search.png" alt="search" className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Пошук..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                    <div className={styles.SecondSection}>

                        <button
                            type="button"
                            className={styles.btnCatalogue}
                            onClick={() => setOpen(!open)}
                        >
                            <img src="images\downrow.svg" alt="arrow" className={styles.arrowIcon} />
                            Категорії
                        </button>

                        <div className={styles.btnCons}>
                            <button
                                className={styles.navBtns}
                            >
                                <img src="images\AddButton.png" alt="" />
                                Додати категорію
                            </button>
                            <button
                                className={styles.navBtns}
                                onClick={() => {
                                    setActivePage("addProduct");
                                }}
                            >
                                <img src="images\AddButton.png" alt="" />
                                Додати товар
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.listPageAll}>
                    {filteredProducts.map(product => (
                        <ListCardProduct
                            key={product.id}
                            product={product}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}