import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import styles from './AdminPanel.module.css'
import AdminLeftModalPanel from "./_components/AdminLeftModalPanel/AdminLeftModalPanel";
import AddingProductionWindow from "./_components/AddingProductionWindow/AddingProductionWindow";
import ProductInfo from "./_components/ProductInfo/ProductInfo";
import AddProduct from "./_components/AddProduct/AddProduct";
import ListCardProduct from "./_components/AddingProductionWindow/_components/listCardProduct/ListCardProduct";
import AddingCategory from "./_components/AddingCategory/AddingCategory";
import EditProduct from "./_components/EditProduct/EditProduct";

export default function AdminPanel () {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [activePage, setActivePage] = useState("defaultPage");
    const [collapsed, setCollapsed] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const goToDefaultPage = () => {
        setActivePage("defaultPage");
        setCollapsed(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/catalogue");
            return;
        }

        fetch("http://localhost:3001/auth/check", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Invalid token");
            }
            return res.json();
        })
        .catch(() => {
            localStorage.clear();
            navigate("/catalogue");
        });

    }, []);

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const q = search.toLowerCase();
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();

            if (aName === q && bName !== q) return -1;
            if (bName === q && aName !== q) return 1;

            if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
            if (bName.startsWith(q) && !aName.startsWith(q)) return 1;

            const aWord = aName.split(" ").some(w => w.startsWith(q));
            const bWord = bName.split(" ").some(w => w.startsWith(q));
            if (aWord && !bWord) return -1;
            if (bWord && !aWord) return 1;

            return aName.localeCompare(bName);
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
            <Header />

            <div className={styles.mainContainer}>
                <div className={styles.AdminWindowContainer}>
                    <AdminLeftModalPanel 
                        setActivePage={setActivePage}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        activePage={activePage}
                    />

                    <div className={styles.content}>
                        {activePage === "defaultPage" && (<>
                            <div className={styles.welcome}>
                                <h2>Ласкаво просимо до адмін панелі!</h2>
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
                                <div className={styles.listPageAll}>
                                    {filteredProducts.map(product => (
                                        <ListCardProduct
                                            key={product.id}
                                            product={product}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            setActivePage={setActivePage}
                                            onEditFull={(p) => {
                                                setEditingProduct(p);
                                                setActivePage("editProduct");
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>)}
                        {activePage === "addProduction" &&  <AddingProductionWindow setActivePage={setActivePage} onEditFull={(p) => {setEditingProduct(p); setActivePage("editProduct");}}/>} 
                        {activePage === "ordersInfo" && <ProductInfo setActivePage={setActivePage}/>}
                        {activePage === "addProduct" && <AddProduct setActivePage={setActivePage} />}
                        {activePage === "addCategory" && <AddingCategory setActivePage={setActivePage}/>}
                        {activePage === "editProduct" && <EditProduct setActivePage={setActivePage} product={editingProduct}/>}

                    </div>
                </div>
            </div>
        </>
    )
}