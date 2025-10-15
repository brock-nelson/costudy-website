"use client";

import { useEffect, useState } from "react";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { useDemoAnalytics } from "@/hooks/useDemoAnalytics";

interface DemoTourProps {
  enabled: boolean;
  onExit: () => void;
}

export default function DemoTour({ enabled, onExit }: DemoTourProps) {
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const analytics = useDemoAnalytics();

  useEffect(() => {
    if (enabled) {
      analytics.trackTourStart();
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setStepsEnabled(true);
      }, 500);
    }
  }, [enabled, analytics]);

  const steps = [
    {
      element: "#demo-welcome",
      intro: `
        <div class="text-center">
          <h3 class="text-xl font-bold mb-2">Welcome to the CoStudy Interactive Demo!</h3>
          <p>This tour will show you how CoStudy transforms student collaboration. Click "Next" to begin.</p>
        </div>
      `,
      position: "bottom"
    },
    {
      element: "#demo-nav",
      intro: `
        <h3 class="font-bold mb-2">Navigation Tabs</h3>
        <p>Switch between different views to explore CoStudy's features. Try clicking on different tabs as we go through the tour!</p>
      `,
      position: "bottom"
    },
    {
      element: "#demo-group-info",
      intro: `
        <h3 class="font-bold mb-2">Study Group Overview</h3>
        <p>Each study group has a clear identity with course information, making it easy for students to stay organized across multiple projects.</p>
      `,
      position: "bottom"
    },
    {
      element: "#demo-team-members",
      intro: `
        <h3 class="font-bold mb-2">Team Members & Status</h3>
        <p>See who's online and ready to collaborate. Real-time status helps teams coordinate effectively.</p>
      `,
      position: "top"
    },
    {
      element: "#demo-charter",
      intro: `
        <h3 class="font-bold mb-2">Team Charter</h3>
        <p>Teams establish clear expectations from day one. Charters include mission, meeting schedules, and communication norms to prevent conflicts.</p>
      `,
      position: "top"
    },
    {
      element: "#demo-chat",
      intro: `
        <h3 class="font-bold mb-2">Real-Time Collaboration</h3>
        <p>Built-in chat with reactions and video call capabilities keeps all team communication in one place.</p>
      `,
      position: "bottom"
    },
    {
      element: "#demo-assignments",
      intro: `
        <h3 class="font-bold mb-2">Assignment Tracking</h3>
        <p>Visual progress tracking helps teams stay on top of deadlines. Everyone can see what's completed and what needs attention.</p>
      `,
      position: "bottom"
    },
    {
      element: "#demo-analytics",
      intro: `
        <h3 class="font-bold mb-2">Analytics & Insights</h3>
        <p>Instructors and admins get powerful insights into team collaboration, communication patterns, and individual growth.</p>
      `,
      position: "bottom"
    },
    {
      element: "#demo-cta",
      intro: `
        <div class="text-center">
          <h3 class="text-xl font-bold mb-2">Ready to Experience CoStudy?</h3>
          <p>Schedule a personalized demo with our team to see how CoStudy can transform collaboration at your institution!</p>
        </div>
      `,
      position: "top"
    }
  ];

  const handleExit = () => {
    setStepsEnabled(false);
    analytics.trackTourComplete();
    onExit();
  };

  const handleStepChange = (stepIndex: number) => {
    const stepNames = [
      "Welcome",
      "Navigation",
      "Group Overview",
      "Team Members",
      "Team Charter",
      "Chat",
      "Assignments",
      "Analytics",
      "CTA"
    ];
    analytics.trackTourStep(stepIndex + 1, stepNames[stepIndex] || `Step ${stepIndex + 1}`);
  };

  return (
    <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={0}
      onExit={handleExit}
      onBeforeChange={handleStepChange}
      options={{
        nextLabel: "Next",
        prevLabel: "Back",
        doneLabel: "Finish Tour",
        skipLabel: "Skip",
        showProgress: true,
        showBullets: true,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        scrollToElement: true,
        scrollPadding: 30,
        overlayOpacity: 0.7,
        tooltipClass: "customTooltip",
        highlightClass: "customHighlight"
      }}
    />
  );
}
