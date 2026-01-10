import styles from './AddProduct.module.css'
import useAddProduct from '../../hooks/useAddProduct';

export default function AddProduct () {
    const { state, setField, submitProduct } = useAddProduct();

    return (
        <div className={styles.MainAddProductWindow}>

            <div className={styles.BackToLobby}>
                <img src="images/BackRow.png" className={styles.leftRow} alt="" />
                Додавання товару
            </div>

            <div className={styles.BlockItems}>

                <div className={styles.LeftPanelBlock}>
                    <div className={styles.imageBlock}>
                        <div className={styles.imagePlaceholder}></div>
                        <button className={styles.addPhotoBtn}>Додати фото</button>
                    </div>

                    <input
                        className={styles.input}
                        placeholder="Додати назву товара"
                        value={state.name}
                        onChange={e => setField("name", e.target.value)}
                    />

                    <textarea
                        className={styles.textarea}
                        placeholder="Додати опис товара"
                        value={state.description}
                        onChange={e => setField("description", e.target.value)}
                    />
                </div>

                <div className={styles.RightPanelBlock}>
                    <select className={styles.input}>
                        <option>Обрати категорію</option>
                    </select>

                    <h4 className={styles.sectionTitle}>Загальна інформація</h4>

                    <input className={styles.input} placeholder="Країна" 
                        value={state.country}
                        onChange={e => setField("country", e.target.value)}
                    />
                    <input className={styles.input} placeholder="Торгова марка" 
                        value={state.trademark}
                        onChange={e => setField("trademark", e.target.value)}
                    />
                    <input className={styles.input} placeholder="Продавець" 
                        value={state.seller}
                        onChange={e => setField("seller", e.target.value)}
                    />

                    <div className={styles.row}>
                        <input className={styles.smallInput} placeholder="Ціна" 
                            value={state.price}
                            onChange={e => setField("price", e.target.value)}
                        />
                        <input className={styles.smallInput} placeholder="Кількість" 
                            value={state.qty}
                            onChange={e => setField("qty", e.target.value)}
                        />
                    </div>

                    <input
                        className={styles.input}
                        placeholder="Акційна ціна"
                    />

                    <button 
                        className={styles.saveBtn}
                        onClick={submitProduct}
                    > Зберегти</button>
                </div>

            </div>
        </div>
    )
}
