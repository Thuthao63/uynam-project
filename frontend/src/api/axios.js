import axios from '../api/axios';

const instance = axios.create({
    // Phải có đầy đủ https:// và KHÔNG có dấu / ở cuối link
    baseURL: 'https://uynam-backend.onrender.com', 
});

// Quan trọng: giúp gửi được thông tin đăng nhập/cookie
instance.defaults.withCredentials = true;

export default instance;