import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const HomeContentManager = () => {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get('/home-content');
            setSettings(res.data);
        } catch (err) {
            console.error("Lỗi:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const bulkData = Object.keys(settings).map(key => ({
                key,
                value: settings[key],
                category: key.startsWith('stat_') ? 'Stats' : 'Hero'
            }));
            await axios.post('/home-content/bulk', bulkData);
            alert("Đã lưu cài đặt trang chủ thành công!");
        } catch (err) {
            alert("Lỗi khi lưu dữ liệu");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-slate-400">Đang tải...</div>;

    return (
        <div className="space-y-10">
            {/* Stats Section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-8">Thống kê (Stats)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { key: 'stat_projects', label: 'Công trình' },
                        { key: 'stat_experience', label: 'Năm kinh nghiệm' },
                        { key: 'stat_engineers', label: 'KTS & Kỹ sư' },
                        { key: 'stat_satisfaction', label: 'Hài lòng' },
                    ].map(item => (
                        <div key={item.key}>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{item.label}</label>
                            <input 
                                type="text"
                                value={settings[item.key] || ''}
                                onChange={(e) => handleChange(item.key, e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-[#002366] uppercase tracking-tighter mb-8">Màn hình chính (Hero)</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tiêu đề chính</label>
                        <input 
                            type="text"
                            value={settings['hero_title'] || ''}
                            onChange={(e) => handleChange('hero_title', e.target.value)}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-lg font-black text-[#002366]"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Câu Slogan</label>
                        <input 
                            type="text"
                            value={settings['hero_subtitle'] || ''}
                            onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Link Video Teaser (mp4)</label>
                        <input 
                            type="text"
                            value={settings['hero_video'] || ''}
                            onChange={(e) => handleChange('hero_video', e.target.value)}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-blue-500"
                            placeholder="/teaser.mp4"
                        />
                    </div>
                </div>
            </div>

            <button 
                onClick={handleSave}
                disabled={saving}
                className="fixed bottom-10 right-10 bg-[#002366] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-2xl disabled:opacity-50"
            >
                {saving ? "Đang lưu..." : "Lưu tất cả thay đổi"}
            </button>
        </div>
    );
};

export default HomeContentManager;
