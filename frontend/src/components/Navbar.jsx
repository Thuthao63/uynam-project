import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id, isPage = false) => {
    if (isPage) {
      navigate(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(id === 'top' ? 'root' : id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Check active tab dựa trên URL hoặc Section
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-700 px-6 md:px-12 ${
      isScrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* LOGO - Đơn giản, dứt khoát */}
        <div 
          onClick={() => handleNavClick('top')} 
          className="cursor-pointer group flex flex-col items-start"
        >
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}>
            UY NAM
          </span>
          <span className={`text-[8px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${
            isScrolled ? 'text-blue-600' : 'text-blue-400'
          }`}>
            Construction
          </span>
        </div>

        {/* MENU - Font nhỏ, spacing rộng tạo cảm giác cao cấp */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Trang chủ', id: 'top', type: 'scroll' },
            { label: 'Giới thiệu', id: '/about', type: 'page' },
            { label: 'Quy trình', id: '/workflow', type: 'page' },
            { label: 'Dự án', id: 'project-section', type: 'scroll' },
            { label: 'Báo giá', id: 'contact-section', type: 'scroll' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id, item.type === 'page')}
              className={`relative text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 group ${
                isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/70 hover:text-white'
              } ${isActive(item.id) ? (isScrolled ? 'text-blue-600' : 'text-white') : ''}`}
            >
              {item.label}
              {/* Line chỉ xuất hiện khi hover hoặc active */}
              <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-blue-500 transition-all duration-500 ${
                isActive(item.id) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
        </div>

        {/* CTA - Nút vuông góc (Sharp edges) nhìn sẽ kiến trúc hơn nút bo tròn */}
        <button 
          onClick={() => handleNavClick('contact-section')}
          className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${
            isScrolled 
            ? 'border-slate-900 bg-slate-900 text-white hover:bg-transparent hover:text-slate-900' 
            : 'border-white text-white hover:bg-white hover:text-slate-900'
          }`}
        >
          Tư vấn ngay
        </button>

      </div>
    </nav>
  );
};

export default Navbar;