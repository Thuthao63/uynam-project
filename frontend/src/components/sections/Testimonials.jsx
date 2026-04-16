import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn Hùng",
    role: "Chủ biệt thự tại Hòa Xuân",
    content: "Tôi rất hài lòng với quy trình làm việc chuyên nghiệp của Uy Nam. Từ khâu thiết kế đến thi công trọn gói đều đúng tiến độ và cam kết vật liệu.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Trần Thị Thu Thảo",
    role: "Kinh doanh tự do",
    content: "Đội ngũ kiến trúc sư tại Uy Nam rất lắng nghe khách hàng. Căn nhà phố của tôi được tối ưu ánh sáng tự nhiên tuyệt vời.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Lê Minh Tuấn",
    role: "Quản lý dự án",
    content: "Sự minh bạch trong báo giá và chất lượng thực tế sau khi bàn giao là điều khiến tôi ấn tượng nhất ở Uy Nam Construction.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[#2d86f4] text-xs font-bold tracking-[0.5em] uppercase mb-4">Social Proof</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#002366] tracking-tighter uppercase">Khách hàng nói gì về chúng tôi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-100" />
                <div>
                  <h4 className="font-black text-[#002366] uppercase text-sm">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <div className="relative">
                <span className="text-6xl text-blue-100 absolute -top-4 -left-4 font-serif">“</span>
                <p className="text-slate-600 leading-relaxed italic relative z-10">
                  {t.content}
                </p>
                <div className="flex mt-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
