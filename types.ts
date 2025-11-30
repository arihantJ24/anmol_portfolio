
export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  logoChar?: string;
  color: string;
}

export interface Contribution {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  type?: string; // e.g., "Part-time", "Ambassador"
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year?: string;
}

export interface PortfolioLink {
  label: string;
  url: string;
  type: 'twitter' | 'telegram' | 'website';
}

export interface PortfolioItem {
  title: string;
  role: string;
  description: string;
  stats: string[];
  links: PortfolioLink[];
  featuredContent: string[];
}

export interface Publication {
  title: string;
  url: string;
  platform: string;
}

export interface ResumeData {
  name: string;
  role: string;
  contact: {
    phone: string;
    email: string;
    location: string;
  };
  summary: string;
  experience: Experience[];
  contributions: Contribution[];
  portfolio: PortfolioItem[];
  publications: Publication[];
  education: Education[];
  certifications: Certification[];
  skills: string[];
  interests: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
