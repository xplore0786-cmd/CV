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

// 6. CorporateBlock
export const CorporateBlock: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`bg-white min-h-[1122px] font-sans ${baseText} text-gray-800`}>
      <header className="p-8 text-white" style={{ backgroundColor: theme.accentColor }}>
        <h1 className="text-4xl font-bold mb-1">{data.personal.fullName}</h1>
        <p className="text-xl opacity-90 mb-4">{data.personal.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
        </div>
      </header>

      <div className="p-8">
        {visibility.summary && data.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2 uppercase border-b-2 pb-1 text-gray-900" style={{ borderBottomColor: theme.accentColor }}>Professional Summary</h2>
            <p className="leading-relaxed">{data.summary}</p>
          </section>
        )}

        {visibility.experience && data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 uppercase border-b-2 pb-1 text-gray-900" style={{ borderBottomColor: theme.accentColor }}>Work Experience</h2>
            <div className="flex flex-col gap-5">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg text-gray-900">{exp.role}</h3>
                    <span className="font-bold text-gray-600">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                  </div>
                  <div className="italic text-gray-700 mb-2">{exp.company} {exp.location && `- ${exp.location}`}</div>
                  <p className="whitespace-pre-line text-gray-800">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {visibility.education && data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 uppercase border-b-2 pb-1 text-gray-900" style={{ borderBottomColor: theme.accentColor }}>Education</h2>
            <div className="flex flex-col gap-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                    <span className="text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  <div className="text-gray-700">{edu.degree} {edu.gpa && `| GPA: ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// 7. ExecutiveStandard
export const ExecutiveStandard: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-serif ${baseText} bg-white min-h-[1122px] text-gray-900`}>
      <header className="text-center mb-8 border-b-4 pb-6" style={{ borderBottomColor: theme.accentColor }}>
        <h1 className="text-4xl font-bold uppercase mb-2" style={{ color: theme.accentColor }}>{data.personal.fullName}</h1>
        <p className="text-xl text-gray-600 mb-3">{data.personal.jobTitle}</p>
        <div className="flex justify-center gap-4 text-sm font-sans text-gray-600">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>| {data.personal.phone}</span>}
          {data.personal.location && <span>| {data.personal.location}</span>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-8">
          <p className="leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold uppercase mb-4 tracking-wider bg-gray-100 p-2" style={{ color: theme.accentColor }}>Professional Experience</h2>
          <div className="flex flex-col gap-6 px-2">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold">{exp.company}</h3>
                  <span className="font-bold">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="italic mb-2">{exp.role} {exp.location && `| ${exp.location}`}</div>
                <p className="whitespace-pre-line text-gray-800 leading-relaxed font-sans text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education omitted for brevity */}
    </div>
  );
};

// 8. SidebarProfessional
export const SidebarProfessional: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`flex bg-white min-h-[1122px] font-sans ${baseText} text-gray-800`}>
      <div className="w-1/3 bg-gray-100 p-8 border-r" style={{ borderRightColor: theme.accentColor, borderRightWidth: '4px' }}>
        {visibility.photo && data.personal.photo && (
          <img src={data.personal.photo} alt={data.personal.fullName} className="w-40 h-40 rounded mx-auto mb-6 object-cover shadow-md" />
        )}
        <h2 className="text-lg font-bold uppercase mb-4 text-gray-900 border-b-2 pb-1" style={{ borderBottomColor: theme.accentColor }}>Contact</h2>
        <div className="flex flex-col gap-3 mb-8 text-sm">
          {data.personal.email && <div><strong>E:</strong> {data.personal.email}</div>}
          {data.personal.phone && <div><strong>P:</strong> {data.personal.phone}</div>}
          {data.personal.location && <div><strong>L:</strong> {data.personal.location}</div>}
          {data.personal.linkedin && <div><strong>LI:</strong> {data.personal.linkedin}</div>}
        </div>

        {visibility.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase mb-4 text-gray-900 border-b-2 pb-1" style={{ borderBottomColor: theme.accentColor }}>Skills</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {data.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="w-2/3 p-8">
        <header className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">{data.personal.fullName}</h1>
          <p className="text-2xl" style={{ color: theme.accentColor }}>{data.personal.jobTitle}</p>
        </header>

        {visibility.summary && data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase mb-3 text-gray-900">Profile</h2>
            <p className="leading-relaxed text-gray-700">{data.summary}</p>
          </section>
        )}

        {visibility.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold uppercase mb-4 text-gray-900">Experience</h2>
            <div className="flex flex-col gap-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <div className="text-gray-600 font-medium mb-1">{exp.company} <span className="text-gray-400 mx-2">|</span> {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                  <p className="whitespace-pre-line text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
