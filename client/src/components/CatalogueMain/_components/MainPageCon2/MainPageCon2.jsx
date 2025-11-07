import styles from './mainPageCon2.module.css'
import { useRef } from "react";

export default function MainPageCon2() {

    const galleryRef1 = useRef(null);
    const galleryRef2 = useRef(null);


    const scrollGallery1 = (direction) => {
        if (galleryRef1.current) {
            const scrollAmount = 400;
            galleryRef1.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollGallery2 = (direction) => {
        if (galleryRef2.current) {
            const scrollAmount = 400;
            galleryRef2.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className={styles.mainPageCon2}>
                <div className={styles.firstGalleryItems}>
                    <div className={styles.firstTopBlocks}>
                        <div className={styles.discount}>
                            Акції
                            <img src="images\percent_discount.png" alt="" />
                        </div>

                        <div className={styles.buttonsGalleryOverlay}>
                            <span>Дивитись усі</span>
                            <div onClick={() => { scrollGallery1("left") }} className={styles.btnGalleryLeftGround}>
                                <button className={`${styles.btnGalleryLeft} ${styles.btnsGallery}`}>
                                    <img src="images\smallLeftRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>

                            <div onClick={() => { scrollGallery1("right") }} className={styles.btnGalleryRightGround}>
                                <button className={`${styles.btnGalleryRight} ${styles.btnsGallery}`}>
                                    <img src="images\smallRightRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.GalleryItems1} ref={galleryRef1}>
                        {/* Тест */}
                        <div className={styles.card}>
                            <img src="images/coca_cola.png" alt="Coca Cola" className={styles.cardImage} />
                            <div className={styles.cardInfo}>
                                <span className={styles.priceNow}>41.99₴</span>
                                <span className={styles.priceOld}>52.49₴</span>
                                <span className={styles.discountPercent}>-20%</span>
                                <p className={styles.cardName}>Напій Coca-Cola безалкогольний</p>
                            </div>
                        </div>

                        {/* Заглушки */}
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                    </div>
                </div>

                <div className={styles.secondGalleryItems}>
                    <div className={styles.secondTopBlocks}>
                        <span className={styles.recomendationText}>Рекомендації</span>
                        <div className={styles.buttonsGalleryOverlay}>
                            <span>Дивитись усі</span>
                            <div onClick={() => { scrollGallery2("left") }} className={styles.btnGalleryLeftGround}>
                                <button className={`${styles.btnGalleryLeft} ${styles.btnsGallery}`}>
                                    <img src="images\smallLeftRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>

                            <div onClick={() => { scrollGallery2("right") }} className={styles.btnGalleryRightGround}>
                                <button className={`${styles.btnGalleryRight} ${styles.btnsGallery}`}>
                                    <img src="images\smallRightRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.GalleryItems2} ref={galleryRef2}>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        {/* Тест */}
                        <div className={styles.card}>
                            <img src="images/coca_cola.png" alt="Coca Cola" className={styles.cardImage} />
                            <div className={styles.cardInfo}>
                                <span className={styles.priceNow}>41.99₴</span>
                                <span className={styles.priceOld}>52.49₴</span>
                                <span className={styles.discountPercent}>-20%</span>
                                <p className={styles.cardName}>Напій Coca-Cola безалкогольний</p>
                            </div>
                        </div>

                        {/* Заглушки */}
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                        <div className={styles.placeholder}></div>
                    </div>
                </div>
            </div>
        </>
    )
}