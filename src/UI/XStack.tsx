import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface FullScreenWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const XStack = ({
  children,
  className,
  ...props
}: FullScreenWrapperProps) => {
  const mergedClassName = clsx("flex", className);
  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
};
