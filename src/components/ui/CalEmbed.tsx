"use client";

interface CalEmbedProps {
  calLink: string;
  className?: string;
}

export default function CalEmbed({ calLink, className = "" }: CalEmbedProps) {
  // Use iframe embed which is more reliable
  const embedUrl = `https://cal.com/${calLink}?embed=true&theme=light`;

  return (
    <div className={className}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{
          minHeight: "700px",
          border: "none",
          borderRadius: "8px"
        }}
        title="Schedule a demo with CoStudy"
      />
    </div>
  );
}
