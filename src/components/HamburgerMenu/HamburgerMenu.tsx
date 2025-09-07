import { useState } from "react";
import clsx from "clsx";

type TProps = {
  className?: string;
  onClick?: () => void;
  color?: "light" | "dark" | "primary";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "animated" | "minimal";
  isOpen?: boolean;
  label?: string;
  disabled?: boolean;
};

const HamburgerMenu = ({
  className,
  onClick,
  color = "dark",
  size = "md",
  variant = "default",
  isOpen = false,
  label = "Toggle Menu",
  disabled = false,
}: TProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size classes
  const sizeClasses = {
    sm: "w-5 h-4",
    md: "w-6 h-5",
    lg: "w-8 h-6",
  };

  // Line height based on size
  const lineHeight = {
    sm: "h-0.5",
    md: "h-0.5",
    lg: "h-1",
  };

  // Color classes
  const colorClasses = {
    light: "bg-white",
    dark: "bg-dark",
    primary: "bg-primary",
  };

  // Variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case "animated":
        return {
          container:
            "relative z-10 md:hidden flex flex-col ml-auto self-center justify-center items-center cursor-pointer",
          line: clsx(
            "transition-all duration-300 ease-in-out origin-center",
            lineHeight[size],
            colorClasses[color]
          ),
          line1: clsx(
            isOpen && "rotate-45 translate-y-1.5",
            size === "lg" && isOpen && "translate-y-2"
          ),
          line2: clsx(isOpen && "opacity-0 scale-x-0"),
          line3: clsx(
            isOpen && "-rotate-45 -translate-y-1.5",
            size === "lg" && isOpen && "-translate-y-2"
          ),
        };
      case "minimal":
        return {
          container:
            "relative flex flex-col justify-center items-center cursor-pointer",
          line: clsx(
            "transition-all duration-200 ease-in-out",
            lineHeight[size],
            colorClasses[color]
          ),
          line1: clsx(
            isOpen && "rotate-45 translate-y-1",
            size === "lg" && isOpen && "translate-y-1.5"
          ),
          line2: clsx(isOpen && "opacity-0"),
          line3: clsx(
            isOpen && "-rotate-45 -translate-y-1",
            size === "lg" && isOpen && "-translate-y-1.5"
          ),
        };
      default:
        return {
          container:
            "relative flex flex-col justify-center items-center cursor-pointer",
          line: clsx(
            "transition-all duration-300 ease-in-out",
            lineHeight[size],
            colorClasses[color]
          ),
          line1: clsx(
            isOpen && "rotate-45 translate-y-1.5",
            size === "lg" && isOpen && "translate-y-2"
          ),
          line2: clsx(isOpen && "opacity-0"),
          line3: clsx(
            isOpen && "-rotate-45 -translate-y-1.5",
            size === "lg" && isOpen && "-translate-y-2"
          ),
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <button
      type="button"
      className={clsx(
        "group outline-none flex focus:outline-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      aria-label={label}
      aria-expanded={isOpen}
    >
      <div className={clsx(sizeClasses[size], variantClasses.container)}>
        <span
          className={clsx(
            "block w-full rounded-full transition-all duration-300",
            variantClasses.line,
            variantClasses.line1,
            isHovered && !isOpen && variant === "animated" && "scale-x-110"
          )}
        />
        <span
          className={clsx(
            "block w-full rounded-full transition-all duration-300 mt-1",
            variantClasses.line,
            variantClasses.line2,
            isHovered && !isOpen && variant === "animated" && "scale-x-90"
          )}
        />
        <span
          className={clsx(
            "block w-full rounded-full transition-all duration-300 mt-1",
            variantClasses.line,
            variantClasses.line3,
            isHovered && !isOpen && variant === "animated" && "scale-x-110"
          )}
        />
      </div>
    </button>
  );
};

export default HamburgerMenu;
