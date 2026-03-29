import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from './components/CartContext/CartContext';
import { useCart } from './components/CartContext/CartContext';
import CatalogueMain from './components/CatalogueMain/CatalogueMain';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import Product from './components/Product/Product';
import Payment from './components/Payment/Payment';
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";
import AdminPanel from './components/adminPanel/AdminPanel';
import AllProducts from './components/AllProducts/AllProducts';

function AppContent() {
  const { isCartOpen, closeCart } = useCart();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/catalogue" />}/>
        <Route path="/catalogue" element={<CatalogueMain />}/>
        <Route path="/profile" element={<CustomerProfile/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/orders" element={<PurchaseHistory />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/product/:id" element={<Product/>}/>
      </Routes>
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App