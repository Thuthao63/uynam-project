import React from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onDelete, isAdmin }) => {
  
  const handleDelete = async () => {
    if (window.confirm(`Thảo có chắc chắn muốn xóa dự án "${project.title}" không?`)) {
      try {
        await axios.delete(`/api/projects/${project.id}`);
        onDelete(); // Gọi hàm cập nhật lại danh sách ở App.jsx
      } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-slate-100 relative">
      
      {/* NÚT XÓA (Chỉ hiện khi đang ở chế độ Admin) */}
      {isAdmin && (
        <button 
          onClick={handleDelete}
          className="absolute top-4 right-4 z-10 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow-lg active:scale-90"
          title="Xóa dự án này"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Khung ảnh */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={project.imageUrl || "https://via.placeholder.com/600x400"} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[#002366] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {project.category || "Công trình"}
          </span>
        </div>
      </div>

      {/* Nội dung chữ */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#002366] transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm mt-4 leading-relaxed line-clamp-3 min-h-[60px]">
          {project.description}
        </p>
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
          <Link to={`/projects/${project.id}`} className="text-[#002366] font-bold text-xs tracking-widest hover:translate-x-2 transition-transform inline-block">
            XEM CHI TIẾT →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;