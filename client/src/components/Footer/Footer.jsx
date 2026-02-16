import { useState, useEffect } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <>
            <div className={styles.Footer}>
                <div className={styles.container}>
                    <div className={styles.firstRowBlock}>
                        <div className={styles.logo}> 
                            <img src="images/LogoWhite.png" alt="Logo" />
                        </div>
                        <p className={styles.hotlineText}>
                            Безкоштовна гаряча лінія<br />
                            <span className={styles.hours}>8:00-22:00 без вихідних</span>
                        </p>
                        <div className={styles.phoneContainer}>
                            <div className={styles.phoneIcon}>
                                <img src="images/phone_logo.png" alt="Phone" />
                            </div>
                            <a href="tel:0000111000" className={styles.phoneNumber}>
                                0000 111 000
                            </a>
                        </div>
                        <div className={styles.emailBlock}>
                            <p className={styles.emailLabel}>Для питань та пропозицій</p>
                            <a href="mailto:shop@nnnn.ua" className={styles.email}>
                                shop@nnnn.ua
                            </a>
                        </div>
                    </div>

                    <div className={styles.secondRowBlock}>
                        <h3 className={styles.blockTitle}>Про нас</h3>
                        <ul>
                            <li><a href="#">Хто ми?</a></li>
                            <li><a href="#">Наше місце знаходження</a></li>
                            <li><a href="#">Наше кафе</a></li>
                            <li><a href="#">Новини</a></li>
                        </ul>
                    </div>

                    <div className={styles.thirdRowBlock}>
                        <h3 className={styles.blockTitle}>Наші соціальні мережі</h3>
                        <div className={styles.rowSocials}>
                            <a href="#" className={styles.socialLink} aria-label="Instagram">
                                <img className={styles.item} src="images/Instagram_logo.png" alt="Instagram" />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Facebook">
                                <img className={styles.item} src="images/facebook_logo.png" alt="Facebook" />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="Telegram">
                                <img className={styles.item} src="images/telegram_logo.png" alt="Telegram" />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="TikTok">
                                <img className={styles.item} src="images/tiktok_logo.png" alt="TikTok" />
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="YouTube">
                                <img className={styles.item} src="images/youtube_logo.png" alt="YouTube" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; 2025 Temp, Inc. All rights reserved.</p>
                </div>
            </div>
        </>
    )
}