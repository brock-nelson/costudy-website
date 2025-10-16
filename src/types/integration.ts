export type IntegrationCategory =
  | "lms"
  | "sso"
  | "sis"
  | "communication"
  | "productivity";

export type SetupDifficulty = "easy" | "medium" | "advanced";

export interface Integration {
  id: string;
  name: string;
  slug: string;
  category: IntegrationCategory;
  description: string;
  logo: string;
  logoAlt: string;
  featured: boolean;
  comingSoon: boolean;
  setupDifficulty: SetupDifficulty;
  setupTime: string;
  keyFeatures: string[];
  prerequisites: string[];
  setupSteps?: string[];
  screenshots?: string[];
  faq?: { question: string; answer: string }[];
  documentationUrl?: string;
  supportUrl?: string;
}

export interface IntegrationCategoryInfo {
  id: IntegrationCategory;
  name: string;
  description: string;
  icon: string;
}
