import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-slate-950 pt-32 pb-10 text-white">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-left">
      <div className="col-span-1 md:col-span-1">
        <h4 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase">UY NAM <br/> CONSTRUCTION</h4>
        <p className="text-slate-400 text-xs leading-relaxed italic opacity-70 mb-8">
          "Kiến tạo không gian - Dựng xây hạnh phúc. Chúng tôi mang đến giải pháp kiến trúc bền vững cho ngôi nhà Việt."
        </p>
        <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">FB</a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">YT</a>
            <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">ZL</a>
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-8">Dịch vụ chính</h4>
        <div className="text-slate-400 text-xs space-y-4 flex flex-col">
          <Link to="/services" className="hover:text-white transition-colors">Thiết kế Kiến trúc</Link>
          <Link to="/services" className="hover:text-white transition-colors">Thi công Trọn gói</Link>
          <Link to="/services" className="hover:text-white transition-colors">Thiết kế Nội thất</Link>
          <Link to="/services" className="hover:text-white transition-colors">Tư vấn Phong thủy</Link>
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-8">Thông tin liên hệ</h4>
        <div className="text-slate-400 text-xs space-y-4">
          <p className="flex items-start gap-3">
            <span className="text-white font-bold">📍</span>
            <span>TP. Đà Nẵng, Việt Nam</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-white font-bold">📞</span>
            <span>0903 131 893</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-white font-bold">✉️</span>
            <span>contact@uynam.vn</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="text-white font-bold">⏰</span>
            <span>T2 - T7: 07:30 - 17:30</span>
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest mb-8">Liên kết nhanh</h4>
        <div className="text-slate-400 text-xs space-y-4 flex flex-col">
          <Link to="/about" className="hover:text-white transition-colors">Về chúng tôi</Link>
          <Link to="/workflow" className="hover:text-white transition-colors">Quy trình làm việc</Link>
          <Link to="/projects" className="hover:text-white transition-colors">Dự án thi công</Link>
          <Link to="/blog" className="hover:text-white transition-colors">Cẩm nang kiến trúc</Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">
        © 2026 Uy Nam Design • Built by Thảo Nguyễn
      </p>
      <div className="flex gap-8">
          <Link to="/admin" className="text-[9px] text-slate-600 hover:text-blue-400 transition-all uppercase tracking-[0.2em]">Admin Access</Link>
          <span className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">Privacy Policy</span>
          <span className="text-[9px] text-slate-600 uppercase tracking-[0.2em]">Terms of Service</span>
      </div>
    </div>
  </footer>
);

export default Footer;
