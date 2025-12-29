import styles from './ProductSmallCard.module.css';

export default function ProductSmallCard({ product }) {

    const discount = product.discount || 0;

    const oldPrice = discount > 0 
        ? Math.round(product.price / (1 - discount / 100))
        : null;

    return (
        <div className={styles.card}>
            <img 
                src={product.image_url || "images/NoImageCard.png"}
                alt={product.name}
                className={styles.cardImage}
            />

            <div className={styles.cardInfo}>
                <span className={styles.priceNow}>
                    {product.price}₴
                </span>

                {discount > 0 && oldPrice > 0 && (
                    <div className={styles.priceBlock}>
                        <span className={styles.priceOld}>
                            {oldPrice}₴
                        </span>

                        <span className={styles.discountPercent}>
                            -{discount}%
                        </span>
                    </div>
                )}

                <p className={styles.cardName}>{product.name}</p>
            </div>
        </div>
    );
}
