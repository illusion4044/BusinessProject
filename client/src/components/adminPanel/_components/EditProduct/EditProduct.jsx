import { useState, useEffect } from 'react';
import styles from '../AddProduct/AddProduct.module.css';
import React from "react";

export default function EditProduct({ setActivePage, product }) {
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [state, setState] = useState({
        name: "", description: "", price: "", qty: "",
        country: "", trademark: "", seller: "", unit: "шт", category_id: ""
    });
    const [removeImage, setRemoveImage] = useState(false);

    const handleRemoveImage = () => {
        setImage(null);
        setRemoveImage(true);
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                console.log("categories:", data);
                setCategories(data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        console.log("product prop:", product);
        if (!product?.id) {
            console.log("NO PRODUCT ID");
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/product/${product.id}`)
            .then(res => {
                console.log("response status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("product data:", data);
                setState({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    qty: data.qty || "",
                    country: data.country || "",
                    trademark: data.trademark || "",
                    seller: data.seller || "",
                    unit: data.unit || "шт",
                    category_id: data.category_id ? Number(data.category_id) : "",
                    discount: data.discount || 0
                });
            })
            .catch(err => console.error("fetch error:", err));
    }, [product?.id]);

    const setField = (field, value) => setState(prev => ({ ...prev, [field]: value }));
    const handleFileChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async () => {
        const formData = new FormData();

        Object.entries(state).forEach(([key, val]) => {
            if (key === "category_id" || key === "discount") {
                formData.append(key, val ?? 0);
            } else if (val !== "" && val !== null) {
                formData.append(key, val);
            }
        });

        if (image) formData.append("image", image);
        if (removeImage) formData.append("removeImage", "true");

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/editproduct/${product.id}`, {
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
                        ) : product?.image && !removeImage ? (
                            <img src={`${import.meta.env.VITE_API_URL}${product.image}`} className={styles.previewImage} alt="current" />
                        ) : (
                            <div className={styles.imagePlaceholder}></div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.addPhotoBtn}
                        />

                        {(image || product?.image) && !removeImage && (
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className={styles.deletePhotoBtn}
                            >
                                Видалити фото
                            </button>
                        )}

                    </div>

                    <input className={styles.input} placeholder="Назва товару"
                        value={state.name} onChange={e => setField("name", e.target.value)} />
                    <textarea className={styles.textarea} placeholder="Опис товару"
                        value={state.description} onChange={e => setField("description", e.target.value)} />
                </div>

                <div className={styles.RightPanelBlock}>
                    <select
                        className={styles.input}
                        value={state.category_id ?? ""}
                        onChange={e => setField("category_id", Number(e.target.value))}
                    >
                        <option value="">Обрати категорію</option>

                        {categories
                            .filter(c => c.parent_id === null)
                            .map(parent => {
                                const children = categories.filter(c => c.parent_id === parent.id);

                                return (
                                    <React.Fragment key={parent.id}>

                                        <option value={parent.id}>
                                            {parent.name}
                                        </option>

                                        {children.map(child => (
                                            <option key={child.id} value={child.id}>
                                                - {child.name}
                                            </option>
                                        ))}
                                    </React.Fragment>
                                );
                            })
                        }
                    </select>

                    <h4 className={styles.sectionTitle}>Загальна інформація</h4>

                    <input className={styles.input} placeholder="Країна"
                        value={state.country} onChange={e => setField("country", e.target.value)} />
                    <input className={styles.input} placeholder="Торгова марка"
                        value={state.trademark} onChange={e => setField("trademark", e.target.value)} />
                    <input className={styles.input} placeholder="Продавець"
                        value={state.seller} onChange={e => setField("seller", e.target.value)} />

                    <div className={styles.row}>
                        <input className={styles.smallInput} placeholder="Ціна (грн)"
                            value={state.price} onChange={e => setField("price", e.target.value)} />
                        <input className={styles.smallInput} placeholder="Знижка (%)"
                            type="number"
                            min="0"
                            max="99"
                            value={state.discount || ""}
                            onChange={e => setField("discount", e.target.value)}
                        />
                    </div>
                    <input className={styles.smallInput} placeholder="Кількість" 
                        value={state.qty || ""}
                        onChange={e => setField("qty", e.target.value)}
                    />

                    {state.price && state.discount > 0 && (
                        <div className={styles.pricePreview}>
                            Акційна ціна: <b>{Math.round(state.price * (1 - state.discount / 100))}₴</b>
                            <span className={styles.oldPrice}> {state.price}₴</span>
                        </div>
                    )}

                    <button className={styles.saveBtn} onClick={handleSubmit}>
                        Зберегти зміни
                    </button>
                </div>
            </div>
        </div>
    );
}