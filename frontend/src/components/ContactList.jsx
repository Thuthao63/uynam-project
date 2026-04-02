import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENT THỐNG KÊ (StatsHeader) ---
const StatsHeader = ({ contacts }) => {
  const total = contacts.length;
  const nhaPhoCount = contacts.filter(c => c.service === 'Nhà phố').length;
  const bietThuCount = contacts.filter(c => c.service === 'Biệt thự').length;
  const noiThatCount = contacts.filter(c => c.service === 'Nội thất').length;

  const stats = [
    { label: 'Tổng yêu cầu', value: total, icon: '📩', color: 'text-blue-600', bg: 'bg-blue-50', grow: 'Live' },
    { label: 'Nhà phố', value: nhaPhoCount, icon: '🏠', color: 'text-purple-600', bg: 'bg-purple-50', grow: 'Hot' },
    { label: 'Biệt thự', value: bietThuCount, icon: '🏰', color: 'text-orange-600', bg: 'bg-orange-50', grow: 'Premium' },
    { label: 'Nội thất', value: noiThatCount, icon: '🛋️', color: 'text-teal-600', bg: 'bg-teal-50', grow: 'New' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 text-4xl opacity-10 group-hover:scale-125 transition-transform">
            {stat.icon}
          </div>
          <div className="relative z-10">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 text-xl`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-3xl font-black text-slate-800">{stat.value}</h4>
              <span className={`text-[9px] font-black ${stat.color} bg-white px-2 py-0.5 rounded-full border border-slate-100 uppercase`}>
                {stat.grow}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT (ContactList) ---
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tất cả');

  const fetchContacts = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/contacts')
      .then(res => {
        setContacts(res.data);
        setFilteredContacts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi server:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (filter === 'Tất cả') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(c => c.service === filter));
    }
  }, [filter, contacts]);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa yêu cầu này?')) {
      axios.delete(`http://localhost:5000/api/contacts/${id}`)
        .then(() => fetchContacts())
        .catch(() => alert("Xóa thất bại!"));
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 font-sans bg-slate-50/50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Hộp thư khách hàng</h2>
          <p className="text-slate-500 mt-1 italic">Bạn đang quản lý dữ liệu thời gian thực</p>
        </div>
        <button onClick={fetchContacts} className="text-blue-500 font-bold hover:underline text-sm">Làm mới dữ liệu</button>
      </div>

      {/* 1. HIỂN THỊ THỐNG KÊ Ở ĐÂY */}
      <StatsHeader contacts={contacts} />

      {/* 2. BỘ LỌC DỊCH VỤ */}
      <div className="flex items-center bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm overflow-x-auto whitespace-nowrap w-fit">
        {['Tất cả', 'Nhà phố', 'Biệt thự', 'Nội thất'].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              filter === item ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 3. BẢNG DỮ LIỆU */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Khách hàng</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông tin liên hệ</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Dịch vụ & Nội dung</th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode='popLayout'>
                {filteredContacts.map((contact) => (
                  <motion.tr
                    key={contact.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="group hover:bg-blue-50/20 transition-all"
                  >
                    {/* CỘT 1: TÊN & NGÀY */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-400 text-white flex items-center justify-center font-black text-lg shadow-inner">
                          {(contact.name || 'U').charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg leading-none">{contact.name}</p>
                          <p className="text-[11px] text-slate-400 mt-1.5 font-medium uppercase tracking-tighter">
                            {new Date(contact.createdAt).toLocaleTimeString('vi-VN')} - {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CỘT 2: SĐT & EMAIL */}
                    <td className="p-6">
                      <div className="space-y-1.5 text-sm font-bold text-slate-700">
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-blue-500">
                           {contact.phone || 'Chưa có SĐT'}
                        </a>
                        <p className="text-xs font-medium text-slate-500 underline">{contact.email}</p>
                      </div>
                    </td>

                    {/* CỘT 3: DỊCH VỤ & MESSAGE */}
                    <td className="p-6">
                      <div className="space-y-2">
                        <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-wider">
                          {contact.service}
                        </span>
                        <p className="text-sm text-slate-600 italic font-light line-clamp-2 max-w-xs">
                          "{contact.message || "Không có lời nhắn"}"
                        </p>
                      </div>
                    </td>

                    {/* CỘT 4: THAO TÁC */}
                    <td className="p-6 text-right">
                      <button onClick={() => handleDelete(contact.id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactList;