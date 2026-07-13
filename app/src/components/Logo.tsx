import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  showText?: boolean;
}

export default function Logo({ variant = "dark", className = "", showText = true }: LogoProps) {
  const textColor = variant === "dark" ? "text-ink" : "text-wash";
  const subColor = variant === "dark" ? "text-warmGray" : "text-wash/70";

  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`} aria-label="Minna No Gakkou - Beranda">
      <img
        src="/images/logo-mg.png"
        alt="Minna No Gakkou Logo"
        width="40"
        height="40"
        className="flex-shrink-0 rounded-full object-cover"
      />
      
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-serif text-base md:text-lg font-semibold tracking-tight ${textColor}`}>
            MINNA NO GAKKOU
          </span>
          <span className={`font-jp text-[10px] md:text-xs tracking-wider ${subColor}`}>
            みんなの学校
          </span>
        </div>
      )}
    </Link>
  );
}
