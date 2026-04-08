import styles from './mainPageCon4.module.css'

export default function MainPageCon4() {
    return (
        <div id="location-section" className={styles.mainPageCon4}>

            <h2 className={styles.title}>
                Наше місце розташування
            </h2>

            <div className={styles.content}>

                <div className={styles.mapContainer}>
                    <iframe
                        className={styles.map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.721052355396!2d30.4487181!3d50.371755699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c8557b39c1ef%3A0x7fc9c069a95716ea!2sTadeia%20Rylskoho%20Blvd%2C%201%2C%20Kyiv%2C%2003187!5e0!3m2!1sen!2sua!4v1775661213388!5m2!1sen!2sua"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <p className={styles.address}>
                        Наше кафе знаходиться за адресою:<br />
                        <span className={styles.addressStreet}>бульвар Тадея Рильського, 1, Київ, 03187</span><br />
                        <span className={styles.welcome}>Ласкаво просимо! ❤️</span>
                    </p>
                </div>

            </div>

        </div>
    )
}