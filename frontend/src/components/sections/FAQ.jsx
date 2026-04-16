import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../api/axios';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/faqs');
        setFaqs(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading || faqs.length === 0) return null;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-[#2d86f4] text-xs font-bold tracking-[0.5em] uppercase mb-4">Support Center</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#002366] tracking-tighter uppercase">Câu hỏi thường gặp</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.id} className="border-b border-slate-100 last:border-0 overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full py-8 flex justify-between items-center text-left group"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${activeIndex === idx ? 'text-blue-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <span className={`transform transition-transform duration-300 ${activeIndex === idx ? 'rotate-45 text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="pb-8 text-slate-500 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
