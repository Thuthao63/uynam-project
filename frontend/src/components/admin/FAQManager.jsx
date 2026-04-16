import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState({ question: '', answer: '', order: 0 });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/faqs');
            setFaqs(res.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/faqs', newData);
            setNewData({ question: '', answer: '', order: 0 });
            fetchFAQs();
        } catch (err) { alert("Lỗi khi thêm"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Xóa câu hỏi này?")) {
            try {
                await axios.delete(`http://localhost:5000/api/faqs/${id}`);
                fetchFAQs();
            } catch (err) { alert("Lỗi khi xóa"); }
        }
    };

    if (loading) return <div className="p-10">Đang tải...</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form thêm */}
            <div className="lg:col-span-1">
                <form onSubmit={handleAdd} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm sticky top-10">
                    <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-8">Thêm câu hỏi FAQ</h3>
                    <div className="space-y-4">
                        <textarea 
                            placeholder="Câu hỏi" required rows="2"
                            value={newData.question} onChange={e => setNewData({...newData, question: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                        ></textarea>
                        <textarea 
                            placeholder="Câu trả lời" required rows="4"
                            value={newData.answer} onChange={e => setNewData({...newData, answer: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        ></textarea>
                        <input 
                            type="number" placeholder="Thứ tự hiển thị"
                            value={newData.order} onChange={e => setNewData({...newData, order: parseInt(e.target.value)})}
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
                {faqs.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                                <h4 className="font-bold text-[#002366] mb-2">{item.question}</h4>
                                <p className="text-slate-600 text-sm">{item.answer}</p>
                            </div>
                            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2 text-xl">
                                 🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQManager;
