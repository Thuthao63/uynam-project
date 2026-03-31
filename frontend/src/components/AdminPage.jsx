import React from 'react';
import { Link } from 'react-router-dom';
import Admin from '../components/Admin';
import ContactList from '../components/ContactList';
import ProjectCard from '../components/ProjectCard';

const AdminPage = ({ projects, onProjectAdded, onDeleteProject }) => {
  // Trong một ứng dụng thực tế, bạn nên bảo vệ route này.

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-black text-[#002366] uppercase tracking-tighter">Trang Quản Trị</h1>
          <Link 
            to="/"
            className="text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-[#002366] px-6 py-2 rounded-full transition-all cursor-pointer bg-white shadow-sm"
          >
            VỀ TRANG CHỦ
          </Link>
        </div>
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-[#002366] pl-4">Thêm dự án mới</h2>
            <Admin onProjectAdded={onProjectAdded} />
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-[#002366] pl-4">Quản lý dự án</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((item) => (
                <ProjectCard key={item.id} project={item} onDelete={onDeleteProject} isAdmin={true} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-[#002366] pl-4">Danh sách liên hệ</h2>
            <ContactList />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

