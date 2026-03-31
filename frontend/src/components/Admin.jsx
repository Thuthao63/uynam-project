import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({ title: '', description: '', category: 'Nhà phố' });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Để xem trước ảnh
  const [isUploading, setIsUploading] = useState(false);

  // Xử lý khi chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Tạo link tạm để xem ảnh
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (imageFile) data.append('image', imageFile);

    try {
      await axios.post('http://localhost:5000/api/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Reset form xịn xò
      setFormData({ title: '', description: '', category: 'Nhà phố' });
      setImageFile(null);
      setPreviewUrl(null);
      onProjectAdded();
      alert("✨ Dự án đã được đăng tải thành công!");
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 1. THẺ THỐNG KÊ NHANH (STATS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Trạng thái</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-lg font-black text-[#002366]">Hệ thống sẵn sàng</span>
          </div>
        </div>
      </div>

      {/* 2. FORM THÊM DỰ ÁN MỚI */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-50 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#002366] tracking-tighter uppercase">Đăng tải dự án</h2>
            <p className="text-slate-400 text-sm italic">Cập nhật những công trình mới nhất của Uy Nam Construction</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cột trái: Thông tin */}
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Tên dự án</label>
                <input 
                  type="text" required placeholder="VD: Biệt thự vườn anh Nam..."
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#2d86f4] transition-all text-sm font-medium"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Hạng mục</label>
                <select 
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#2d86f4] transition-all text-sm font-medium"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Nhà phố">Nhà phố</option>
                  <option value="Biệt thự">Biệt thự</option>
                  <option value="Nội thất">Nội thất</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1">Mô tả chi tiết</label>
                <textarea 
                  rows="5" required placeholder="Diện tích, phong cách, vật liệu..."
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-[#2d86f4] transition-all text-sm font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            {/* Cột phải: Upload Ảnh & Preview */}
            <div className="flex flex-col">
               <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block ml-1 text-left">Hình ảnh dự án</label>
               
               <div className="relative flex-1 group">
                 <input 
                    type="file" required accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                 />
                 
                 <div className={`h-full min-h-[250px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 ${previewUrl ? 'border-transparent' : 'border-slate-200 group-hover:border-[#2d86f4] bg-slate-50'}`}>
                    {previewUrl ? (
                      <div className="relative w-full h-full rounded-xl overflow-hidden group">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="text-white text-xs font-bold uppercase tracking-widest">Thay đổi ảnh</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kéo thả hoặc Click để chọn ảnh</p>
                      </div>
                    )}
                 </div>
               </div>

               <button 
                type="submit" 
                disabled={isUploading}
                className={`mt-6 w-full py-5 rounded-xl font-black uppercase text-xs tracking-[0.3em] transition-all shadow-xl ${isUploading ? 'bg-slate-300' : 'bg-[#002366] text-white hover:bg-[#2d86f4] hover:-translate-y-1'}`}
              >
                {isUploading ? 'Đang xử lý dữ liệu...' : 'Phát hành dự án'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;