import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface FullScreenWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FullScreenWrapper = ({
  children,
  className,
  ...props
}: FullScreenWrapperProps) => {
  const mergedClassName = clsx("h-dvh w-dvw flex", className);
  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
};
