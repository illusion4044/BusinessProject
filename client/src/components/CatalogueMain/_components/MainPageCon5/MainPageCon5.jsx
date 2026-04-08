import styles from './mainPageCon5.module.css'

export default function MainPageCon5() {

    return (
        <div id="cafe-section" className={styles.mainPageCon5}>
            <h2 className={styles.title}>
                Про наше кафе
            </h2>

            <div className={styles.aboutBlock}>
                <div className={styles.column1}>
                    <span className={styles.ReflexText}>Кав'ярня-книгарня: У світі, який постійно кудись поспішає Ви знайдете простір, 
                        де час відчувається інакше — спокійніше, тепліше, по-справжньому. Тут поєднуються прості 
                        речі, які ми любимо самі: ароматний напій, якісна їжа і книги, що завжди поруч. Ми віримо, 
                        що хороший день складається з деталей — правильно зварена кава , затишний куточок, цікава 
                        історія на сторінках і відчуття, що тобі тут комфортно. </span>
                    <img src="images\reflex_about1.png" className={styles.ReflexImg} alt="" />
                </div>
                <div className={styles.column2}>
                    <img src="images\reflex_about2.png" className={styles.ReflexImg} alt="" />
                    <span className={styles.ReflexText}>Кав'ярня-книгарня: У світі, який постійно кудись поспішає Ви знайдете простір, де час 
                        відчувається інакше — спокійніше, тепліше, по-справжньому. Тут поєднуються прості речі, які 
                        ми любимо самі: ароматний напій, якісна їжа і книги, що завжди поруч. Ми віримо, що хороший 
                        день складається з деталей — правильно зварена кава , затишний куточок, цікава історія на сторінках 
                        і відчуття, що тобі тут комфортно. 
                    </span>
                </div>
            </div>
        </div>
    )
}