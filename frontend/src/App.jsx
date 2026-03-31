import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Nhớ install: npm install framer-motion

// Import Components
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm'; 
import Services from './components/Services'; 
import AdminPage from './components/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import Counter from './components/Counter'; // File số nhảy đã tạo
import ContactSocial from './components/ContactSocial'; // File Zalo/Mess đã tạo

// --- COMPONENT TRANG CHỦ (HOMEPAGE) ---
const HomePage = ({ projects, loading }) => {
  const [filter, setFilter] = useState('Tất cả');

  const filteredProjects = filter === 'Tất cả' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="animate-in fade-in duration-700">
      {/* --- PHẦN 1: HERO TEASER --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover scale-105">
            <source src="/teaser.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xs md:text-xl font-light tracking-[0.6em] uppercase mb-4 opacity-80"
          >
            Kiến tạo không gian • Dựng xây hạnh phúc
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8"
          >
            UY NAM <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2885e1] to-yellow-200">
              CONSTRUCTION
            </span>
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('project-section').scrollIntoView({behavior: 'smooth'})} 
              className="bg-[#2d86f4] text-white px-12 py-4 rounded-sm font-black hover:bg-white hover:text-black transition-all uppercase text-[11px] tracking-widest shadow-2xl cursor-pointer"
            >
              Xem dự án thi công
            </button>
            <button 
              onClick={() => document.getElementById('contact-section').scrollIntoView({behavior: 'smooth'})} 
              className="bg-transparent border border-white/30 text-white px-12 py-4 rounded-sm font-bold hover:bg-white/10 transition-all uppercase text-[11px] tracking-widest cursor-pointer backdrop-blur-sm"
            >
              Yêu cầu báo giá
            </button>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: THÔNG SỐ (STATS) VỚI HIỆU ỨNG SỐ NHẢY --- */}
      <section className="bg-[#002366] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { n: '1000+', t: 'Công trình' },
            { n: '10+', t: 'Năm kinh nghiệm' },
            { n: '50+', t: 'KTS & Kỹ sư' },
            { n: '100%', t: 'Hài lòng' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="text-5xl font-black mb-2">
                <Counter value={item.n} />
              </div>
              <div className="text-blue-300 text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">{item.t}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PHẦN 3: DỊCH VỤ --- */}
      <Services />

      {/* --- PHẦN 4: DỰ ÁN (PORTFOLIO) --- */}
      <main id="project-section" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-left">
            <h2 className="text-slate-400 text-xs font-bold tracking-[0.4em] uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#002366] tracking-tighter uppercase">Dự án nổi bật</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Tất cả', 'Nhà phố', 'Biệt thự', 'Nội thất'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase transition-all ${
                  filter === cat ? 'bg-[#002366] text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                } cursor-pointer`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d86f4]"></div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((item) => (
              <ProjectCard key={item.id} project={item} isAdmin={false} />
            ))}
          </div>
        )}
      </main>

      {/* --- PHẦN 5: LIÊN HỆ --- */}
      <section id="contact-section" className="relative py-24 bg-slate-900 overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-blue-400 text-sm font-bold tracking-[0.4em] uppercase mb-4">Kết nối</h2>
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-12">Báo giá & Tư vấn</h3>
            <ContactForm />
        </div>
      </section>

      {/* --- PHẦN 6: FOOTER TINH TẾ --- */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 text-left">
          <div>
            <h4 className="text-xl font-black text-[#002366] mb-6 tracking-tighter">UY NAM CONSTRUCTION</h4>
            <p className="text-slate-500 text-xs leading-relaxed italic opacity-70">
              "Kiến tạo không gian - Dựng xây hạnh phúc. Chúng tôi mang đến giải pháp kiến trúc bền vững cho ngôi nhà Việt."
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6">Thông tin</h4>
            <div className="text-slate-500 text-xs space-y-3">
              <p>📍 TP. Đà Nẵng, Việt Nam</p>
              <p>📞 09xx xxx xxx</p>
              <p>✉️ contact@uynam.vn</p>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-6">Dịch vụ</h4>
            <div className="text-slate-500 text-xs space-y-3">
              <p>Thiết kế kiến trúc</p>
              <p>Thi công trọn gói</p>
              <p>Xây dựng phần thô</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-10 flex flex-col items-center gap-4">
          {/* Link Admin ẩn ở Footer - Không bị giả */}
          <Link 
            to="/admin" 
            className="group flex items-center gap-2 text-[9px] text-slate-300 hover:text-[#2d86f4] transition-all uppercase tracking-[0.3em] font-medium"
          >
            <span className="w-1 h-1 bg-slate-200 group-hover:bg-[#2d86f4] rounded-full"></span>
            Internal System Access
          </Link>

          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 Uy Nam Design • Built by Thảo Nguyễn
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- APP COMPONENT ---
function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error("Lỗi server:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<HomePage projects={projects} loading={loading} />} />
        <Route path="/admin" element={<AdminPage projects={projects} onProjectAdded={fetchProjects} onDeleteProject={fetchProjects} />} />
      </Routes>

      {/* Nút Zalo & Messenger nổi - Luôn xuất hiện */}
      <ContactSocial />
    </BrowserRouter>
  );
}

export default App;