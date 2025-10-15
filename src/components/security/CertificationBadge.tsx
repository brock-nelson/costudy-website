interface CertificationBadgeProps {
  name: string;
  description: string;
  icon: string;
}

export default function CertificationBadge({ name, description, icon }: CertificationBadgeProps) {
  return (
    <div className="group p-6 bg-white dark:bg-[#1a1a1a] rounded-xl border-2 border-[#6B3DCB]/20 dark:border-[#E9EEFF]/20 hover:border-[#6B3DCB] dark:hover:border-[#E9EEFF] transition-all hover:shadow-lg hover:scale-105">
      <div className="text-center">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">
          {name}
        </h3>
        <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
