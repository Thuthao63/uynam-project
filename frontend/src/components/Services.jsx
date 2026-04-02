import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  // Trạng thái để lưu dịch vụ đang được chọn để xem chi tiết
  const [selectedService, setSelectedService] = useState(null);

  const services = [
  {
    id: "01",
    title: "Thiết kế Kiến trúc",
    desc: "Sáng tạo không gian sống hiện đại, tối ưu công năng và thẩm mỹ theo cá tính chủ nhân.",
    detail: "Giải pháp thiết kế từ kiến trúc mặt tiền đến bố trí công năng. Chúng tôi tư vấn phong thủy và vật liệu mới nhất.",
    // Link ảnh kiến trúc ổn định
    image: "https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    features: ["Bản vẽ 3D ngoại thất", "Hồ sơ kỹ thuật thi công", "Xin phép xây dựng"]
  },
  {
    id: "02",
    title: "Thi công Trọn gói",
    desc: "Chìa khóa trao tay với quy trình kiểm soát chất lượng nghiêm ngặt từng công đoạn.",
    detail: "Uy Nam cam kết quản lý nhân công, vật tư minh bạch, thi công đúng tiến độ và không phát sinh chi phí.",
    // Link ảnh thi công xây dựng ổn định
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",  
    features: ["Quản lý dự án chuyên nghiệp", "Cam kết không phát sinh", "Bảo hành kết cấu 10 năm"]
  },
  {
    id: "03",
    title: "Thiết kế Nội thất",
    desc: "Kiến tạo không gian nội thất sang trọng, tinh tế với vật liệu cao cấp và hiện đại.",
    detail: "Tập trung vào trải nghiệm người dùng với vật liệu may đo cao cấp, tạo nên sự sang trọng cho gia đình bạn.",
    // Link ảnh nội thất ổn định
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    features: ["Phối cảnh 3D nội thất", "Sản xuất đồ gỗ may đo", "Thi công lắp đặt hoàn thiện"]
  }
];

  return (
    <section id="services-section" className="py-32 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Tiêu đề */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-[#2d86f4] text-xs font-bold tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#2d86f4]"></span>
              Dịch vụ cốt lõi
            </h2>
            <h3 className="text-4xl md:text-6xl font-black text-[#002366] leading-[1.1] tracking-tighter uppercase">
              Giải pháp xây dựng <br /> <span className="text-slate-300">Toàn diện</span>
            </h3>
          </div>
        </div>

        {/* Danh sách Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100">
          {services.map((s) => (
            <div 
              key={s.id} 
              onClick={() => setSelectedService(s)} // Nhấn để mở nội dung
              className="relative group bg-white p-12 overflow-hidden transition-all duration-500 hover:bg-[#002366] cursor-pointer"
            >
              <span className="absolute top-8 right-8 text-7xl font-black text-slate-50 group-hover:text-white/5 transition-colors duration-500">
                {s.id}
              </span>

              <div className="relative z-10">
                <h4 className="text-2xl font-black text-[#002366] mb-6 group-hover:text-white transition-colors tracking-tighter uppercase">
                  {s.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 group-hover:text-slate-300 transition-colors">
                  {s.desc}
                </p>

                <button className="flex items-center gap-4 text-[10px] font-black text-[#2d86f4] group-hover:text-white uppercase tracking-[0.2em] transition-all">
                  Xem chi tiết
                  <span className="w-8 h-[1px] bg-[#2d86f4] group-hover:bg-white group-hover:w-12 transition-all"></span>
                </button>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CHI TIẾT (Hiển thị khi nhấn vào card) */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#002366]/90 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()} // Ngăn việc đóng modal khi nhấn bên trong
            >
              {/* Ảnh bên trái */}
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={selectedService.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Nội dung bên phải */}
              <div className="w-full md:w-1/2 p-10 md:p-14 relative flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-[#002366] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <span className="text-[#2d86f4] text-[10px] font-black tracking-widest uppercase mb-4 block">Dịch vụ {selectedService.id}</span>
                <h4 className="text-3xl font-black text-[#002366] mb-6 uppercase tracking-tighter">{selectedService.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">{selectedService.detail}</p>
                
                <div className="space-y-3">
                    {selectedService.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase">
                            <span className="w-1.5 h-1.5 bg-[#2d86f4] rotate-45"></span>
                            {f}
                        </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;