import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectManager from '../projects/ProjectManager';
import ContactList from './ContactList';
import FAQManager from './FAQManager';
import ReviewManager from './ReviewManager';
import HomeContentManager from './HomeContentManager';
import ServiceManager from './ServiceManager';
import WorkflowManager from './WorkflowManager';
import PartnerManager from './PartnerManager';
import BlogManager from './BlogManager';
import TeamManager from './TeamManager';
import ProjectCard from '../projects/ProjectCard';

const AdminPage = ({ projects, onProjectAdded, onDeleteProject }) => {
  return (
    <div className="bg-slate-50 min-h-screen pt-4 pl-64"> {/* pl-64 để tránh bị Sidebar đè */}
      <div className="max-w-7xl mx-auto px-10 py-10">
        
        <Routes>
          {/* Mặc định vào quản lý dự án */}
          <Route path="/" element={<Navigate to="projects" replace />} />
          
          <Route path="projects" element={
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section>
                <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Thêm dự án mới</h2>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <ProjectManager onProjectAdded={onProjectAdded} />
                </div>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-800 mb-6 font-mono uppercase tracking-widest text-xs">Danh sách dự án ({projects.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((item) => (
                    <ProjectCard key={item.id} project={item} onDelete={onDeleteProject} isAdmin={true} />
                  ))}
                </div>
              </section>
            </div>
          } />

          <Route path="services" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Dịch vụ</h2>
               <ServiceManager />
            </section>
          } />

          <Route path="workflow" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Quy trình</h2>
               <WorkflowManager />
            </section>
          } />

          <Route path="partners" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Đối tác</h2>
               <PartnerManager />
            </section>
          } />

          <Route path="blogs" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Tin tức (Blog)</h2>
               <BlogManager />
            </section>
          } />

          <Route path="teams" element={
            <section>
               <h2 className="text-2xl font-black text-[#002366] uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Quản lý Đội ngũ</h2>
               <TeamManager />
            </section>
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
