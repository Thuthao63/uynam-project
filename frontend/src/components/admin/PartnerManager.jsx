import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerManager = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [logoText, setLogoText] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/partners');
            setPartners(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('logo', logoText);
        if (imageFile) formData.append('image', imageFile);

        try {
            await axios.post('http://localhost:5000/api/partners', formData);
            setName('');
            setLogoText('');
            setImageFile(null);
            fetchPartners();
        } catch (err) { alert("Lỗi khi thêm"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa đối tác này?")) {
            try {
                await axios.delete(`http://localhost:5000/api/partners/${id}`);
                fetchPartners();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10">Đang tải...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4 sticky top-10">
                    <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-4">Thêm Đối tác</h3>
                    <input 
                        type="text" placeholder="Tên đối tác" required
                        value={name} onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                    />
                    <input 
                        type="text" placeholder="Chữ hiển thị (VD: VIGLACERA)"
                        value={logoText} onChange={e => setLogoText(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-black"
                    />
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Logo (Dạng ảnh)</label>
                        <input type="file" onChange={e => setImageFile(e.target.files[0])} className="text-xs" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
                        Lưu đối tác
                    </button>
                </form>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
                {partners.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-between text-center relative group">
                        {item.imageUrl ? (
                            <img src={item.imageUrl} className="h-12 w-auto object-contain mb-4 grayscale" alt=""/>
                        ) : (
                            <div className="text-xl font-black text-slate-800 mb-4">{item.logo}</div>
                        )}
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                        <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 text-red-300 opacity-0 group-hover:opacity-100 p-2">
                             🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnerManager;
