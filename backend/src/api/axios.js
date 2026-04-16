// frontend/src/api/axios.js
import axios from './api/axios';

const instance = axios.create({
    // Khi chạy dưới máy local thì dùng localhost, khi lên Render thì dùng link Render
    baseURL: 'https://uynam-backend.onrender.com', 
});

export default instance;