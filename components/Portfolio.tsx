
import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  portfolio: PortfolioItem[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const categories = ['전체', ...new Set(portfolio.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredItems = activeCategory === '전체' 
    ? portfolio 
    : portfolio.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">PORTFOLIO</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900">성공적인 프로젝트 히스토리</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-3xl cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</span>
              <h4 className="text-white text-2xl font-black mb-2">{item.title}</h4>
              <p className="text-slate-200 text-sm line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
