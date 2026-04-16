import React, { useState } from 'react';
import axios from '../../api/axios';
import { motion } from 'framer-motion';

const Admin = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Nhà phố'
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
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
      await axios.post('/api/projects', data);
      setFormData({ title: '', description: '', category: 'Nhà phố' });
      setImageFile(null);
      setPreviewUrl(null);
      onProjectAdded();
      alert("Đăng dự án thành công!");
    } catch (err) {
      alert("Lỗi: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-slate-800">
            Quản lý dự án
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tạo và cập nhật công trình mới
          </p>
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
        >

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

            {/* LEFT */}
            <div className="space-y-5">

              {/* TITLE */}
              <div>
                <label className="text-sm text-slate-600 mb-1 block">
                  Tên dự án
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ví dụ: Biệt thự sân vườn..."
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm text-slate-600 mb-1 block">
                  Hạng mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Nhà phố</option>
                  <option>Biệt thự</option>
                  <option>Nội thất</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-slate-600 mb-1 block">
                  Mô tả
                </label>
                <textarea
                  rows="5"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Diện tích, phong cách, vật liệu..."
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col">

              <label className="text-sm text-slate-600 mb-2">
                Hình ảnh
              </label>

              {/* UPLOAD BOX */}
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className={`h-[260px] rounded-xl border border-dashed flex items-center justify-center transition-all
                  ${previewUrl ? 'border-transparent' : 'border-slate-300 hover:border-blue-400 bg-slate-50'}`}>

                  {previewUrl ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition">
                        Đổi ảnh
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-slate-400 text-sm">
                      <p className="mb-1">Click hoặc kéo ảnh vào đây</p>
                      <p className="text-xs">PNG, JPG</p>
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isUploading}
                className={`mt-6 py-3 rounded-lg text-sm font-medium transition
                ${isUploading
                  ? 'bg-slate-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'}
                `}
              >
                {isUploading ? 'Đang đăng...' : 'Đăng dự án'}
              </button>

            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;