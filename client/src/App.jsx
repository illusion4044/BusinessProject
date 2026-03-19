import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CatalogueMain from './components/CatalogueMain/CatalogueMain';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import Product from './components/Product/Product';
import Payment from './components/Payment/Payment';
import AdminPanel from './components/adminPanel/AdminPanel';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
    const handleCartOpen = () => {
      console.log('handleCartOpen called')
      setIsCartOpen(true)
  }

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/catalogue" />}/>
            <Route path="/catalogue" element={<CatalogueMain onCartOpen={handleCartOpen}/>}/>
            <Route path="/profile" element={<CustomerProfile/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/payment" element={<Payment/>}/>

            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      </BrowserRouter>
    </>
  )
}

export default App
