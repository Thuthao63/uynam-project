import React from 'react';

const Services = () => {
  const services = [
    {
      id: "01",
      title: "Thiết kế Kiến trúc",
      desc: "Sáng tạo không gian sống hiện đại, tối ưu công năng và thẩm mỹ theo cá tính chủ nhân.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
      features: ["Bản vẽ 3D ngoại thất", "Hồ sơ kỹ thuật thi công", "Xin phép xây dựng"]
    },
    {
      id: "02",
      title: "Thi công Trọn gói",
      desc: "Chìa khóa trao tay với quy trình kiểm soát chất lượng nghiêm ngặt từng công đoạn.",
      image: "https://images.unsplash.com/photo-1503387762-592dea58292b?q=80&w=2070",
      features: ["Quản lý dự án chuyên nghiệp", "Cam kết không phát sinh", "Bảo hành kết cấu 10 năm"]
    },
    {
      id: "03",
      title: "Thiết kế Nội thất",
      desc: "Kiến tạo không gian nội thất sang trọng, tinh tế với vật liệu cao cấp và hiện đại.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2070",
      features: ["Phối cảnh 3D nội thất", "Sản xuất đồ gỗ may đo", "Thi công lắp đặt hoàn thiện"]
    }
  ];

  return (
    <section id="services-section" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Tiêu đề tinh tế hơn */}
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
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed italic">
            "Chúng tôi đồng hành cùng chủ đầu tư từ những nét vẽ đầu tiên đến khi bàn giao chìa khóa."
          </p>
        </div>

        {/* Card Dịch vụ kiểu hiện đại */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-slate-100 border border-slate-100">
          {services.map((s, idx) => (
            <div key={idx} className="relative group bg-white p-12 overflow-hidden transition-all duration-500 hover:bg-[#002366]">
              
              {/* Số thứ tự ẩn sau nền */}
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

                {/* Danh sách đặc điểm mảnh & tinh tế */}
                <ul className="space-y-4 mb-10">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-center text-[11px] font-bold text-slate-400 group-hover:text-white/70 tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 border border-[#2d86f4] mr-4 rotate-45 group-hover:bg-[#2d86f4]"></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-4 text-[10px] font-black text-[#2d86f4] group-hover:text-white uppercase tracking-[0.2em] transition-all">
                  Chi tiết dịch vụ
                  <span className="w-8 h-[1px] bg-[#2d86f4] group-hover:bg-white group-hover:w-12 transition-all"></span>
                </button>
              </div>

              {/* Hình ảnh ẩn hiện khi hover - Đây là điểm tạo độ "thật" */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;