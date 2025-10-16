// Google Analytics event tracking
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Experiment-specific event tracking
export const trackExperimentView = (experimentId: string, variant: string) => {
  event({
    action: "experiment_view",
    category: "experiments",
    label: `${experimentId}:${variant}`,
  });
};

export const trackExperimentConversion = (
  experimentId: string,
  variant: string,
  conversionType: string,
  value?: number
) => {
  event({
    action: `experiment_conversion_${conversionType}`,
    category: "experiments",
    label: `${experimentId}:${variant}`,
    value,
  });
};

// Example usage:
// event({
//   action: "form_submission",
//   category: "engagement",
//   label: "contact_form",
// });
