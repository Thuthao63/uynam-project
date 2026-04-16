import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const AllProjects = ({ projects, loading }) => {
  const [filter, setFilter] = useState('Tất cả');

  const filteredProjects = filter === 'Tất cả'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-slate-200 pb-10">
          <div className="text-left">
            <h2 className="text-blue-500 text-xs font-bold tracking-[0.4em] uppercase mb-4">Các dự án của chúng tôi</h2>
            <h1 className="text-4xl md:text-6xl font-black text-[#002366] tracking-tighter uppercase">Tất Cả Dự Án</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Tất cả', 'Nhà phố', 'Biệt thự', 'Nội thất'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-xl text-[11px] font-bold uppercase transition-all shadow-sm ${
                  filter === cat ? 'bg-[#002366] text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                } cursor-pointer`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content section */}
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d86f4]"></div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            {filteredProjects.length === 0 ? (
               <div className="h-64 flex items-center justify-center text-slate-400">
                  Không tìm thấy dự án nào trong danh mục "{filter}".
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((item) => (
                  <ProjectCard key={item.id} project={item} isAdmin={false} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
