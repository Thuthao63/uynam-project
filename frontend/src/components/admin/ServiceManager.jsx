import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({ orderId: '', title: '', desc: '', detail: '', features: '' });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/services');
            setServices(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newData).forEach(key => formData.append(key, newData[key]));
        if (imageFile) formData.append('image', imageFile);

        try {
            await axios.post('http://localhost:5000/api/services', formData);
            setNewData({ orderId: '', title: '', desc: '', detail: '', features: '' });
            setImageFile(null);
            fetchServices();
        } catch (err) { alert("Lỗi khi thêm"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa dịch vụ này?")) {
            try {
                await axios.delete(`http://localhost:5000/api/services/${id}`);
                fetchServices();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10">Đang tải...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-10 space-y-4">
                    <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-4">Thêm Dịch vụ</h3>
                    <input 
                        type="text" placeholder="Thứ tự (VD: 01)" required
                        value={newData.orderId} onChange={e => setNewData({...newData, orderId: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                    <input 
                        type="text" placeholder="Tiêu đề" required
                        value={newData.title} onChange={e => setNewData({...newData, title: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                    />
                    <textarea 
                        placeholder="Mô tả ngắn" required rows="2"
                        value={newData.desc} onChange={e => setNewData({...newData, desc: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    ></textarea>
                    <textarea 
                        placeholder="Chi tiết dịch vụ" required rows="4"
                        value={newData.detail} onChange={e => setNewData({...newData, detail: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    ></textarea>
                    <input 
                        type="text" placeholder="Đặc điểm (phân cách bằng dấu phẩy)"
                        value={newData.features} onChange={e => setNewData({...newData, features: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ảnh dịch vụ</label>
                        <input type="file" onChange={e => setImageFile(e.target.files[0])} className="text-xs" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
                        Thêm mới
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
                {services.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-6 items-center">
                        <img src={item.imageUrl} className="w-24 h-24 rounded-xl object-cover shrink-0" alt=""/>
                        <div className="flex-1">
                            <span className="text-blue-500 font-black text-lg">{item.orderId}</span>
                            <h4 className="font-bold text-[#002366] text-xl mb-1">{item.title}</h4>
                            <p className="text-slate-500 text-sm line-clamp-2">{item.desc}</p>
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

export default ServiceManager;
