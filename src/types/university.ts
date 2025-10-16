export type InstitutionType =
  | "research-university"
  | "doctoral-university"
  | "masters-college"
  | "baccalaureate-college"
  | "community-college"
  | "for-profit-university";

export interface UniversityStats {
  studyGroups: number;
  students: number;
  retentionImprovement: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  photo: string;
}

export interface University {
  slug: string;
  name: string;
  type: InstitutionType;
  studentCount: number;
  logo: string;
  heroImage: string;
  stats: UniversityStats;
  testimonial: Testimonial;
  relevantCaseStudy: string;
  primaryColor: string;
}
