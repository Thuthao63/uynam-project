import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Admin from '../components/Admin';
import ContactList from '../components/ContactList';
import ProjectCard from '../components/ProjectCard';

// 1. Import thêm công cụ thông báo và socket
import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';

// Kết nối tới server Backend (Thảo nhớ đúng port 5000 nhé)
const socket = io('http://localhost:5000');

const AdminPage = ({ projects, onProjectAdded, onDeleteProject }) => {

  useEffect(() => {
    // 2. Lắng nghe tín hiệu "new_contact_alert" từ Backend
    socket.on('new_contact_alert', (data) => {
      // Phát tiếng chuông báo hiệu (Tùy chọn: Thảo bỏ file sound vào thư mục public nhé)
      const audio = new Audio('/notify.mp3'); 
      audio.play().catch(e => console.log("Chưa có file âm thanh"));

      // Hiện thông báo Popup cực xịn ở góc màn hình
      toast.success(
        (t) => (
          <div className="flex flex-col gap-1">
            <span className="font-black text-[#002366] text-[11px] uppercase tracking-widest">
              🔔 Tin nhắn mới!
            </span>
            <p className="text-xs text-slate-600">
              Khách hàng <span className="font-bold text-[#2d86f4]">{data.name}</span> vừa gửi yêu cầu tư vấn.
            </p>
          </div>
        ),
        { duration: 6000, position: 'top-right' }
      );
    });

    // Dọn dẹp kết nối khi rời khỏi trang Admin
    return () => socket.off('new_contact_alert');
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 3. Thêm Toaster để làm "nơi hiện" các thông báo */}
      <Toaster />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
             <h1 className="text-3xl font-black text-[#002366] uppercase tracking-tighter">Trang Quản Trị</h1>
             {/* Icon trạng thái Real-time cho xịn */}
             <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
             </span>
          </div>
          <Link 
            to="/"
            className="text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-[#002366] px-6 py-2 rounded-full transition-all cursor-pointer bg-white shadow-sm"
          >
            VỀ TRANG CHỦ
          </Link>
        </div>

        <div className="space-y-16">
          {/* Các section cũ của Thảo giữ nguyên */}
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