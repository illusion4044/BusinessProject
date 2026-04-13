import { useState, useEffect } from "react";
import styles from "./AddingCategory.module.css";

export default function AddingCategory({setActivePage}) {
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [loading, setLoading] = useState(false);
    const [parentId, setParentId] = useState("");
    const token = localStorage.getItem("token");

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const parentCategories = categories.filter(c => c.parent_id === null || c.parent_id === undefined);
    const subCategories = categories.filter(c => c.parent_id !== null && c.parent_id !== undefined);

    const filteredList = (activeTab === "categories" ? parentCategories : subCategories)
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    async function addCategory() {
        if (!category.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/addcategory`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name: category })
            });
            if (res.ok) {
                setCategory("");
                await fetchCategories();
                setActiveTab("categories");
            }
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    async function addSubcategory() {
        if (!subcategory.trim() || !parentId) return;
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/addsubcategory`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name: subcategory, parent_id: parseInt(parentId) })
            });
            if (res.ok) {
                setSubcategory("");
                setParentId("");
                await fetchCategories();
                setActiveTab("subcategories");
            }
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    async function deleteCategory(id) {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/admin/deletecategory/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchCategories();
        } catch (err) { console.error(err); }
    }

    async function saveEdit(id) {
        if (!editingName.trim()) return;
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/admin/editcategory/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ name: editingName })
            });
            setEditingId(null);
            setEditingName("");
            await fetchCategories();
        } catch (err) { console.error(err); }
    }

    const getParentName = (parentId) => {
        const parent = categories.find(c => c.id === parentId);
        return parent ? parent.name : "—";
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div onClick={() => setActivePage("defaultPage")} className={styles.BackToLobby}>
                    <img src="images/BackRow.png"  className={styles.leftRow} alt="" />
                    Додавання категорії
                </div>
                {activeTab && (
                    <div className={styles.searchWrapper}>
                        <span className={styles.searchIcon}>
                            <img src="images\Search.png" alt="" />
                        </span>
                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Пошук..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                )}
            </div>

            <div className={styles.formRow}>
                <input
                    placeholder="Додати назву категорії"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addCategory()}
                />
                <button className={styles.saveBtn} onClick={addCategory} disabled={loading}>
                    Зберегти
                </button>
            </div>

            <div className={styles.formRow}>
                <input
                    placeholder="Додати підкатегорію"
                    value={subcategory}
                    onChange={e => setSubcategory(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSubcategory()}
                />
                <select
                    className={styles.selectParent}
                    value={parentId}
                    onChange={e => setParentId(e.target.value)}
                >
                    <option value="">Оберіть категорію</option>
                    {parentCategories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <button className={styles.saveBtn} onClick={addSubcategory} disabled={loading}>
                    Зберегти
                </button>
            </div>

            <p className={styles.sectionTitle}>Переглянути створені категорії</p>
            <div className={styles.buttonsRow}>
                <button
                    className={`${styles.categoryBtn} ${activeTab === "categories" ? styles.active : ""}`}
                    onClick={() => { setActiveTab(activeTab === "categories" ? null : "categories"); setSearch(""); }}
                >
                    Категорії
                    <span className={styles.badge}>{parentCategories.length}</span>
                </button>
                <button
                    className={`${styles.categoryBtn} ${activeTab === "subcategories" ? styles.active : ""}`}
                    onClick={() => { setActiveTab(activeTab === "subcategories" ? null : "subcategories"); setSearch(""); }}
                >
                    Підкатегорії
                    <span className={styles.badge}>{subCategories.length}</span>
                </button>
            </div>

            <div className={`${styles.listWrapper} ${activeTab ? styles.listOpen : ""}`}>
                {activeTab && filteredList.length === 0 && (
                    <div className={styles.emptyState}>
                        {search ? "Нічого не знайдено" : "Список порожній"}
                    </div>
                )}
                {activeTab && filteredList.map((item, i) => (
                    <div
                        key={item.id}
                        className={styles.listItem}
                        style={{ animationDelay: `${i * 0.05}s` }}
                    >
                        {editingId === item.id ? (
                            <input
                                className={styles.editInput}
                                value={editingName}
                                onChange={e => setEditingName(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") saveEdit(item.id);
                                    if (e.key === "Escape") setEditingId(null);
                                }}
                                autoFocus
                            />
                        ) : (
                            <div className={styles.itemInfo}>
                                <span className={styles.itemName}>{item.name}</span>
                                {activeTab === "subcategories" && (
                                    <span className={styles.parentTag}>
                                        {getParentName(item.parent_id)}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className={styles.itemActions}>
                            {editingId === item.id ? (
                                <>
                                    <button className={styles.confirmBtn} onClick={() => saveEdit(item.id)}>✔</button>
                                    <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>✖</button>
                                </>
                            ) : (
                                <>
                                    <img
                                        className={styles.actionIcon}
                                        src="images/Pencil.png"
                                        alt="edit"
                                        onClick={() => { setEditingId(item.id); setEditingName(item.name); }}
                                    />
                                    <img
                                        className={styles.actionIcon}
                                        src="images/DeleteBtn.png"
                                        alt="delete"
                                        onClick={() => deleteCategory(item.id)}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}