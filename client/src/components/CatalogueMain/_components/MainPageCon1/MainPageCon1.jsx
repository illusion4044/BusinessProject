import styles from './mainPageCon1.module.css'

export default function MainPageCon1() {

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

                        <div className={styles.rounded}>
                            <div className={styles.circle}></div>
                            <div className={styles.circle}></div>
                            <div className={styles.circle}></div>
                        </div>
                    </div>
                    <div className={`${styles.box2} ${styles.box}`}></div>
                    <div className={`${styles.box3} ${styles.box}`}></div>
                    <div className={`${styles.box4} ${styles.box}`}></div>
                </div>
            </div>

        </>
    )
}