import { Minimal, TwoColumnModern, CleanLine, Elegant, Tech } from './modern';
import { CorporateBlock, ExecutiveStandard, SidebarProfessional } from './professional';
import { VibrantTimeline, BoldHeader } from './creative';
import { ATSBasic, ATSSans } from './ats';
import { ATSCompact, AcademicCV, ResearchPro } from './academic';
import { PremiumLeadership } from './premium';
import { PortfolioStyle, Formal, Banking, DarkModeCreative } from './extra';
import { Template } from '../types';

export const templates: Template[] = [
  { id: 'minimal', name: 'Minimal', category: 'Modern/Minimalist', component: Minimal },
  { id: 'two-column-modern', name: 'Two Column', category: 'Modern/Minimalist', component: TwoColumnModern },
  { id: 'clean-line', name: 'Clean Line', category: 'Modern/Minimalist', component: CleanLine },
  { id: 'elegant', name: 'Elegant', category: 'Modern/Minimalist', component: Elegant },
  { id: 'tech', name: 'Tech', category: 'Modern/Minimalist', component: Tech },
  
  { id: 'corporate-block', name: 'Corporate Block', category: 'Professional/Corporate', component: CorporateBlock },
  { id: 'executive-standard', name: 'Executive Standard', category: 'Professional/Corporate', component: ExecutiveStandard },
  { id: 'sidebar-professional', name: 'Sidebar Professional', category: 'Professional/Corporate', component: SidebarProfessional },
  { id: 'formal', name: 'Formal', category: 'Professional/Corporate', component: Formal },
  { id: 'banking', name: 'Investment Banking', category: 'Professional/Corporate', component: Banking },
  
  { id: 'vibrant-timeline', name: 'Vibrant Timeline', category: 'Creative/Colorful', component: VibrantTimeline },
  { id: 'bold-header', name: 'Bold Header', category: 'Creative/Colorful', component: BoldHeader },
  { id: 'portfolio', name: 'Portfolio Style', category: 'Creative/Colorful', component: PortfolioStyle },
  { id: 'dark-creative', name: 'Dark Creative', category: 'Creative/Colorful', component: DarkModeCreative },
  
  { id: 'ats-basic', name: 'ATS Basic (Serif)', category: 'ATS-Friendly/Plain text', component: ATSBasic },
  { id: 'ats-sans', name: 'ATS Modern (Sans)', category: 'ATS-Friendly/Plain text', component: ATSSans },
  { id: 'ats-compact', name: 'ATS Compact', category: 'ATS-Friendly/Plain text', component: ATSCompact },

  { id: 'academic-cv', name: 'Standard CV', category: 'Academic/CV', component: AcademicCV },
  { id: 'research-pro', name: 'Research Pro', category: 'Academic/CV', component: ResearchPro },

  { id: 'premium-leadership', name: 'Premium Leadership', category: 'Executive/Premium', component: PremiumLeadership },
];

export const getTemplateById = (id: string) => {
  return templates.find(t => t.id === id) || templates[0];
};

export const getCategories = () => {
  const categories = new Set(templates.map(t => t.category));
  return Array.from(categories);
};

