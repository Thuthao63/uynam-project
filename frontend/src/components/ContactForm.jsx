import React, { useState } from 'react';
import axios from 'axios';
// 1. Import socket.io-client
import { io } from 'socket.io-client';

// Kết nối tới server (phải cùng port với Backend)
const socket = io('http://localhost:5000');

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    axios.post('http://localhost:5000/api/contacts', formData)
      .then(res => {
        setStatus('success');
        
        // 2. PHÁT TÍN HIỆU REAL-TIME ĐẾN ADMIN
        // Ngay khi lưu DB thành công, gửi tên khách qua socket
        socket.emit('client_new_contact', { 
          name: formData.name 
        });

        setFormData({ name: '', email: '', message: '' });
      })
      .catch(err => {
        console.error(err);
        setStatus('error');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 group">
      {/* Giữ nguyên phần UI cũ của Thảo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input 
          type="text" name="name" value={formData.name} onChange={handleChange}
          placeholder="Họ và tên của bạn" required
          className="bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2d86f4] transition-all"
        />
        <input 
          type="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="Email liên hệ" required
          className="bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2d86f4] transition-all"
        />
      </div>
      <textarea 
        name="message" rows="4" value={formData.message} onChange={handleChange}
        placeholder="Nội dung yêu cầu (ví dụ: tư vấn thiết kế nhà phố 100m2...)"
        className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2d86f4] transition-all"
      ></textarea>
      
      <div className="text-center">
        <button 
          type="submit" 
          disabled={status === 'sending'}
          className="bg-[#2d86f4] text-white px-16 py-4 rounded-sm font-black hover:bg-white hover:text-[#002366] transition-all uppercase text-xs tracking-[0.2em] shadow-2xl disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
        >
          {status === 'sending' ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Đang xử lý...
            </>
          ) : 'Gửi yêu cầu ngay'}
        </button>
      </div>

      {status === 'success' && (
        <div className="animate-bounce mt-4 text-green-400 text-xs font-bold uppercase tracking-widest text-center bg-green-400/10 py-3 rounded-lg border border-green-400/20">
          ✓ Gửi thành công! Chúng tôi sẽ gọi lại cho bạn.
        </div>
      )}
    </form>
  );
};

export default ContactForm;