import React from 'react';
import { ResumeData, ThemeConfig, VisibilityConfig } from '../types';
import { ResumeForm } from './Form';
import { getTemplateById } from '../templates';
import { ArrowLeft, Download, Settings, Save, Upload, ChevronDown } from 'lucide-react';

interface EditorProps {
  initialData: ResumeData;
  templateId: string;
  onBack: () => void;
}

export const Editor: React.FC<EditorProps> = ({ initialData, templateId, onBack }) => {
  const [data, setData] = React.useState<ResumeData>(initialData);
  const [theme, setTheme] = React.useState<ThemeConfig>({ accentColor: '#2563eb', fontSize: 'md' });
  const [visibility, setVisibility] = React.useState<VisibilityConfig>({
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    custom: true,
    photo: false,
  });
  
  const [showSettings, setShowSettings] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const TemplateComponent = getTemplateById(templateId).component;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrint = async () => {
    try {
      const element = document.getElementById('preview-container');
      if (element) {
        showToast('Generating PDF... Please wait.');
        
        try {
          const [htmlToImage, { jsPDF }] = await Promise.all([
            import('html-to-image'),
            import('jspdf')
          ]);

          // Temporarily remove scale transform so it captures at full 100% resolution
          const originalTransform = element.style.transform;
          element.style.transform = 'scale(1)';
          
          // Use pixel ratio 2 for high quality text
          const dataUrl = await htmlToImage.toJpeg(element, { 
            quality: 0.98, 
            backgroundColor: '#ffffff',
            pixelRatio: 2,
            style: { transform: 'scale(1)', transformOrigin: 'top left' }
          });
          
          element.style.transform = originalTransform;

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
          
          showToast('PDF downloaded successfully!');
        } catch (err) {
          console.error(err);
          showToast('Failed to generate PDF. Falling back to browser print...');
          window.print();
        }
      } else {
        window.print();
      }
    } catch (e) {
      showToast('Printing is blocked in preview. Please open the app in a new tab.');
    }
  };

  const handleExportTXT = () => {
    try {
      let content = `${data.personal.fullName}\n${data.personal.jobTitle}\n`;
      content += `${data.personal.email} | ${data.personal.phone} | ${data.personal.location}\n\n`;
      
      if (data.summary && visibility.summary) {
        content += `SUMMARY\n${data.summary}\n\n`;
      }
      
      if (data.experience.length > 0 && visibility.experience) {
        content += `EXPERIENCE\n`;
        data.experience.forEach(exp => {
          content += `${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})\n`;
          content += `${exp.location}\n`;
          content += `${exp.description}\n\n`;
        });
      }
      
      if (data.education.length > 0 && visibility.education) {
        content += `EDUCATION\n`;
        data.education.forEach(edu => {
          content += `${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate || 'Present'})\n`;
          if (edu.gpa) content += `GPA: ${edu.gpa}\n`;
          content += `\n`;
        });
      }
      
      if (data.skills.length > 0 && visibility.skills) {
        content += `SKILLS\n${data.skills.join(', ')}\n\n`;
      }
      
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.personal.fullName.replace(/\s+/g, '_')}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Text file downloaded successfully!');
    } catch (e) {
      showToast('Failed to export as TEXT.');
    }
  };

  const handleExportXLS = () => {
    try {
      let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"></head><body>`;
      
      html += `<table>`;
      html += `<tr><td colspan="2" style="font-size:18pt;font-weight:bold">${data.personal.fullName}</td></tr>`;
      html += `<tr><td colspan="2">${data.personal.jobTitle}</td></tr>`;
      html += `<tr><td colspan="2">${data.personal.email} | ${data.personal.phone} | ${data.personal.location}</td></tr>`;
      html += `<tr></tr>`;
      
      if (data.summary && visibility.summary) {
        html += `<tr><td colspan="2" style="font-weight:bold;font-size:14pt">SUMMARY</td></tr>`;
        html += `<tr><td colspan="2">${data.summary}</td></tr>`;
        html += `<tr></tr>`;
      }
      
      if (data.experience.length > 0 && visibility.experience) {
        html += `<tr><td colspan="2" style="font-weight:bold;font-size:14pt">EXPERIENCE</td></tr>`;
        data.experience.forEach(exp => {
          html += `<tr><td style="font-weight:bold">${exp.role}</td><td>${exp.startDate} - ${exp.endDate || 'Present'}</td></tr>`;
          html += `<tr><td>${exp.company}</td><td>${exp.location}</td></tr>`;
          html += `<tr><td colspan="2">${exp.description}</td></tr>`;
          html += `<tr></tr>`;
        });
      }
      
      if (data.education.length > 0 && visibility.education) {
        html += `<tr><td colspan="2" style="font-weight:bold;font-size:14pt">EDUCATION</td></tr>`;
        data.education.forEach(edu => {
          html += `<tr><td style="font-weight:bold">${edu.degree}</td><td>${edu.startDate} - ${edu.endDate || 'Present'}</td></tr>`;
          html += `<tr><td>${edu.institution}</td><td>GPA: ${edu.gpa || 'N/A'}</td></tr>`;
          html += `<tr></tr>`;
        });
      }
      
      if (data.skills.length > 0 && visibility.skills) {
        html += `<tr><td colspan="2" style="font-weight:bold;font-size:14pt">SKILLS</td></tr>`;
        html += `<tr><td colspan="2">${data.skills.join(', ')}</td></tr>`;
      }
      
      html += `</table></body></html>`;
      
      const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.personal.fullName.replace(/\s+/g, '_')}_Resume.xls`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('XLS file downloaded successfully!');
    } catch (e) {
      showToast('Failed to export as XLS.');
    }
  };

  const saveDraft = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(data));
      showToast('Draft saved to browser storage!');
    } catch (e) {
      showToast('Failed to save. Storage might be blocked.');
    }
  };

  const loadDraft = () => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        setData(JSON.parse(saved));
        showToast('Draft loaded successfully!');
      } else {
        showToast('No saved draft found.');
      }
    } catch (e) {
      showToast('Failed to load draft.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 print:hidden">
        <div className="flex items-center">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-6">
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Gallery</span>
          </button>
          <h1 className="text-xl font-bold text-gray-900 hidden sm:block">CVForge Editor</h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button onClick={saveDraft} className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-blue-50">
            <Save className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>
          <button onClick={loadDraft} className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-blue-50">
            <Upload className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Load Draft</span>
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`flex items-center text-sm font-medium transition-colors px-3 py-2 rounded-md ${showSettings ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Settings className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <div className="relative group">
            <button className="flex items-center text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              <span>Export</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border border-gray-200 hidden group-hover:block z-50 overflow-hidden">
              <button onClick={handlePrint} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">Export as PDF</button>
              <button onClick={handleExportTXT} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">Export as TEXT</button>
              <button onClick={handleExportXLS} className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors">Export as XLS</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex w-full pt-16 h-full print:pt-0">
        
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl z-50 text-sm font-medium transition-all transform duration-300">
            {toastMessage}
          </div>
        )}

        {/* Left Form Panel */}
        <div className="w-[450px] shrink-0 border-r border-gray-200 bg-white h-full overflow-hidden print:hidden flex flex-col relative z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {showSettings ? (
            <div className="p-6 h-full overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Template Settings</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Accent Color</label>
                <div className="flex flex-wrap gap-3">
                  {['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea', '#db2777', '#0f172a', '#475569'].map(color => (
                    <button
                      key={color}
                      onClick={() => setTheme({ ...theme, accentColor: color })}
                      className={`w-8 h-8 rounded-full border-2 ${theme.accentColor === color ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-900' : 'border-transparent shadow-sm'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="flex items-center ml-2">
                    <input 
                      type="color" 
                      value={theme.accentColor} 
                      onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0" 
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">Font Size</label>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  {(['sm', 'md', 'lg'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => setTheme({ ...theme, fontSize: size })}
                      className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize ${theme.fontSize === size ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Visible Sections</label>
                <div className="space-y-3">
                  {Object.entries(visibility).map(([key, isVisible]) => (
                    <label key={key} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isVisible} 
                        onChange={(e) => setVisibility({ ...visibility, [key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 capitalize">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ResumeForm data={data} onChange={setData} />
          )}
        </div>

        {/* Right Preview Panel */}
        <div className="flex-1 bg-gray-200 h-full overflow-y-auto relative print:overflow-visible print:bg-white print:w-full print:h-auto">
          {/* Print Styles */}
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              @page { size: A4; margin: 0; }
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: white; }
              #preview-container { transform: none !important; margin: 0 !important; box-shadow: none !important; width: 100% !important; height: auto !important; min-height: 100vh !important; }
            }
          `}} />
          
          <div className="py-12 flex justify-center min-w-max print:py-0 print:block">
            {/* A4 Size Paper (210mm x 297mm) aspect ratio 1:1.414, standard width ~800px */}
            <div 
              id="preview-container" 
              className="bg-white shadow-2xl w-[794px] min-h-[1122px] origin-top scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 xl:scale-100 transition-transform print:shadow-none"
            >
              <TemplateComponent data={data} theme={theme} visibility={visibility} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
