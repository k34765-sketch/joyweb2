
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-teal-600 font-bold tracking-widest text-sm uppercase">TESTIMONIALS</h2>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900">클라이언트의 생생한 후기</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-slate-50 p-10 rounded-3xl relative overflow-hidden group">
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-slate-100 group-hover:text-teal-100 transition-colors" />
            <div className="relative z-10">
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 text-lg italic leading-relaxed mb-8">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.company}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
