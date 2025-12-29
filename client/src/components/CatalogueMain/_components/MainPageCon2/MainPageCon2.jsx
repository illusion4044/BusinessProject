import styles from './mainPageCon2.module.css'
import Gallery from '../../../Gallery/Gallery';

export default function MainPageCon2() {
    
    return (
        <>
            <div className={styles.mainPageCon2}>
                <div className="firstGallery">
                    <Gallery
                        title="Акції"
                    />
                </div>
                <div className="secondGallery">
                    <Gallery
                        title="Рекомендації"
                    />
                </div>
            </div>
        </>
    )
}