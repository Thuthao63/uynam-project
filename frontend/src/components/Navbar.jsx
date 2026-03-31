import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItemClass = (tabName) => `
    relative h-full flex items-center px-4 cursor-pointer font-bold text-xs uppercase tracking-widest transition-all duration-300
    ${activeTab === tabName ? 'text-[#FFB800]' : 'text-white hover:text-[#FFB800]'}
  `;

  return (
    <nav className={`fixed top-0 left-0 w-full h-20 z-[9999] transition-all duration-500 ${
      isScrolled ? 'bg-[#1a1a1a] shadow-xl' : 'bg-black/20 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          onClick={() => scrollToSection('top', 'home')}
          className="flex items-center cursor-pointer group"
        >
          {/* Tên thương hiệu */}
          <div className="flex flex-col justify-center">
            <span className="text-xl font-black text-white leading-none tracking-tighter">UY NAM</span>
            <span className="text-[9px] font-bold text-[#FFB800] tracking-[0.2em] uppercase mt-1">Construction</span>
          </div>
        </div>

        {/* Menu giữa */}
        <div className="hidden md:flex h-full items-center">
          <button onClick={() => scrollToSection('top', 'home')} className={navItemClass('home')}>
            Trang chủ
            {activeTab === 'home' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white animate-in slide-in-from-bottom-1"></div>
            )}
          </button>

          <button onClick={() => scrollToSection('services-section', 'services')} className={navItemClass('services')}>
            Dịch vụ
            {activeTab === 'services' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white animate-in slide-in-from-bottom-1"></div>
            )}
          </button>

          <button onClick={() => scrollToSection('project-section', 'projects')} className={navItemClass('projects')}>
            Dự án thi công
            {activeTab === 'projects' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white animate-in slide-in-from-bottom-1"></div>
            )}
          </button>

          <button onClick={() => scrollToSection('contact-section', 'contact')} className={navItemClass('contact')}>
            Báo giá
            {activeTab === 'contact' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white animate-in slide-in-from-bottom-1"></div>
            )}
          </button>
        </div>

        {/* Nút Tư vấn */}
        <button 
          onClick={() => scrollToSection('contact-section', 'contact')}
          className="bg-[#FFB800] text-black px-6 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-tighter hover:bg-white hover:text-[#002366] transition-all shadow-lg active:scale-95"
        >
          Tư vấn ngay
        </button>
      </div>
    </nav>
  );
};

export default Navbar;