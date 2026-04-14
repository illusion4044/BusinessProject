import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Product.module.css';
import Header from '../../components/Header/Header';
import { useCart } from '../CartContext/CartContext';
import ProductSmallCard from '../ProductSmallCard/ProductSmallCard';
import Footer from '../Footer/Footer';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [similarProducts, setSimilarProducts] = useState([]);
    const similarRef = useRef(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products`)
            .then(res => res.json())
            .then(data => {
                // Фільтруємо поточний товар та обираємо рандомні товари
                const filtered = data.filter(p => p.id != id);
                const shuffled = filtered.sort(() => Math.random() - 0.5);
                setSimilarProducts(shuffled.slice(0, 8));
            })
            .catch(err => console.error("Error:", err));
    }, [id]);

    const scrollSimilar = (direction) => {
        if (similarRef.current) {
            const scrollAmount = 400;
            similarRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const discount = product?.discount || 0;
    const oldPrice = discount > 0
        ? Math.round(product.price / (1 - discount / 100))
        : null;

    if (loading) return (
        <>
            <Header onCartOpen={() => setIsCartOpen(true)} />
            <div className={styles.loadingWrap}>
                <div className={styles.spinner} />
            </div>
        </>
    );

    if (!product) return (
        <>
            <Header onCartOpen={() => setIsCartOpen(true)} />
            <div className={styles.notFound}>Товар не знайдено</div>
        </>
    );

    return (
        <>
            <Header onCartOpen={() => setIsCartOpen(true)} />

            <main className={styles.main}>

                {/* Хлібні крихти */}
                <nav className={styles.breadcrumb}>
                    <Link to="/catalogue">Головна</Link>
                    <span>›</span>
                    {product.category && (
                        <><span>{product.category}</span><span>›</span></>
                    )}
                    {product.subcategory && (
                        <><span>{product.subcategory}</span><span>›</span></>
                    )}
                    <span>{product.name}</span>
                </nav>

                {/* Верхній блок: фото + інфо */}
                <section className={styles.productBlock}>

                    {/* Фото */}
                    <div className={styles.imageWrap}>
                        <img
                            src={
                                product.image
                                    ? `${import.meta.env.VITE_API_URL}${product.image}`
                                    : '/images/NoImageCard.png'
                            }
                            alt={product.name}
                            className={styles.productImage}
                        />
                    </div>

                    {/* Права колонка */}
                    <div className={styles.infoBlock}>
                        <h1 className={styles.productName}>{product.name}</h1>

                        {/* Ціна + кнопка */}
                        <div className={styles.priceRow}>
                            <div className={styles.priceBlock}>
                                <span className={styles.priceNow}>{product.price}₴</span>
                                {discount > 0 && oldPrice && (
                                    <span className={styles.priceOld}>{oldPrice}₴</span>
                                )}
                            </div>
                            <button
                                className={styles.cartBtn}
                                onClick={() => addToCart(product)}
                            >
                                <img src="/images/shopping-cart 1.svg" alt="" />
                                У кошик
                            </button>
                        </div>

                        {/* Опис */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Опис</h3>
                            <p className={styles.sectionText}>{product.description || 'Нажаль поки що немає'}</p>
                        </div>
                    </div>
                </section>

                {/* Нижній блок: склад + загальна інфо */}
                <section className={styles.detailsBlock}>
                    <div className={styles.detailCol}>
                        <h3 className={styles.sectionTitle}>Склад</h3>
                        <p className={styles.sectionText}>{product.composition || 'Нажаль поки що немає'}</p>
                    </div>

                    <div className={styles.detailCol}>
                        <h3 className={styles.sectionTitle}>Загальна інформація</h3>
                        <table className={styles.infoTable}>
                            <tbody>
                                <tr>
                                    <td className={styles.tdLabel}>Країна</td>
                                    <td className={styles.tdValue}>{product.country || 'Нажаль поки що немає'}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tdLabel}>Торгова марка</td>
                                    <td className={styles.tdValue}>{product.trademark || 'Нажаль поки що немає'}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tdLabel}>Продавець</td>
                                    <td className={styles.tdValue}>{product.seller || 'Нажаль поки що немає'}</td>
                                </tr>
                                <tr>
                                    <td className={styles.tdLabel}>Кількість</td>
                                    <td className={styles.tdValue}>{product.qty || 'Нажаль поки що немає'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Схожі товари */}
                {similarProducts.length > 0 && (
                    <section className={styles.similarSection}>
                        <div className={styles.similarHeader}>
                            <h2 className={styles.similarTitle}>Схожі товари</h2>
                            <div className={styles.similarControls}>
                                <div onClick={() => scrollSimilar("left")} className={styles.btnScrollLeft}>
                                    <button className={styles.scrollBtn}>
                                        <img src="/images/smallLeftRow.png" alt="" />
                                    </button>
                                </div>
                                <div onClick={() => scrollSimilar("right")} className={styles.btnScrollRight}>
                                    <button className={styles.scrollBtn}>
                                        <img src="/images/smallRightRow.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.similarGrid} ref={similarRef}>
                            {similarProducts.map(prod => (
                                <ProductSmallCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </>
    );
}