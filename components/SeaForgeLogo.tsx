interface Props {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}

export default function SeaForgeLogo({ variant = "dark", size = "md" }: Props) {
  const textColor = variant === "light" ? "text-white" : "text-sea-ink";
  const subColor = variant === "light" ? "text-white/70" : "text-sea-muted";
  const iconSize = size === "sm" ? "w-10 h-10" : "w-12 h-12";
  const titleSize = size === "sm" ? "text-xl" : "text-2xl";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${iconSize} rounded-xl bg-sea-teal flex items-center justify-center shadow-sm`}
      >
        <svg
          className={size === "sm" ? "w-5 h-5" : "w-6 h-6"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c4-4 7-8.5 7-13a7 7 0 1 0-14 0c0 4.5 3 9 7 13z" />
          <path d="M12 13c1.5-2 2.5-4 2.5-6" />
        </svg>
      </div>
      <div>
        <p className={`${titleSize} font-bold tracking-tight ${textColor}`}>SeaForge</p>
        <p className={`text-xs ${subColor}`}>Seaweed Production System</p>
      </div>
    </div>
  );
}
