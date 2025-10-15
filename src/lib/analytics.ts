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

// GA4 Custom Events - Type-safe event tracking
interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track a GA4 event with custom parameters
 */
export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

/**
 * Conversion Events - High-value user actions
 */

// Demo request conversion
export const trackDemoRequest = (params: {
  role?: string;
  institution?: string;
  teamSize?: string;
  value?: number;
}) => {
  trackEvent("demo_request", {
    event_category: "conversion",
    event_label: "demo_form",
    currency: "USD",
    value: params.value || 500, // Estimated lead value
    user_role: params.role,
    institution: params.institution,
    team_size: params.teamSize,
  });

  // Also track as a conversion for GA4
  trackEvent("generate_lead", {
    currency: "USD",
    value: params.value || 500,
  });
};

// Contact form submission
export const trackContactSubmit = (params: {
  role?: string;
  institution?: string;
  value?: number;
}) => {
  trackEvent("contact_submit", {
    event_category: "conversion",
    event_label: "contact_form",
    currency: "USD",
    value: params.value || 100, // Estimated lead value
    user_role: params.role,
    institution: params.institution,
  });

  trackEvent("generate_lead", {
    currency: "USD",
    value: params.value || 100,
  });
};

// Newsletter signup
export const trackNewsletterSignup = (params: {
  source?: string;
  location?: string;
}) => {
  trackEvent("newsletter_signup", {
    event_category: "engagement",
    event_label: params.source || "newsletter_form",
    page_location: params.location,
  });
};

/**
 * Page View Events - Track key page views
 */

export const trackPricingView = (params?: { plan?: string }) => {
  trackEvent("pricing_view", {
    event_category: "engagement",
    event_label: "pricing_page",
    plan: params?.plan,
  });
};

export const trackFeatureView = (params?: { feature?: string }) => {
  trackEvent("feature_view", {
    event_category: "engagement",
    event_label: "features_page",
    feature: params?.feature,
  });
};

export const trackCaseStudyView = (params?: { study?: string }) => {
  trackEvent("case_study_view", {
    event_category: "engagement",
    event_label: "case_study",
    study: params?.study,
  });
};

export const trackResourceDownload = (params: {
  resourceName: string;
  resourceType?: string;
}) => {
  trackEvent("resource_download", {
    event_category: "engagement",
    event_label: params.resourceName,
    resource_type: params.resourceType,
  });
};

/**
 * User Journey Events
 */

export const trackFeatureInteraction = (params: {
  feature: string;
  action: string;
}) => {
  trackEvent("feature_interaction", {
    event_category: "engagement",
    feature_name: params.feature,
    interaction_type: params.action,
  });
};

export const trackFeatureVote = (params: { featureId: string; featureName?: string }) => {
  trackEvent("feature_vote", {
    event_category: "engagement",
    event_label: "feature_voting",
    feature_id: params.featureId,
    feature_name: params.featureName,
  });
};

/**
 * UTM Parameter Tracking
 */

export const getUTMParameters = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      // Limit length to prevent malicious long strings
      const sanitized = value.slice(0, 200);
      utmParams[key] = sanitized;
      // Store in sessionStorage for attribution (with error handling)
      try {
        sessionStorage?.setItem(key, sanitized);
      } catch {
        // Silent fail if sessionStorage is not available (private browsing, etc.)
      }
    }
  });

  return utmParams;
};

export const getStoredUTMParameters = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const utmParams: Record<string, string> = {};
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  try {
    utmKeys.forEach((key) => {
      const value = sessionStorage?.getItem(key);
      if (value) {
        utmParams[key] = value;
      }
    });
  } catch {
    // Silent fail if sessionStorage is not available
  }

  return utmParams;
};

/**
 * E-commerce/Value Tracking
 */

export const trackUserValue = (params: {
  userId?: string;
  userRole?: string;
  institution?: string;
  estimatedValue?: number;
}) => {
  trackEvent("user_value", {
    user_id: params.userId,
    user_role: params.userRole,
    institution: params.institution,
    estimated_value: params.estimatedValue,
  });
};

/**
 * Error Tracking
 */

export const trackError = (params: {
  errorMessage: string;
  errorLocation: string;
  errorType?: string;
}) => {
  trackEvent("error", {
    event_category: "error",
    error_message: params.errorMessage,
    error_location: params.errorLocation,
    error_type: params.errorType,
  });
};
