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

// 11. ATSBasic (Times New Roman style)
export const ATSBasic: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-serif ${baseText} bg-white min-h-[1122px] text-black`}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-1">{data.personal.fullName}</h1>
        <div className="text-sm flex justify-center flex-wrap gap-2">
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.location && (data.personal.phone || data.personal.email) && <span>|</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.phone && data.personal.email && <span>|</span>}
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.linkedin && <span>| {data.personal.linkedin}</span>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Summary</h2>
          <p className="text-justify">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Professional Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.company} {exp.location && `- ${exp.location}`}</span>
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="italic mb-1">{exp.role}</div>
                <div className="whitespace-pre-line pl-4">
                  {exp.description.split('\n').map((line, i) => (
                    line.trim() ? <div key={i}>{line.startsWith('•') ? line : `• ${line}`}</div> : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.education && data.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
          <div className="flex flex-col gap-2">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-bold">{edu.institution}</span>, {edu.location} — <span className="italic">{edu.degree}</span>
                  {edu.gpa && <span> (GPA: {edu.gpa})</span>}
                </div>
                <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Skills</h2>
          <p>{data.skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
};

// 12. ATSSans (Arial style)
export const ATSSans: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-sans ${baseText} bg-white min-h-[1122px] text-black`}>
      <header className="mb-6 border-b-2 border-black pb-2">
        <h1 className="text-3xl font-bold mb-1">{data.personal.fullName}</h1>
        <div className="text-sm">
          {data.personal.email && <span>{data.personal.email} • </span>}
          {data.personal.phone && <span>{data.personal.phone} • </span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
        </div>
      </header>

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase mb-2">Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-lg">
                  <span>{exp.role}</span>
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="font-bold mb-1">{exp.company}</div>
                <p className="whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education omitted for brevity */}
    </div>
  );
};
