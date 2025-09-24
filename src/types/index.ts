export interface Student {
  id: string;
  name: string;
  email: string;
  education: string;
  skills: string[];
  interests: string[];
  locationPreference: string;
  createdAt: Date;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  eligibility: string[];
  location: string;
  skills: string[];
  duration: string;
  stipend?: string;
  createdAt: Date;
}

export interface Recommendation {
  internship: Internship;
  score: number;
  reasons: string[];
  matchedSkills: string[];
}

export interface Notification {
  id: string;
  type: 'match' | 'application' | 'update';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Language {
  code: 'en' | 'hi';
  name: string;
  nativeName: string;
}