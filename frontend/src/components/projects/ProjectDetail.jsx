import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectDetail = ({ projects, loading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Nếu chưa load xong projects thì chờ, load xong rồi mới tìm.
    if (!loading) {
      // Ép kiểu id từ string sang số nếu cần (tuỳ vào database)
      const found = projects.find(p => p.id.toString() === id);
      setProject(found);
    }
  }, [id, projects, loading]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 px-6 text-center space-y-6 flex flex-col items-center">
        <h2 className="text-2xl font-black uppercase text-slate-800">Không tìm thấy dự án!</h2>
        <p className="text-slate-500">Dự án này có thể đã bị xóa hoặc đường dẫn không đúng.</p>
        <button onClick={() => navigate('/projects')} className="bg-[#002366] text-white px-8 py-3 rounded uppercase text-xs font-bold">
          Xem dự án khác
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* 1. HERO IMAGE */}
      <section className="relative h-[60vh] md:h-[80vh] w-full mt-20 md:mt-0">
        <img 
          src={project.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto">
           <motion.div initial={{y: 30, opacity: 0}} animate={{y:0, opacity: 1}} transition={{delay:0.2}}>
             <span className="bg-blue-600 text-white text-[10px] uppercase tracking-[0.3em] px-4 py-2 font-bold mb-6 inline-block">
               {project.category}
             </span>
             <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
               {project.title}
             </h1>
           </motion.div>
        </div>
      </section>

      {/* 2. NỘI DUNG CHI TIẾT */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-16">
        {/* Main Info */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Ý tưởng thiết kế</h2>
          <div className="text-slate-600 leading-loose text-lg whitespace-pre-wrap font-light">
             {project.description}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <img src={project.imageUrl || "https://via.placeholder.com/600x600"} className="w-full h-[400px] object-cover rounded-2xl shadow-xl" alt="Mặt cắt 1"/>
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" className="w-full h-[400px] object-cover rounded-2xl shadow-xl" alt="Mặt cắt 2"/>
          </div>
        </div>

        {/* Sidebar Thông số */}
        <div className="w-full lg:w-1/3 space-y-8">
           <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
             <h3 className="text-sm font-black text-[#002366] uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-200">Thông tin dự án</h3>
             
             <ul className="space-y-6 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Chủ đầu tư</span>
                  <span className="text-slate-800 font-bold">Khách hàng Uy Nam</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loại hình</span>
                  <span className="text-slate-800 font-bold">{project.category}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Diện tích</span>
                  <span className="text-slate-800 font-bold">250 m2</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Năm hoàn thành</span>
                  <span className="text-slate-800 font-bold">2026</span>
                </li>
             </ul>
           </div>

           <button onClick={() => {
              navigate('/');
              setTimeout(()=> document.getElementById('contact-section').scrollIntoView(), 100);
           }} className="w-full bg-[#002366] hover:bg-slate-900 text-white font-bold uppercase tracking-widest text-xs py-6 rounded-xl transition-all shadow-xl">
              Nhận tư vấn thiết kế này
           </button>
        </div>
      </section>

    </div>
  );
};

export default ProjectDetail;
