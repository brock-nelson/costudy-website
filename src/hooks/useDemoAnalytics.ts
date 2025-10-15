"use client";

interface DemoEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useDemoAnalytics() {
  const trackEvent = ({ action, category, label, value }: DemoEvent) => {
    // Google Analytics 4
    if (typeof window !== "undefined" && "gtag" in window && typeof (window as { gtag?: unknown }).gtag === "function") {
      (window as { gtag: (command: string, eventName: string, params: Record<string, unknown>) => void }).gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === "development") {
      console.log("[Demo Analytics]", { action, category, label, value });
    }
  };

  const trackDemoStart = () => {
    trackEvent({
      action: "demo_started",
      category: "Demo",
      label: "Interactive Demo",
    });
  };

  const trackTourStart = () => {
    trackEvent({
      action: "tour_started",
      category: "Demo",
      label: "Guided Tour",
    });
  };

  const trackTourComplete = () => {
    trackEvent({
      action: "tour_completed",
      category: "Demo",
      label: "Guided Tour",
    });
  };

  const trackTourStep = (stepNumber: number, stepName: string) => {
    trackEvent({
      action: "tour_step_viewed",
      category: "Demo",
      label: stepName,
      value: stepNumber,
    });
  };

  const trackViewChange = (viewName: string) => {
    trackEvent({
      action: "view_changed",
      category: "Demo",
      label: viewName,
    });
  };

  const trackDemoTime = (seconds: number) => {
    trackEvent({
      action: "demo_time_spent",
      category: "Demo",
      label: "Time on Demo",
      value: seconds,
    });
  };

  const trackDemoInteraction = (interaction: string) => {
    trackEvent({
      action: "demo_interaction",
      category: "Demo",
      label: interaction,
    });
  };

  const trackScheduleClick = () => {
    trackEvent({
      action: "schedule_demo_clicked",
      category: "Demo",
      label: "Schedule Demo CTA",
    });
  };

  return {
    trackDemoStart,
    trackTourStart,
    trackTourComplete,
    trackTourStep,
    trackViewChange,
    trackDemoTime,
    trackDemoInteraction,
    trackScheduleClick,
  };
}
