import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';

const socket = io('http://localhost:5000');

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '', // Đã bổ sung
    service: 'Nhà phố',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    axios.post('http://localhost:5000/api/contacts', formData)
      .then(() => {
        setStatus('success');
        socket.emit('client_new_contact', { name: formData.name });
        setFormData({
          name: '',
          phone: '',
          email: '', // Reset email
          service: 'Nhà phố',
          message: ''
        });
        // Tự động ẩn thông báo thành công sau 5 giây
        setTimeout(() => setStatus(''), 5000);
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="relative w-full py-24 px-6 font-sans overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute inset-0 bg-[#0f172a]"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
              Khởi đầu <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                tổ ấm mới
              </span>
            </h3>

            <p className="mt-8 text-slate-400 text-lg leading-relaxed max-w-md border-l-2 border-blue-500 pl-6 italic font-light">
              "Chúng tôi không chỉ xây nhà, mà cùng bạn tạo nên hành trình hạnh phúc."
            </p>
          </motion.div>

          <div className="flex justify-center lg:justify-start gap-12 pt-8 border-t border-white/5">
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">Hotline</p>
              <p className="text-white text-xl font-bold italic">0903 131 893</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2">Văn phòng</p>
              <p className="text-white text-xl font-bold italic">TP. Đà Nẵng</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
        >
          <div className="mb-10">
            <h4 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Liên hệ tư vấn</h4>
            <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div className="relative group">
              <input
                type="text" name="name" value={formData.name} onChange={handleChange} required placeholder=" "
                className="peer w-full border-b-2 border-slate-100 bg-transparent py-3 text-slate-800 outline-none focus:border-blue-500 transition-all font-medium"
              />
              <label className="absolute left-0 top-3 text-slate-400 text-sm transition-all pointer-events-none
                peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500
                peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                Họ và tên của bạn
              </label>
            </div>

            {/* PHONE & EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder=" "
                  className="peer w-full border-b-2 border-slate-100 bg-transparent py-3 text-slate-800 outline-none focus:border-blue-500 transition-all font-medium"
                />
                <label className="absolute left-0 top-3 text-slate-400 text-sm transition-all pointer-events-none
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                  peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500
                  peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                  Số điện thoại
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" "
                  className="peer w-full border-b-2 border-slate-100 bg-transparent py-3 text-slate-800 outline-none focus:border-blue-500 transition-all font-medium"
                />
                <label className="absolute left-0 top-3 text-slate-400 text-sm transition-all pointer-events-none
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                  peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500
                  peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                  Địa chỉ Email
                </label>
              </div>
            </div>

            {/* SERVICE SELECT */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dịch vụ quan tâm</label>
              <select
                name="service" value={formData.service} onChange={handleChange}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none"
              >
                <option>Nhà phố</option>
                <option>Biệt thự</option>
                <option>Nội thất</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="relative group">
              <textarea
                name="message" rows="2" value={formData.message} onChange={handleChange} placeholder=" "
                className="peer w-full border-b-2 border-slate-100 bg-transparent py-3 text-slate-800 outline-none focus:border-blue-500 transition-all resize-none font-medium"
              />
              <label className="absolute left-0 top-3 text-slate-400 text-sm transition-all pointer-events-none
                peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-500
                peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs">
                Bạn đang nghĩ gì? (Diện tích, phong cách...)
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-4 rounded-2xl text-sm font-bold text-white uppercase tracking-widest transition-all
                ${status === 'sending' ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {status === 'sending' ? 'Đang gửi thông tin...' : 'Gửi yêu cầu tư vấn'}
            </motion.button>

            {/* STATUS NOTIFICATION */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 text-green-700 p-4 rounded-xl text-xs font-bold text-center border border-green-100"
              >
                ✓ Cảm ơn bạn! Uy Nam sẽ liên hệ tư vấn ngay.
              </motion.div>
            )}

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;