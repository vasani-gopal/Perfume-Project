import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const cartData = useSelector((store) => store.cart || []);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

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

  const handleCompletePayment = () => {
    navigate('/complete-payment');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  // If cart is empty, redirect to cart page
  if (cartData.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Your cart is empty</h1>
          <p style={styles.subtitle}>Please add some items to your cart before proceeding to checkout.</p>
          <button style={styles.completeButton} onClick={handleBackToCart}>
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <h1 style={styles.title}>Payment Options</h1>
        <p style={styles.subtitle}>Choose your preferred payment method</p>

        {/* Progress Steps */}
        <div style={styles.progressContainer}>
          <div style={styles.stepWrapper}>
            <div style={{...styles.step, ...styles.stepCompleted}}>✓</div>
            <span style={styles.stepLabel}>Cart</span>
          </div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepWrapper}>
            <div style={{...styles.step, ...styles.stepActive}}>2</div>
            <span style={{...styles.stepLabel, color: '#2196F3'}}>Payment</span>
          </div>
          <div style={styles.progressLine}></div>
          <div style={styles.stepWrapper}>
            <div style={styles.step}>3</div>
            <span style={styles.stepLabel}>Confirmation</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <h3 style={styles.sectionTitle}>Select Payment Method</h3>
        <div style={styles.paymentMethods}>
          <button
            style={{
              ...styles.paymentButton,
              ...(selectedPayment === 'card' ? styles.paymentButtonActive : {})
            }}
            onClick={() => setSelectedPayment('card')}
          >
            <div style={styles.cardIcon}>💳</div>
            <div style={styles.paymentText}>Credit/Debit Card</div>
          </button>
          <button
            style={{
              ...styles.paymentButton,
              ...(selectedPayment === 'upi' ? styles.paymentButtonActive : {})
            }}
            onClick={() => setSelectedPayment('upi')}
          >
            <div style={styles.upiIcon}>📱</div>
            <div style={styles.paymentText}>UPI</div>
          </button>
          <button
            style={{
              ...styles.paymentButton,
              ...(selectedPayment === 'netbanking' ? styles.paymentButtonActive : {})
            }}
            onClick={() => setSelectedPayment('netbanking')}
          >
            <div style={styles.bankIcon}>🏦</div>
            <div style={styles.paymentText}>Net Banking</div>
          </button>
          <button
            style={{
              ...styles.paymentButton,
              ...(selectedPayment === 'cod' ? styles.paymentButtonActive : {})
            }}
            onClick={() => setSelectedPayment('cod')}
          >
            <div style={styles.codIcon}>💰</div>
            <div style={styles.paymentText}>Cash on Delivery</div>
          </button>
        </div>

        {/* Card Details Form */}
        {selectedPayment === 'card' && (
          <div style={styles.cardDetails}>
            <h3 style={styles.sectionTitle}>Card Details</h3>
            
            <div style={styles.cardLogos}>
              <span style={{...styles.cardLogo, background: '#1A1F71'}}>VISA</span>
              <span style={{...styles.cardLogo, background: '#EB001B'}}>MC</span>
              <span style={{...styles.cardLogo, background: '#00A64F'}}>RuPay</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={styles.input}
                maxLength="19"
              />
            </div>

            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  style={styles.input}
                  maxLength="5"
                />
              </div>
              <div style={{...styles.formGroup, flex: 1, marginLeft: '15px'}}>
                <label style={styles.label}>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={styles.input}
                  maxLength="3"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Name on Card</label>
              <input
                type="text"
                placeholder="John Doe"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          
          {cartData.map((item, index) => (
            <div key={index} style={styles.summaryItem}>
              <span>{item.desc} × {item.quantity}</span>
              <span>₹{(parsePrice(item.price) * item.quantity).toFixed(2)}</span>
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

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button style={styles.backButton} onClick={handleBackToCart}>
            Back to Cart
          </button>
          <button style={styles.completeButton} onClick={handleCompletePayment}>
            Complete Payment
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
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#2d3748',
    textAlign: 'center',
    margin: '0 0 10px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
    textAlign: 'center',
    margin: '0 0 40px 0',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  stepWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  step: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '18px',
    color: '#718096',
  },
  stepCompleted: {
    background: '#48bb78',
    color: 'white',
  },
  stepActive: {
    background: '#2196F3',
    color: 'white',
  },
  stepLabel: {
    fontSize: '13px',
    marginTop: '8px',
    color: '#718096',
    fontWeight: '500',
  },
  progressLine: {
    width: '100px',
    height: '3px',
    background: '#e2e8f0',
    margin: '0 15px',
    marginBottom: '25px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '20px',
  },
  paymentMethods: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '30px',
  },
  paymentButton: {
    padding: '20px 10px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
  },
  paymentButtonActive: {
    borderColor: '#2196F3',
    background: '#EBF5FF',
  },
  cardIcon: {
    fontSize: '32px',
  },
  upiIcon: {
    fontSize: '32px',
  },
  bankIcon: {
    fontSize: '32px',
  },
  codIcon: {
    fontSize: '32px',
  },
  paymentText: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#2d3748',
    textAlign: 'center',
  },
  cardDetails: {
    background: '#f7fafc',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  cardLogos: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  cardLogo: {
    padding: '5px 15px',
    borderRadius: '5px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formRow: {
    display: 'flex',
    gap: '15px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box',
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
    fontSize: '15px',
    color: '#4a5568',
    marginBottom: '12px',
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
  actionButtons: {
    display: 'flex',
    gap: '15px',
  },
  backButton: {
    flex: 1,
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    background: '#e2e8f0',
    color: '#2d3748',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  completeButton: {
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

export default PaymentPage;