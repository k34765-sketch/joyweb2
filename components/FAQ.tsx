
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">FAQ</h2>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900">자주 묻는 질문</h3>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-bold text-slate-900 pr-8">{item.question}</span>
              {openId === item.id ? <ChevronUp className="text-teal-600 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
            </button>
            {openId === item.id && (
              <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4 bg-slate-50/30">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
