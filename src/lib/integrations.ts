export type IntegrationCategory =
  | "LMS"
  | "SSO"
  | "SIS"
  | "Communication"
  | "Productivity";

export type SetupDifficulty = "Easy" | "Medium" | "Advanced";

export interface Integration {
  id: string;
  name: string;
  slug: string;
  category: IntegrationCategory;
  description: string;
  logo: string;
  featured: boolean;
  status: "available" | "coming-soon";
  setupDifficulty?: SetupDifficulty;
  setupTime?: string;
  features?: string[];
  prerequisites?: string[];
  setupGuide?: string[];
  supportUrl?: string;
}

export const integrations: Integration[] = [
  // Learning Management Systems (LMS)
  {
    id: "canvas",
    name: "Canvas by Instructure",
    slug: "canvas",
    category: "LMS",
    description: "Seamlessly integrate CoStudy with Canvas for automatic course sync, grade passback, and single sign-on.",
    logo: "📚",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "30 minutes",
    features: [
      "Automatic course and roster sync",
      "Assignment grade passback",
      "Deep linking from Canvas courses",
      "Single sign-on",
      "Real-time enrollment updates"
    ],
    prerequisites: [
      "Canvas admin access",
      "CoStudy admin account",
      "LTI 1.3 enabled in Canvas"
    ],
    setupGuide: [
      "Navigate to Canvas Admin Settings",
      "Select Developer Keys and create a new LTI key",
      "Copy the provided Client ID and Deployment ID",
      "In CoStudy admin panel, navigate to Integrations",
      "Paste Canvas credentials and configure sync settings",
      "Test the connection with a pilot course"
    ],
    supportUrl: "/support/integrations/canvas"
  },
  {
    id: "blackboard",
    name: "Blackboard Learn",
    slug: "blackboard",
    category: "LMS",
    description: "Connect CoStudy to Blackboard Learn for seamless course management and grade synchronization.",
    logo: "🎓",
    featured: true,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "45 minutes",
    features: [
      "Course roster synchronization",
      "Grade passback to Blackboard gradebook",
      "LTI integration for seamless access",
      "SSO support"
    ],
    prerequisites: [
      "Blackboard administrator access",
      "CoStudy institutional account",
      "Blackboard Learn 9.1 or higher"
    ]
  },
  {
    id: "moodle",
    name: "Moodle",
    slug: "moodle",
    category: "LMS",
    description: "Open-source LMS integration with full course sync and activity tracking capabilities.",
    logo: "🔷",
    featured: true,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "45 minutes",
    features: [
      "Course and user synchronization",
      "Activity completion tracking",
      "Grade passback support",
      "Deep linking"
    ],
    prerequisites: [
      "Moodle site administrator access",
      "Moodle 3.9 or higher",
      "CoStudy admin account"
    ]
  },
  {
    id: "d2l",
    name: "D2L Brightspace",
    slug: "d2l-brightspace",
    category: "LMS",
    description: "Enterprise-grade integration with Desire2Learn Brightspace for institutions of all sizes.",
    logo: "💡",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "30 minutes",
    features: [
      "Automated roster sync",
      "Gradebook integration",
      "Single sign-on",
      "Deep linking to CoStudy activities"
    ]
  },
  {
    id: "schoology",
    name: "Schoology",
    slug: "schoology",
    category: "LMS",
    description: "K-12 focused LMS integration with simplified setup and student-friendly interface.",
    logo: "🏫",
    featured: false,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "20 minutes"
  },
  {
    id: "google-classroom",
    name: "Google Classroom",
    slug: "google-classroom",
    category: "LMS",
    description: "Popular K-12 and higher education platform with seamless Google Workspace integration.",
    logo: "📖",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "15 minutes",
    features: [
      "Course import from Google Classroom",
      "Assignment creation and distribution",
      "Grade sync to Google Classroom",
      "Google SSO"
    ]
  },

  // Single Sign-On (SSO)
  {
    id: "saml",
    name: "SAML 2.0",
    slug: "saml",
    category: "SSO",
    description: "Industry-standard SSO protocol compatible with most identity providers.",
    logo: "🔐",
    featured: true,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "60 minutes",
    features: [
      "Universal SAML 2.0 compatibility",
      "Just-in-time user provisioning",
      "Attribute mapping",
      "Multi-tenancy support"
    ]
  },
  {
    id: "okta",
    name: "Okta",
    slug: "okta",
    category: "SSO",
    description: "Enterprise identity management with simplified SSO setup for CoStudy.",
    logo: "⭕",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "30 minutes",
    features: [
      "Single sign-on",
      "Multi-factor authentication",
      "User lifecycle management",
      "Group-based access control"
    ]
  },
  {
    id: "onelogin",
    name: "OneLogin",
    slug: "onelogin",
    category: "SSO",
    description: "Cloud-based identity and access management with pre-built CoStudy integration.",
    logo: "1️⃣",
    featured: false,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "30 minutes"
  },
  {
    id: "azure-ad",
    name: "Azure AD / Microsoft Entra",
    slug: "azure-ad",
    category: "SSO",
    description: "Microsoft identity platform integration for Office 365 institutions.",
    logo: "🔷",
    featured: true,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "45 minutes",
    features: [
      "Azure AD single sign-on",
      "Conditional access policies",
      "Microsoft 365 integration",
      "Automatic user provisioning"
    ]
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    slug: "google-workspace",
    category: "SSO",
    description: "Google Workspace SSO for seamless authentication with institutional Google accounts.",
    logo: "🔵",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "20 minutes"
  },
  {
    id: "shibboleth",
    name: "Shibboleth",
    slug: "shibboleth",
    category: "SSO",
    description: "Open-source federated identity solution widely used in higher education.",
    logo: "🦁",
    featured: false,
    status: "available",
    setupDifficulty: "Advanced",
    setupTime: "90 minutes"
  },
  {
    id: "cas",
    name: "CAS (Central Authentication Service)",
    slug: "cas",
    category: "SSO",
    description: "University-standard authentication protocol with proven security and reliability.",
    logo: "🎫",
    featured: false,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "60 minutes"
  },

  // Student Information Systems (SIS)
  {
    id: "ellucian-banner",
    name: "Ellucian Banner",
    slug: "ellucian-banner",
    category: "SIS",
    description: "Enterprise SIS integration for comprehensive student data synchronization.",
    logo: "🏛️",
    featured: true,
    status: "available",
    setupDifficulty: "Advanced",
    setupTime: "2-4 hours",
    features: [
      "Student enrollment data sync",
      "Course catalog integration",
      "Faculty assignment mapping",
      "Term and academic calendar sync"
    ]
  },
  {
    id: "ellucian-colleague",
    name: "Ellucian Colleague",
    slug: "ellucian-colleague",
    category: "SIS",
    description: "Unified SIS platform integration with real-time data synchronization.",
    logo: "🏫",
    featured: true,
    status: "available",
    setupDifficulty: "Advanced",
    setupTime: "2-4 hours"
  },
  {
    id: "peoplesoft",
    name: "Oracle PeopleSoft Campus Solutions",
    slug: "peoplesoft",
    category: "SIS",
    description: "Oracle-powered SIS with comprehensive campus management capabilities.",
    logo: "📊",
    featured: false,
    status: "available",
    setupDifficulty: "Advanced",
    setupTime: "3-5 hours"
  },
  {
    id: "workday-student",
    name: "Workday Student",
    slug: "workday-student",
    category: "SIS",
    description: "Cloud-based student information system with modern API integration.",
    logo: "☁️",
    featured: true,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "90 minutes"
  },
  {
    id: "jenzabar",
    name: "Jenzabar",
    slug: "jenzabar",
    category: "SIS",
    description: "Higher education ERP system with student lifecycle management.",
    logo: "📚",
    featured: false,
    status: "available",
    setupDifficulty: "Advanced",
    setupTime: "2-3 hours"
  },
  {
    id: "powerschool",
    name: "PowerSchool",
    slug: "powerschool",
    category: "SIS",
    description: "K-12 student information system with comprehensive data management.",
    logo: "⚡",
    featured: false,
    status: "available",
    setupDifficulty: "Medium",
    setupTime: "60 minutes"
  },

  // Communication Tools
  {
    id: "slack",
    name: "Slack",
    slug: "slack",
    category: "Communication",
    description: "Team collaboration platform with CoStudy notifications and updates.",
    logo: "💬",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "10 minutes",
    features: [
      "Team activity notifications",
      "Deadline reminders",
      "Peer feedback alerts",
      "Custom channel integration"
    ]
  },
  {
    id: "microsoft-teams",
    name: "Microsoft Teams",
    slug: "microsoft-teams",
    category: "Communication",
    description: "Microsoft collaboration hub with embedded CoStudy experiences.",
    logo: "💼",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "15 minutes",
    features: [
      "Teams tab integration",
      "Activity feed notifications",
      "Bot commands for quick actions",
      "Meeting integration"
    ]
  },
  {
    id: "zoom",
    name: "Zoom",
    slug: "zoom",
    category: "Communication",
    description: "Video conferencing platform with CoStudy team meeting scheduling.",
    logo: "📹",
    featured: false,
    status: "coming-soon",
    setupDifficulty: "Easy",
    setupTime: "15 minutes"
  },
  {
    id: "google-meet",
    name: "Google Meet",
    slug: "google-meet",
    category: "Communication",
    description: "Google video conferencing with integrated team collaboration.",
    logo: "📱",
    featured: false,
    status: "coming-soon",
    setupDifficulty: "Easy",
    setupTime: "10 minutes"
  },

  // Productivity
  {
    id: "google-drive",
    name: "Google Drive",
    slug: "google-drive",
    category: "Productivity",
    description: "Cloud storage integration for team document collaboration.",
    logo: "📁",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "10 minutes",
    features: [
      "Team folder creation",
      "Document sharing",
      "Real-time collaboration",
      "File access management"
    ]
  },
  {
    id: "onedrive",
    name: "Microsoft OneDrive",
    slug: "microsoft-onedrive",
    category: "Productivity",
    description: "Microsoft cloud storage with Office 365 document collaboration.",
    logo: "☁️",
    featured: true,
    status: "available",
    setupDifficulty: "Easy",
    setupTime: "10 minutes"
  },
  {
    id: "dropbox",
    name: "Dropbox",
    slug: "dropbox",
    category: "Productivity",
    description: "File sync and collaboration platform for team projects.",
    logo: "📦",
    featured: false,
    status: "coming-soon",
    setupDifficulty: "Easy",
    setupTime: "10 minutes"
  },
  {
    id: "notion",
    name: "Notion",
    slug: "notion",
    category: "Productivity",
    description: "All-in-one workspace for team notes, wikis, and project management.",
    logo: "📝",
    featured: false,
    status: "coming-soon",
    setupDifficulty: "Easy",
    setupTime: "15 minutes"
  }
];

