import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/admin/projects', label: 'Dự án', icon: '🏗️' },
    { path: '/admin/services', label: 'Dịch vụ', icon: '🛠️' },
    { path: '/admin/workflow', label: 'Quy trình', icon: '⏳' },
    { path: '/admin/homepage', label: 'Trang chủ', icon: '🏠' },
    { path: '/admin/blogs', label: 'Tin tức', icon: '📝' },
    { path: '/admin/partners', label: 'Đối tác', icon: '🤝' },
    { path: '/admin/reviews', label: 'Nhận xét', icon: '💬' },
    { path: '/admin/faq', label: 'Câu hỏi', icon: '❓' },
    { path: '/admin/teams', label: 'Nhân sự', icon: '👥' },
    { path: '/admin/contacts', label: 'Liên hệ', icon: '📩' },
  ];

  const handleLogout = () => {
    onLogout(false);
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#002366] text-white flex flex-col z-[10000]">
      <div className="p-8 border-b border-white/10">
        <h2 className="text-xl font-black uppercase tracking-tighter">Uy Nam</h2>
        <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Quản Trị Hệ Thống</p>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-4 px-4 py-4 rounded-xl transition-all text-xs font-bold uppercase tracking-widest ${
                isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 space-y-4 border-t border-white/10">
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
        >
          <span>🏠</span> Xem Trang Web
        </button>
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default AdminNavbar;
