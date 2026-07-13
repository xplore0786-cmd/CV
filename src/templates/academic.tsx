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

// 13. ATSCompact
export const ATSCompact: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-8 font-sans ${baseText} bg-white min-h-[1122px] text-gray-900`}>
      <header className="text-center mb-3">
        <h1 className="text-2xl font-bold uppercase mb-0.5">{data.personal.fullName}</h1>
        <div className="text-sm font-medium flex justify-center flex-wrap gap-2 text-gray-600">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.email && data.personal.phone && <span>|</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.linkedin && <span>| {data.personal.linkedin}</span>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-3">
          <h2 className="text-md font-bold uppercase border-b-2 border-gray-900 mb-1">Summary</h2>
          <p className="text-justify leading-tight">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-3">
          <h2 className="text-md font-bold uppercase border-b-2 border-gray-900 mb-1">Experience</h2>
          <div className="flex flex-col gap-2">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.role} - {exp.company} {exp.location && `(${exp.location})`}</span>
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="whitespace-pre-line leading-tight pl-3">
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
        <section className="mb-3">
          <h2 className="text-md font-bold uppercase border-b-2 border-gray-900 mb-1">Education</h2>
          <div className="flex flex-col gap-1">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between">
                <div><span className="font-bold">{edu.degree}</span>, {edu.institution} {edu.gpa && `(GPA: ${edu.gpa})`}</div>
                <span className="font-bold">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {visibility.skills && data.skills.length > 0 && (
        <section className="mb-3">
          <h2 className="text-md font-bold uppercase border-b-2 border-gray-900 mb-1">Skills</h2>
          <p className="leading-tight font-medium">{data.skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
};

// 14. AcademicCV
export const AcademicCV: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-12 font-serif ${baseText} bg-white min-h-[1122px] text-gray-900 leading-relaxed`}>
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">{data.personal.fullName}</h1>
        <p className="italic text-lg mb-4 text-gray-700">{data.personal.jobTitle}</p>
        <div className="text-sm">
          <div>{data.personal.location}</div>
          <div>{data.personal.email} | {data.personal.phone}</div>
        </div>
      </header>

      {visibility.education && data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b border-gray-400 mb-4 pb-1">Education</h2>
          <div className="flex flex-col gap-5">
            {data.education.map(edu => (
              <div key={edu.id} className="flex">
                <div className="w-1/4 font-bold">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
                <div className="w-3/4">
                  <div className="font-bold">{edu.degree}</div>
                  <div className="italic">{edu.institution}, {edu.location}</div>
                  {edu.gpa && <div>GPA: {edu.gpa}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b border-gray-400 mb-4 pb-1">Academic & Professional Appointments</h2>
          <div className="flex flex-col gap-5">
            {data.experience.map(exp => (
              <div key={exp.id} className="flex">
                <div className="w-1/4 font-bold">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                <div className="w-3/4">
                  <div className="font-bold">{exp.role}</div>
                  <div className="italic mb-2">{exp.company}, {exp.location}</div>
                  <p className="whitespace-pre-line text-gray-800">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.summary && data.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase border-b border-gray-400 mb-4 pb-1">Research Interests</h2>
          <p>{data.summary}</p>
        </section>
      )}
    </div>
  );
};

// 15. ResearchPro
export const ResearchPro: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-sans ${baseText} bg-white min-h-[1122px] text-gray-800`}>
      <header className="border-l-8 pl-6 mb-8" style={{ borderColor: theme.accentColor }}>
        <h1 className="text-4xl font-bold mb-2">{data.personal.fullName}</h1>
        <p className="text-xl mb-3 text-gray-600 font-medium">{data.personal.jobTitle}</p>
        <div className="flex flex-col gap-1 text-sm font-medium">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.portfolio && <div style={{ color: theme.accentColor }}>{data.personal.portfolio}</div>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: theme.accentColor }}>Profile Overview</h2>
          <p className="leading-relaxed">{data.summary}</p>
        </section>
      )}

      <div className="flex gap-8">
        <div className="w-3/4">
          {visibility.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1" style={{ color: theme.accentColor, borderBottomColor: theme.accentColor }}>Experience</h2>
              <div className="flex flex-col gap-6">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <h3 className="text-lg font-bold">{exp.role}</h3>
                    <div className="text-gray-500 font-medium mb-2">{exp.company} | {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                    <p className="whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="w-1/4">
          {visibility.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1" style={{ color: theme.accentColor, borderBottomColor: theme.accentColor }}>Education</h2>
              <div className="flex flex-col gap-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <div className="text-gray-600 text-sm mb-1">{edu.institution}</div>
                    <div className="text-gray-500 text-xs font-bold">{formatDate(edu.startDate)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibility.skills && data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 border-b-2 pb-1" style={{ color: theme.accentColor, borderBottomColor: theme.accentColor }}>Expertise</h2>
              <ul className="list-disc pl-4 space-y-1">
                {data.skills.map((skill, i) => (
                  <li key={i} className="text-sm font-medium">{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
