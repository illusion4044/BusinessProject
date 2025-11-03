import Header from './_components/Header/Header'
import styles from './CatalogueMain.module.css'

export default function CatalogueMain () {

    return (
        <>
            <div className="mainPageCon1">
                <Header/>

                <div className={styles.wrapperGalleryBlock}>
                    <div className={`${styles.box1} ${styles.box}`}></div>
                    <div className={`${styles.box2} ${styles.box}`}></div>
                    <div className={`${styles.box3} ${styles.box}`}></div>
                    <div className={`${styles.box4} ${styles.box}`}></div>
                </div>
            </div>
        </>
    )
}