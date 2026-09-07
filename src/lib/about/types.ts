export interface AboutHighlight {
  en: string;
  es: string;
  isAward?: boolean;
}

export interface PositionDate {
  month: number;
  year: number;
}

export interface PositionItem {
  title: string;
  startDate: PositionDate;
  endDate: PositionDate | null;
  current: boolean;
  highlights: AboutHighlight[];
}

export interface ExperienceItem {
  company: string;
  recognition?: string;
  employmentType: string;
  location: string;
  positions: PositionItem[];
}

export interface FlattenedExperiencePosition extends PositionItem {
  company: string;
  location: string;
  employmentType: string;
  recognition?: string;
}

export interface EducationItem {
  institution: string;
  program: string;
  dates: string;
  description: string;
  badge?: string;
  incomplete?: boolean;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  isAward?: boolean;
  description?: string;
}

export interface FocusArea {
  label: string;
  icon: string;
}

export interface AboutSkills {
  recruitment: string[];
  technical: string[];
  other: string[];
}

export interface AboutProfile {
  name: string;
  headline: string[];
  location: string;
  linkedIn: string;
  languages: string[];
  image: string;
  bio: string[];
  focusAreas: FocusArea[];
  skills: AboutSkills;
  education: EducationItem[];
  certifications: CertificationItem[];
  learningRoadmap: string[];
  experience: ExperienceItem[];
}
