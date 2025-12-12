import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AddToCart() {
  const cartItems = useSelector((store) => store.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Helper to ensure price is numeric
  const parsePrice = (price) => Number(price) || 0;

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    if (!cartItems.length) return;
    navigate("/checkout");
  };

  // Increment / Decrement handlers
  const increment = (id) => {
    dispatch({ type: "INCREMENT_QTY", payload: id });
  };

  const decrement = (id) => {
    dispatch({ type: "DECREMENT_QTY", payload: id });
  };

  return (
    <div style={{ paddingBottom: "100px", background: "#f8f9fa", minHeight: "100vh" }}>
      <div style={{ padding: "24px" }}>
        <h2 style={{ margin: 0, color: "#1d3557", fontWeight: 700 }}>🛒 Review Your Cart</h2>
        <p style={{ marginTop: "8px", color: "#555" }}>
          {cartItems.length ? "Confirm items and proceed to checkout" : "Your cart is empty"}
        </p>

        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px"
          }}
        >
          <AnimatePresence>
            {cartItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                  display: "flex",
                  gap: "14px",
                  alignItems: "center"
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={item.img}
                  alt={item.desc}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    objectFit: "cover",
                    background: "#f1f1f1"
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "#222" }}>{item.desc}</div>
                  <div style={{ marginTop: 4, color: "#e63946", fontSize: 15 }}>
                    ₹{parsePrice(item.price) * (item.quantity || 0)}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <button
                      onClick={() => decrement(item.id)}
                      disabled={item.quantity <= 1}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "none",
                        background: "#1d3557",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{item.quantity || 0}</span>
                    <button
                      onClick={() => increment(item.id)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "none",
                        background: "#1d3557",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#ffffff",
          borderTop: "1px solid #eaeaea",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          boxShadow: "0 -6px 16px rgba(0,0,0,0.06)",
          zIndex: 100
        }}
      >
        <div>
          <div style={{ color: "#1d3557", fontWeight: 700, fontSize: 18 }}>
            Total: ₹{subtotal.toFixed(2)}
          </div>
          <div style={{ color: "#666", fontSize: 13 }}>{totalItems} item(s)</div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckout}
          disabled={!cartItems.length}
          style={{
            background: cartItems.length ? "#1d3557" : "#9aa3af",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "12px 22px",
            fontSize: 16,
            fontWeight: 600,
            cursor: cartItems.length ? "pointer" : "not-allowed"
          }}
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>
    </div>
  );
}
