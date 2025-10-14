import { TestimonialData } from "@/components/testimonials/VideoTestimonial";

/**
 * Sample testimonial data for demonstration purposes.
 * Replace with real testimonials from actual university partners.
 */
export const sampleTestimonials: TestimonialData[] = [
  {
    universityName: "Boston University",
    universityLogo: "/schools/boston-university.png",
    personName: "Dr. Sarah Johnson",
    personTitle: "Professor of Business Administration",
    personPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video
    videoThumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=450&fit=crop",
    quote: "CoStudy has completely transformed how my students approach teamwork. The team charters alone have eliminated most of the common issues we used to see with group projects.",
    metrics: [
      { label: "Retention Increase", value: "32%" },
      { label: "Students Served", value: "850+" },
      { label: "Active Teams", value: "120" },
      { label: "Satisfaction Score", value: "4.8/5" },
    ],
    beforeAfter: {
      before: "Struggled with team conflicts and unclear expectations",
      after: "Students collaborate effectively with clear accountability",
    },
  },
  {
    universityName: "Indiana University Kelley School",
    universityLogo: "/schools/indiana-kelley.png",
    personName: "Professor Michael Chen",
    personTitle: "Director of MBA Programs",
    personPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video
    videoThumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
    quote: "The ROI has been incredible. We've seen measurable improvements in both student satisfaction and learning outcomes since implementing CoStudy across our MBA program.",
    metrics: [
      { label: "Time Saved", value: "40%" },
      { label: "Student NPS", value: "+28" },
      { label: "Team Success Rate", value: "94%" },
      { label: "Faculty Adoption", value: "85%" },
    ],
    beforeAfter: {
      before: "Manual team formation and feedback took 15+ hours per semester",
      after: "Automated workflows save 6+ hours per course while improving outcomes",
    },
  },
  {
    universityName: "UC Berkeley",
    universityLogo: "/schools/ucb.png",
    personName: "Dr. Emily Rodriguez",
    personTitle: "Associate Dean of Undergraduate Studies",
    personPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video
    videoThumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
    quote: "CoStudy gives us the data we need to understand and improve student collaboration at scale. It's become an essential part of our commitment to developing well-rounded graduates.",
    metrics: [
      { label: "Students Impacted", value: "5,000+" },
      { label: "Course Sections", value: "150+" },
      { label: "Engagement Rate", value: "97%" },
      { label: "Collaboration Score", value: "4.7/5" },
    ],
    beforeAfter: {
      before: "Limited visibility into team dynamics and student collaboration skills",
      after: "Comprehensive data drives continuous improvement across all programs",
    },
  },
];
