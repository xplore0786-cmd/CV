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

// 16. PremiumLeadership
export const PremiumLeadership: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-12 font-serif ${baseText} bg-[#FDFDFD] min-h-[1122px] text-gray-900 border-t-[16px]`} style={{ borderTopColor: theme.accentColor }}>
      <header className="mb-12 flex justify-between items-end">
        <div className="w-2/3">
          <h1 className="text-5xl font-normal tracking-tight mb-2 text-gray-900">{data.personal.fullName}</h1>
          <p className="text-2xl italic text-gray-600 font-light">{data.personal.jobTitle}</p>
        </div>
        <div className="w-1/3 text-right font-sans text-xs tracking-widest uppercase text-gray-500 leading-relaxed">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
          {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-12 border-l-2 pl-6" style={{ borderColor: theme.accentColor }}>
          <p className="text-lg leading-relaxed text-gray-700 italic font-medium">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-sans font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Professional Experience</h2>
          <div className="flex flex-col gap-10">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline border-b pb-2 mb-4 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                  <span className="font-sans text-sm font-bold text-gray-500 tracking-wider uppercase">{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                </div>
                <div className="text-lg text-gray-600 mb-4 font-medium" style={{ color: theme.accentColor }}>{exp.company} <span className="text-gray-400 font-normal mx-2">|</span> <span className="text-gray-500 font-normal italic">{exp.location}</span></div>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed font-sans text-[15px]">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <div className="flex gap-12 mt-12">
        <div className="w-1/2">
          {visibility.education && data.education.length > 0 && (
            <section>
              <h2 className="text-sm font-sans font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Education</h2>
              <div className="flex flex-col gap-6">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h3>
                    <div className="font-sans text-sm text-gray-600">{edu.institution}</div>
                    <div className="font-sans text-xs text-gray-400 mt-1 uppercase tracking-widest">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="w-1/2">
          {visibility.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-sans font-bold uppercase tracking-[0.2em] mb-6 text-gray-400">Core Competencies</h2>
              <div className="flex flex-wrap gap-2 font-sans text-sm">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200">{skill}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
