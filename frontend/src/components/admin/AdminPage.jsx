import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin';
import ContactList from './ContactList';
import ReviewManager from './ReviewManager';
import FAQManager from './FAQManager';
import HomeContentManager from './HomeContentManager';
import ProjectCard from '../projects/ProjectCard';

const AdminPage = ({ projects, onProjectAdded, onDeleteProject }) => {
  return (
    <div className="bg-slate-50 min-h-screen pt-4 pl-64"> {/* pl-64 để tránh bị Sidebar đè */}
      <div className="max-w-7xl mx-auto px-10 py-10">
        
        <Routes>
          {/* Mặc định vào quản lý dự án */}
          <Route path="/" element={<Navigate to="projects" replace />} />
          
          <Route path="projects" element={
            <div className="space-y-16">
              <section>
                <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Dự Án</h2>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <Admin onProjectAdded={onProjectAdded} />
                </div>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-6">Danh sách dự án ({projects.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((item) => (
                    <ProjectCard key={item.id} project={item} onDelete={onDeleteProject} isAdmin={true} />
                  ))}
                </div>
              </section>
            </div>
          } />

          <Route path="contacts" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Danh sách liên hệ</h2>
               <ContactList />
            </section>
          } />

          <Route path="homepage" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Cấu hình Trang chủ</h2>
               <HomeContentManager />
            </section>
          } />

          <Route path="faq" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Câu hỏi (FAQ)</h2>
               <FAQManager />
            </section>
          } />

          <Route path="reviews" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Nhận xét</h2>
               <ReviewManager />
            </section>
          } />

        </Routes>

      </div>
    </div>
  );
};

export default AdminPage;
