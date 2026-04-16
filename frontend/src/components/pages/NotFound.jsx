import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black text-slate-50 select-none z-0 tracking-tighter">
        404
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 space-y-6"
      >
        <div className="w-16 h-1 bg-[#002366] mx-auto mb-8"></div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter uppercase">Oops!</h1>
        <p className="text-xl text-slate-500 max-w-lg mx-auto font-light">
          Trang bạn tìm kiếm không tồn tại hoặc đã bị gỡ bỏ trong quá trình thi công xây dựng. 🏗️
        </p>
        
        <div className="pt-8 w-full flex justify-center">
          <Link 
            to="/" 
            className="inline-block bg-[#002366] text-white px-10 py-5 rounded-sm font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-2xl"
          >
            Quay về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
