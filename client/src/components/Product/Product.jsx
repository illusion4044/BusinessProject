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
    const [similarProducts, setSimilarProducts] = useState([]);
    const similarRef = useRef(null);
    const { addToCart } = useCart();

    const [weight, setWeight] = useState(1);
    const [weightError, setWeightError] = useState('');

    const isWeighed = product && product.unit === 'кг';

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Product data:", data);
                console.log("Unit:", data.unit);
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

    const handleWeightChange = (value) => {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0.1) {
            setWeightError('Введіть вагу не менше 0.1 кг');
            return;
        }
        const grams = val * 1000;
        if (grams % 100 !== 0) {
            setWeightError('Вага має бути кратна 100 г');
            return;
        }
        setWeightError('');
        setWeight(val);
    };

    const handleQuickWeight = (w) => {
        setWeight(w);
        setWeightError('');
    };

    const handleAddToCart = () => {
        if (isWeighed) {
            addToCart(product, weight);
        } else {
            addToCart(product);
        }
    };

    const discount = product?.discount || 0;
    const oldPrice = discount > 0
        ? Math.round(product.price / (1 - discount / 100))
        : null;

    if (loading) return (
        <>
            <Header />
            <div className={styles.loadingWrap}>
                <div className={styles.spinner} />
            </div>
        </>
    );

    if (!product) return (
        <>
            <Header />
            <div className={styles.notFound}>Товар не знайдено</div>
        </>
    );

    return (
        <>
            <Header />

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
                                <span className={styles.priceNow}>
                                    {isWeighed ? `${product.price}₴/кг` : `${product.price}₴`}
                                </span>
                                {discount > 0 && oldPrice && (
                                    <span className={styles.priceOld}>{oldPrice}₴</span>
                                )}
                                {isWeighed && (
                                    <div>
                                        <p>Ціна: {(product.price * weight).toFixed(2)} ₴</p>
                                    </div>
                                )}
                            </div>
                            <button
                                className={styles.cartBtn}
                                onClick={handleAddToCart}
                            >
                                <img src="/images/shopping-cart 1.svg" alt="" />
                                У кошик
                            </button>
                        </div>

                        {/* Weighing options for weighed products */}
                        {isWeighed && (
                            <div className={styles.weighingSection}>
                                <label>Оберіть вагу:</label>
                                <div className={styles.quickWeights}>
                                    <button type="button" onClick={() => handleQuickWeight(0.1)}>100 г</button>
                                    <button type="button" onClick={() => handleQuickWeight(0.25)}>250 г</button>
                                    <button type="button" onClick={() => handleQuickWeight(0.5)}>500 г</button>
                                    <button type="button" onClick={() => handleQuickWeight(1)}>1 кг</button>
                                </div>
                                <p>Або введіть свою вагу (кратно 100 г):</p>
                                <input
                                    type="number"
                                    className={styles.customWeight}
                                    step="0.1"
                                    min="0.1"
                                    value={weight}
                                    onChange={(e) => handleWeightChange(e.target.value)}
                                    placeholder="Наприклад: 1.2"
                                />
                                {weightError && <p className={styles.error} style={{color:'red'}}>{weightError}</p>}
                            </div>
                        )}

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