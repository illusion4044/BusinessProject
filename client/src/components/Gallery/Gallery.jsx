import styles from './Gallery.module.css'
import { useRef } from 'react';
import ProductSmallCard from '../ProductSmallCard/ProductSmallCard';
import { useEffect, useState } from "react";

export default function Gallery({ title, imageSrc, items }) {

    const [products, setProducts] = useState([]);
    const [discountProduct, setDiscountProducts] = useState([]);


    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 10)))
            .catch(err => console.error("Error:", err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/discountgallery")
            .then(res => res.json())
            .then(data => setDiscountProducts(data.slice(0, 10)))
            .catch(err => console.error("Error:", err));
    }, []);

    const galleryRef = useRef(null);

    const scrollGallery = (direction) => {
        if (galleryRef.current) {
            const scrollAmount = 400;
            galleryRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className={styles.mainPageCon}>
                <div className={styles.GalleryItems}>
                    <div className={styles.TopBlocks}>
                        <div className={title == 'Акції' ? styles.discount : styles.recomendation}>
                            {title}
                            {title == 'Акції' ? <img src="images\percent_discount.png" alt="" /> : ''}
                        </div>

                        <div className={styles.buttonsGalleryOverlay}>
                            <span>Дивитись усі</span>
                            <div onClick={() => { scrollGallery("left") }} className={styles.btnGalleryLeftGround}>
                                <button className={`${styles.btnGalleryLeft} ${styles.btnsGallery}`}>
                                    <img src="images\smallLeftRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>

                            <div onClick={() => { scrollGallery("right") }} className={styles.btnGalleryRightGround}>
                                <button className={`${styles.btnGalleryRight} ${styles.btnsGallery}`}>
                                    <img src="images\smallRightRow.png" className={styles.btnIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.GalleryItem} ref={galleryRef}>
                        {title === 'Акції' ? (
                            discountProduct.map(product => (
                                <ProductSmallCard key={product.id} product={product} />
                            ))
                        ) : (
                            products.map(product => (
                                <ProductSmallCard key={product.id} product={product} />
                            ))
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}