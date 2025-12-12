import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const data = useSelector((store) => store.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Helper function to safely parse price and avoid NaN
  const parsePrice = (price) => {
    // Remove ₹ symbol and any non-numeric characters except decimal point
    const cleanPrice = String(price).replace(/[₹,]/g, '').trim();
    const numPrice = Number(cleanPrice);
    return isNaN(numPrice) ? 0 : numPrice;
  };

  // Calculate total items and total price
  const totalItems = data.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const totalPrice = data.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 0),
    0
  );

  const handleIncrease = (id) => {
    dispatch({ type: "INCREASE_QTY", payload: id });
  };

  const handleDecrease = (id) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const handleCheckout = () => {
    if (data.length === 0) return;
    navigate("/checkout");
  };

  // Enhanced Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
    exit: {
      opacity: 0,
      x: -200,
      scale: 0.8,
      rotate: -10,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const emptyCartVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 80,
        damping: 20
      },
    },
  };

  const checkoutBarVariants = {
    hidden: { 
      y: 120, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(29, 53, 87, 0.4)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const quantityVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  if (!data.length) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated background elements */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%"
          }}
        />
        
        <motion.div
          variants={emptyCartVariants}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: "center",
            padding: "60px 40px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "30px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            maxWidth: "450px",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.3)",
            position: "relative",
            zIndex: 1
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, -15, 15, -15, 0],
              scale: [1, 1.15, 1],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
            style={{ 
              fontSize: "100px", 
              marginBottom: "30px",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))"
            }}
          >
            🛒
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ 
              margin: "0 0 15px 0", 
              color: "#1d3557", 
              fontSize: "28px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #1d3557, #457b9d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Your cart is empty
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ 
              margin: "0 0 40px 0", 
              color: "#666", 
              fontSize: "18px",
              lineHeight: "1.6"
            }}
          >
            Add some amazing products to get started! 🎉
          </motion.p>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate("/")}
            style={{
              padding: "16px 32px",
              fontSize: "18px",
              background: "linear-gradient(135deg, #1d3557, #457b9d)",
              color: "#fff",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 8px 25px rgba(29, 53, 87, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            🛍️ Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        paddingBottom: "140px", // Space for sticky checkout bar
        position: "relative"
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(29, 53, 87, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(230, 57, 70, 0.05) 0%, transparent 50%)",
          backgroundSize: "400px 400px",
          zIndex: 0
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          padding: "40px 20px 0",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            textAlign: "center",
            marginBottom: "40px"
          }}
        >
          <motion.h2
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              fontSize: "36px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #1d3557, #457b9d, #e63946, #1d3557)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 10px 0",
              textShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            🛍️ Shopping Cart
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              fontSize: "18px",
              color: "#666",
              margin: "0",
              fontWeight: "500"
            }}
          >
            {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          <AnimatePresence>
            {data.map((el, i) => (
              <motion.div
                key={el.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  padding: "28px",
                  borderRadius: "20px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Card glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: "radial-gradient(circle, rgba(29, 53, 87, 0.1) 0%, transparent 70%)",
                    zIndex: 0
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "center",
                    marginBottom: "24px",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.08,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "relative"
                    }}
                  >
                    <motion.img
                      src={el.img}
                      alt={el.desc}
                      style={{
                        width: "130px",
                        height: "130px",
                        borderRadius: "16px",
                        objectFit: "cover",
                        background: "#f1f1f1",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                      }}
                    />
                    {/* Image overlay effect */}
                    <motion.div
                      whileHover={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(29, 53, 87, 0.2), rgba(230, 57, 70, 0.2))",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px"
                      }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                  
                  <div style={{ flex: 1 }}>
                    <motion.h4 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      style={{ 
                        margin: "0 0 12px 0", 
                        color: "#222",
                        fontSize: "20px",
                        fontWeight: "700",
                        lineHeight: "1.4"
                      }}
                    >
                      {el.desc}
                    </motion.h4>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "8px"
                      }}
                    >
                      <span style={{ 
                        fontSize: "24px", 
                        color: "#e63946",
                        fontWeight: "800"
                      }}>
                        ₹{parsePrice(el.price).toFixed(2)}
                      </span>
                      <span style={{
                        fontSize: "14px",
                        color: "#666",
                        background: "#f0f0f0",
                        padding: "4px 8px",
                        borderRadius: "8px"
                      }}>
                        per item
                      </span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}
                    >
                      <span style={{ 
                        fontSize: "16px", 
                        color: "#1d3557",
                        fontWeight: "600"
                      }}>
                        Quantity: {el.quantity}
                      </span>
                      <span style={{
                        fontSize: "14px",
                        color: "#e63946",
                        fontWeight: "600"
                      }}>
                        Total: ₹{(parsePrice(el.price) * el.quantity).toFixed(2)}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Quantity Control */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "24px",
                    borderTop: "2px solid rgba(240, 240, 240, 0.8)",
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <motion.button
                      variants={quantityVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleDecrease(el.id)}
                      disabled={el.quantity <= 1}
                      style={{
                        ...qtyBtn,
                        opacity: el.quantity <= 1 ? 0.4 : 1,
                        cursor: el.quantity <= 1 ? "not-allowed" : "pointer",
                        background: el.quantity <= 1 ? "#ccc" : "linear-gradient(135deg, #1d3557, #457b9d)",
                        boxShadow: el.quantity <= 1 ? "none" : "0 4px 15px rgba(29, 53, 87, 0.3)"
                      }}
                    >
                      ➖
                    </motion.button>
                    
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      style={{ 
                        fontSize: "20px", 
                        fontWeight: "800",
                        minWidth: "40px",
                        textAlign: "center",
                        color: "#1d3557",
                        background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        border: "2px solid rgba(29, 53, 87, 0.1)"
                      }}
                    >
                      {el.quantity}
                    </motion.div>
                    
                    <motion.button
                      variants={quantityVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleIncrease(el.id)}
                      style={{
                        ...qtyBtn,
                        background: "linear-gradient(135deg, #1d3557, #457b9d)",
                        boxShadow: "0 4px 15px rgba(29, 53, 87, 0.3)"
                      }}
                    >
                      ➕
                    </motion.button>
                  </div>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleRemove(el.id)}
                    style={{
                      padding: "12px 20px",
                      fontSize: "15px",
                      background: "linear-gradient(135deg, #e63946, #f77f00)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 6px 20px rgba(230, 57, 70, 0.3)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    🗑️ Remove Item
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Enhanced Sticky Checkout Bar */}
      <motion.div
        variants={checkoutBarVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          padding: "24px",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.15)",
          borderTop: "2px solid rgba(29, 53, 87, 0.1)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              animate={{
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                fontSize: "24px", 
                fontWeight: "800", 
                background: "linear-gradient(135deg, #1d3557, #e63946)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "6px"
              }}
            >
              Total: ₹{totalPrice.toFixed(2)}
            </motion.div>
            <div style={{ 
              fontSize: "16px", 
              color: "#666",
              fontWeight: "500"
            }}>
              {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
            </div>
          </motion.div>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleCheckout}
            disabled={data.length === 0}
            style={{
              padding: "18px 36px",
              fontSize: "18px",
              background: data.length === 0 
                ? "linear-gradient(135deg, #ccc, #999)" 
                : "linear-gradient(135deg, #1d3557, #457b9d, #e63946)",
              color: "#fff",
              border: "none",
              borderRadius: "15px",
              cursor: data.length === 0 ? "not-allowed" : "pointer",
              fontWeight: "700",
              boxShadow: data.length === 0 
                ? "0 4px 15px rgba(0,0,0,0.1)" 
                : "0 8px 30px rgba(29, 53, 87, 0.4)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Button shine effect */}
            <motion.div
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                zIndex: 1
              }}
            />
            <span style={{ position: "relative", zIndex: 2 }}>
              🛒 Proceed to Checkout
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

const qtyBtn = {
  padding: "12px 16px",
  fontSize: "18px",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  minWidth: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
};
