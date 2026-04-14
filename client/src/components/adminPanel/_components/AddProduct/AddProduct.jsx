import { useState, useEffect } from "react";
import styles from './AddProduct.module.css';
import useAddProduct from '../../hooks/useAddProduct';
import React from "react";

export default function AddProduct ({ setActivePage }) {
    const { state, setField, submitProduct } = useAddProduct();
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                console.log("categories:", data);
                setCategories(data);
            })
            .catch(console.error);
    }, []);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("description", state.description);
        formData.append("price", state.price);
        formData.append("qty", state.qty);
        formData.append("country", state.country);
        formData.append("trademark", state.trademark);
        formData.append("seller", state.seller);
        formData.append("unit", state.unit || "шт");
        formData.append("category_id", state.category_id || "");
        formData.append("discount", state.discount || 0);
        if (image) {
            formData.append("image", image);
        }

        await submitProduct(formData);
    };

    return (
        <div className={styles.MainAddProductWindow}>

            <div className={styles.BackToLobby} onClick={() => setActivePage("addProduction")} >
                <img src="images/BackRow.png" className={styles.leftRow} alt="" />
                <h3>Додавання товару</h3>
            </div>

            <div className={styles.BlockItems}>

                <div className={styles.LeftPanelBlock}>
                    <div className={styles.imageBlock}>
                        {image ? (
                            <img 
                                src={URL.createObjectURL(image)} 
                                className={styles.previewImage} 
                                alt="preview"
                            />
                        ) : (
                            <div className={styles.imagePlaceholder}></div>
                        )}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            className={styles.addPhotoBtn} 
                        />
                    </div>

                    <input
                        className={styles.input}
                        placeholder="Додати назву товара"
                        value={state.name || ""}
                        onChange={e => setField("name", e.target.value)}
                    />

                    <textarea
                        className={styles.textarea}
                        placeholder="Додати опис товара"
                        value={state.description || ""}
                        onChange={e => setField("description", e.target.value)}
                    />
                </div>

                <div className={styles.RightPanelBlock}>
                    {/* <select
                        className={styles.input}
                        value={state.category_id || ""}
                        onChange={e => setField("category_id", e.target.value)}
                    >
                        <option value="">Обрати категорію</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select> */}

                    <select
                        className={styles.input}
                        value={state.category_id || ""}
                        onChange={e => setField("category_id", e.target.value)}
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
                        value={state.country || ""}
                        onChange={e => setField("country", e.target.value)}
                    />
                    <input className={styles.input} placeholder="Торгова марка" 
                        value={state.trademark || ""}
                        onChange={e => setField("trademark", e.target.value)}
                    />
                    <input className={styles.input} placeholder="Продавець" 
                        value={state.seller || ""}
                        onChange={e => setField("seller", e.target.value)}
                    />

                    <div className={styles.row}>
                        <input className={styles.smallInput} placeholder="Ціна" 
                            value={state.price || ""}
                            onChange={e => setField("price", e.target.value)}
                        />
                        <input className={styles.smallInput} placeholder="Кількість" 
                            value={state.qty || ""}
                            onChange={e => setField("qty", e.target.value)}
                        />
                    </div>

                    {/* <input
                        className={styles.input || ""}
                        placeholder="Акційна ціна"
                    /> */}

                    <div className={styles.row}>
                        <input className={styles.smallInput} placeholder="Ціна (грн)"
                            value={state.price || ""}
                            onChange={e => setField("price", e.target.value)}
                        />
                        <input className={styles.smallInput} placeholder="Знижка (%)"
                            type="number"
                            min="0"
                            max="99"
                            value={state.discount || ""}
                            onChange={e => setField("discount", e.target.value)}
                        />
                    </div>

                    {state.price && state.discount > 0 && (
                        <div className={styles.pricePreview}>
                            Акційна ціна: <b>{Math.round(state.price * (1 - state.discount / 100))}₴</b>
                            <span className={styles.oldPrice}> {state.price}₴</span>
                        </div>
                    )}

                    <button 
                        className={styles.saveBtn}
                        onClick={async () => {
                            await handleSubmit();
                            setActivePage("addProduction");
                        }}
                    > Зберегти</button>
                </div>

            </div>
        </div>
    );
}