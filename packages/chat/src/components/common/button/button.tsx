import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  const { children, variant = "primary", disabled, className, ...restProps } = props;

  const getVariant = (variant: Variant) => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 text-white";
      case "secondary":
        return "bg-gray-200 text-gray-800";
      default:
        return "";
    }
  };

  const classNameButton = `px-4 py-2 rounded-xl ${getVariant(variant)} ${className || ""} ${
    disabled ? "" : "cursor-pointer"
  }`;

  return (
    <button className={classNameButton} {...restProps}>
      {children}
    </button>
  );
};
