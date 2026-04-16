import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const TeamManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({ name: '', role: '', order: 0 });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await axios.get('/api/teams');
            setMembers(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newData).forEach(key => formData.append(key, newData[key]));
        if (imageFile) formData.append('image', imageFile);

        try {
            await axios.post('/api/teams', formData);
            setNewData({ name: '', role: '', order: 0 });
            setImageFile(null);
            fetchMembers();
        } catch (err) { alert("Lỗi khi thêm thành viên"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa thành viên này?")) {
            try {
                await axios.delete(`/api/teams/${id}`);
                fetchMembers();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10 text-slate-400 font-black uppercase tracking-[0.4em]">Đang tải đội ngũ...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-10 space-y-4">
                    <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-4">Thêm Nhân sự</h3>
                    <input 
                        type="text" placeholder="Họ và Tên" required
                        value={newData.name} onChange={e => setNewData({...newData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                    />
                    <input 
                        type="text" placeholder="Chức vụ" required
                        value={newData.role} onChange={e => setNewData({...newData, role: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                    <input 
                        type="number" placeholder="Thứ tự hiển thị"
                        value={newData.order} onChange={e => setNewData({...newData, order: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ảnh chân dung</label>
                        <input type="file" onChange={e => setImageFile(e.target.files[0])} className="text-xs" />
                    </div>
                    <button type="submit" className="w-full bg-[#002366] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all">
                        Lưu nhân sự
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
                {members.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-lg relative group">
                        <img src={item.imageUrl} className="w-full aspect-[3/4] rounded-2xl object-cover mb-4" alt=""/>
                        <h4 className="font-black text-[#002366] uppercase text-sm">{item.name}</h4>
                        <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{item.role}</p>
                        <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 bg-white/80 rounded-full p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                             🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamManager;
