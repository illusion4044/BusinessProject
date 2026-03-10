import { useState, useEffect } from 'react';
import styles from '../AddProduct/AddProduct.module.css';

export default function EditProduct({ setActivePage, product }) {
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState({
        name: "", description: "", price: "", qty: "",
        country: "", trademark: "", seller: "", unit: "шт", category_id: ""
    });

    useEffect(() => {
    console.log("product prop:", product); // ← что приходит в компонент
    if (!product?.id) {
        console.log("NO PRODUCT ID");
        return;
    }

    fetch(`http://localhost:3001/product/${product.id}`)
        .then(res => {
            console.log("response status:", res.status);
            return res.json();
        })
        .then(data => {
            console.log("product data:", data); // ← что вернул сервер
            setState({
                name: data.name || "",
                description: data.description || "",
                price: data.price || "",
                qty: data.qty || "",
                country: data.country || "",
                trademark: data.trademark || "",
                seller: data.seller || "",
                unit: data.unit || "шт",
                category_id: data.category_id || ""
            });
        })
        .catch(err => console.error("fetch error:", err));
}, [product?.id]);

    useEffect(() => {
        fetch("http://localhost:3001/categories")
            .then(res => res.json())
            .then(data => setCategories(data.filter(c => c.parent_id === null)))
            .catch(console.error);
    }, []);

    const setField = (field, value) => setState(prev => ({ ...prev, [field]: value }));
    const handleFileChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async () => {
        const formData = new FormData();
        Object.entries(state).forEach(([key, val]) => formData.append(key, val));
        if (image) formData.append("image", image);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3001/admin/editproduct/${product.id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            if (!res.ok) throw new Error("Помилка при редагуванні");
            alert("Товар оновлено!");
            setActivePage("addProduction");
        } catch (err) {
            console.error(err);
            alert("Помилка сервера");
        }
    };

    return (
        <div className={styles.MainAddProductWindow}>
            <div className={styles.BackToLobby} onClick={() => setActivePage("addProduction")}>
                <img src="images/BackRow.png" className={styles.leftRow} alt="" />
                Редагування товару
            </div>

            <div className={styles.BlockItems}>
                <div className={styles.LeftPanelBlock}>
                    <div className={styles.imageBlock}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} className={styles.previewImage} alt="preview" />
                        ) : product?.image ? (
                            <img src={`http://localhost:3001${product.image}`} className={styles.previewImage} alt="current" />
                        ) : (
                            <div className={styles.imagePlaceholder}></div>
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} className={styles.addPhotoBtn} />
                    </div>

                    <input className={styles.input} placeholder="Назва товару"
                        value={state.name} onChange={e => setField("name", e.target.value)} />
                    <textarea className={styles.textarea} placeholder="Опис товару"
                        value={state.description} onChange={e => setField("description", e.target.value)} />
                </div>

                <div className={styles.RightPanelBlock}>
                    <select className={styles.input} value={state.category_id}
                        onChange={e => setField("category_id", e.target.value)}>
                        <option value="">Обрати категорію</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <h4 className={styles.sectionTitle}>Загальна інформація</h4>

                    <input className={styles.input} placeholder="Країна"
                        value={state.country} onChange={e => setField("country", e.target.value)} />
                    <input className={styles.input} placeholder="Торгова марка"
                        value={state.trademark} onChange={e => setField("trademark", e.target.value)} />
                    <input className={styles.input} placeholder="Продавець"
                        value={state.seller} onChange={e => setField("seller", e.target.value)} />

                    <div className={styles.row}>
                        <input className={styles.smallInput} placeholder="Ціна"
                            value={state.price} onChange={e => setField("price", e.target.value)} />
                        <input className={styles.smallInput} placeholder="Кількість"
                            value={state.qty} onChange={e => setField("qty", e.target.value)} />
                    </div>

                    <button className={styles.saveBtn} onClick={handleSubmit}>
                        Зберегти зміни
                    </button>
                </div>
            </div>
        </div>
    );
}