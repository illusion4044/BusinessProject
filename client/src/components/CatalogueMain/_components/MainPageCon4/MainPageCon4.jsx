import styles from './mainPageCon4.module.css'

export default function MainPageCon4() {

    return (
        <div className={styles.mainPageCon4}>

            <h2 className={styles.title}>
                Наше місце розташування
            </h2>

            <div className={styles.content}>

                <div className={styles.mapContainer}>
                    <iframe
                        className={styles.map}
                        src="https://www.google.com/maps?q=50.4501,30.5234&z=15&output=embed"
                        loading="lazy"
                    ></iframe>
                </div>

                <div className={styles.textContainer}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vestibulum imperdiet enim ultrices augue elementum mattis.
                        Nullam placerat porta ultricies.

                        Sed fringilla ligula sit amet dui mollis, sed blandit
                        nunc iaculis. Quisque massa nisi, feugiat ac porttitor ac,
                        laoreet eu ante.
                        Curabitur quis accumsan tellus. Praesent eros nisl,
                        pharetra ornare ipsum sed, iaculis sollicitudin odio.
                    </p>
                </div>

            </div>

        </div>
    )
}