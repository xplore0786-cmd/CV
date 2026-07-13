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

// 1. Minimal
export const Minimal: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-8 font-sans ${baseText} text-gray-800 bg-white min-h-[1122px]`} style={{ color: '#333' }}>
      <header className="mb-6 border-b-2 pb-4" style={{ borderColor: theme.accentColor }}>
        <h1 className="text-4xl font-light tracking-wide uppercase mb-1" style={{ color: theme.accentColor }}>{data.personal.fullName}</h1>
        <p className="text-xl text-gray-500 mb-2">{data.personal.jobTitle}</p>
        <div className="flex flex-wrap gap-4 text-gray-500">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
          {data.personal.portfolio && <span>{data.personal.portfolio}</span>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-6">
          <p className="leading-relaxed">{data.summary}</p>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold uppercase mb-3" style={{ color: theme.accentColor }}>Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-800">{exp.role}</h3>
                  <span className="text-gray-500 whitespace-nowrap ml-4">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="text-gray-600 mb-2 font-medium">{exp.company} {exp.location && `• ${exp.location}`}</div>
                <p className="whitespace-pre-line leading-relaxed text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold uppercase mb-3" style={{ color: theme.accentColor }}>Education</h2>
          <div className="flex flex-col gap-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                </div>
                <div className="text-gray-600 font-medium">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                {edu.gpa && <div className="text-gray-500 mt-1">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold uppercase mb-3" style={{ color: theme.accentColor }}>Skills</h2>
          <p className="leading-relaxed">{data.skills.join(', ')}</p>
        </section>
      )}
      
      {/* Projects, Certifications, Languages omitted for brevity in minimal template, can be added if requested */}
    </div>
  );
};

// 2. TwoColumnModern
export const TwoColumnModern: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`flex bg-white min-h-[1122px] font-sans ${baseText}`}>
      <div className="w-1/3 p-8 text-white" style={{ backgroundColor: theme.accentColor }}>
        {visibility.photo && data.personal.photo && (
          <img src={data.personal.photo} alt={data.personal.fullName} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white/20" />
        )}
        <h1 className="text-3xl font-bold mb-2 text-center">{data.personal.fullName}</h1>
        <p className="text-lg text-center mb-8 opacity-90">{data.personal.jobTitle}</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">Contact</h2>
          <div className="flex flex-col gap-3 text-white/90">
            {data.personal.email && <div>{data.personal.email}</div>}
            {data.personal.phone && <div>{data.personal.phone}</div>}
            {data.personal.location && <div>{data.personal.location}</div>}
            {data.personal.linkedin && <div>{data.personal.linkedin}</div>}
            {data.personal.portfolio && <div>{data.personal.portfolio}</div>}
          </div>
        </div>

        {visibility.skills && data.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/30 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-white/20 px-2 py-1 rounded text-sm">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="w-2/3 p-8 text-gray-800">
        {visibility.summary && data.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3" style={{ color: theme.accentColor }}>Profile</h2>
            <p className="leading-relaxed">{data.summary}</p>
          </section>
        )}

        {visibility.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.accentColor }}>Experience</h2>
            <div className="flex flex-col gap-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <span className="text-gray-500 font-medium whitespace-nowrap ml-2">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                  </div>
                  <div className="text-gray-600 font-medium mb-2">{exp.company} {exp.location && `• ${exp.location}`}</div>
                  <p className="whitespace-pre-line text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {visibility.education && data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.accentColor }}>Education</h2>
            <div className="flex flex-col gap-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <div className="text-gray-600 font-medium">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                  <div className="text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)} {edu.gpa && `• GPA: ${edu.gpa}`}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// 3. CleanLine
export const CleanLine: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-sans ${baseText} bg-white min-h-[1122px] text-gray-800`}>
      <header className="flex justify-between items-end mb-8 border-b-4 pb-4" style={{ borderColor: theme.accentColor }}>
        <div>
          <h1 className="text-5xl font-bold tracking-tighter mb-2 text-gray-900">{data.personal.fullName}</h1>
          <p className="text-2xl font-medium" style={{ color: theme.accentColor }}>{data.personal.jobTitle}</p>
        </div>
        <div className="text-right text-gray-500 space-y-1">
          {data.personal.email && <div>{data.personal.email}</div>}
          {data.personal.phone && <div>{data.personal.phone}</div>}
          {data.personal.location && <div>{data.personal.location}</div>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-8 flex">
          <div className="w-1/4 font-bold text-gray-900 uppercase tracking-widest text-sm pt-1">Summary</div>
          <div className="w-3/4">
            <p className="leading-relaxed">{data.summary}</p>
          </div>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-8 flex">
          <div className="w-1/4 font-bold text-gray-900 uppercase tracking-widest text-sm pt-1">Experience</div>
          <div className="w-3/4 flex flex-col gap-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                <div className="flex justify-between text-gray-600 font-medium mb-2" style={{ color: theme.accentColor }}>
                  <span>{exp.company}</span>
                  <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-line text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {visibility.education && data.education.length > 0 && (
        <section className="mb-8 flex">
          <div className="w-1/4 font-bold text-gray-900 uppercase tracking-widest text-sm pt-1">Education</div>
          <div className="w-3/4 flex flex-col gap-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                <div className="text-gray-600" style={{ color: theme.accentColor }}>{edu.institution}</div>
                <div className="text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// 4. Elegant (Serif)
export const Elegant: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-10 font-serif ${baseText} bg-[#fafafa] min-h-[1122px] text-gray-800`}>
      <header className="text-center mb-10">
        <h1 className="text-4xl font-normal mb-2 text-gray-900" style={{ color: theme.accentColor }}>{data.personal.fullName}</h1>
        <p className="text-lg uppercase tracking-[0.2em] text-gray-500 mb-4">{data.personal.jobTitle}</p>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600 text-sm font-sans">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
        </div>
      </header>

      {visibility.summary && data.summary && (
        <section className="mb-8 text-center max-w-3xl mx-auto">
          <p className="leading-loose italic text-gray-700">{data.summary}</p>
          <div className="w-12 border-b mt-6 mx-auto" style={{ borderColor: theme.accentColor }}></div>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl uppercase tracking-widest text-center mb-6" style={{ color: theme.accentColor }}>Professional Experience</h2>
          <div className="flex flex-col gap-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="relative pl-6 border-l" style={{ borderColor: theme.accentColor }}>
                <div className="absolute w-2 h-2 rounded-full -left-[4.5px] top-2" style={{ backgroundColor: theme.accentColor }}></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">{exp.role}</h3>
                  <span className="font-sans text-sm text-gray-500 uppercase tracking-wider">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <div className="font-sans font-medium text-gray-700 mb-2">{exp.company}</div>
                <p className="whitespace-pre-line text-gray-600 font-sans leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// 5. Tech (Monospace accents)
export const Tech: React.FC<TemplateProps> = ({ data, theme, visibility }) => {
  const baseText = getFontSize(theme.fontSize);
  return (
    <div className={`p-8 bg-white min-h-[1122px] font-sans ${baseText} text-gray-800`}>
      <header className="mb-8 bg-gray-50 p-6 border-l-4" style={{ borderColor: theme.accentColor }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-1">{data.personal.fullName}</h1>
        <p className="text-xl font-mono" style={{ color: theme.accentColor }}>{`> ${data.personal.jobTitle}`}</p>
        <div className="mt-4 font-mono text-sm text-gray-600 flex flex-col gap-1">
          {data.personal.email && <div>Email: {data.personal.email}</div>}
          {data.personal.phone && <div>Phone: {data.personal.phone}</div>}
          {data.personal.linkedin && <div>LinkedIn: {data.personal.linkedin}</div>}
        </div>
      </header>

      {visibility.skills && data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-mono font-bold mb-3 uppercase" style={{ color: theme.accentColor }}>{'// Skills'}</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 border text-gray-700 font-mono text-sm rounded-md" style={{ borderColor: theme.accentColor }}>{skill}</span>
            ))}
          </div>
        </section>
      )}

      {visibility.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-mono font-bold mb-4 uppercase" style={{ color: theme.accentColor }}>{'// Experience'}</h2>
          <div className="flex flex-col gap-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold">{exp.role} <span className="text-gray-500 font-normal">@ {exp.company}</span></h3>
                  <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                </div>
                <p className="whitespace-pre-line text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
