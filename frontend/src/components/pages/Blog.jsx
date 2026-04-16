import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const posts = [
  { id: 1, category: "Phong Thuỷ", title: "Năm 2026 Xây Nhà Hướng Nào Đẹp Nhất?", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", date: "16 Tháng 4, 2026" },
  { id: 2, category: "Kiến Thức", title: "Phân biệt Xây Thô và Hoàn Thiện: Những Lỗi Sai Thường Gặp", image: "https://images.unsplash.com/photo-1541888086925-ebbc31bcbdce?auto=format&fit=crop&q=80", date: "12 Tháng 4, 2026" },
  { id: 3, category: "Nội Thất", title: "Bắt Cận Cảnh Xu Hướng Nội Thất Gỗ Óc Chó 2026", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", date: "10 Tháng 4, 2026" },
  { id: 4, category: "Vật Liệu", title: "Có Nên Dùng Gạch Kính Để Lấy Sáng Không?", image: "https://images.unsplash.com/photo-1504307651254-35682f94a1d8?auto=format&fit=crop&q=80", date: "05 Tháng 4, 2026" },
];

const Blog = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20 text-center">
          <span className="text-[#002366] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 inline-block">News & Insights</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">Cẩm nang Kiến Trúc</h1>
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto line-height-relaxed">
            Khám phá những bài viết sâu sắc về thiết kế kiến trúc, phong thủy xây nhà và các bí quyết tiết kiệm chi phí thi công từ chuyên gia Uy Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {posts.map((post, idx) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row h-full"
              >
                <div className="w-full md:w-2/5 aspect-square overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">{post.category}</span>
                  <h3 className="text-2xl font-bold text-slate-800 leading-snug group-hover:text-[#002366] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-8 text-slate-400 text-[11px] font-bold uppercase tracking-widest border-t border-slate-100 pt-4">
                    {post.date}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
