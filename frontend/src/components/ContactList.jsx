import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/contacts')
      .then(res => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải danh sách liên hệ:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
      axios.delete(`http://localhost:5000/api/contacts/${id}`)
        .then(() => {
          fetchContacts(); // Tải lại danh sách sau khi xóa
        })
        .catch(err => {
          console.error("Lỗi khi xóa liên hệ:", err);
          alert("Xóa thất bại. Vui lòng thử lại.");
        });
    }
  };

  if (loading) return <div className="text-center p-4">Đang tải danh sách...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (contacts.length === 0) return <div className="text-center p-4 bg-slate-100 rounded-lg">Chưa có thông tin liên hệ nào.</div>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left font-bold text-slate-600 uppercase p-4">Ngày gửi</th>
              <th className="text-left font-bold text-slate-600 uppercase p-4">Họ tên</th>
              <th className="text-left font-bold text-slate-600 uppercase p-4">Email</th>
              <th className="text-left font-bold text-slate-600 uppercase p-4">Nội dung</th>
              <th className="text-left font-bold text-slate-600 uppercase p-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td className="p-4 text-slate-500 whitespace-nowrap">{new Date(contact.createdAt).toLocaleString('vi-VN')}</td>
                <td className="p-4 font-medium text-slate-800">{contact.name}</td>
                <td className="p-4 text-slate-500">{contact.email}</td>
                <td className="p-4 text-slate-600 max-w-sm truncate" title={contact.message}>{contact.message}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(contact.id)} className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-bold">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;