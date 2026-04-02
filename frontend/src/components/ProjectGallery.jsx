import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, title: 'Biệt thự phố Uy Nam - Đà Nẵng', category: 'Biệt thự', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Nhà phố hiện đại Hải Châu', category: 'Nhà phố', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Nội thất Penthouse Ocean View', category: 'Nội thất', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Biệt thự Tân cổ điển Hòa Xuân', category: 'Biệt thự', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Căn hộ Studio Minimalist', category: 'Nội thất', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Nhà phố liền kề Euro Village', category: 'Nhà phố', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
];

const ProjectGallery = () => {
  const [filter, setFilter] = useState('Tất cả');

  const filteredProjects = filter === 'Tất cả' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-slate-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <h2 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Danh mục thi công</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter mb-10">
            Dự án <span className="text-blue-500">Tiêu biểu</span>
          </h3>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4">
            {['Tất cả', 'Nhà phố', 'Biệt thự', 'Nội thất'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer"
              >
                {/* Image */}
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider mb-3 inline-block">
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-bold text-white mb-6 leading-tight">
                    {project.title}
                  </h4>
                  <div className="h-[2px] w-0 bg-blue-400 group-hover:w-full transition-all duration-500 mb-6"></div>
                  <button className="text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem chi tiết →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};

export default ProjectGallery;