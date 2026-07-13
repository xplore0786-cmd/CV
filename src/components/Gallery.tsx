import React from 'react';
import { Template } from '../types';

interface GalleryProps {
  templates: Template[];
  onSelect: (templateId: string) => void;
  categories: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ templates, onSelect, categories }) => {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4">Choose Your Template</h1>
        <p className="text-xl text-gray-500">Select from our professionally designed resume templates.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button 
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="group cursor-pointer flex flex-col"
            onClick={() => onSelect(template.id)}
          >
            <div className="aspect-[21/29.7] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 relative transition-all group-hover:shadow-lg group-hover:border-blue-500 flex items-center justify-center bg-gray-50">
              {/* Using a placeholder for thumbnail since rendering full templates in grid is heavy */}
              <div className="text-gray-400 font-medium p-4 text-center">
                {template.name} Preview
              </div>
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  Select Template
                </span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
            <p className="text-sm text-gray-500">{template.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
