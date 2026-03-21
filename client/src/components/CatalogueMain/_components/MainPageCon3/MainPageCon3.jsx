import styles from './mainPageCon3.module.css'

export default function MainPageCon3 () {


    return (
        <>
            <div className={styles.mainPageCon3}>
                <span className={styles.textAboutUs}>Про нас</span>

                <div className={styles.blockAbout}>
                    <span className={styles.textAbout}>
                        <b>ReFlex</b> — це бізнес із серцем, що формує нову культуру свідомого, зручного та приємного вибору прямо біля вашого дому. Ми створили простір, куди можна забігти за молоком, а вийти з новою історією, ароматною кавою чи захопливою книжкою. Наш головний орієнтир — голос клієнта, тому ми маємо сміливість відрізнятися, перетворюючи щоденні покупки на миті Вашого натхнення. 
                    </span>

                    <img className={styles.imgAbout} src="images\Reflex1.jpg" alt="" />
                </div>
            </div>
        </>
    )
}