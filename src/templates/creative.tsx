import React from 'react';
import { ResumeData, ThemeConfig, VisibilityConfig } from '../types';
import { formatDate } from '../utils';

type TemplateProps = { data: ResumeData; theme: ThemeConfig; visibility: VisibilityConfig };

const getFontSize = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return 'text-xs';
    case 'lg': return 'text-base';
    default: return 'text-sm';
  }
};

// 9. VibrantTimeline
export const VibrantTimeline: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-sans ${baseText} bg-slate-50 min-h-[1122px] text-slate-800`}>
      <header className="mb-10 text-center">
        <h1 className="text-5xl font-black tracking-tight mb-2" style={{ color: theme.accentColor }}>{data.personal.fullName}</h1>
        <p className="text-xl font-medium text-slate-500 mb-4">{data.personal.jobTitle}</p>
        <div className="flex justify-center gap-4 text-slate-500 text-sm font-medium">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-10 max-w-4xl mx-auto text-center">
          <p className="text-lg leading-relaxed text-slate-600">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: theme.accentColor }}>Experience Journey</h2>
          <div className="relative border-l-4 ml-4 md:ml-1/2" style={{ borderColor: theme.accentColor }}>
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="mb-8 ml-6 relative">
                <div className="absolute w-6 h-6 rounded-full -left-[35px] top-0 border-4 border-white shadow-sm" style={{ backgroundColor: theme.accentColor }}></div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                  <div className="font-medium text-slate-500 mb-2">{exp.company} • {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                  <p className="whitespace-pre-line text-slate-600">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// 10. BoldHeader
export const BoldHeader: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`font-sans ${baseText} bg-white min-h-[1122px] text-gray-800`}>
      <header className="p-12 text-center text-white" style={{ backgroundColor: theme.accentColor }}>
        {visibility.photo && data.personal.photo && (
          <img src={data.personal.photo} alt={data.personal.fullName} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg" />
        )}
        <h1 className="text-5xl font-black uppercase tracking-widest mb-3">{data.personal.fullName}</h1>
        <p className="text-2xl font-light tracking-widest opacity-90 mb-6">{data.personal.jobTitle}</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm opacity-90 font-medium">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
        </div>
      </header>

      <div className="p-12 max-w-5xl mx-auto">
        {visibility.summary && data.summary && (
          <section className="mb-10">
            <p className="text-xl leading-relaxed text-center font-light text-gray-600 italic">"{data.summary}"</p>
          </section>
        )}

        <div className="flex gap-12">
          <div className="w-2/3">
            {visibility.experience && data.experience.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-black uppercase mb-6" style={{ color: theme.accentColor }}>Experience</h2>
                <div className="flex flex-col gap-8">
                  {data.experience.map(exp => (
                    <div key={exp.id}>
                      <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                      <div className="text-gray-500 font-bold mb-3">{exp.company} <span className="mx-2">|</span> {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                      <p className="whitespace-pre-line text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="w-1/3">
            {visibility.skills && data.skills.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-black uppercase mb-6" style={{ color: theme.accentColor }}>Skills</h2>
                <div className="flex flex-col gap-2">
                  {data.skills.map((skill, i) => (
                    <div key={i} className="bg-gray-100 p-3 rounded font-bold text-gray-700 text-center">{skill}</div>
                  ))}
                </div>
              </section>
            )}
            
            {visibility.education && data.education.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-black uppercase mb-6" style={{ color: theme.accentColor }}>Education</h2>
                <div className="flex flex-col gap-6">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <div className="text-gray-600">{edu.institution}</div>
                      <div className="text-sm text-gray-500 mt-1">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
