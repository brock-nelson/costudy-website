// Sample data for the interactive product demo

export const sampleStudents = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "👩‍💻",
    role: "Team Lead",
    status: "online"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "👨‍🎓",
    role: "Developer",
    status: "online"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "👩‍🔬",
    role: "Researcher",
    status: "away"
  },
  {
    id: 4,
    name: "Alex Kim",
    avatar: "👨‍💼",
    role: "Designer",
    status: "online"
  }
];

export const sampleStudyGroup = {
  id: 1,
  name: "CS 301 - Final Project Team",
  course: "Computer Science 301",
  members: 4,
  charter: {
    mission: "Build an innovative web application that solves a real-world problem",
    meetingSchedule: "Tuesdays & Thursdays, 3-5 PM",
    communicationNorms: "Respond to messages within 24 hours, use video for complex discussions",
    roles: "Rotating roles each sprint - everyone leads at least once"
  }
};

export const sampleAssignments = [
  {
    id: 1,
    title: "Project Proposal",
    dueDate: "2025-10-15",
    status: "completed",
    progress: 100
  },
  {
    id: 2,
    title: "Design Mockups",
    dueDate: "2025-10-20",
    status: "in_progress",
    progress: 75
  },
  {
    id: 3,
    title: "Backend Development",
    dueDate: "2025-10-25",
    status: "in_progress",
    progress: 45
  },
  {
    id: 4,
    title: "Final Presentation",
    dueDate: "2025-11-01",
    status: "upcoming",
    progress: 0
  }
];

export const sampleMessages = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "👩‍💻",
    message: "Just pushed the latest updates to the repo!",
    timestamp: "10:45 AM",
    reactions: ["👍", "🎉"]
  },
  {
    id: 2,
    author: "Marcus Johnson",
    avatar: "👨‍🎓",
    message: "Great work! I'll review the PR this afternoon.",
    timestamp: "10:47 AM",
    reactions: ["👍"]
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "👩‍🔬",
    message: "Can we schedule a quick call to discuss the API design?",
    timestamp: "11:02 AM",
    reactions: ["📞"]
  }
];

export const sampleAnalytics = {
  teamCollaboration: 87,
  communicationFrequency: 92,
  taskCompletion: 78,
  peerFeedbackScore: 85,
  trends: {
    participation: "+12%",
    engagement: "+8%",
    goalProgress: "+15%"
  }
};

export const sampleFeedback = [
  {
    from: "Marcus Johnson",
    to: "Sarah Chen",
    skill: "Leadership",
    rating: 5,
    comment: "Excellent at organizing team meetings and keeping everyone on track!"
  },
  {
    from: "Emily Rodriguez",
    to: "Alex Kim",
    skill: "Communication",
    rating: 4,
    comment: "Great at explaining design decisions and taking feedback constructively."
  }
];
