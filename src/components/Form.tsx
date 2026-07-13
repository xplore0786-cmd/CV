import React from 'react';
import { ResumeData } from '../types';
import { generateId } from '../utils';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface FormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm: React.FC<FormProps> = ({ data, onChange }) => {
  const [openSection, setOpenSection] = React.useState<string>('personal');

  const updatePersonal = (field: keyof ResumeData['personal'], value: string) => {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const updateSummary = (value: string) => {
    onChange({ ...data, summary: value });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { id: generateId(), company: '', role: '', startDate: '', endDate: '', isCurrent: false, location: '', description: '' }]
    });
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const newExp = [...data.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    onChange({ ...data, experience: newExp });
  };

  const removeExperience = (index: number) => {
    const newExp = [...data.experience];
    newExp.splice(index, 1);
    onChange({ ...data, experience: newExp });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { id: generateId(), institution: '', degree: '', startDate: '', endDate: '', location: '', gpa: '' }]
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...data.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    onChange({ ...data, education: newEdu });
  };

  const removeEducation = (index: number) => {
    const newEdu = [...data.education];
    newEdu.splice(index, 1);
    onChange({ ...data, education: newEdu });
  };
  
  const updateSkills = (value: string) => {
    // Basic comma separated parsing for now
    const skillsList = value.split(',').map(s => s.trim()).filter(s => s !== '');
    onChange({ ...data, skills: skillsList });
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const SectionHeader = ({ title, id }: { title: string, id: string }) => (
    <div 
      className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      {openSection === id ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
    </div>
  );

  return (
    <div className="bg-white shadow-sm border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Edit Details</h1>
      </div>

      <div className="divide-y divide-gray-200">
        {/* Personal Details */}
        <div>
          <SectionHeader title="Personal Details" id="personal" />
          {openSection === 'personal' && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={data.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input type="text" value={data.personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" value={data.personal.location} onChange={e => updatePersonal('location', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input type="text" value={data.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
                  <input type="text" value={data.personal.portfolio} onChange={e => updatePersonal('portfolio', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Optional)</label>
                <input type="url" value={data.personal.photo} onChange={e => updatePersonal('photo', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
              </div>
            </div>
          )}
        </div>

        {/* Professional Summary */}
        <div>
          <SectionHeader title="Professional Summary" id="summary" />
          {openSection === 'summary' && (
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
              <textarea 
                value={data.summary} 
                onChange={e => updateSummary(e.target.value)} 
                rows={5} 
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Briefly describe your professional background and goals..."
              />
            </div>
          )}
        </div>

        {/* Experience */}
        <div>
          <SectionHeader title="Experience" id="experience" />
          {openSection === 'experience' && (
            <div className="p-4 space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                  <button onClick={() => removeExperience(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input type="text" value={exp.company} onChange={e => updateExperience(index, 'company', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role/Title</label>
                      <input type="text" value={exp.role} onChange={e => updateExperience(index, 'role', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input type="month" value={exp.startDate} onChange={e => updateExperience(index, 'startDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input type="month" value={exp.endDate} onChange={e => updateExperience(index, 'endDate', e.target.value)} disabled={exp.isCurrent} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" />
                    </div>
                  </div>
                  <div className="mb-4 flex items-center">
                    <input type="checkbox" id={`current-${index}`} checked={exp.isCurrent} onChange={e => updateExperience(index, 'isCurrent', e.target.checked)} className="mr-2 h-4 w-4 text-blue-600 rounded" />
                    <label htmlFor={`current-${index}`} className="text-sm font-medium text-gray-700">I currently work here</label>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" value={exp.location} onChange={e => updateExperience(index, 'location', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Bullet points recommended)</label>
                    <textarea 
                      value={exp.description} 
                      onChange={e => updateExperience(index, 'description', e.target.value)} 
                      rows={4} 
                      className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="• Achieved X by doing Y..."
                    />
                  </div>
                </div>
              ))}
              <button 
                onClick={addExperience}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-500 hover:text-blue-500 flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" /> Add Experience
              </button>
            </div>
          )}
        </div>

        {/* Education */}
        <div>
          <SectionHeader title="Education" id="education" />
          {openSection === 'education' && (
            <div className="p-4 space-y-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 relative">
                  <button onClick={() => removeEducation(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input type="text" value={edu.institution} onChange={e => updateEducation(index, 'institution', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Field of Study</label>
                      <input type="text" value={edu.degree} onChange={e => updateEducation(index, 'degree', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input type="month" value={edu.startDate} onChange={e => updateEducation(index, 'startDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input type="month" value={edu.endDate} onChange={e => updateEducation(index, 'endDate', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input type="text" value={edu.location} onChange={e => updateEducation(index, 'location', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                      <input type="text" value={edu.gpa} onChange={e => updateEducation(index, 'gpa', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={addEducation}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-blue-500 hover:text-blue-500 flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div>
          <SectionHeader title="Skills" id="skills" />
          {openSection === 'skills' && (
            <div className="p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Comma separated)</label>
              <textarea 
                value={data.skills.join(', ')} 
                onChange={e => updateSkills(e.target.value)} 
                rows={3} 
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JavaScript, React, Project Management, SEO..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
