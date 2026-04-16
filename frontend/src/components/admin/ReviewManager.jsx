import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ReviewManager = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({ name: '', role: '', content: '', imageUrl: '' });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await axios.get('/api/testimonials');
            setReviews(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/testimonials', newData);
            setNewData({ name: '', role: '', content: '', imageUrl: '' });
            fetchReviews();
        } catch (err) { alert("Lỗi khi thêm"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa nhận xét này?")) {
            try {
                await axios.delete(`/testimonials/${id}`);
                fetchReviews();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10">Đang tải...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form thêm */}
            <div className="lg:col-span-1">
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-10">
                    <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-8">Thêm nhận xét</h3>
                    <div className="space-y-4">
                        <input 
                            type="text" placeholder="Tên khách hàng" required
                            value={newData.name} onChange={e => setNewData({...newData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                        <input 
                            type="text" placeholder="Chức vụ/Địa chỉ"
                            value={newData.role} onChange={e => setNewData({...newData, role: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                        <textarea 
                            placeholder="Nội dung nhận xét" required rows="4"
                            value={newData.content} onChange={e => setNewData({...newData, content: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        ></textarea>
                        <input 
                            type="text" placeholder="Link ảnh đại diện"
                            value={newData.imageUrl} onChange={e => setNewData({...newData, imageUrl: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
                            Thêm mới
                        </button>
                    </div>
                </form>
            </div>

            {/* Danh sách */}
            <div className="lg:col-span-2 space-y-4">
                {reviews.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-6 items-center">
                        <img src={item.image || item.imageUrl} className="w-16 h-16 rounded-full object-cover shrink-0" alt=""/>
                        <div className="flex-1">
                            <h4 className="font-bold text-[#002366]">{item.name}</h4>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">{item.role}</p>
                            <p className="text-slate-600 text-sm italic">"{item.content}"</p>
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2">
                             🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewManager;
