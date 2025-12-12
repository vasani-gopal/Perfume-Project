import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Login from './Component/Loginpop/Login'
import Signup from './Component/Loginpop/Signup';
import ProductDetail from './Component/MYPROJECT/ProductDetail'
import Category from './Component/MYPROJECT/Category'
import Cart from './Component/MYPROJECT/Cart'
import AddToCart from './Component/AddToCart';
import Wishlist from './Component/Wishlist'
import Checkout from './Component/Checkout';
import CompletePayment from './Component/CompletePayment';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/category/:category" element={<Category />} />
        <Route path="/category/:category/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete-payment" element={<CompletePayment />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  )
}

export default App
