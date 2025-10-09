import Image from "next/image";

interface DemoPlaceholderProps {
  title: string;
  description?: string;
  gifPath?: string;
  iconEmoji?: string;
  className?: string;
}

export default function DemoPlaceholder({
  title,
  description = "Interactive demo coming soon",
  gifPath,
  iconEmoji = "🎬",
  className = "",
}: DemoPlaceholderProps) {
  return (
    <div
      className={`bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-8 shadow-lg flex items-center justify-center ${className}`}
    >
      {gifPath ? (
        <div className="text-center w-full">
          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-white">
            <Image
              src={gifPath}
              alt={title}
              fill
              className="object-contain"
              unoptimized // Allow GIFs to animate
            />
          </div>
          <h4 className="text-lg font-semibold text-[#374045] mb-2">{title}</h4>
          {description && <p className="text-[#5E6E76] text-sm">{description}</p>}
        </div>
      ) : (
        <div className="text-center">
          <div className="text-6xl mb-4">{iconEmoji}</div>
          <h4 className="text-lg font-semibold text-[#374045] mb-2">{title}</h4>
          <p className="text-[#5E6E76]">{description}</p>
        </div>
      )}
    </div>
  );
}
