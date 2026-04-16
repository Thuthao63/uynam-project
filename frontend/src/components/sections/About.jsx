import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const team = [
    { name: "KTS. Lê Uy Nam", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" },
    { name: "KS. Nguyễn Thế Vinh", role: "Giám đốc Kỹ thuật", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
    { name: "KTS. Phan Hải Đăng", role: "Trưởng phòng Thiết kế", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80" },
    { name: "KTS. Hoàng Thu Hà", role: "Chuyên gia Nội thất", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" },
  ];

  return (
    <div className="bg-white">
      {/* 1. Brand Story */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/2">
            <h2 className="text-[#2d86f4] text-xs font-bold tracking-[0.5em] uppercase mb-6">Our Story</h2>
            <h3 className="text-5xl md:text-7xl font-black text-[#002366] tracking-tighter uppercase leading-[0.9] mb-10">
              Kiến tạo <br /> <span className="text-slate-200">Bản sắc</span> <br /> Kiến trúc
            </h3>
            <div className="space-y-6 text-slate-500 text-lg leading-relaxed font-light">
              <p>
                Được thành lập từ niềm đam mê với những hình khối và không gian, **Uy Nam Construction** đã trải qua hơn 10 năm hình thành và phát triển, khẳng định vị thế là đơn vị thiết kế & thi công uy tín hàng đầu tại miền Trung.
              </p>
              <p>
                Chúng tôi không chỉ xây nhà, chúng tôi xây dựng tổ ấm. Mỗi công trình là một tác phẩm nghệ thuật riêng biệt, phản ánh phong cách sống và cá tính của từng chủ nhân.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Office" className="w-full h-[600px] object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-100 rounded-2xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="bg-slate-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 block">01. Tầm nhìn</span>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-6">Dẫn đầu giải pháp xây dựng bền vững</h4>
            <p className="text-slate-400 leading-relaxed text-sm">Trở thành biểu tượng niềm tin hàng đầu Việt Nam về kiến trúc sáng tạo và chất lượng thi công đột phá.</p>
          </div>
          <div>
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 block">02. Sứ mệnh</span>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-6">Nâng tầm không gian sống Việt</h4>
            <p className="text-slate-400 leading-relaxed text-sm">Mang đến những giải pháp thiết kế thông minh, tối ưu hóa công năng và thẩm mỹ với chi phí hợp lý nhất.</p>
          </div>
          <div>
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 block">03. Giá trị cốt lõi</span>
            <h4 className="text-2xl font-black uppercase tracking-tight mb-6">Tâm - Tín - Mỹ - Nhân</h4>
            <p className="text-slate-400 leading-relaxed text-sm">Làm việc bằng cái Tâm, giữ trọn chữ Tín, hướng tới cái Mỹ và coi trọng yếu tố Con Người.</p>
          </div>
        </div>
      </section>

      {/* 3. Team Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-[#2d86f4] text-xs font-bold tracking-[0.5em] uppercase mb-4">The Experts</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#002366] tracking-tighter uppercase">Đội ngũ nòng cốt</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 shadow-lg">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h4 className="text-lg font-black text-[#002366] uppercase tracking-tighter">{member.name}</h4>
              <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;