import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Thiết kế Kiến trúc',
    desc: 'Hiện thực hóa ý tưởng qua những bản vẽ chuẩn xác, cân bằng công năng và nghệ thuật.',
    image: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80',
    features: ['Khảo sát phong thuỷ', 'Bản vẽ 2D/3D chi tiết', 'Dự toán chính xác']
  },
  {
    id: 2,
    title: 'Thi công Trọn gói',
    desc: 'Cam kết chất lượng vật tư, tiến độ xây dựng và không phát sinh chi phí.',
    image: 'https://images.unsplash.com/photo-1541888086925-ebbc31bcbdce?auto=format&fit=crop&q=80',
    features: ['Vật tư cao cấp', 'Giám sát kỹ sư cơ hữu', 'Bảo hành 2 năm']
  },
  {
    id: 3,
    title: 'Thiết kế Nội thất',
    desc: 'Thổi hồn vào không gian bằng chất liệu tinh tế và ánh sáng hoàn hảo.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    features: ['Xưởng sản xuất riêng', 'Gỗ công nghiệp & Gỗ tự nhiên', 'Lắp đặt bàn giao 100%']
  }
];

const ServicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen w-full">
      
      <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-6">
          Dịch vụ Uy Nam
        </h2>
        <p className="text-slate-500 max-w-3xl mx-auto text-lg">
          Cung cấp giải pháp tổng thể cho mọi tổ ấm, từ những giai đoạn sơ khai phác thảo đến lúc hoàn thiện, bàn giao chìa khóa trao tay.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-24">
        {services.map((svc, idx) => (
          <div key={svc.id} className={`flex flex-col gap-12 items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-1/2">
               <motion.div 
                 initial={{opacity: 0, scale: 0.9}} 
                 whileInView={{opacity: 1, scale: 1}} 
                 viewport={{once:true}}
                 className="overflow-hidden rounded-3xl aspect-square shadow-2xl"
               >
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
               </motion.div>
            </div>
            
            <div className="w-full md:w-1/2 md:p-12">
               <div className="text-5xl font-black text-blue-100 mb-6 italic">{`0${svc.id}.`}</div>
               <h3 className="text-4xl font-black text-slate-800 uppercase tracking-tighter mb-6">{svc.title}</h3>
               <p className="text-slate-600 text-lg leading-relaxed mb-8">{svc.desc}</p>
               
               <ul className="space-y-4 mb-10">
                 {svc.features.map((f, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                     <span className="w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xs">✓</span>
                     {f}
                   </li>
                 ))}
               </ul>

               <button onClick={()=> navigate('/#contact-section')} className="border border-slate-300 text-slate-800 px-8 py-3 rounded-full uppercase text-xs tracking-widest font-bold hover:bg-[#002366] hover:text-white transition-colors">
                 Nhận báo giá
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
