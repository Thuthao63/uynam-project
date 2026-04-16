import React, { useState } from 'react';
import axios from '../../api/axios';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const socket = io("https://uynam-backend.onrender.com");

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: 'Nhà phố', message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    axios.post('/api/contacts', formData)
      .then(() => {
        setStatus('success');
        socket.emit('client_new_contact', { name: formData.name });
        setFormData({ name: '', phone: '', email: '', service: 'Nhà phố', message: '' });
        setTimeout(() => setStatus(''), 5000);
      })
      .catch(() => setStatus('error'));
  };

  // Helper cho style input để code gọn hơn
  const inputStyle = "w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder:text-slate-400";

  return (
    <div className="relative w-full py-24 px-6 bg-[#0a0f1e] overflow-hidden">
      
      {/* Background Decor cực nhẹ */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* TRÁI: CONTENT */}
        <div className="w-full lg:w-1/2 text-left space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Liên hệ trực tiếp</span>
            <h3 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
              Cùng xây <br /> 
              <span className="text-blue-400 italic">giấc mơ lớn</span>
            </h3>
            <p className="text-slate-400 text-lg font-light leading-relaxed mt-6 max-w-md">
              Để lại thông tin, kiến trúc sư của <span className="text-white font-bold">Uy Nam</span> sẽ liên hệ tư vấn giải pháp tối ưu nhất cho bạn.
            </p>
          </motion.div>

          <div className="flex gap-12 pt-8 border-t border-white/5">
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Hotline</p>
              <p className="text-white text-xl font-black">0903 131 893</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Văn phòng</p>
              <p className="text-white text-xl font-black">TP. Đà Nẵng</p>
            </div>
          </div>
        </div>

        {/* PHẢI: FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full lg:w-[480px] bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/20"
        >
          <div className="text-center mb-10">
            <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Đăng ký tư vấn</h4>
            <p className="text-slate-400 text-xs mt-2">Hoàn toàn miễn phí & phản hồi trong 24h</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" name="name" placeholder="Họ và tên của bạn" 
              value={formData.name} onChange={handleChange} required className={inputStyle} 
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="tel" name="phone" placeholder="Số điện thoại" 
                value={formData.phone} onChange={handleChange} required className={inputStyle} 
              />
              <input 
                type="email" name="email" placeholder="Địa chỉ Email" 
                value={formData.email} onChange={handleChange} required className={inputStyle} 
              />
            </div>

            <select 
              name="service" value={formData.service} onChange={handleChange} 
              className={`${inputStyle} appearance-none cursor-pointer bg-slate-50`}
            >
              <option>Nhà phố</option>
              <option>Biệt thự</option>
              <option>Nội thất</option>
            </select>

            <textarea 
              name="message" rows="3" placeholder="Dự định của bạn (diện tích, phong cách...)" 
              value={formData.message} onChange={handleChange} className={`${inputStyle} resize-none`} 
            />

            <button 
              type="submit" disabled={status === 'sending'}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all duration-300 shadow-xl shadow-blue-500/10 mt-4 flex items-center justify-center gap-2"
            >
              {status === 'sending' ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-[10px] font-bold text-center uppercase tracking-widest mt-4">
                  ✓ Gửi thành công! Chúng tôi sẽ liên hệ sớm.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;