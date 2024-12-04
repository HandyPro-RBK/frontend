// Paymentapi
import axios from 'axios';

const API_URL = "http://localhost:3001";

const paymentApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log request configuration
paymentApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Log response
paymentApi.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.data);
    return Promise.reject(error);
  }
);

const paymentService = {
  initiatePayment: async (bookingId) => {
    try {
      console.log('Starting payment initiation for booking:', bookingId);
      
      const response = await paymentApi.post(`/api/payments/initiate/${bookingId}`);
      console.log('Full response:', response);
      console.log('Response data:', response.data);

      if (!response.data) {
        throw new Error('Empty response from server');
      }

      return response.data;
    } catch (error) {
      console.error('Payment service error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }
};

export default paymentService;