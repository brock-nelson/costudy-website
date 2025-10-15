"use client";

import CookieConsentLib from "react-cookie-consent";
import Link from "next/link";

export default function CookieConsent() {
  return (
    <CookieConsentLib
      location="bottom"
      buttonText="Accept All Cookies"
      declineButtonText="Decline Non-Essential"
      enableDeclineButton
      cookieName="costudy-cookie-consent"
      style={{
        background: "#2B373B",
        padding: "20px",
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        borderTop: "1px solid #4A5568",
      }}
      buttonStyle={{
        background: "#6B3DCB",
        color: "white",
        fontSize: "14px",
        fontWeight: "600",
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      declineButtonStyle={{
        background: "transparent",
        color: "#E2E8F0",
        fontSize: "14px",
        fontWeight: "600",
        padding: "12px 24px",
        borderRadius: "8px",
        border: "1px solid #4A5568",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      expires={365}
      overlay
      overlayStyle={{
        background: "rgba(0, 0, 0, 0.5)",
      }}
      onAccept={() => {
        // Enable analytics and tracking cookies
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted",
            functionality_storage: "granted",
            personalization_storage: "granted",
          });
        }
      }}
      onDecline={() => {
        // Disable non-essential cookies
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            functionality_storage: "denied",
            personalization_storage: "denied",
          });
        }
      }}
    >
      <div className="flex-1" style={{ color: "#E2E8F0", fontSize: "14px", lineHeight: "1.6" }}>
        <p className="mb-2">
          <strong>We value your privacy.</strong> CoStudy uses cookies to enhance your experience,
          analyze site usage, and assist in our marketing efforts.
        </p>
        <p>
          By clicking &quot;Accept All Cookies&quot;, you agree to the storing of cookies on your device.
          Learn more in our{" "}
          <Link
            href="/legal/cookies"
            className="underline hover:text-white transition-colors"
            style={{ color: "#A78BFA" }}
          >
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className="underline hover:text-white transition-colors"
            style={{ color: "#A78BFA" }}
          >
            Privacy Policy
          </Link>.
        </p>
      </div>
    </CookieConsentLib>
  );
}
