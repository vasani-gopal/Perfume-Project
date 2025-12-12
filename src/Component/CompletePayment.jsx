import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompletePayment = () => {
  const cartData = useSelector((store) => store.cart || []);
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [orderNumber, setOrderNumber] = useState('');

  // Generate order number
  useEffect(() => {
    const generateOrderNumber = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      return `ORD-${timestamp}-${random}`;
    };
    setOrderNumber(generateOrderNumber());

    // Simulate payment processing
    const timer = setTimeout(() => {
      setPaymentStatus('success');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Helper function to safely parse price and avoid NaN
  const parsePrice = (price) => {
    const cleanPrice = String(price).replace(/[₹,]/g, '').trim();
    const numPrice = Number(cleanPrice);
    return isNaN(numPrice) ? 0 : numPrice;
  };

  // Calculate totals
  const subtotal = cartData.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 0),
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const tax = subtotal * 0.18; // 18% tax
  const grandTotal = subtotal + shipping + tax;

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrder = () => {
    // You can implement order tracking functionality here
    alert(`Order Number: ${orderNumber}\nYou can track your order using this number.`);
  };

  if (paymentStatus === 'processing') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.processingContainer}>
            <div style={styles.spinner}></div>
            <h1 style={styles.title}>Processing Payment...</h1>
            <p style={styles.subtitle}>Please wait while we process your payment</p>
            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>
            <p style={styles.orderNumber}>Order Number: {orderNumber}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Success Header */}
        <div style={styles.successHeader}>
          <div style={styles.successIcon}>✓</div>
          <h1 style={styles.title}>Payment Successful!</h1>
          <p style={styles.subtitle}>Your order has been placed successfully</p>
        </div>

        {/* Order Details */}
        <div style={styles.orderDetails}>
          <h3 style={styles.sectionTitle}>Order Details</h3>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Order Number:</span>
            <span style={styles.detailValue}>{orderNumber}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Payment Method:</span>
            <span style={styles.detailValue}>Credit/Debit Card</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Total Amount:</span>
            <span style={styles.detailValue}>₹{grandTotal.toFixed(2)}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Estimated Delivery:</span>
            <span style={styles.detailValue}>3-5 business days</span>
          </div>
        </div>

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          
          {cartData.map((item, index) => (
            <div key={index} style={styles.summaryItem}>
              <div style={styles.itemInfo}>
                <span style={styles.itemName}>{item.desc}</span>
                <span style={styles.itemQuantity}>Qty: {item.quantity}</span>
              </div>
              <span style={styles.itemPrice}>₹{(parsePrice(item.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div style={styles.divider}></div>
          
          <div style={styles.summaryItem}>
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div style={styles.summaryItem}>
            <span>Shipping:</span>
            <span>₹{shipping.toFixed(2)}</span>
          </div>
          
          <div style={styles.summaryItem}>
            <span>Tax (18%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          
          <div style={styles.divider}></div>
          
          <div style={{...styles.summaryItem, ...styles.grandTotal}}>
            <span>Grand Total:</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div style={styles.nextSteps}>
          <h3 style={styles.sectionTitle}>What's Next?</h3>
          <div style={styles.stepItem}>
            <div style={styles.stepNumber}>1</div>
            <div style={styles.stepContent}>
              <h4 style={styles.stepTitle}>Order Confirmation</h4>
              <p style={styles.stepDescription}>You'll receive an email confirmation shortly</p>
            </div>
          </div>
          <div style={styles.stepItem}>
            <div style={styles.stepNumber}>2</div>
            <div style={styles.stepContent}>
              <h4 style={styles.stepTitle}>Processing</h4>
              <p style={styles.stepDescription}>We'll prepare your order for shipment</p>
            </div>
          </div>
          <div style={styles.stepItem}>
            <div style={styles.stepNumber}>3</div>
            <div style={styles.stepContent}>
              <h4 style={styles.stepTitle}>Delivery</h4>
              <p style={styles.stepDescription}>Your order will be delivered in 3-5 business days</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button style={styles.secondaryButton} onClick={handleViewOrder}>
            Track Order
          </button>
          <button style={styles.primaryButton} onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  card: {
    maxWidth: '700px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  processingContainer: {
    textAlign: 'center',
    padding: '40px 0',
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #2196F3',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 30px',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e2e8f0',
    borderRadius: '3px',
    margin: '20px 0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
    borderRadius: '3px',
    animation: 'progress 3s ease-in-out',
  },
  successHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#48bb78',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: 'bold',
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2d3748',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
    margin: '0 0 20px 0',
  },
  orderNumber: {
    fontSize: '14px',
    color: '#4a5568',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '20px',
  },
  orderDetails: {
    background: '#f7fafc',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0',
  },
  detailLabel: {
    fontSize: '15px',
    color: '#4a5568',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: '15px',
    color: '#2d3748',
    fontWeight: '600',
  },
  orderSummary: {
    background: '#f7fafc',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    color: '#4a5568',
    marginBottom: '12px',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  itemName: {
    fontWeight: '500',
    color: '#2d3748',
  },
  itemQuantity: {
    fontSize: '13px',
    color: '#718096',
  },
  itemPrice: {
    fontWeight: '600',
    color: '#2d3748',
  },
  divider: {
    height: '1px',
    background: '#e2e8f0',
    margin: '15px 0',
  },
  grandTotal: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#e53e3e',
    marginTop: '10px',
  },
  nextSteps: {
    marginBottom: '30px',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  stepNumber: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: '#2196F3',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    marginRight: '15px',
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 5px 0',
  },
  stepDescription: {
    fontSize: '14px',
    color: '#718096',
    margin: 0,
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
  },
  secondaryButton: {
    flex: 1,
    padding: '15px',
    border: '2px solid #2196F3',
    borderRadius: '10px',
    background: 'white',
    color: '#2196F3',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  primaryButton: {
    flex: 1,
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    background: '#2196F3',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
`;
document.head.appendChild(styleSheet);

export default CompletePayment;