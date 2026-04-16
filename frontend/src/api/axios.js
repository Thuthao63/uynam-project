import axios from 'axios';

const instance = axios.create({
    // Đảm bảo baseURL KHÔNG có dấu / ở cuối
    baseURL: 'https://uynam-backend.onrender.com', 
    withCredentials: true // <--- DÒNG NÀY CỰC KỲ QUAN TRỌNG ĐỂ LOGIN
});

export default instance;