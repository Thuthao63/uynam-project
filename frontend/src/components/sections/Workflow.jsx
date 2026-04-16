import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const steps = [
  { 
    id: '01', 
    title: 'Khảo sát & Định hướng', 
    desc: 'Kiến trúc sư Uy Nam trực tiếp khảo sát địa hình, phân tích hướng nắng, gió và tư vấn phong thủy ngay tại khu đất của bạn.',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800',
    icon: '📍' 
  },
  { 
    id: '02', 
    title: 'Thiết kế Phối cảnh 3D', 
    desc: 'Chạm tay vào không gian sống mơ ước thông qua bản vẽ VR/3D sống động, giúp bạn điều chỉnh từng góc nhỏ trước khi đặt gạch.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    icon: '📐' 
  },
  { 
    id: '03', 
    title: 'Bóc tách & Ký kết', 
    desc: 'Hệ thống báo giá tự động minh bạch từng con ốc, thanh thép. Cam kết "Không phát sinh" bằng hợp đồng pháp lý rõ ràng.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=800',
    icon: '🤝' 
  },
  { 
    id: '04', 
    title: 'Thi công & Giám sát Cam', 
    desc: 'Theo dõi tiến độ qua hệ thống camera 24/7. Đội ngũ kỹ sư cơ hữu giám sát từng mẻ bê tông, đường điện theo tiêu chuẩn Nhật Bản.',
    image: 'https://images.unsplash.com/photo-1504307651254-35682f94a1d8?auto=format&fit=crop&q=80&w=800',
    icon: '👷' 
  },
  { 
    id: '05', 
    title: 'Bàn giao & Bảo trì', 
    desc: 'Nghiệm thu toàn diện bằng thiết bị chuyên dụng. Kích hoạt gói bảo trì định kỳ 6 tháng/lần trọn đời tổ ấm.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    icon: '🏠' 
  }
];

const Workflow = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* 1. HERO SECTION - Đẳng cấp hơn với Parallax nhẹ */}
      <section className="relative h-[70vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-blue-400/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 backdrop-blur-md">
              Work Process
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
              QUY TRÌNH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100 italic">TẠO TÁC</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. TIMELINE SECTION - Design lại hoàn toàn */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto">
        
        {/* Progress Line mượt mà */}
        <motion.div 
          style={{ scaleY }}
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 to-transparent origin-top hidden md:block"
        />

        <div className="space-y-32 md:space-y-48">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col md:flex-row items-center gap-12">
              
              {/* PHẦN ẢNH (Bên trái hoặc phải) */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
                >
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                  {/* Số Index mờ */}
                  <span className="absolute -bottom-10 -right-5 text-[15rem] font-black text-white/10 select-none">
                    {step.id}
                  </span>
                </motion.div>
              </div>

              {/* PHẦN CHỮ (Đối xứng ảnh) */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} md:px-12`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}
                >
                  <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                    <span className="text-4xl bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner italic font-black text-blue-600">
                      {step.id}
                    </span>
                    <div className="h-[2px] w-12 bg-blue-500/30"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter mb-6">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-lg font-light leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>

              {/* Điểm nhấn Timeline chính giữa */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA TRƯỜNG PHÁI TỐI GIẢN (MINIMALISM) */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase leading-none">
            Mọi tổ ấm lớn <br /> đều bắt đầu từ một <span className="text-blue-500 italic">cuộc trò chuyện.</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate('/'); // Quay về trang chủ
              setTimeout(() => {
                // Đợi trang chủ load xong thì cuộn xuống mục liên hệ
                const contactSection = document.getElementById('contact-section');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            className="bg-slate-900 text-white px-16 py-6 rounded-full font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-colors"
          >
            Bắt đầu dự án ngay
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Workflow;