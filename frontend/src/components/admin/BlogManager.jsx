import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogManager = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({ title: '', category: 'Kiến Thức', summary: '', content: '', author: 'Admin Uy Nam', date: '' });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/api/blogs');
            setPosts(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newData).forEach(key => formData.append(key, newData[key]));
        if (imageFile) formData.append('image', imageFile);

        try {
            await axios.post('/api/blogs', formData);
            setNewData({ title: '', category: 'Kiến Thức', summary: '', content: '', author: 'Admin Uy Nam', date: '' });
            setImageFile(null);
            fetchPosts();
        } catch (err) { alert("Lỗi khi đăng bài"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa bài viết này?")) {
            try {
                await axios.delete(`/api/blogs/${id}`);
                fetchPosts();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10 font-black text-slate-400">Đang chuẩn bị bản tin...</div>;

    return (
        <div className="space-y-10">
            {/* Form Đăng bài */}
            <form onSubmit={handleAdd} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6">
                <h3 className="text-2xl font-black text-[#002366] uppercase tracking-tighter">Viết bài mới</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input 
                            type="text" placeholder="Tiêu đề bài viết" required
                            value={newData.title} onChange={e => setNewData({...newData, title: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-[#002366]"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <select 
                                value={newData.category} onChange={e => setNewData({...newData, category: e.target.value})}
                                className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                            >
                                <option>Kiến Thức</option>
                                <option>Phong Thuỷ</option>
                                <option>Vật Liệu</option>
                                <option>Nội Thất</option>
                            </select>
                            <input 
                                type="text" placeholder="Ngày đăng (VD: 16 Tháng 4, 2026)"
                                value={newData.date} onChange={e => setNewData({...newData, date: e.target.value})}
                                className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                            />
                        </div>
                        <textarea 
                            placeholder="Mô tả ngắn (Summary)" rows="3"
                            value={newData.summary} onChange={e => setNewData({...newData, summary: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        ></textarea>
                    </div>

                    <div className="space-y-4">
                        <textarea 
                            placeholder="Nội dung chi tiết bài viết (Rich Text Simple)..." required rows="10"
                            value={newData.content} onChange={e => setNewData({...newData, content: e.target.value})}
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-serif"
                        ></textarea>
                        <div className="p-4 border-2 border-dashed border-slate-100 rounded-xl">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Ảnh bìa bài viết</label>
                            <input type="file" onChange={e => setImageFile(e.target.files[0])} className="text-xs" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="bg-[#002366] text-white px-20 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-lg active:scale-95">
                    Đăng bài viết ngay
                </button>
            </form>

            {/* Danh sách bài đã đăng */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map(post => (
                    <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-center group">
                        <img src={post.imageUrl} className="w-32 h-32 rounded-2xl object-cover shrink-0" alt=""/>
                        <div className="flex-1">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{post.category}</span>
                            <h4 className="text-xl font-bold text-[#002366] mb-2 line-clamp-2">{post.title}</h4>
                            <p className="text-slate-400 text-xs italic">{post.date}</p>
                        </div>
                        <button onClick={() => handleDelete(post.id)} className="text-red-300 opacity-0 group-hover:opacity-100 p-2">
                             🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogManager;
