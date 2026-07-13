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

// 17. PortfolioStyle (Creative)
export const PortfolioStyle: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`font-sans ${baseText} bg-[#111111] text-white min-h-[1122px]`}>
      <div className="p-12">
        <header className="mb-16">
          <h1 className="text-6xl font-black tracking-tighter mb-4 leading-none" style={{ color: theme.accentColor }}>{data.personal.fullName}</h1>
          <p className="text-3xl font-light text-gray-400">{data.personal.jobTitle}</p>
        </header>

        {visibility.summary && data.summary && (
          <section className="mb-16 max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">About</h2>
            <p className="text-xl leading-relaxed text-gray-300 font-light">{data.summary}</p>
          </section>
        )}

        <div className="flex gap-16">
          <div className="w-2/3">
            {visibility.experience && data.experience.length > 0 && (
              <section className="mb-16">
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-8">Selected Work</h2>
                <div className="flex flex-col gap-10">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="group">
                      <div className="text-sm font-mono text-gray-500 mb-2">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:pl-2 transition-all" style={{ color: theme.accentColor }}>{exp.role}</h3>
                      <div className="text-lg text-gray-400 mb-4">{exp.company}</div>
                      <p className="whitespace-pre-line text-gray-400 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          <div className="w-1/3">
            <div className="sticky top-12">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Contact</h2>
              <div className="flex flex-col gap-4 text-gray-300 mb-12">
                {data.personal.email && <div>{data.personal.email}</div>}
                {data.personal.phone && <div>{data.personal.phone}</div>}
                {data.personal.location && <div>{data.personal.location}</div>}
                {data.personal.portfolio && <div style={{ color: theme.accentColor }}>{data.personal.portfolio}</div>}
              </div>

              {visibility.skills && data.skills.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Expertise</h2>
                  <div className="flex flex-col gap-2 text-gray-300">
                    {data.skills.map((skill, i) => (
                      <div key={i}>{skill}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 18. Formal (Professional)
export const Formal: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-serif ${baseText} bg-white min-h-[1122px] text-gray-900`}>
      <header className="text-center mb-8 border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold uppercase mb-2">{data.personal.fullName}</h1>
        <div className="text-sm mb-1">{data.personal.location}</div>
        <div className="text-sm">
          {data.personal.phone} {data.personal.phone && data.personal.email && ' | '} {data.personal.email} {data.personal.linkedin && ` | ${data.personal.linkedin}`}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-center mb-2">Summary</h2>
          <p className="text-justify">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-center mb-4">Professional Experience</h2>
          <div className="flex flex-col gap-5">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold">
                  <span>{exp.company}, {exp.location}</span>
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="italic mb-2">{exp.role}</div>
                <p className="whitespace-pre-line pl-4 font-sans text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-center mb-4">Education</h2>
          <div className="flex flex-col gap-3">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold">
                  <span>{edu.institution}, {edu.location}</span>
                  <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <div className="italic">{edu.degree} {edu.gpa && `- GPA: ${edu.gpa}`}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// 19. Banking (Professional)
export const Banking: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-8 font-sans ${baseText} bg-white min-h-[1122px] text-black`}>
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-1">{data.personal.fullName}</h1>
        <div className="text-xs">
          {data.personal.location} • {data.personal.phone} • {data.personal.email}
        </div>
      </header>

      {visibility.education && data.education.length > 0 && (
        <section className="mb-4">
          <div className="bg-gray-200 font-bold uppercase text-xs px-2 py-1 mb-2">Education</div>
          <div className="flex flex-col gap-2 px-2">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                <div className="flex justify-between italic text-xs mb-1">
                  <span>{edu.degree}</span>
                  <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                {edu.gpa && <div className="text-xs pl-4">• Cumulative GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-4">
          <div className="bg-gray-200 font-bold uppercase text-xs px-2 py-1 mb-2">Experience</div>
          <div className="flex flex-col gap-3 px-2">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <div className="flex justify-between italic text-xs mb-1">
                  <span>{exp.role}</span>
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="whitespace-pre-line text-xs pl-4">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.skills && data.skills.length > 0 && (
        <section className="mb-4">
          <div className="bg-gray-200 font-bold uppercase text-xs px-2 py-1 mb-2">Skills & Interests</div>
          <div className="px-2 text-xs">
            <span className="font-bold">Skills: </span>{data.skills.join(', ')}
          </div>
        </section>
      )}
    </div>
  );
};

// 20. DarkModeCreative (Creative)
export const DarkModeCreative: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`font-sans ${baseText} bg-slate-900 text-slate-300 min-h-[1122px] p-10 flex gap-8`}>
      <div className="w-1/3 bg-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
        {visibility.photo && data.personal.photo && (
          <img src={data.personal.photo} alt={data.personal.fullName} className="w-40 h-40 rounded-full mb-6 object-cover border-4" style={{ borderColor: theme.accentColor }} />
        )}
        <h1 className="text-3xl font-bold text-white mb-2">{data.personal.fullName}</h1>
        <p className="text-lg font-medium mb-8" style={{ color: theme.accentColor }}>{data.personal.jobTitle}</p>

        <div className="w-full text-left mb-8 space-y-4 text-sm">
          {data.personal.email && <div><span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Email</span>{data.personal.email}</div>}
          {data.personal.phone && <div><span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Phone</span>{data.personal.phone}</div>}
          {data.personal.location && <div><span className="text-slate-500 block text-xs uppercase tracking-wider mb-1">Location</span>{data.personal.location}</div>}
        </div>

        {visibility.skills && data.skills.length > 0 && (
          <div className="w-full text-left">
            <span className="text-slate-500 block text-xs uppercase tracking-wider mb-3">Skills</span>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-700 text-white rounded-full text-xs font-medium">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 py-6">
        {visibility.summary && data.summary && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="w-8 h-1 mr-3 rounded-full" style={{ backgroundColor: theme.accentColor }}></span>
              Profile
            </h2>
            <p className="leading-relaxed">{data.summary}</p>
          </section>
        )}

        {visibility.experience && data.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-8 h-1 mr-3 rounded-full" style={{ backgroundColor: theme.accentColor }}></span>
              Experience
            </h2>
            <div className="flex flex-col gap-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-700">
                  <div className="absolute w-4 h-4 rounded-full -left-[9px] top-1" style={{ backgroundColor: theme.accentColor }}></div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <div className="text-sm font-medium mb-3" style={{ color: theme.accentColor }}>{exp.company} • {formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
                  <p className="whitespace-pre-line text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
