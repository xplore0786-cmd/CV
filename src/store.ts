import { ResumeData, ThemeConfig, VisibilityConfig } from '../types';

export const initialResumeData: ResumeData = {
  personal: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    portfolio: 'janedoe.dev',
    photo: '',
  },
  summary: 'Passionate and results-driven Senior Software Engineer with over 8 years of experience building scalable web applications. Proven ability to lead cross-functional teams, optimize performance, and deliver high-quality software solutions on time.',
  experience: [
    {
      id: '1',
      company: 'Tech Innovators Inc.',
      role: 'Lead Developer',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '',
      isCurrent: true,
      description: '• Led a team of 5 engineers to migrate legacy monolith to microservices architecture, reducing latency by 40%.\n• Implemented CI/CD pipelines using GitHub Actions, decreasing deployment time by 60%.\n• Mentored junior developers and conducted weekly code reviews.',
    },
    {
      id: '2',
      company: 'Digital Solutions LLC',
      role: 'Software Engineer',
      location: 'Austin, TX',
      startDate: '2016-06',
      endDate: '2019-12',
      isCurrent: false,
      description: '• Developed and maintained scalable RESTful APIs using Node.js and Express.\n• Integrated third-party payment gateways, processing over $1M in monthly transactions.\n• Optimized database queries, resulting in a 30% increase in application speed.',
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      location: 'Boston, MA',
      startDate: '2012-09',
      endDate: '2016-05',
      gpa: '3.8/4.0',
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL'],
  projects: [
    {
      id: '1',
      name: 'OpenSource E-commerce',
      description: 'A fully functional headless e-commerce platform built with Next.js and Stripe.',
      link: 'github.com/janedoe/ecommerce'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2021-08'
    }
  ],
  languages: [
    {
      id: '1',
      name: 'English',
      proficiency: 'Native'
    },
    {
      id: '2',
      name: 'Spanish',
      proficiency: 'Fluent'
    }
  ],
  custom: []
};

export const defaultTheme: ThemeConfig = {
  accentColor: '#2563eb', // Blue-600
  fontSize: 'md',
};

export const defaultVisibility: VisibilityConfig = {
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  certifications: true,
  languages: true,
  custom: true,
  photo: false,
};
