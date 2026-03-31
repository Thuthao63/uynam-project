import React from 'react';
import { motion } from 'framer-motion';

const ContactSocial = () => {
  // THÔNG TIN CHÍNH XÁC CỦA THẢO
  const phoneNumber = "0903131893"; 
  const messengerId = "100091859523667"; 

  return (
    /* QUAN TRỌNG: 
       - z-[9999] để nổi lên trên cùng.
       - pointer-events-none ở div cha nhưng pointer-events-auto ở thẻ a 
       để không chặn các click khác trên màn hình.
    */
    <div className="fixed bottom-8 right-6 z-[9999] flex flex-col gap-4 pointer-events-none">
      
      {/* Nút Zalo */}
      <a
        href={`https://zalo.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto" // Cho phép bấm
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#0068ff] rounded-full flex items-center justify-center shadow-lg relative group cursor-pointer"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
            alt="Zalo" 
            className="w-8 h-8 invert" 
          />
          <span className="absolute right-16 bg-white text-[#0068ff] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
            Chat Zalo
          </span>
          <span className="absolute inset-0 rounded-full bg-[#0068ff] animate-ping opacity-20"></span>
        </motion.div>
      </a>

      {/* Nút Messenger */}
      <a
        href={`https://m.me/${messengerId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto" // Cho phép bấm
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-br from-[#0084ff] to-[#00c6ff] rounded-full flex items-center justify-center shadow-lg group cursor-pointer"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.487 3.712 7.153.194.143.32.364.32.603 0 .235-.043.684-.258 1.474-.083.305.234.58.508.435 2.167-1.153 3.024-1.614 3.424-1.745.378-.124.773-.19 1.171-.19a10.02 10.02 0 003.123.5c5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2z"/>
          </svg>
          <span className="absolute right-16 bg-white text-[#0084ff] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">
            Messenger
          </span>
        </motion.div>
      </a>

    </div>
  );
};

export default ContactSocial;