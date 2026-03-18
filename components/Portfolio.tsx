
import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { ExternalLink } from 'lucide-react';

interface PortfolioProps {
  portfolio: PortfolioItem[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">PORTFOLIO</h2>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900">성공적인 프로젝트 히스토리</h3>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {portfolio.map((item) => (
          <a 
            key={item.id} 
            href={item.link || '#'} 
            target={item.link ? "_blank" : "_self"} 
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl cursor-pointer block bg-slate-100"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <div className="flex items-center justify-between mb-2">
                {item.link && <ExternalLink size={18} className="text-white/70" />}
              </div>
              <h4 className="text-white text-2xl font-black mb-2">{item.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
