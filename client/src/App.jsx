import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CatalogueMain from './components/CatalogueMain/CatalogueMain';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import Product from './components/Product/Product';
import Payment from './components/Payment/Payment';
import AdminPanel from './components/adminPanel/AdminPanel';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/catalogue" />}/>
            <Route path="/catalogue" element={<CatalogueMain/>}/>
            <Route path="/profile" element={<CustomerProfile/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/payment" element={<Payment/>}/>

            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
