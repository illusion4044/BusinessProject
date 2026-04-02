import { useState, useEffect, useRef } from 'react'
import styles from './mainPageCon1.module.css'

const slides = [
    { id: 1, src: "/images/molokia.jpg", alt: "Реклама 1" },
    { id: 2, src: "/images/advertising_logo.png", alt: "Реклама 2" },
    { id: 3, src: "/images/advertising_logo.png", alt: "Реклама 3" },
];

export default function MainPageCon1() {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 10000);
    };

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timerRef.current);
    }, []);

    const goLeft = () => {
        setCurrent(prev => (prev - 1 + slides.length) % slides.length);
        resetTimer();
    };

    const goRight = () => {
        setCurrent(prev => (prev + 1) % slides.length);
        resetTimer();
    };

    const goTo = (index) => {
        setCurrent(index);
        resetTimer();
    };

    return (
        <div className={styles.mainPageCon1}>
            <div className={styles.carousel}>

                {/* Слайди */}
                <div className={styles.slidesWrapper}>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`${styles.slide} ${index === current ? styles.slideActive : ""}`}
                        >
                            <img src={slide.src} alt={slide.alt} className={styles.slideImg} />
                        </div>
                    ))}
                </div>

                {/* Кнопки */}
                <div className={styles.btnLeft} onClick={goLeft}>
                    <img src="/images/buttonRowLeft.png" alt="left" />
                </div>
                <div className={styles.btnRight} onClick={goRight}>
                    <img src="/images/buttonRowRight.png" alt="right" />
                </div>

                {/* Dots */}
                <div className={styles.dots}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${index === current ? styles.dotActive : ""}`}
                            onClick={() => goTo(index)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}