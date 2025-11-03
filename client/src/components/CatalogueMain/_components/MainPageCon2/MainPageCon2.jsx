import styles from './mainPageCon2.module.css'
import { useRef } from "react";

export default function MainPageCon2() {


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
                            <div className={styles.btnGalleryLeftGround}>
                                <button className={`${styles.btnGalleryLeft} ${styles.btnsGallery}`}>
                                    <img src="images\smallLeftRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>
                                    
                            <div className={styles.btnGalleryRightGround}>
                                <button className={`${styles.btnGalleryRight} ${styles.btnsGallery}`}>
                                    <img src="images\smallRightRow.png" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.GalleryItems1}>
                        <div className={styles.block1}></div>
                    </div>
                </div>

                <div className={styles.secondGalleryItems}>
                    <div className={styles.secondTopBlocks}></div>
                    <div className={styles.GalleryItems2}></div>
                </div>
            </div>
        </>
    )
}