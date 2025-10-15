import { db } from "./index";
import { resources } from "./schema";

/**
 * Seed sample resources for the /resources page
 * Run this script to populate the database with initial resource data
 */
async function seedResources() {
  console.log("Seeding resources...");

  const sampleResources = [
    // Whitepapers
    {
      title: "The State of Student Retention in Higher Education 2024",
      description: "Comprehensive analysis of student retention trends across 500+ universities. Includes data on dropout rates, intervention strategies, and ROI of retention programs.",
      type: "whitepaper",
      category: "retention",
      fileUrl: "/resources/whitepapers/student-retention-2024.pdf",
      fileSize: "2.5 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-01-15"),
      author: "CoStudy Research Team",
      thumbnailUrl: null,
    },
    {
      title: "ROI of Student Success Platforms: A Data-Driven Analysis",
      description: "How universities calculate and maximize return on investment from student success technology. Features case studies from 50+ institutions.",
      type: "whitepaper",
      category: "roi",
      fileUrl: "/resources/whitepapers/roi-analysis.pdf",
      fileSize: "1.8 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-02-01"),
      author: "Dr. Sarah Chen",
      thumbnailUrl: null,
    },
    {
      title: "Peer Learning: Research & Best Practices",
      description: "Meta-analysis of 200+ peer learning studies. Discover evidence-based strategies for implementing effective peer collaboration programs.",
      type: "whitepaper",
      category: "peer-learning",
      fileUrl: "/resources/whitepapers/peer-learning-research.pdf",
      fileSize: "3.2 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-03-10"),
      author: "Dr. Michael Torres",
      thumbnailUrl: null,
    },
    {
      title: "LMS Integration Guide for Universities",
      description: "Technical guide for integrating student success platforms with Canvas, Blackboard, Moodle, and other learning management systems.",
      type: "whitepaper",
      category: "integration",
      fileUrl: "/resources/whitepapers/lms-integration-guide.pdf",
      fileSize: "1.5 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-04-05"),
      author: "CoStudy Engineering Team",
      thumbnailUrl: null,
    },

    // Guides
    {
      title: "University Buyer's Guide to Student Success Platforms",
      description: "What to look for when evaluating student engagement tools. Includes RFP templates, evaluation criteria, and implementation checklists.",
      type: "guide",
      category: "buyer-guide",
      fileUrl: "/resources/guides/buyers-guide.pdf",
      fileSize: "1.2 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-02-20"),
      author: "CoStudy Team",
      thumbnailUrl: null,
    },
    {
      title: "How to Calculate ROI of Retention Programs",
      description: "Step-by-step framework for measuring the financial impact of student success initiatives. Includes Excel templates and calculation examples.",
      type: "guide",
      category: "roi",
      fileUrl: "/resources/guides/roi-calculator.pdf",
      fileSize: "900 KB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-03-15"),
      author: "Financial Planning Team",
      thumbnailUrl: null,
    },
    {
      title: "SSO Integration Setup Guide",
      description: "Technical guide for setting up Single Sign-On with SAML 2.0, OAuth, and Active Directory. Includes troubleshooting tips.",
      type: "guide",
      category: "integration",
      fileUrl: "/resources/guides/sso-setup.pdf",
      fileSize: "800 KB",
      duration: null,
      isGated: false,
      isPublished: true,
      publishedAt: new Date("2024-04-10"),
      author: "Security Team",
      thumbnailUrl: null,
    },

    // Checklists
    {
      title: "Checklist: Launching a Student Engagement Initiative",
      description: "26-point checklist covering planning, stakeholder buy-in, pilot programs, training, and scaling. Based on 100+ successful implementations.",
      type: "checklist",
      category: "implementation",
      fileUrl: "/resources/checklists/launch-checklist.pdf",
      fileSize: "500 KB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-03-25"),
      author: "Implementation Team",
      thumbnailUrl: null,
    },

    // Case Studies
    {
      title: "How State University Improved Retention by 12%",
      description: "Full case study: how a 25,000-student public university used peer learning and early intervention to reduce dropout rates.",
      type: "case-study",
      category: "retention",
      fileUrl: "/resources/case-studies/state-university.pdf",
      fileSize: "1.1 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-01-30"),
      author: "Case Study Team",
      thumbnailUrl: null,
    },
    {
      title: "Liberal Arts College: 95% Student Satisfaction",
      description: "How a small liberal arts college achieved exceptional engagement scores through structured peer collaboration.",
      type: "case-study",
      category: "engagement",
      fileUrl: "/resources/case-studies/liberal-arts-college.pdf",
      fileSize: "950 KB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-02-15"),
      author: "Case Study Team",
      thumbnailUrl: null,
    },
    {
      title: "Community College: Closing Achievement Gaps",
      description: "Data-driven approach to improving outcomes for underrepresented students through peer mentoring and study groups.",
      type: "case-study",
      category: "equity",
      fileUrl: "/resources/case-studies/community-college.pdf",
      fileSize: "1.3 MB",
      duration: null,
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-03-20"),
      author: "Case Study Team",
      thumbnailUrl: null,
    },

    // Webinars
    {
      title: "Best Practices for Student Engagement in Large Lectures",
      description: "Recorded webinar featuring three professors who successfully implemented active learning strategies in 200+ student courses.",
      type: "webinar",
      category: "engagement",
      fileUrl: "/resources/webinars/large-lectures.mp4",
      fileSize: null,
      duration: "45 min",
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-02-10"),
      author: "Panel Discussion",
      thumbnailUrl: null,
    },
    {
      title: "How Universities Use Data to Improve Retention",
      description: "Learn how to leverage student data for early intervention, personalized support, and predictive analytics. Includes live Q&A.",
      type: "webinar",
      category: "retention",
      fileUrl: "/resources/webinars/data-retention.mp4",
      fileSize: null,
      duration: "50 min",
      isGated: true,
      isPublished: true,
      publishedAt: new Date("2024-03-05"),
      author: "Dr. Jennifer Liu",
      thumbnailUrl: null,
    },
    {
      title: "Demo: CoStudy Platform Walkthrough",
      description: "30-minute guided tour of CoStudy features: team formation, peer feedback, analytics dashboards, and LMS integration.",
      type: "webinar",
      category: "product",
      fileUrl: "/resources/webinars/platform-demo.mp4",
      fileSize: null,
      duration: "30 min",
      isGated: false,
      isPublished: true,
      publishedAt: new Date("2024-04-01"),
      author: "Product Team",
      thumbnailUrl: null,
    },
  ];

  try {
    for (const resource of sampleResources) {
      await db.insert(resources).values(resource);
      console.log(`✓ Created: ${resource.title}`);
    }

    console.log("\n✅ Successfully seeded", sampleResources.length, "resources");
  } catch (error) {
    console.error("Error seeding resources:", error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedResources()
    .then(() => {
      console.log("Seeding complete!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}

export { seedResources };
