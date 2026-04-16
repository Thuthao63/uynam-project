import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from '../../api/axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('/auth/login', {
        username,
        password
      });

      if (res.data.success) {
        onLogin(true);
        navigate('/admin');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Lỗi kết nối đến đường truyền máy chủ, vui lòng thử lại.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')"}}>
      <div className="absolute inset-0 bg-[#002366]/80 backdrop-blur-sm"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10 bg-white p-10 rounded-2xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#002366] tracking-tighter uppercase">Quản Trị Viên</h2>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Uy Nam Construction</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#002366] text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
          >
            Đăng nhập hệ thống
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-slate-400 text-xs font-bold hover:text-[#002366] uppercase tracking-widest transition-colors"
          >
            ← Về trang chủ
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
