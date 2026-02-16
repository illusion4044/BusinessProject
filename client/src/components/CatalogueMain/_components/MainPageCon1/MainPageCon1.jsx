import { useState, useEffect } from 'react'
import styles from './mainPageCon1.module.css'

export default function MainPageCon1() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:3001/products");
                const data = await response.json();
                setProducts(data); 
            } catch (err) {
                console.error("Error after loading products", err);
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            <div className={styles.mainPageCon1}>
                <div className={styles.wrapperGalleryBlock}>
                    <div className={`${styles.box1} ${styles.box}`}>
                        <div className={styles.buttonsConOverlay}>
                            <div className={styles.btnGalleryLeftGround}>
                                <button className={`${styles.btnGalleryLeft} ${styles.btnsGallery}`}>
                                    <img src="images\buttonRowLeft.png" alt="" />
                                </button>
                            </div>

                            <div className={styles.btnGalleryRightGround}>
                                <button className={`${styles.btnGalleryRight} ${styles.btnsGallery}`}>
                                    <img src="images\buttonRowRight.png" alt="" />
                                </button>
                            </div>
                        </div>

                        <img src="images\advertising_logo.png" alt="" />


                        <div className={styles.rounded}>
                            <div className={styles.circle}></div>
                            <div className={styles.circle}></div>
                            <div className={styles.circle}></div>
                        </div>
                    </div>
                    <div className={`${styles.box2} ${styles.box}`}>
                        <div className={styles.topBlock}>
                            <p>Всі акції</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <img src="images\sale_logo.png" alt="" />
                        </div>
                    </div>
                    <div className={`${styles.box3} ${styles.box}`}>
                        <div className={styles.topBlock}>
                            <p>Рецепти</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <img src="images\receip_logo.png" alt="" />
                        </div>
                    </div>
                    <div className={`${styles.box4} ${styles.box}`}>
                        <div className={styles.topBlock}>
                            <p>Мої пропозиції</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <img src="images\propositions_logo.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}