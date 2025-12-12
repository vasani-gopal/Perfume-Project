import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from './MYPROJECT/Action';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (wishlist.length === 0)
    return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Your Wishlist is empty 😢</h2>;

  return (
    <div style={{
      padding: '50px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      justifyContent: 'center',
      background: '#f0f2f5',
      minHeight: '100vh'
    }}>
      {wishlist.map((item) => (
        <div key={item.id} style={{
          width: '260px',
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
          textAlign: 'center',
          background: '#fff',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
          }}
        >
          <img src={item.img} alt={item.desc} style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '12px' }} />
          <h3 style={{ margin: '15px 0 10px', color: '#222', fontWeight: '600' }}>{item.desc}</h3>
          <p style={{ color: '#e63946', fontWeight: 'bold', fontSize: '18px' }}>{item.price}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
            <button
              style={{
                flex: 1,
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#1d3557',
                color: '#fff',
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onClick={() => navigate(`/category/${item.category}/${item.id}`)}
              onMouseEnter={(e) => e.currentTarget.style.background = '#457b9d'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1d3557'}
            >
              View
            </button>
            <button
              style={{
                flex: 1,
                padding: '10px 16px',
                border: 'none',
                borderRadius: '8px',
                background: '#e63946',
                color: '#fff',
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onClick={() => dispatch(removeFromWishlist(item.id))}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ff5f5f'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#e63946'}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
