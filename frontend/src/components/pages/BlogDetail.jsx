import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data (cùng bộ với Blog.jsx)
const posts = [
  { 
    id: 1, 
    category: "Phong Thuỷ", 
    title: "Năm 2026 Xây Nhà Hướng Nào Đẹp Nhất?", 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80", 
    date: "16 Tháng 4, 2026",
    content: "Năm 2026 (Bính Ngọ) được đánh giá là một năm tốt để khởi công xây dựng nhà cửa. Theo quan niệm phong thủy, việc chọn hướng nhà phù hợp sẽ mang lại tài lộc và bình an cho gia chủ.\n\nHướng Nam được coi là hướng sinh khí trong năm 2026, giúp thu hút năng lượng tích cực. Ngoài ra, hướng Đông Nam cũng là một lựa chọn tuyệt vời cho những gia đình muốn cầu bình an và sức khỏe.\n\nTại Uy Nam Construction, chúng tôi luôn kết hợp giữa kiến trúc hiện đại và các yếu tố phong thủy khoa học để đảm bảo ngôi nhà không chỉ đẹp mà còn là nơi an cư lạc nghiệp lý tưởng."
  },
  { 
    id: 2, 
    category: "Kiến Thức", 
    title: "Phân biệt Xây Thô và Hoàn Thiện: Những Lỗi Sai Thường Gặp", 
    image: "https://images.unsplash.com/photo-1541888086925-ebbc31bcbdce?auto=format&fit=crop&q=80", 
    date: "12 Tháng 4, 2026",
    content: "Rất nhiều gia chủ nhầm lẫn giữa gói xây thô và hoàn thiện, dẫn đến việc phát sinh chi phí không đáng có trong quá trình thi công.\n\nXây thô bao gồm các công đoạn đổ bê tông, xây tường, lắp đặt hệ thống điện nước âm tường. Đây là 'xương sống' của ngôi nhà, đòi hỏi kỹ thuật cao và sự giám sát chặt chẽ.\n\nTrong khi đó, hoàn thiện bao gồm ốp lát, sơn bả, lắp đặt thiết bị vệ sinh, đèn điện... Đây là công đoạn tạo nên vẻ đẹp thẩm mỹ cho công trình.\n\nHãy tìm hiểu kỹ hợp đồng và bảng dự toán để biết chính xác những gì bạn nhận được trong từng gói dịch vụ."
  },
  { 
    id: 3, 
    category: "Nội Thất", 
    title: "Bắt Cận Cảnh Xu Hướng Nội Thất Gỗ Óc Chó 2026", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80", 
    date: "10 Tháng 4, 2026",
    content: "Gỗ óc chó vẫn giữ vững ngôi vương trong làng nội thất cao cấp năm 2026. Với những đường vân gỗ tự nhiên đặc trưng và sắc nâu sẫm sang trọng, loại vật liệu này mang lại vẻ đẳng cấp không thể trộn lẫn.\n\nXu hướng năm nay tập trung vào sự tối giản, kết hợp giữa gỗ óc chó và đá tự nhiên hoặc kim loại mạ vàng để tạo nên sự hài hòa giữa ấm cúng và hiện đại.\n\nĐội ngũ thiết kế nội thất của Uy Nam luôn cập nhật những mẫu mã mới nhất để đưa vào không gian sống của bạn."
  },
  { 
    id: 4, 
    category: "Vật Liệu", 
    title: "Có Nên Dùng Gạch Kính Để Lấy Sáng Không?", 
    image: "https://images.unsplash.com/photo-1504307651254-35682f94a1d8?auto=format&fit=crop&q=80", 
    date: "05 Tháng 4, 2026",
    content: "Gạch kính (glass block) đang quay trở lại mạnh mẽ trong các thiết kế nhà phố hiện đại, đặc biệt là những ngôi nhà có diện tích nhỏ hẹp hoặc thiếu ánh sáng tự nhiên.\n\nSử dụng gạch kính không chỉ giúp lấy sáng hiệu quả mà còn đảm bảo sự riêng tư và tạo hiệu ứng nghệ thuật thú vị cho không gian. Tuy nhiên, việc thi công gạch kính đòi hỏi sự khéo léo để đảm bảo khả năng chịu lực và chống thấm.\n\nCùng Uy Nam khám phá các giải pháp lấy sáng thông minh cho ngôi nhà của bạn."
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h2 className="text-2xl font-bold italic">Bài viết không tồn tại...</h2>
        <button onClick={() => navigate('/blog')} className="mt-8 text-blue-500 font-bold uppercase tracking-widest text-xs">Quay lại Tin tức</button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 max-w-7xl mx-auto">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="bg-blue-600 text-white text-[10px] uppercase tracking-[0.3em] px-4 py-2 font-bold mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
              {post.title}
            </h1>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">{post.date} • Bởi Ban Biên Tập Uy Nam</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <article className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#002366]">
          {post.content}
        </div>
        
        <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center">
          <button 
            onClick={() => navigate('/blog')}
            className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#002366]"
          >
            <span className="w-8 h-[1px] bg-[#002366] group-hover:w-12 transition-all"></span>
            Tất cả bài viết
          </button>
          
          <div className="flex gap-4">
            <span className="text-[10px] font-bold uppercase text-slate-400">Chia sẻ bài viết:</span>
            {/* Social icons placeholders */}
            <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                <div className="w-6 h-6 rounded-full bg-slate-100"></div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
