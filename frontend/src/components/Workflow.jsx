import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'Tư vấn & Khảo sát', desc: 'Uy Nam tiếp nhận yêu cầu, kiến trúc sư trực tiếp đến đo đạc hiện trạng và tư vấn giải pháp tối ưu về công năng lẫn phong thủy.', icon: '📏' },
  { id: '02', title: 'Thiết kế sơ bộ (3D)', desc: 'Lên ý tưởng mặt bằng 2D và phối cảnh 3D giúp khách hàng hình dung rõ nét về tổ ấm tương lai trước khi thi công.', icon: '✍️' },
  { id: '03', title: 'Báo giá & Ký hợp đồng', desc: 'Bóc tách khối lượng vật tư chi tiết, minh bạch. Cam kết không phát sinh chi phí trong suốt quá trình xây dựng.', icon: '📄' },
  { id: '04', title: 'Thi công & Giám sát', desc: 'Triển khai xây dựng phần thô và hoàn thiện. Đội ngũ kỹ sư giám sát chặt chẽ 24/7 đảm bảo đúng kỹ thuật.', icon: '🏗️' },
  { id: '05', title: 'Bàn giao & Bảo hành', desc: 'Vệ sinh công nghiệp, nghiệm thu tổng thể và bàn giao chìa khóa. Kích hoạt chính sách bảo trì trọn đời.', icon: '🔑' }
];

const Workflow = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      
      {/* 1. HERO SECTION - Cố định độ cao và khoảng cách */}
      <section className="bg-[#0f172a] pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Blur effect trang trí */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Uy Nam Construction</p>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] uppercase tracking-tighter">
              Quy trình xây dựng <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 italic">chuyên nghiệp</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. TIMELINE SECTION - Xử lý Grid để không bị lệch */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Đường line trung tâm (Chỉ hiện trên desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col md:flex-row items-center">
                
                {/* Nội dung trái/phải */}
                <div className={`flex w-full md:w-1/2 ${index % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:order-last md:pl-16'}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 w-full hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">{step.icon}</div>
                    <p className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-1">Bước {step.id}</p>
                    <h4 className="text-xl font-bold text-slate-800 mb-3 uppercase">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">{step.desc}</p>
                  </motion.div>
                </div>

                {/* Nút chấm Timeline giữa */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 -translate-x-1/2 bg-[#f8fafc] flex items-center justify-center z-20 hidden md:flex">
                    <div className="w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-100 animate-pulse"></div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION - Gọn gàng */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-[#1e293b] p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h4 className="text-white text-2xl md:text-4xl font-black uppercase mb-4 tracking-tighter">Bạn cần tư vấn chi tiết?</h4>
            <p className="text-slate-400 text-sm mb-10 max-w-md mx-auto">Đội ngũ kiến trúc sư của Uy Nam luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.</p>
            <button className="bg-blue-500 text-white px-12 py-4 rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white hover:text-blue-600 transition-all shadow-xl">
              Gửi yêu cầu báo giá
            </button>
          </div>
          {/* Decor background */}
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-[0.03] pointer-events-none"></div>
        </motion.div>
      </section>

    </div>
  );
};

export default Workflow;