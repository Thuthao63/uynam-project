import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from '../../api/axios';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get('/api/partners');
        setPartners(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchPartners();
  }, []);

  if (loading && partners.length === 0) return null;
  return (
    <section className="py-20 bg-white border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Đồng hành cùng các thương hiệu uy tín</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-2xl font-black text-slate-800 tracking-tighter"
            >
              {p.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