export const integrationCategories: { id: IntegrationCategory; name: string; description: string }[] = [
  {
    id: "LMS",
    name: "Learning Management Systems",
    description: "Connect with your institution's LMS for seamless course and roster synchronization"
  },
  {
    id: "SSO",
    name: "Single Sign-On",
    description: "Simplify authentication with enterprise identity providers"
  },
  {
    id: "SIS",
    name: "Student Information Systems",
    description: "Sync student data and enrollment information automatically"
  },
  {
    id: "Communication",
    name: "Communication Tools",
    description: "Keep teams connected with their preferred communication platforms"
  },
  {
    id: "Productivity",
    name: "Productivity",
    description: "Enhance collaboration with popular productivity tools"
  }
];

export function getIntegrationBySlug(slug: string): Integration | undefined {
  return integrations.find(i => i.slug === slug);
}

export function getIntegrationsByCategory(category: IntegrationCategory): Integration[] {
  return integrations.filter(i => i.category === category);
}

export function getFeaturedIntegrations(): Integration[] {
  return integrations.filter(i => i.featured);
}

export function searchIntegrations(query: string): Integration[] {
  const lowercaseQuery = query.toLowerCase();
  return integrations.filter(
    i =>
      i.name.toLowerCase().includes(lowercaseQuery) ||
      i.description.toLowerCase().includes(lowercaseQuery) ||
      i.category.toLowerCase().includes(lowercaseQuery)
  );
}
