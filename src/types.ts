export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // Native, Fluent, Intermediate, Basic
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    photo: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  custom: CustomSection[];
}

export interface ThemeConfig {
  accentColor: string;
  fontSize: 'sm' | 'md' | 'lg';
}

export interface VisibilityConfig {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  languages: boolean;
  custom: boolean;
  photo: boolean;
}

export interface Template {
  id: string;
  name: string;
  category: 'Modern/Minimalist' | 'Professional/Corporate' | 'Creative/Colorful' | 'ATS-Friendly/Plain text' | 'Academic/CV' | 'Executive/Premium';
  component: React.FC<{ data: ResumeData; theme: ThemeConfig; visibility: VisibilityConfig }>;
}
