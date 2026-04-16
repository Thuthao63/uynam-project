import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Import Components
import Navbar from './components/common/Navbar';
import ProjectCard from './components/projects/ProjectCard';
import ContactForm from './components/contact/ContactForm';
import Services from './components/sections/Services';
import AdminPage from './components/admin/AdminPage';
import AdminNavbar from './components/admin/AdminNavbar';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Counter from './components/common/Counter';
import ContactSocial from './components/contact/ContactSocial';
import Workflow from './components/sections/Workflow';
import About from './components/sections/About';
import ServicePage from './components/sections/ServicePage';
import Blog from './components/pages/Blog';
import BlogDetail from './components/pages/BlogDetail';
import Testimonials from './components/sections/Testimonials';
import Partners from './components/sections/Partners';
import FAQ from './components/sections/FAQ';
import Footer from './components/common/Footer';
import NotFound from './components/pages/NotFound';
import Login from './components/admin/Login';
import AllProjects from './components/projects/AllProjects';
import ProjectDetail from './components/projects/ProjectDetail';

// --- COMPONENT TRANG CHỦ (HOMEPAGE) ---
const HomePage = ({ projects, loading, settings }) => {
  const [filter, setFilter] = useState('Tất cả');

  const filteredProjects = filter === 'Tất cả'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="animate-in fade-in duration-700">
      {/* --- SECTION 1: HERO TEASER --- */}
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
            {settings.hero_subtitle || "Kiến tạo không gian • Dựng xây hạnh phúc"}
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8"
          >
            {settings.hero_title || "UY NAM CONSTRUCTION"}
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => document.getElementById('project-section').scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#2d86f4] text-white px-12 py-4 rounded-sm font-black hover:bg-white hover:text-black transition-all uppercase text-[11px] tracking-widest shadow-2xl cursor-pointer"
            >
              Xem dự án thi công
            </button>
            <button
              onClick={() => document.getElementById('contact-section').scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border border-white/30 text-white px-12 py-4 rounded-sm font-bold hover:bg-white/10 transition-all uppercase text-[11px] tracking-widest cursor-pointer backdrop-blur-sm"
            >
              Yêu cầu báo giá
            </button>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: STATS --- */}
      <section className="bg-[#002366] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { n: settings.stat_projects || '1000+', t: 'Công trình' },
            { n: settings.stat_experience || '10+', t: 'Năm kinh nghiệm' },
            { n: settings.stat_engineers || '50+', t: 'KTS & Kỹ sư' },
            { n: settings.stat_satisfaction || '100%', t: 'Hài lòng' }
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

      {/* --- SECTION 3: QUY TRÌNH (PREVIEW) --- */}
      <Workflow isPreview={true} />

      {/* --- SECTION 4: DỊCH VỤ --- */}
      <Services />

      {/* --- SECTION 5: DỰ ÁN --- */}
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
                className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase transition-all ${filter === cat ? 'bg-[#002366] text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
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

      {/* --- SECTION 6: TESTIMONIALS --- */}
      <Testimonials />

      {/* --- SECTION 7: FAQ --- */}
      <FAQ />

      {/* --- SECTION 8: PARTNERS --- */}
      <Partners />

      {/* --- SECTION 9: LIÊN HỆ --- */}
      <section id="contact-section" className="relative py-24 bg-slate-900 overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-blue-400 text-sm font-bold tracking-[0.4em] uppercase mb-4">Kết nối</h2>
          <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-12">Báo giá & Tư vấn</h3>
          <ContactForm />
        </div>
      </section>

      {/* --- PHẦN 7: FOOTER --- */}
      <Footer />
    </div>
  );
}


// --- APP COMPONENT ---
function App() {
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [projRes, setRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/home-content')
      ]);
      setProjects(projRes.data);
      setSettings(setRes.data);
    } catch (err) {
      console.error("Lỗi server:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <>
      <ScrollToTop />
      
      {/* Chỉ hiện Navbar chính nếu không phải trang Admin/Login */}
      {!isAdminPath && <Navbar />}
      
      {/* Hiện AdminNavbar nếu đã đăng nhập và đang ở trang admin */}
      {isAuthenticated && location.pathname.startsWith('/admin') && (
        <AdminNavbar onLogout={setIsAuthenticated} />
      )}

      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<HomePage projects={projects} loading={loading} settings={settings} />} />

        {/* Các trang mở rộng */}
        <Route path="/workflow" element={<div><Workflow /><Footer /></div>} />
        <Route path="/about" element={<div className="pt-28"><About /><Footer /></div>} />
        <Route path="/services" element={<div className="pt-0"><ServicePage /><Footer /></div>} />
        <Route path="/blog" element={<div className="pt-0"><Blog /><Footer /></div>} />
        <Route path="/blog/:id" element={<div className="pt-0"><BlogDetail /><Footer /></div>} />

        {/* Nhóm trang Dự Án */}
        <Route path="/projects" element={<div className="pt-0"><AllProjects projects={projects} loading={loading} /><Footer /></div>} />
        <Route path="/projects/:id" element={<div className="pt-0"><ProjectDetail projects={projects} loading={loading} /><Footer /></div>} />

        {/* Bảo mật Admin */}
        <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
        <Route 
          path="/admin/*" 
          element={
            isAuthenticated ? 
            <AdminPage projects={projects} onProjectAdded={fetchInitialData} onDeleteProject={fetchInitialData} /> 
            : <Navigate to="/login" replace />
          } 
        />

        {/* Trang lỗi 404 */}
        <Route path="*" element={<div className="pt-0"><NotFound /><Footer /></div>} />
      </Routes>

      {!isAdminPath && <ContactSocial />}
    </>
  );
}

export default App;