import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from './Action';
import Header from '../Home/Header' 
import Footer from '../Home/Footer'

export default function ProductDetail() {
  const [product, setProduct] = useState(null)
  const { category, id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Wishlist from redux
  const wishlist = useSelector(state => state.wishlist)
  const isInWishlist = wishlist.find(el => el.id === product?.id)

  useEffect(() => {
    fetchApi()
  }, [category, id])

  const fetchApi = async () => {
    try {
      const info = await axios.get(`http://localhost:3000/${category}`)
      const item = info.data.find(el => String(el.id) === String(id))
      setProduct(item)
    } catch (err) {
      console.error("Error fetching product detail:", err)
    }
  }

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  // Check if product is already in cart
  const cart = useSelector(state => state.cart || []);
  const isInCart = cart.find(el => el.id === product?.id);

  // Add to Cart handler
  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    if (isInCart) {
      alert("Product is already in your cart!");
      return;
    }
    
    dispatch({ type: "ADD", payload: { ...product, quantity: 1 } });
    navigate("/cart");
  }

  const handleAddToWishlist = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
    navigate("/wishlist")
  }

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>

  return (

    <>

    <Header/>

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px",
      background: "#f8f9fa",
      minHeight: "100vh"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        background: "#fff",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        maxWidth: "900px",
        width: "100%",
        flexWrap: "wrap"
      }}>
        {/* Image Section */}
        <div style={{
          flex: "1 1 350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f1f1f1",
          borderRadius: "12px",
          padding: "20px"
        }}>
          <img
            src={product.img}
            alt={product.desc}
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* Details Section */}
        <div style={{
          flex: "1 1 400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "15px"
        }}>
          <h2 style={{ fontSize: "28px", color: "#222", fontWeight: "bold", margin: 0 }}>
            {product.desc}
          </h2>
          <h3 style={{ fontSize: "22px", color: "#e63946", margin: "10px 0" }}>
            {product.price}
          </h3>
          <p style={{ fontSize: "16px", color: "#555", margin: "5px 0" }}>
            Category: <b>{product.category}</b>
          </p>

          <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#666" }}>
            This is a premium product from our <b>{product.category}</b> collection.
            Perfect choice if you want style, quality and comfort in one.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "15px" }}>
            <button
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: isInCart ? "#555" : "#1d3557",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: isInCart ? "not-allowed" : "pointer",
                transition: "0.3s ease",
                opacity: isInCart ? 0.6 : 1
              }}
              onClick={handleAddToCart}
              disabled={isInCart}
              onMouseEnter={(e) => !isInCart && (e.currentTarget.style.background = "#457b9d")}
              onMouseLeave={(e) => !isInCart && (e.currentTarget.style.background = "#1d3557")}
            >
              {isInCart ? "🛒 Already in Cart" : "🛒 Add to Cart"}
            </button>

            <button
              style={{
                padding: "12px 20px",
                fontSize: "16px",
                background: isInWishlist ? "#555" : "#e63946",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s ease"
              }}
              onClick={handleAddToWishlist}
            >
              {isInWishlist ? "❤️ Remove from Wishlist" : "❤️ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  )
}
