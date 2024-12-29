import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const session_id = searchParams.get('session_id');

    if (session_id) {
      fetch('https://cse471-project-backend.onrender.com/payment-success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
           
            console.log('Payment successful');
          } else {
            console.error('Payment processing failed');
          }
        })
        .catch((error) => {
          console.error('Error processing payment:', error);
        });
    }
  }, [location.search]);

  return (
    <div className="pt-28 px-4 lg:px-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase. Your order has been processed successfully.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;