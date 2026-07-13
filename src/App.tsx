import React from 'react';
import { Gallery } from './components/Gallery';
import { Editor } from './components/Editor';
import { templates, getCategories } from './templates';
import { initialResumeData } from './store';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  if (selectedTemplate) {
    return (
      <Editor 
        initialData={initialResumeData} 
        templateId={selectedTemplate} 
        onBack={() => setSelectedTemplate(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-white font-bold">
              CV
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">CVForge</span>
          </div>
          <a href="https://github.com" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Documentation</a>
        </div>
      </header>
      
      <main>
        <Gallery 
          templates={templates} 
          categories={getCategories()} 
          onSelect={setSelectedTemplate} 
        />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 text-sm mt-12">
        <p>© 2026 CVForge. All rights reserved.</p>
      </footer>
    </div>
  );
}
