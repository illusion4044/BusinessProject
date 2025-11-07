import styles from './mainPageCon3.module.css'

export default function MainPageCon3 () {


    return (
        <>
            <div className={styles.mainPageCon3}>
                <span className={styles.textAboutUs}>Про нас</span>

                <div className={styles.blockAbout}>
                    <span className={styles.textAbout}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum imperdiet enim ultricies augue elementum mattis. Nullam placerat porta ultricies. Sed fringilla ligula sit amet dui mollis, sed blandit nunc iaculis. Quisque massa nisi, feugiat ac porttitor ac, laoreet eu ante. Curabitur quis accumsan tellus. Praesent eros nisl, pharetra ornare ipsum sed, iaculis sollicitudin odio. Duis non velit nunc. Ut at sollicitudin sapien. Nulla facilisi. Sed ultricies consectetur ultrices. Nulla pulvinar lacus ac ligula fringilla, at consectetur libero posuere. Pellentesque eu mi quis diam laoreet accumsan. Integer euismod eros non pretium gravida. Aliquam in auctor orci, non pharetra sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </span>

                    {/* <img className={styles.imgAbout} src="" alt="" /> */}
                    <div className={styles.imgAbout}></div>
                </div>
            </div>
        </>
    )
}