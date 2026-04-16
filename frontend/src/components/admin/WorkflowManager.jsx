import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkflowManager = () => {
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({ stepId: '', title: '', desc: '', icon: '📍' });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchSteps();
    }, []);

    const fetchSteps = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/workflows');
            setSteps(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newData).forEach(key => formData.append(key, newData[key]));
        if (imageFile) formData.append('image', imageFile);

        try {
            await axios.post('http://localhost:5000/api/workflows', formData);
            setNewData({ stepId: '', title: '', desc: '', icon: '📍' });
            setImageFile(null);
            fetchSteps();
        } catch (err) { alert("Lỗi khi thêm"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa bước này?")) {
            try {
                await axios.delete(`http://localhost:5000/api/workflows/${id}`);
                fetchSteps();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10 text-slate-400 font-bold uppercase tracking-widest text-xs">Đang tải...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 sticky top-10 space-y-4">
                    <h3 className="text-xl font-black text-[#002366] mb-4 uppercase tracking-tighter">Bản thiết kế Quy trình</h3>
                    <div className="grid grid-cols-4 gap-3">
                        <input 
                            type="text" placeholder="STT" required
                            value={newData.stepId} onChange={e => setNewData({...newData, stepId: e.target.value})}
                            className="col-span-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                        />
                        <input 
                            type="text" placeholder="Icon"
                            value={newData.icon} onChange={e => setNewData({...newData, icon: e.target.value})}
                            className="col-span-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-center"
                        />
                        <input 
                            type="text" placeholder="Tiêu đề bước" required
                            value={newData.title} onChange={e => setNewData({...newData, title: e.target.value})}
                            className="col-span-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                        />
                    </div>
                    <textarea 
                        placeholder="Nội dung mô tả bước..." required rows="3"
                        value={newData.desc} onChange={e => setNewData({...newData, desc: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    ></textarea>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Ảnh minh họa</label>
                        <input type="file" onChange={e => setImageFile(e.target.files[0])} className="text-xs" />
                    </div>
                    <button type="submit" className="w-full bg-[#002366] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all">
                        Lưu bước mới
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
                {steps.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl shrink-0">
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Bước {item.stepId}</span>
                            <h4 className="text-lg font-black text-[#002366] uppercase tracking-tighter">{item.title}</h4>
                            <p className="text-slate-500 text-xs line-clamp-1">{item.desc}</p>
                        </div>
                        {item.imageUrl && (
                            <img src={item.imageUrl} className="w-20 h-20 rounded-lg object-cover" alt=""/>
                        )}
                        <button onClick={() => handleDelete(item.id)} className="text-red-300 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                             🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkflowManager;
