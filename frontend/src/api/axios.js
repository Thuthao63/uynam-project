import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.MODE === 'production' 
        ? 'https://uynam-backend.onrender.com' 
        : 'http://localhost:5000',
});

// Thêm cái này để nếu Backend có dùng Cookie/Session thì nó sẽ hoạt động
instance.defaults.withCredentials = true;

export default instance;